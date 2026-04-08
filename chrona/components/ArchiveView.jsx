// ============================================================
// ArchiveView.jsx — Historical Task Logs
// ============================================================

'use client';

const LOGS = [
  { id: 101, title: 'Finalize Design tokens', date: 'Mar 30, 2026', time: '1:45 PM', status: 'COMPLETED', points: 25 },
  { id: 102, title: 'Interview with TUFTS staff', date: 'Mar 28, 2026', time: '10:00 AM', status: 'ARCHIVED', points: 15 },
  { id: 103, title: 'Research Canvas Drag Logic', date: 'Mar 25, 2026', time: '11:20 PM', status: 'COMPLETED', points: 50 },
  { id: 104, title: 'Setup GitHub Actions', date: 'Mar 24, 2026', time: '09:12 AM', status: 'COMPLETED', points: 10 },
];

export default function ArchiveView() {
  return (
    <div className="ml-64 pt-24 px-12 min-h-screen bg-surface-dim/10 animate-in fade-in duration-500 pb-20">
      
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-4xl font-black uppercase tracking-widest text-[#1c1c18]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Archived <span className="text-primary italic">Logs</span>
        </h2>
        <p className="text-sm italic opacity-60 font-serif">A historical record of your achievements and past iterations.</p>
      </div>

      <div className="paper-slip p-0 bg-white shadow-xl relative overflow-hidden">
         {/* Table style Log */}
         <div className="min-w-full">
            <div className="grid grid-cols-5 border-b-2 border-black/5 p-6 bg-surface/30">
                <div className="text-[10px] font-bold tracking-[0.2em] opacity-40 uppercase">Task Identity</div>
                <div className="text-[10px] font-bold tracking-[0.2em] opacity-40 uppercase">Timestamp</div>
                <div className="text-[10px] font-bold tracking-[0.2em] opacity-40 uppercase text-center">Status</div>
                <div className="text-[10px] font-bold tracking-[0.2em] opacity-40 uppercase text-center">Reward</div>
                <div className="text-[10px] font-bold tracking-[0.2em] opacity-40 uppercase text-right">Actions</div>
            </div>

            <div className="divide-y divide-black/5 relative z-10">
                {LOGS.map(log => (
                    <div key={log.id} className="grid grid-cols-5 p-6 items-center hover:bg-surface-container/50 transition-colors group">
                        {/* Task */}
                        <div className="font-bold text-sm uppercase text-[#1c1c18] group-hover:text-primary transition-colors">
                           {log.title}
                        </div>

                        {/* Date/Time */}
                        <div className="opacity-60 text-xs">
                           <div className="font-bold tracking-tighter" style={{ fontFamily: 'Space Grotesk' }}>{log.date}</div>
                           <div className="text-[10px] opacity-60 uppercase">{log.time}</div>
                        </div>

                        {/* Status */}
                        <div className="flex justify-center">
                            <span className="text-[9px] font-bold px-3 py-1 bg-black/5 rounded-full uppercase tracking-tighter opacity-60 border border-black/10">
                                {log.status}
                            </span>
                        </div>

                        {/* Reward */}
                        <div className="flex justify-center flex-col items-center">
                            <div className="font-black text-lg text-primary/60">{log.points}</div>
                            <div className="text-[8px] font-bold uppercase tracking-tighter opacity-30">Puntos</div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3 opacity-20 group-hover:opacity-100 transition-opacity">
                            <button className="material-symbols-outlined text-[18px]">visibility</button>
                            <button className="material-symbols-outlined text-[18px]">restore</button>
                            <button className="material-symbols-outlined text-[18px] text-red-500">delete_forever</button>
                        </div>
                    </div>
                ))}
            </div>
         </div>

         {/* Decorative Filing Tab */}
         <div className="absolute top-0 right-10 px-6 py-2 bg-primary/10 rounded-b-md text-[9px] font-bold uppercase tracking-[0.4em] opacity-40 border-x border-b border-primary/20">
            Dossier No. 427
         </div>
      </div>
      
      <div className="mt-12 flex justify-center opacity-20 hover:opacity-100 transition-opacity">
        <button className="text-[11px] font-bold uppercase tracking-widest flex items-center gap-2">
            Show more records
            <span className="material-symbols-outlined">expand_more</span>
        </button>
      </div>
    </div>
  );
}
