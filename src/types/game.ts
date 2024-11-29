export type Position = {
  row: number;
  col: number;
};

export type Square = {
  position: Position;
  hasQueen: boolean;
  isValid: boolean;
};

export type GameState = {
  board: Square[][];
  queens: Position[];
  queensPlaced: number;
  isComplete: boolean;
  moves: number;
};
