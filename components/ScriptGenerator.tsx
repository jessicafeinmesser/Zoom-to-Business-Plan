
import React, { useState } from 'react';
import { Icons } from '../constants';
import { generatePythonScript } from '../services/gemini';

const ScriptGenerator: React.FC = () => {
  const [config, setConfig] = useState({
    zoomSecret: 'ZOOM_VERIFICATION_TOKEN',
    ghlApiKey: 'GHL_API_KEY_HERE',
    locationId: 'GHL_LOCATION_ID'
  });
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const generated = await generatePythonScript(config);
      setScript(generated);
    } catch (error) {
      console.error(error);
      alert("Generation failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">Configure Webhook Script</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Zoom Webhook Secret</label>
            <input
              type="password"
              value={config.zoomSecret}
              onChange={(e) => setConfig({ ...config, zoomSecret: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">GHL API Key</label>
            <input
              type="password"
              value={config.ghlApiKey}
              onChange={(e) => setConfig({ ...config, ghlApiKey: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-slate-700">GHL Location ID</label>
            <input
              type="text"
              value={config.locationId}
              onChange={(e) => setConfig({ ...config, locationId: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="mt-8 bg-slate-900 hover:bg-black text-white px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-3 w-full justify-center shadow-lg"
        >
          {loading ? (
             <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
          ) : (
            <>
              <Icons.Code />
              Generate Python Script
            </>
          )}
        </button>
      </div>

      {script && (
        <div className="bg-[#1e1e1e] rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in duration-300">
          <div className="bg-slate-800 px-6 py-4 flex items-center justify-between border-b border-slate-700">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-xs font-mono text-slate-400">automation_webhook.py</span>
            </div>
            <button
              onClick={copyToClipboard}
              className="text-slate-300 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors"
            >
              {copied ? <><Icons.Check /> Copied</> : <><Icons.Copy /> Copy Code</>}
            </button>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="text-blue-300 font-mono text-xs leading-relaxed">
              <code>{script}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScriptGenerator;
