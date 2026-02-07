
export enum AppPhase {
  GREETING = 'GREETING',
  SELECTION = 'SELECTION',
  TRANSITION = 'TRANSITION',
  PLAYING = 'PLAYING'
}

export interface Story {
  id: string;
  title: string;
  chapter: string;
  icon: string;
  color: string;
  placeholderVideo: string;
}
