import {Cell, Region} from '../types/game';
import {BOARD_SIZE} from './constants';

export const isValidQueenPlacement = (
  position: Cell,
  queens: Cell[],
  regions: Region[],
): boolean => {
  // Check if position is within board bounds
  if (!isWithinBoard(position)) {
    return false;
  }

  // Check classic queen rules (row, column, diagonal)
  const hasQueenConflict = queens.some(queen => {
    return (
      queen.row === position.row || // Same row
      queen.col === position.col || // Same column
      Math.abs(queen.row - position.row) === Math.abs(queen.col - position.col) // Diagonal
    );
  });

  if (hasQueenConflict) {
    return false;
  }

  // Find the region of the target position
  const targetRegion = regions.find(region =>
    region.cells.some(
      cell => cell.row === position.row && cell.col === position.col,
    ),
  );

  if (!targetRegion) {
    return false;
  }

  // Check if region already has a queen
  const hasQueenInRegion = queens.some(queen =>
    targetRegion.cells.some(
      cell => cell.row === queen.row && cell.col === queen.col,
    ),
  );

  return !hasQueenInRegion;
};

export const isWithinBoard = (position: Cell): boolean => {
  return (
    position.row >= 0 &&
    position.row < BOARD_SIZE &&
    position.col >= 0 &&
    position.col < BOARD_SIZE
  );
};
