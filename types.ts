
export interface Task {
  id: string;
  title: string;
  durationMinutes: number;
}

export enum AppMode {
  PLANNING = 'PLANNING',
  FOCUSING = 'FOCUSING'
}
