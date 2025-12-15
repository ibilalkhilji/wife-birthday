export interface MemoryPhoto {
  id: number;
  url: string;
  caption: string;
  rotation: number;
}

export enum SurpriseState {
  LOCKED = 'LOCKED',
  OPENING = 'OPENING',
  REVEALED = 'REVEALED'
}

export interface PoemResponse {
  title: string;
  verses: string[];
}
