import { BoardService, PieceService } from ".";
import { Piece } from "../interface";
import { DISPLAY, KEY } from "../enums";

export class GameService {
  private pieceService: PieceService;
  private boardService: BoardService;
  private currentPiece: Piece;
  private score: number = 0;
  private lastDropTime: number = 0;
  private dropInterval: number = 1000;

  private canvasWidth: number = DISPLAY.BLOCK_SIZE * DISPLAY.BOARD_WIDTH;
  private canvasHeight: number = DISPLAY.BLOCK_SIZE * DISPLAY.BOARD_HEIGHT;

  constructor(boardService: BoardService, pieceService: PieceService) {
    this.pieceService = pieceService;
    this.boardService = boardService;
    this.currentPiece = this.pieceService.createPiece();
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
      this.lastDropTime = 0;
    }

    this.draw(context);
  }

  public draw(context: CanvasRenderingContext2D): void {
    const board = this.boardService.getBoard();

    context.fillStyle = "#000";
    context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

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
        if (value === 0) {
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
    switch (event.key) {
      case KEY.LEFT:
        console.log("left");
        break;
      case KEY.RIGHT:
        console.log("rigth");
        break;
      case KEY.DOWN:
        console.log("down");
        break;
      case KEY.UP:
        console.log("up");
        break;
    }
  }
}
