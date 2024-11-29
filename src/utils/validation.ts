import {Position} from '../types/game';
import {BOARD_SIZE} from './constants';

export const isValidQueenPlacement = (
  queens: Position[],
  newPosition: Position,
): boolean => {
  for (const queen of queens) {
    // Check same row or column
    if (queen.row === newPosition.row || queen.col === newPosition.col) {
      return false;
    }

    // Check diagonals
    if (
      Math.abs(queen.row - newPosition.row) ===
      Math.abs(queen.col - newPosition.col)
    ) {
      return false;
    }
  }
  return true;
};

export const isWithinBoard = (position: Position): boolean => {
  return (
    position.row >= 0 &&
    position.row < BOARD_SIZE &&
    position.col >= 0 &&
    position.col < BOARD_SIZE
  );
};
