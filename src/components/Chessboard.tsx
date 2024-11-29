import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
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
  }, []);

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

  const handleClear = () => {
    dispatch(resetGame());
  };

  const renderSquare = (row: number, col: number) => {
    const regionId = board[row][col];
    const region = regions.find(r => r.id === regionId);
    const hasQueen = queens.some(q => q.row === row && q.col === col);
    const isValidPosition = isValidQueenPlacement({row, col}, queens, regions);

    return (
      <TouchableOpacity
        key={`${row}-${col}`}
        style={[
          styles.square,
          {
            backgroundColor: region
              ? COLORS.REGIONS[region.id % COLORS.REGIONS.length]
              : COLORS.WHITE_SQUARE,
          },
        ]}
        onPress={() => handleSquarePress({row, col})}
        activeOpacity={0.7}>
        <View style={styles.squareContent}>
          {hasQueen && <View style={styles.queen} />}
          {!hasQueen && !isValidPosition && (
            <View style={styles.invalidSquare} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderRow = (row: number) => (
    <View key={row} style={styles.row}>
      {Array(BOARD_SIZE)
        .fill(null)
        .map((_, col) => renderSquare(row, col))}
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.queensCount}>
          Queens placed: {queens.length} / {BOARD_SIZE}
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              queens.length === 0 && styles.buttonDisabled,
            ]}
            onPress={handleClear}
            disabled={queens.length === 0}
            activeOpacity={0.7}>
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              queens.length === 0 && styles.buttonDisabled,
            ]}
            onPress={() => dispatch(undoMove())}
            disabled={queens.length === 0}
            activeOpacity={0.7}>
            <Text style={styles.buttonText}>Undo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleReset}
            activeOpacity={0.7}>
            <Text style={styles.buttonText}>New Board</Text>
          </TouchableOpacity>
        </View>
      </View>

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
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
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
  square: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: COLORS.PRIMARY,
  },
  squareContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  queen: {
    width: SQUARE_SIZE * 0.7,
    height: SQUARE_SIZE * 0.7,
    borderRadius: SQUARE_SIZE * 0.35,
    backgroundColor: COLORS.SECONDARY,
  },
  invalidSquare: {
    width: SQUARE_SIZE * 0.15,
    height: SQUARE_SIZE * 0.15,
    borderRadius: SQUARE_SIZE * 0.075,
    backgroundColor: COLORS.DANGER,
    opacity: 0.5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  queensCount: {
    fontSize: 18,
    color: COLORS.PRIMARY,
    fontWeight: 'bold',
  },
  winMessage: {
    fontSize: 24,
    color: COLORS.SUCCESS,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: COLORS.PRIMARY + '80',
    opacity: 0.7,
  },
});

export default Chessboard;
