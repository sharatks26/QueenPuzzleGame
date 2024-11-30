import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Cell} from '../types/game';
import {COLORS} from '../utils/constants';

interface BoardSquareProps {
  row: number;
  col: number;
  squareSize: number;
  regionColor: string;
  hasQueen: boolean;
  isValidPosition: boolean;
  onPress: (position: Cell) => void;
  board: number[][];
  regionId: number;
}

const BoardSquare: React.FC<BoardSquareProps> = ({
  row,
  col,
  squareSize,
  regionColor,
  hasQueen,
  isValidPosition,
  onPress,
  board,
  regionId,
}) => {
  const getBorderStyles = () => {
    const borders = {
      borderTopWidth: 0.5,
      borderRightWidth: 0.5,
      borderBottomWidth: 0.5,
      borderLeftWidth: 0.5,
    };

    // Check top border
    if (row === 0 || board[row - 1][col] !== regionId) {
      borders.borderTopWidth = 1;
    }

    // Check right border
    if (col === board[0].length - 1 || board[row][col + 1] !== regionId) {
      borders.borderRightWidth = 1;
    }

    // Check bottom border
    if (row === board.length - 1 || board[row + 1][col] !== regionId) {
      borders.borderBottomWidth = 1;
    }

    // Check left border
    if (col === 0 || board[row][col - 1] !== regionId) {
      borders.borderLeftWidth = 1;
    }

    return borders;
  };

  return (
    <TouchableOpacity
      style={[
        styles.square,
        {
          width: squareSize,
          height: squareSize,
          backgroundColor: regionColor,
        },
        getBorderStyles(),
      ]}
      onPress={() => onPress({row, col})}
      activeOpacity={0.7}>
      <View style={styles.squareContent}>
        {hasQueen && (
          <Image
            resizeMode="contain"
            source={require('../assets/queen.png')}
            style={[
              {
                width: squareSize * 0.5,
                height: squareSize * 0.5,
                borderRadius: squareSize * 0.35,
              },
            ]}
          />
        )}
        {!hasQueen && !isValidPosition && (
          <Image
            source={require('../assets/cross.png')}
            style={[
              {
                width: squareSize * 0.2,
                height: squareSize * 0.2,
                borderRadius: squareSize * 0.075,
              },
            ]}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  square: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.PRIMARY,
  },
  squareContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  queen: {
    backgroundColor: COLORS.SECONDARY,
  },
  invalidSquare: {
    backgroundColor: COLORS.DANGER,
    opacity: 0.5,
  },
});

export default BoardSquare;
