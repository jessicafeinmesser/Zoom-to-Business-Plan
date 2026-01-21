
import React, { useState } from 'react';
import { AppTab } from './types';
import { Icons } from './constants';
import Dashboard from './components/Dashboard';
import AILab from './components/AILab';
import ScriptGenerator from './components/ScriptGenerator';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Sidebar Navigation */}
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Icons.Zap />
            </div>
            <span className="font-bold text-xl tracking-tight">FullbookAI <span className="text-blue-600">Pro</span></span>
          </div>
          <nav className="p-4 space-y-2 flex-1">
            <button
              onClick={() => setActiveTab(AppTab.DASHBOARD)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === AppTab.DASHBOARD ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Icons.Layout />
              <span className="font-medium">Workflow Status</span>
            </button>
            <button
              onClick={() => setActiveTab(AppTab.AI_LAB)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === AppTab.AI_LAB ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Icons.Microphone />
              <span className="font-medium">AI Test Lab</span>
            </button>
            <button
              onClick={() => setActiveTab(AppTab.SCRIPT_EXPORT)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === AppTab.SCRIPT_EXPORT ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Icons.Code />
              <span className="font-medium">Python Generator</span>
            </button>
          </nav>
          <div className="p-4 border-t border-slate-100">
            <div className="bg-slate-900 rounded-2xl p-4 text-white">
              <p className="text-xs text-slate-400 mb-2 uppercase tracking-widest font-bold">Account Status</p>
              <p className="text-sm font-semibold">FullbookAI Enterprise</p>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-slate-300">System Live</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
            <h1 className="text-lg font-semibold text-slate-800">
              {activeTab === AppTab.DASHBOARD && 'Automation Dashboard'}
              {activeTab === AppTab.AI_LAB && 'AI Processing Lab'}
              {activeTab === AppTab.SCRIPT_EXPORT && 'Python Webhook Export'}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500">v2.4.0</span>
              <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-xs">
                JD
              </div>
            </div>
          </header>

          <div className="p-8 max-w-7xl mx-auto">
            {activeTab === AppTab.DASHBOARD && <Dashboard />}
            {activeTab === AppTab.AI_LAB && <AILab />}
            {activeTab === AppTab.SCRIPT_EXPORT && <ScriptGenerator />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
