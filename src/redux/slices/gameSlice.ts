import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GameState, Cell, BoardSize, Complexity} from '../../types/game';
import {RegionGenerator} from '../../utils/regionGenerator';
import {BOARD_SIZE} from '../../utils/constants';

const initialState: GameState = {
  board: Array(BOARD_SIZE)
    .fill(0)
    .map(() => Array(BOARD_SIZE).fill(-1)),
  regions: [],
  queens: [],
  moveHistory: [],
  selectedQueen: null,
  gameStatus: 'playing',
  moves: 0,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    generateRegions: (
      state,
      action: PayloadAction<{
        boardSize: BoardSize;
        complexity: Complexity;
      }>,
    ) => {
      const {boardSize, complexity} = action.payload;
      const generator = new RegionGenerator(boardSize, {
        minRegionSize: boardSize - 1,
        maxRegionSize: boardSize + 1,
        complexity,
      });

      const {regions, board} = generator.generateRegions();
      state.regions = regions;
      state.board = board;
      state.queens = [];
      state.moveHistory = [];
      state.selectedQueen = null;
      state.gameStatus = 'playing';
      state.moves = 0;
    },

    placeQueen: (state, action: PayloadAction<Cell>) => {
      const {row, col} = action.payload;

      // Add the queen to the queens array
      state.queens.push({row, col});
      state.moveHistory.push({row, col});
      state.moves += 1;

      // Check if the game is won
      if (state.queens.length === BOARD_SIZE) {
        state.gameStatus = 'won';
      }
    },

    removeQueen: (state, action: PayloadAction<Cell>) => {
      const {row, col} = action.payload;
      state.queens = state.queens.filter(
        queen => queen.row !== row || queen.col !== col,
      );
    },

    resetGame: state => {
      state.queens = [];
      state.moveHistory = [];
      state.selectedQueen = null;
      state.gameStatus = 'playing';
      state.moves = 0;
    },

    selectQueen: (state, action: PayloadAction<Cell | null>) => {
      state.selectedQueen = action.payload;
    },

    undoMove: state => {
      if (state.queens.length > 0) {
        state.queens.pop();
        state.moveHistory.pop();
        state.moves -= 1;
        state.gameStatus = 'playing';
      }
    },
  },
});

export const {
  generateRegions,
  placeQueen,
  removeQueen,
  resetGame,
  selectQueen,
  undoMove,
} = gameSlice.actions;
export default gameSlice.reducer;
