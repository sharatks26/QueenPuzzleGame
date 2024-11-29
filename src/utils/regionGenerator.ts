import {BoardSize, Region, Cell} from '../types/game';

interface RegionGeneratorConfig {
  minRegionSize: number;
  maxRegionSize: number;
  complexity: 'easy' | 'medium' | 'hard' | 'expert';
}

export class RegionGenerator {
  private board: number[][];
  private regions: Region[];
  private currentRegionId: number;
  private config: RegionGeneratorConfig;

  constructor(boardSize: BoardSize, config: RegionGeneratorConfig) {
    this.board = Array(boardSize)
      .fill(0)
      .map(() => Array(boardSize).fill(-1));
    this.regions = [];
    this.currentRegionId = 0;
    this.config = config;
  }

  private getRandomStartPosition(): {row: number; col: number} {
    const emptyPositions: {row: number; col: number}[] = [];
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board.length; j++) {
        if (this.board[i][j] === -1) {
          emptyPositions.push({row: i, col: j});
        }
      }
    }
    if (emptyPositions.length === 0) {
      // Reset board if no empty positions found
      this.board = Array(this.board.length)
        .fill(0)
        .map(() => Array(this.board.length).fill(-1));
      return {
        row: Math.floor(Math.random() * this.board.length),
        col: Math.floor(Math.random() * this.board.length),
      };
    }
    return emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
  }

  private growRegion(
    startRow: number,
    startCol: number,
    targetSize: number,
  ): Set<string> {
    const region = new Set<string>();
    const queue: {row: number; col: number}[] = [
      {row: startRow, col: startCol},
    ];
    const directions = this.getDirectionsForComplexity();

    while (region.size < targetSize && queue.length > 0) {
      const position = queue.shift()!;
      const posKey = `${position.row},${position.col}`;

      if (region.has(posKey)) continue;
      if (this.board[position.row][position.col] !== -1) continue;

      region.add(posKey);
      this.board[position.row][position.col] = this.currentRegionId;

      // Get and shuffle adjacent cells
      const adjacentCells = this.shuffleArray(
        this.getValidAdjacentCells(position.row, position.col, directions),
      );
      queue.push(...adjacentCells);
    }

    return region;
  }

  generateRegions(): {regions: Region[]; board: number[][]} {
    // Reset state
    this.regions = [];
    this.currentRegionId = 0;
    this.board = Array(this.board.length)
      .fill(0)
      .map(() => Array(this.board.length).fill(-1));

    const totalSquares = this.board.length * this.board.length;
    const numRegions = this.board.length;
    const baseRegionSize = Math.floor(totalSquares / numRegions);

    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries) {
      try {
        while (this.regions.length < numRegions) {
          const startPos = this.getRandomStartPosition();
          const targetSize = this.calculateRegionSize(baseRegionSize);

          const regionCells = this.growRegion(
            startPos.row,
            startPos.col,
            targetSize,
          );

          if (regionCells.size >= this.config.minRegionSize) {
            this.regions.push({
              id: this.currentRegionId,
              cells: Array.from(regionCells).map(pos => {
                const [row, col] = pos.split(',').map(Number);
                return {row, col};
              }),
            });
            this.currentRegionId++;
          }

          // Check if we're stuck
          if (this.isStuck()) {
            throw new Error('Generation stuck');
          }
        }

        // If we successfully generated all regions, return them
        return {
          regions: this.regions,
          board: this.board,
        };
      } catch (error) {
        console.log('Retrying region generation...');
        // Reset state for retry
        this.regions = [];
        this.currentRegionId = 0;
        this.board = Array(this.board.length)
          .fill(0)
          .map(() => Array(this.board.length).fill(-1));
        retryCount++;
      }
    }

    // If all retries failed, return simple grid pattern
    console.warn('All retries failed, using simple grid pattern');
    return this.generateSimpleGridPattern();
  }

  private isStuck(): boolean {
    // Check if there are any empty cells left
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board.length; j++) {
        if (this.board[i][j] === -1) {
          return false;
        }
      }
    }
    return true;
  }

  private getDirectionsForComplexity(): {dx: number; dy: number}[] {
    const basicDirections = [
      {dx: -1, dy: 0}, // Up
      {dx: 1, dy: 0}, // Down
      {dx: 0, dy: -1}, // Left
      {dx: 0, dy: 1}, // Right
    ];

    const diagonalDirections = [
      {dx: -1, dy: -1}, // Up-Left
      {dx: -1, dy: 1}, // Up-Right
      {dx: 1, dy: -1}, // Down-Left
      {dx: 1, dy: 1}, // Down-Right
    ];

    switch (this.config.complexity) {
      case 'easy':
        return basicDirections;
      case 'medium':
        return [
          ...basicDirections,
          diagonalDirections[0],
          diagonalDirections[1],
        ];
      case 'hard':
      case 'expert':
        return [...basicDirections, ...diagonalDirections];
    }
  }

  private getValidAdjacentCells(
    row: number,
    col: number,
    directions: {dx: number; dy: number}[],
  ): {row: number; col: number}[] {
    return directions
      .map(({dx, dy}) => ({
        row: row + dx,
        col: col + dy,
      }))
      .filter(
        ({row, col}) =>
          row >= 0 &&
          row < this.board.length &&
          col >= 0 &&
          col < this.board.length &&
          this.board[row][col] === -1,
      );
  }

  private shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = temp;
    }
    return newArray;
  }

  private calculateRegionSize(baseSize: number): number {
    const variance = this.config.complexity === 'expert' ? 2 : 1;
    const min = Math.max(this.config.minRegionSize, baseSize - variance);
    const max = Math.min(this.config.maxRegionSize, baseSize + variance);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private generateSimpleGridPattern(): {regions: Region[]; board: number[][]} {
    const size = this.board.length;
    const regionSize = 3; // For 9x9 board, create 3x3 regions

    this.regions = [];
    this.board = Array(size)
      .fill(0)
      .map(() => Array(size).fill(-1));

    for (let regionRow = 0; regionRow < size / regionSize; regionRow++) {
      for (let regionCol = 0; regionCol < size / regionSize; regionCol++) {
        const regionId = regionRow * (size / regionSize) + regionCol;
        const cells: Cell[] = [];

        for (let i = 0; i < regionSize; i++) {
          for (let j = 0; j < regionSize; j++) {
            const row = regionRow * regionSize + i;
            const col = regionCol * regionSize + j;
            cells.push({row, col});
            this.board[row][col] = regionId;
          }
        }

        this.regions.push({
          id: regionId,
          cells,
        });
      }
    }

    return {
      regions: this.regions,
      board: this.board,
    };
  }
}
