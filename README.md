# Queen Puzzle Game

A React Native implementation of the classic N-Queens puzzle game, where players need to place queens on a chessboard such that no two queens threaten each other.

## Features

- Interactive chessboard interface
- Queen placement validation
- Multiple difficulty levels (different board sizes)
- Move tracking and validation
- Clean and intuitive UI
- Redux state management

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (v14 or higher)
- npm or Yarn
- React Native development environment set up
- For iOS: Xcode (Mac only)
- For Android: Android Studio and Android SDK

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/queen-puzzle-game.git
cd queen-puzzle-game
```

2. Install dependencies:
```bash
# using npm
npm install

# OR using Yarn
yarn install
```

3. For iOS, install pods:
```bash
cd ios
pod install
cd ..
```

## Running the Game

### Start Metro Server

First, start the Metro bundler:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

### Run on Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### Run on iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

## Project Structure

```
src/
├── components/       # React components
│   └── Chessboard.tsx
├── redux/           # Redux state management
│   ├── slices/
│   │   └── gameSlice.ts
│   └── store.ts
├── types/           # TypeScript type definitions
│   └── game.ts
└── utils/           # Utility functions
    ├── constants.ts
    └── validation.ts
```

## Game Rules

1. The objective is to place N queens on an NxN chessboard.
2. No two queens should be able to attack each other.
3. Queens can move horizontally, vertically, and diagonally.
4. Complete the puzzle by placing all queens safely on the board.

## Development

### Available Scripts

- `npm start` or `yarn start`: Start the Metro bundler
- `npm run ios` or `yarn ios`: Run the iOS app
- `npm run android` or `yarn android`: Run the Android app
- `npm run test` or `yarn test`: Run tests
- `npm run lint` or `yarn lint`: Run linter

## Troubleshooting

If you encounter any issues:

1. Make sure all dependencies are installed correctly
2. Clean and rebuild the project:

```bash
# For iOS
cd ios
pod deintegrate
pod install
cd ..

# For Android
cd android
./gradlew clean
cd ..
```

3. Reset Metro bundler cache:
```bash
npm start -- --reset-cache
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Sharat
Project Link: [https://github.com/sharatks26/QueenPuzzleGame](https://github.com/sharatks26/QueenPuzzleGame)
