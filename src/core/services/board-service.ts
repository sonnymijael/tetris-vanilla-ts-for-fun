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

  public getBoard(): Board {
    return this.board;
  }

  public solidifyPiece(piece: Piece): void {
    piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value === 1) {
          this.board.grid[y + piece.position.y][x + piece.position.x] + 1;
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

  //public checkCollision(piece: Piece): boolean {
  //  return piece.shape.some((row, y) => {
  //    row.some(
  //      (value, x) =>
  //        value !== 0 &&
  //        (this.board.grid[y + piece.position.y] &&
  //          this.board.grid[y + piece.position.y][x + piece.position.x]) !== 0,
  //    );
  //  });
  //}

  public clearRows(): number {
    let clearedRows = 0;

    for (let y = 0; y < this.board.height; y++) {
      if (this.board.grid[y].every((value) => value === 1)) {
        this.board.grid.splice(y, 1);
        this.board.grid.unshift(new Array(this.board.width).fill(0));
        clearedRows++;
      }
    }

    return clearedRows;
  }
}
