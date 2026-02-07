
import React, { useState, useEffect, useCallback } from 'react';
import { AppPhase, Story } from './types';
import { STORIES, GREETINGS } from './constants';
import GreetingView from './components/GreetingView';
import StoryListView from './components/StoryListView';
import ImmersiveExperience from './components/ImmersiveExperience';

const App: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase>(AppPhase.GREETING);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const randomGreeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
    setGreeting(randomGreeting);

    const timer = setTimeout(() => {
      setPhase(AppPhase.SELECTION);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  const handleSelectStory = useCallback((story: Story) => {
    setSelectedStory(story);
    setPhase(AppPhase.TRANSITION);
    
    // We keep it in TRANSITION for a brief moment to allow the ImmersiveExperience
    // to mount and start its video buffer before we fade the container in.
    setTimeout(() => {
      setPhase(AppPhase.PLAYING);
    }, 100); 
  }, []);

  const handleFinish = useCallback(() => {
    setPhase(AppPhase.SELECTION);
    setSelectedStory(null);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a0a0c] selection:bg-transparent">
      {phase === AppPhase.GREETING && (
        <GreetingView message={greeting} />
      )}

      {phase === AppPhase.SELECTION && (
        <StoryListView 
          stories={STORIES} 
          onSelect={handleSelectStory} 
        />
      )}

      {(phase === AppPhase.TRANSITION || phase === AppPhase.PLAYING) && selectedStory && (
        <ImmersiveExperience 
          story={selectedStory} 
          isTransitioning={phase === AppPhase.TRANSITION}
          onFinish={handleFinish}
        />
      )}
      
      {/* Reload trigger */}
      <div 
        className="fixed bottom-0 right-0 w-12 h-12 z-[100] opacity-0 cursor-default" 
        onClick={() => window.location.reload()}
      />
    </div>
  );
};

export default App;
