import React, {useEffect} from 'react';
import {View, StyleSheet, Dimensions, Text, Platform} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux/store';
import {COLORS, BOARD_SIZE} from '../utils/constants';
import {Cell} from '../types/game';
import {
  placeQueen,
  generateRegions,
  resetGame,
  undoMove,
} from '../redux/slices/gameSlice';
import {isValidQueenPlacement} from '../utils/validation';
import BoardSquare from './BoardSquare';
import GameControls from './GameControls';

const windowWidth = Dimensions.get('window').width;
const SQUARE_SIZE = Math.floor((windowWidth - 40) / BOARD_SIZE);

const Chessboard: React.FC = () => {
  const dispatch = useDispatch();
  const {board, queens, regions} = useSelector(
    (state: RootState) => state.game,
  );

  useEffect(() => {
    console.log('Initializing board...');
    const timer = setTimeout(() => {
      try {
        dispatch(
          generateRegions({
            boardSize: BOARD_SIZE,
            complexity: 'medium',
          }),
        );
      } catch (error) {
        console.error('Error generating regions:', error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    console.log('Board state updated:', {
      boardSize: board?.length,
      regionsCount: regions?.length,
      queensCount: queens?.length,
    });
  }, [board, regions, queens]);

  const handleSquarePress = (position: Cell) => {
    console.log('Square pressed:', position);
    if (isValidQueenPlacement(position, queens, regions)) {
      dispatch(placeQueen(position));
    }
  };

  const handleReset = () => {
    dispatch(
      generateRegions({
        boardSize: BOARD_SIZE,
        complexity: 'medium',
      }),
    );
  };

  const renderRow = (row: number) => (
    <View key={row} style={styles.row}>
      {Array(BOARD_SIZE)
        .fill(null)
        .map((_, col) => {
          const regionId = board[row][col];
          const region = regions.find(r => r.id === regionId);
          const hasQueen = queens.some(q => q.row === row && q.col === col);
          const isValidPosition = isValidQueenPlacement(
            {row, col},
            queens,
            regions,
          );

          return (
            <BoardSquare
              key={`${row}-${col}`}
              row={row}
              col={col}
              squareSize={SQUARE_SIZE}
              regionColor={
                region
                  ? COLORS.REGIONS[region.id % COLORS.REGIONS.length]
                  : COLORS.WHITE_SQUARE
              }
              hasQueen={hasQueen}
              isValidPosition={isValidPosition}
              onPress={handleSquarePress}
              board={board}
              regionId={regionId}
            />
          );
        })}
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <GameControls
        queensCount={queens.length}
        boardSize={BOARD_SIZE}
        onClear={() => dispatch(resetGame())}
        onUndo={() => dispatch(undoMove())}
        onNewBoard={handleReset}
      />

      <View style={styles.boardContainer}>
        <View style={styles.board}>
          {Array(BOARD_SIZE)
            .fill(null)
            .map((_, row) => renderRow(row))}
        </View>
      </View>

      {queens.length === BOARD_SIZE && (
        <Text style={styles.winMessage}>Congratulations! You solved it!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  boardContainer: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  board: {
    width: SQUARE_SIZE * BOARD_SIZE,
    height: SQUARE_SIZE * BOARD_SIZE,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
  },
  row: {
    flexDirection: 'row',
    height: SQUARE_SIZE,
  },
  winMessage: {
    fontSize: 24,
    color: COLORS.SUCCESS,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Chessboard;
