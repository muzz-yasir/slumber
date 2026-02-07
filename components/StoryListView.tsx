
import React from 'react';
import { Story } from '../types';

interface StoryListViewProps {
  stories: Story[];
  onSelect: (story: Story) => void;
}

const StoryListView: React.FC<StoryListViewProps> = ({ stories, onSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-6 md:p-12 fade-in">
      <div className="max-w-xl w-full">
        <h2 className="text-sm uppercase tracking-[0.3em] text-slate-500 mb-16 text-center italic">
          Tonight’s stories
        </h2>
        
        <div className="space-y-12">
          {stories.map((story) => (
            <button
              key={story.id}
              onClick={() => onSelect(story)}
              className="group flex items-center w-full text-left transition-all duration-1000 ease-out interactive"
            >
              <span className="text-3xl md:text-4xl mr-8 opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                {story.icon}
              </span>
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-serif text-slate-300 group-hover:text-white transition-colors duration-700">
                  {story.title}
                </span>
                <span className="text-xs uppercase tracking-widest text-slate-600 mt-1 group-hover:text-slate-400 transition-colors duration-700">
                  {story.chapter}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-12 text-[10px] uppercase tracking-widest text-slate-700 opacity-30">
        Choose a path into the dream
      </div>
    </div>
  );
};

export default StoryListView;
