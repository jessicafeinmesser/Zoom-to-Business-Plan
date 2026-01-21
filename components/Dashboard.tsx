
import React from 'react';
import { Icons } from '../constants';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Icons.Zap />
            </div>
            <span className="text-green-500 text-xs font-bold px-2 py-1 bg-green-50 rounded-full">+12%</span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Calls Processed</h3>
          <p className="text-3xl font-bold text-slate-900 mt-1">1,284</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <Icons.FileText />
            </div>
            <span className="text-blue-500 text-xs font-bold px-2 py-1 bg-blue-50 rounded-full">+5%</span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Business Plans Generated</h3>
          <p className="text-3xl font-bold text-slate-900 mt-1">842</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <Icons.Layout />
            </div>
            <span className="text-purple-500 text-xs font-bold px-2 py-1 bg-purple-50 rounded-full">Stable</span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Automation Success Rate</h3>
          <p className="text-3xl font-bold text-slate-900 mt-1">99.2%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Visual Workflow */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold mb-8 text-slate-800">Your Automation Pipeline</h2>
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-12 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center z-10 w-48">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg mb-4">
                <span className="font-bold text-xl">1</span>
              </div>
              <h4 className="font-bold text-slate-900">Zoom Call</h4>
              <p className="text-sm text-slate-500 mt-1">Recording uploads</p>
            </div>
            <div className="hidden md:block absolute top-8 left-[10%] right-[70%] h-0.5 bg-blue-200"></div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center z-10 w-48">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg mb-4">
                <span className="font-bold text-xl">2</span>
              </div>
              <h4 className="font-bold text-slate-900">Gemini AI</h4>
              <p className="text-sm text-slate-500 mt-1">Strategic Analysis</p>
            </div>
            <div className="hidden md:block absolute top-8 left-[40%] right-[40%] h-0.5 bg-indigo-200"></div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center z-10 w-48">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg mb-4">
                <span className="font-bold text-xl">3</span>
              </div>
              <h4 className="font-bold text-slate-900">GHL Update</h4>
              <p className="text-sm text-slate-500 mt-1">Note added to Contact</p>
            </div>
          </div>

          <div className="mt-12 bg-slate-50 rounded-2xl p-6 border border-slate-100">
             <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">System Activity (Live Logs)</h3>
             <div className="space-y-3 font-mono text-xs text-slate-500">
                <p><span className="text-blue-600">[INFO]</span> 14:02:11 - Received webhook from Zoom (ID: 8829...)</p>
                <p><span className="text-indigo-600">[INFO]</span> 14:02:45 - Gemini processed transcript (342 tokens)</p>
                <p><span className="text-purple-600">[SUCCESS]</span> 14:03:02 - Updated GHL Contact "John Smith"</p>
             </div>
          </div>
        </div>

        {/* Manual Oversight Checklist */}
        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <div className="p-1 bg-white/10 rounded-lg"><Icons.Check /></div>
            Post-Call Checklist
          </h2>
          <div className="space-y-4 flex-1">
            {[
              "Review AI Business Plan for accuracy",
              "Validate Contact matching (Email match)",
              "Personalize the GHL Note (Add context)",
              "Trigger GHL 'Nurture' Workflow",
              "Send 'Recap Email' with AI Summary"
            ].map((task, i) => (
              <label key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer border border-white/5">
                <input type="checkbox" className="w-5 h-5 rounded border-white/20 bg-transparent text-blue-500 focus:ring-blue-500" />
                <span className="text-sm font-medium text-slate-300">{task}</span>
              </label>
            ))}
          </div>
          <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10 text-xs text-slate-400">
            <p className="italic">"Automation handles the data, you handle the relationship."</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
