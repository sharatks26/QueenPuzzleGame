export type BoardSize = 8 | 9;

export interface Cell {
  row: number;
  col: number;
}

export interface Region {
  id: number;
  cells: Cell[];
}

export interface GameState {
  board: number[][];
  regions: Region[];
  queens: Cell[];
  moveHistory: Cell[];
  selectedQueen: Cell | null;
  gameStatus: 'playing' | 'won' | 'lost';
  moves: number;
}

export type Complexity = 'easy' | 'medium' | 'hard' | 'expert';
