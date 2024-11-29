import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BOARD_SIZE, MAX_QUEENS} from '../../utils/constants';
import {GameState, Position} from '../../types/game';
import {isValidQueenPlacement} from '../../utils/validation';

const initialBoard = Array(BOARD_SIZE)
  .fill(null)
  .map((_, row) =>
    Array(BOARD_SIZE)
      .fill(null)
      .map((_, col) => ({
        position: {row, col},
        hasQueen: false,
        isValid: true,
      })),
  );

const initialState: GameState = {
  board: initialBoard,
  queens: [],
  queensPlaced: 0,
  isComplete: false,
  moves: 0,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    placeQueen: (state, action: PayloadAction<Position>) => {
      const {row, col} = action.payload;

      if (state.queensPlaced >= MAX_QUEENS) {
        return;
      }

      if (isValidQueenPlacement(state.queens, {row, col})) {
        state.board[row][col].hasQueen = true;
        state.queens.push({row, col});
        state.queensPlaced += 1;
        state.moves += 1;
        state.isComplete = state.queensPlaced === MAX_QUEENS;
      }
    },
    resetGame: () => initialState,
  },
});

export const {placeQueen, resetGame} = gameSlice.actions;
export default gameSlice.reducer;
