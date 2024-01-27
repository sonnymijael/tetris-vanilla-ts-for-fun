import { BoardService, PieceService } from ".";
import { Piece } from "../interface";
import { DISPLAY, KEY } from "../enums";

export class GameService {
  private pieceService: PieceService;
  private boardService: BoardService;
  private currentPiece: Piece;
  private score: number = 0;
  private lastDropTime: number = 0;
  private dropInterval: number = 10000;

  private canvasWidth: number = DISPLAY.BLOCK_SIZE * DISPLAY.BOARD_WIDTH;
  private canvasHeight: number = DISPLAY.BLOCK_SIZE * DISPLAY.BOARD_HEIGHT;

  constructor(boardService: BoardService, pieceService: PieceService) {
    this.pieceService = pieceService;
    this.boardService = boardService;
    this.currentPiece = this.pieceService.createPiece();

    console.table(this.currentPiece);
  }

  public configureCanvas(canvas: HTMLCanvasElement): void {
    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;

    const context = canvas.getContext("2d");
    if (context) context.scale(DISPLAY.BLOCK_SIZE, DISPLAY.BLOCK_SIZE);
  }

  public update(deltaTime: number, context: CanvasRenderingContext2D): void {
    this.lastDropTime += deltaTime;
    if (this.lastDropTime > this.dropInterval) {
      this.currentPiece.position.y++;
      if (this.boardService.checkCollision(this.currentPiece)) {
        this.currentPiece.position.y--;
        this.boardService.solidifyPiece(this.currentPiece);
        this.currentPiece = this.pieceService.createPiece();
      }
      this.lastDropTime = 0;
    }

    this.draw(context);
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.fillStyle = "#000";
    context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    const board = this.boardService.getBoard();
    board.grid.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          context.fillStyle = "white";
          context.fillRect(x, y, 1, 1);
        }
      });
    });

    this.currentPiece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          context.fillStyle = "purple";
          context.fillRect(
            x + this.currentPiece.position.x,
            y + this.currentPiece.position.y,
            1,
            1,
          );
        }
      });
    });
  }

  public handleKeyPress(event: KeyboardEvent): void {
    const originalPosition = { ...this.currentPiece.position };
    let moved = false;
    switch (event.key) {
      case KEY.LEFT:
        this.currentPiece.position.x--;
        moved = true;
        break;
      case KEY.RIGHT:
        this.currentPiece.position.x++;
        moved = true;
        break;
      case KEY.DOWN:
        this.currentPiece.position.y++;
        moved = true;
        break;
      case KEY.UP:
        this.currentPiece = this.pieceService.rotate(this.currentPiece);
        moved = true;
        break;
    }

    if (moved && this.boardService.checkCollision(this.currentPiece)) {
      this.currentPiece.position = originalPosition;
    }
  }
}
