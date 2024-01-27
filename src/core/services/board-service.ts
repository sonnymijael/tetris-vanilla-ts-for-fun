import { DISPLAY } from "../enums";
import { Board, Piece } from "../interface";

export class BoardService {
  private board: Board;

  constructor(width: number, height: number) {
    this.board = {
      width,
      height,
      grid: this.createBoard(width, height),
    };
  }

  private createBoard(width: number, height: number): number[][] {
    return Array.from({ length: height }, () => new Array(width).fill(0));
  }

  public gameOver(): boolean {
    const isGameOver = this.board.grid[0].some((value) => value === 1);

    if (isGameOver) {
      alert("Game Over !!!");
      this.board.grid = this.createBoard(this.board.width, this.board.height);
    }

    return isGameOver;
  }

  public getBoard(): Board {
    return this.board;
  }

  public solidifyPiece(piece: Piece): void {
    piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value == 1) {
          this.board.grid[y + piece.position.y][x + piece.position.x] = 1;
        }
      });
    });
  }

  public checkCollision(piece: Piece) {
    return piece.shape.find((row, y) => {
      return row.find((value, x) => {
        return (
          value !== 0 &&
          this.board.grid[y + piece.position.y]?.[x + piece.position.x] !== 0
        );
      });
    });
  }

  public removeRows(): number {
    const rowsToRemove: number[] = [];
    this.board.grid.forEach((row, y) => {
      if (row.every((value) => value === 1)) {
        rowsToRemove.push(y);
      }
    });

    rowsToRemove.forEach((y) => {
      this.board.grid.splice(y, 1);
      this.board.grid.unshift(Array(DISPLAY.BOARD_WIDTH).fill(0));
    });

    if (rowsToRemove.length > 0) return 10 * rowsToRemove.length;
    return 0;
  }
}
