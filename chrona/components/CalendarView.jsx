// ============================================================
// CalendarView.jsx — Monthly calendar with "neat card" details
// ============================================================

'use client';

import { useState } from 'react';

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

// Mock tasks for specific days
const DAY_TASKS = {
  9: [
    { id: 1, title: 'Math Exam Study', time: '10:00 AM', category: 'EXAM' },
    { id: 2, title: 'Gym Session', time: '4:00 PM', category: 'PERSONAL' }
  ],
  12: [
    { id: 3, title: 'Hackzion Hackathon', time: 'All Day', category: 'HACKATHON' }
  ],
  17: [
    { id: 4, title: 'NEXIFY 26 Brainstorm', time: '2:00 PM', category: 'HACKATHON' }
  ]
};

export default function CalendarView() {
  const [selectedDay, setSelectedDay] = useState(null);

  // Simple grid for April 2026 (starting Wednesday)
  const daysInMonth = 30;
  const startOffset = 3; // Wednesday
  const grid = Array.from({ length: 35 }, (_, i) => i - startOffset + 1);

  return (
    <div className="ml-64 pt-24 px-12 min-h-screen bg-surface-dim/10 animate-in fade-in duration-500 pb-20">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-widest text-[#1c1c18]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            April <span className="text-primary italic">2026</span>
          </h2>
          <p className="text-sm italic opacity-60 font-serif">Planning your journey month by month.</p>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="paper-slip p-8 bg-white shadow-xl relative overflow-hidden">
        {/* Decorative ruled lines */}
        <div className="absolute inset-0 ruled-paper opacity-10 pointer-events-none" />

        <div className="grid grid-cols-7 gap-px bg-black/5 relative z-10">
          {/* Day Headers */}
          {DAYS.map(day => (
            <div key={day} className="bg-[#fcf9f2] p-4 text-[10px] font-bold tracking-[0.2em] text-center opacity-40">
              {day}
            </div>
          ))}

          {/* Days */}
          {grid.map((dayNum, idx) => {
            const hasTasks = DAY_TASKS[dayNum];
            const isToday = dayNum === 9; // Mock today
            const isSelected = selectedDay === dayNum;

            return (
              <div 
                key={idx} 
                className={`bg-white min-h-[120px] p-2 transition-all cursor-pointer hover:bg-surface-container group relative ${dayNum < 1 || dayNum > daysInMonth ? 'opacity-0 pointer-events-none' : ''}`}
                onClick={() => dayNum > 0 && dayNum <= daysInMonth && setSelectedDay(dayNum)}
              >
                {/* Day Number */}
                <div className={`text-sm font-bold w-10 h-10 flex items-center justify-center rounded-full transition-colors ${isToday ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'opacity-30 group-hover:opacity-100'}`}>
                  {(dayNum > 0 && dayNum <= daysInMonth) ? dayNum : ''}
                </div>

                {/* Dot markers for tasks */}
                <div className="mt-2 pl-2 flex gap-1 flex-wrap">
                  {hasTasks?.map(t => (
                    <div key={t.id} className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary/80 transition-colors" />
                  ))}
                </div>

                {/* Overlay Indicator */}
                {hasTasks && (
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-40 transition-opacity">
                    <span className="material-symbols-outlined text-[10px]">open_in_new</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Day Overlay: Neat Cards */}
      {selectedDay && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300 backdrop-blur-md"
          style={{ backgroundColor: 'rgba(28,28,24,0.4)' }}
          onClick={() => setSelectedDay(null)}
        >
          <div 
            className="paper-slip bg-white p-10 w-full max-w-md shadow-2xl relative animate-in slide-in-from-bottom-10"
            style={{ transform: 'rotate(-0.5deg)' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close */}
            <button onClick={() => setSelectedDay(null)} className="absolute top-4 right-4 material-symbols-outlined opacity-30 hover:opacity-100 transition-opacity">close</button>

            <div 
              className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40 mb-2"
              style={{ fontFamily: 'Work Sans' }}
            >
              Daily Schedule
            </div>
            <h3 className="text-3xl font-black uppercase tracking-widest text-[#1c1c18] mb-8" style={{ fontFamily: 'Space Grotesk' }}>
              April {selectedDay}
            </h3>

            <div className="space-y-4">
              {DAY_TASKS[selectedDay] ? (
                DAY_TASKS[selectedDay].map(task => (
                  <div key={task.id} className="p-6 border border-black/5 bg-surface rounded-sm hover:-translate-y-1 transition-all shadow-sm relative group overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors" />
                    <div className="text-[10px] font-bold opacity-30 uppercase tracking-[0.2em] mb-1">{task.time}</div>
                    <div className="font-bold text-xl leading-tight uppercase text-[#1c1c18] mb-3">{task.title}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold px-3 py-1 bg-primary/5 text-primary rounded-full uppercase tracking-widest">
                        {task.category}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="italic opacity-40 text-center py-16 font-serif bg-surface/30 rounded-lg border border-dashed border-black/5">
                  No events pinned for this date.
                </div>
              )}
            </div>
            
            <button 
              className="w-full mt-10 py-5 bg-[#1c1c18] text-white font-bold uppercase tracking-[0.3em] text-[10px] shadow-xl hover:bg-primary active:scale-[0.98] transition-all"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              Add Entry
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
