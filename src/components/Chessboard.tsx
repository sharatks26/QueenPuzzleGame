import React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux/store';
import {COLORS, BOARD_SIZE} from '../utils/constants';
import {Position} from '../types/game';
import {placeQueen} from '../redux/slices/gameSlice';
import {isValidQueenPlacement} from '../utils/validation';

const windowWidth = Dimensions.get('window').width;
const SQUARE_SIZE = Math.floor(windowWidth / BOARD_SIZE);

const Chessboard: React.FC = () => {
  const dispatch = useDispatch();
  const {board, queens, queensPlaced} = useSelector(
    (state: RootState) => state.game,
  );

  const handleSquarePress = (position: Position) => {
    if (isValidQueenPlacement(queens, position)) {
      dispatch(placeQueen(position));
    }
  };

  const renderSquare = (row: number, col: number) => {
    const isBlackSquare = (row + col) % 2 === 1;
    const square = board[row][col];
    const isValidPosition = isValidQueenPlacement(queens, {row, col});

    return (
      <View
        key={`${row}-${col}`}
        style={[
          styles.square,
          {
            backgroundColor: isBlackSquare
              ? COLORS.BLACK_SQUARE
              : COLORS.WHITE_SQUARE,
          },
        ]}
        onTouchEnd={() => handleSquarePress({row, col})}>
        {square.hasQueen && <View style={styles.queen} />}
        {!square.hasQueen && !isValidPosition && (
          <View style={styles.invalidSquare} />
        )}
      </View>
    );
  };

  const renderRow = (row: number) => {
    return (
      <View key={row} style={styles.row}>
        {Array(BOARD_SIZE)
          .fill(null)
          .map((_, col) => renderSquare(row, col))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.queensCount}>
        Queens placed: {queensPlaced} / {BOARD_SIZE}
      </Text>
      <View style={styles.board}>
        {Array(BOARD_SIZE)
          .fill(null)
          .map((_, row) => renderRow(row))}
      </View>
      {queensPlaced === BOARD_SIZE && (
        <Text style={styles.winMessage}>Congratulations! You solved it!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 20,
  },
  board: {
    width: SQUARE_SIZE * BOARD_SIZE,
    height: SQUARE_SIZE * BOARD_SIZE,
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
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
  queensCount: {
    fontSize: 18,
    color: COLORS.PRIMARY,
    fontWeight: 'bold',
  },
  winMessage: {
    fontSize: 24,
    color: COLORS.SUCCESS,
    fontWeight: 'bold',
  },
});

export default Chessboard;
