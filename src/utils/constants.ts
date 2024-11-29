export const BOARD_SIZE = 9;
export const MAX_QUEENS = 8;

export const COLORS = {
  PRIMARY: '#2C3E50',
  SECONDARY: '#34495E',
  WHITE_SQUARE: '#FFFFFF',
  DANGER: '#E74C3C',
  SUCCESS: '#2ECC71',
  REGIONS: [
    '#FF6B6B', // Red
    '#4ECDC4', // Turquoise
    '#45B7D1', // Blue
    '#96CEB4', // Green
    '#FFEEAD', // Yellow
    '#D4A5A5', // Pink
    '#9B59B6', // Purple
    '#3498DB', // Light Blue
    '#E67E22', // Orange
  ],
};

export const REGION_COLORS = {
  1: '#FFB3BA', // Light pink
  2: '#BAFFC9', // Light green
  3: '#BAE1FF', // Light blue
  4: '#FFFFBA', // Light yellow
  5: '#FFD9BA', // Light orange
  6: '#E8BAFF', // Light purple
  7: '#B3FFE0', // Mint
  8: '#FFB3E6', // Rose
  9: '#D1BAF5', // Lavender
};

// Predefined region patterns for different difficulty levels
export const REGION_PATTERNS = {
  easy: [
    // 3x3 blocks pattern
    [1, 1, 1, 2, 2, 2, 3, 3, 3],
    [1, 1, 1, 2, 2, 2, 3, 3, 3],
    [1, 1, 1, 2, 2, 2, 3, 3, 3],
    [4, 4, 4, 5, 5, 5, 6, 6, 6],
    [4, 4, 4, 5, 5, 5, 6, 6, 6],
    [4, 4, 4, 5, 5, 5, 6, 6, 6],
    [7, 7, 7, 8, 8, 8, 9, 9, 9],
    [7, 7, 7, 8, 8, 8, 9, 9, 9],
    [7, 7, 7, 8, 8, 8, 9, 9, 9],
  ],
  medium: [
    // Irregular but simple regions pattern
    // To be implemented
  ],
  hard: [
    // Complex irregular regions pattern
    // To be implemented
  ],
};
