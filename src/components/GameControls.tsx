import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {COLORS} from '../utils/constants';

interface GameControlsProps {
  queensCount: number;
  boardSize: number;
  onClear: () => void;
  onUndo: () => void;
  onNewBoard: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  queensCount,
  boardSize,
  onClear,
  onUndo,
  onNewBoard,
}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.queensCount}>
        Queens placed: {queensCount} / {boardSize}
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, queensCount === 0 && styles.buttonDisabled]}
          onPress={onClear}
          disabled={queensCount === 0}
          activeOpacity={0.7}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, queensCount === 0 && styles.buttonDisabled]}
          onPress={onUndo}
          disabled={queensCount === 0}
          activeOpacity={0.7}>
          <Text style={styles.buttonText}>Undo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={onNewBoard}
          activeOpacity={0.7}>
          <Text style={styles.buttonText}>New Board</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
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
  buttonDisabled: {
    backgroundColor: COLORS.PRIMARY + '80',
    opacity: 0.7,
  },
});

export default GameControls;
