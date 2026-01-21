
import React, { useState } from 'react';
import { Icons } from '../constants';
import { processMeetingNotes } from '../services/gemini';
import { AutomationResult } from '../types';

const AILab: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AutomationResult | null>(null);
  const [pushed, setPushed] = useState(false);

  // Simple regex to detect if text is primarily Hebrew for RTL support
  const isHebrew = /[\u0590-\u05FF]/.test(inputText);
  const resultIsHebrew = result ? /[\u0590-\u05FF]/.test(result.summary) : false;

  const handleProcess = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setPushed(false);
    try {
      const data = await processMeetingNotes(inputText);
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Error processing notes. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const simulatePushToGHL = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPushed(true);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Input Section */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm h-full flex flex-col">
        <h2 className="text-xl font-bold mb-4 text-slate-800 flex items-center gap-2">
          <Icons.Microphone />
          Manual Intercept Lab
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Paste transcripts here. The AI will generate the summary and plan in the same language.
        </p>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          dir={isHebrew ? 'rtl' : 'ltr'}
          placeholder="Paste meeting notes here..."
          className={`flex-1 w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none min-h-[300px] text-slate-700 bg-slate-50 font-sans text-lg`}
        />
        <button
          onClick={handleProcess}
          disabled={loading || !inputText}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
          ) : (
            <>
              <Icons.Zap />
              Analyze Transcript
            </>
          )}
        </button>
      </div>

      {/* Output Section */}
      <div className="space-y-6 h-full">
        {!result && !loading && (
          <div className="bg-slate-100 border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center h-[500px] flex flex-col items-center justify-center text-slate-400">
             <div className="p-4 bg-slate-200 rounded-full mb-4">
                <Icons.FileText />
             </div>
             <p className="font-medium">Strategic output will appear here</p>
          </div>
        )}

        {loading && !result && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm animate-pulse space-y-6">
            <div className="h-6 w-32 bg-slate-200 rounded"></div>
            <div className="h-40 w-full bg-slate-50 rounded-2xl"></div>
          </div>
        )}

        {result && (
          <>
            <div className="flex gap-4">
                <button 
                  onClick={simulatePushToGHL}
                  disabled={pushed || loading}
                  className={`flex-1 p-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md ${
                    pushed ? 'bg-green-100 text-green-700' : 'bg-slate-900 text-white hover:bg-black'
                  }`}
                >
                  {pushed ? <><Icons.Check /> Pushed to GHL</> : <><Icons.Zap /> Manually Push to GHL</>}
                </button>
                <button 
                  onClick={() => setResult(null)}
                  className="p-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-50 shadow-sm"
                >
                  Clear
                </button>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm" dir={resultIsHebrew ? 'rtl' : 'ltr'}>
               <h3 className="font-bold text-slate-800 mb-2 uppercase tracking-wider text-xs flex justify-between">
                 Meeting Summary
                 <span className="text-blue-500">{resultIsHebrew ? 'עובד' : 'Processed'}</span>
               </h3>
               <p className="text-slate-600 leading-relaxed text-sm">
                 {result.summary}
               </p>
            </div>

            <div className="bg-indigo-900 p-8 rounded-3xl text-white shadow-xl" dir={resultIsHebrew ? 'rtl' : 'ltr'}>
               <h3 className="font-bold text-indigo-300 uppercase tracking-widest text-xs mb-4">Business Plan</h3>
               <div className="prose prose-invert prose-sm">
                 <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-indigo-100">
                    {result.businessPlan}
                 </pre>
               </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm" dir={resultIsHebrew ? 'rtl' : 'ltr'}>
               <h3 className="font-bold text-slate-800 mb-4 uppercase tracking-wider text-xs">GHL Note Snippet</h3>
               <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs font-mono text-slate-600">
                 {result.ghlNote}
               </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AILab;
