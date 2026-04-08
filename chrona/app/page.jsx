// ============================================================
// page.jsx — Main page: assembles all mind map components
// ============================================================

'use client';

import { useState, useCallback } from 'react';
import { defaultCategories, defaultTasks } from '@/lib/data';
import PaperGrain from '@/components/PaperGrain';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MindMapCanvas from '@/components/MindMapCanvas';
import FloatingActionButton from '@/components/FloatingActionButton';
import AddItemModal from '@/components/AddItemModal';
import UpcomingView from '@/components/UpcomingView';
import CalendarView from '@/components/CalendarView';
import HabitsView from '@/components/HabitsView';
import JournalView from '@/components/JournalView';
import GoalsView from '@/components/GoalsView';
import ArchiveView from '@/components/ArchiveView';

export default function Home() {
  // ---- Main Navigation State (Header) ----
  const [activeTab, setActiveTab] = useState('Today');

  // ---- Sidebar Navigation State (only relevant for 'Today' tab) ----
  const [currentView, setCurrentView] = useState('Priority Tasks'); // or 'Upcoming'

  // ---- Mutable state for positions (enables drag-to-place + live wires) ----
  const [categories, setCategories] = useState(defaultCategories);
  const [tasks, setTasks] = useState(defaultTasks);
  const [mePosition, setMePosition] = useState({ x: 50, y: 50 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMePositionChange = useCallback((_, newPos) => {
    setMePosition(newPos);
  }, []);

  // ---- Update a single category's position ----
  const handleCategoryPositionChange = useCallback((id, newPos) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, position: newPos } : cat))
    );
  }, []);

  // ---- Update a single task's position ----
  const handleTaskPositionChange = useCallback((id, newPos) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, position: newPos } : task))
    );
  }, []);

  // ---- Handlers ----
  const handleAddItem = () => setIsModalOpen(true);
  const handleNewGoal = () => setIsModalOpen(true);
  
  const handleProcessEvent = (description) => {
    console.log('Processing event:', description);
    // Future logic: AI extraction or adding a new task/category
  };

  return (
    <>
      {/* Paper texture overlay */}
      <PaperGrain />

      {/* Fixed header */}
      <Header activeView={activeTab} onViewChange={setActiveTab} />

      {/* Sidebar navigation - only shown on Today tab */}
      {activeTab === 'Today' && (
        <Sidebar 
          onAddItem={handleAddItem} 
          activeItem={currentView}
          onNavigate={setCurrentView}
        />
      )}

      {/* Main Content: Conditionally rendered based on Active Tab & Sidebar currentView */}
      <div className={`relative z-0 ${activeTab !== 'Today' ? 'w-full px-12 pt-24 min-h-screen' : ''}`}>
        {activeTab === 'Today' && (
           <>
             {currentView === 'Upcoming' && <UpcomingView />}
             {currentView === 'Priority Tasks' && (
               <MindMapCanvas
                 categories={categories}
                 tasks={tasks}
                 mePosition={mePosition}
                 onCategoryPositionChange={handleCategoryPositionChange}
                 onTaskPositionChange={handleTaskPositionChange}
                 onMePositionChange={handleMePositionChange}
               />
             )}
             {currentView === 'Long-term Goals' && <GoalsView />}
             {currentView === 'Archived Logs' && <ArchiveView />}
           </>
        )}

        {activeTab === 'Calendar' && <div className="-ml-64 scale-100"><CalendarView /></div>}
        {activeTab === 'Habits' && <div className="-ml-64 scale-100"><HabitsView /></div>}
        {activeTab === 'Journal' && <div className="-ml-64 scale-100"><JournalView /></div>}
      </div>

      {/* Floating action button */}
      <FloatingActionButton onClick={handleNewGoal} />

      {/* Add Item Modal Overlay */}
      <AddItemModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onProcess={handleProcessEvent}
      />
    </>
  );
}
