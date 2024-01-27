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

  public update(
    deltaTime: number,
    context: CanvasRenderingContext2D,
    $score: HTMLSpanElement,
  ): void {
    this.lastDropTime += deltaTime;
    if (this.lastDropTime > this.dropInterval) {
      this.currentPiece.position.y++;
      if (this.boardService.checkCollision(this.currentPiece)) {
        this.currentPiece.position.y--;
        this.boardService.solidifyPiece(this.currentPiece);
        this.currentPiece = this.pieceService.createPiece();
        this.score = this.score += this.boardService.removeRows();
        if (this.boardService.gameOver()) this.score = 0;
      }
      this.lastDropTime = 0;
    }

    this.draw(context, $score);
  }

  public draw(
    context: CanvasRenderingContext2D,
    $score: HTMLSpanElement,
  ): void {
    context.fillStyle = "#20202380";
    context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    const cubeColor = "#008085"; // Color teal para los cubos
    const borderColor = "#02020280"; // Color del borde
    const borderWidth = 0.1;

    const board = this.boardService.getBoard();
    board.grid.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          context.fillStyle = cubeColor;
          context.fillRect(x, y, 1, 1);

          context.strokeStyle = borderColor;
          context.lineWidth = borderWidth;
          context.strokeRect(x, y, 1, 1);
        }
      });
    });

    this.currentPiece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          context.fillStyle = cubeColor;
          context.fillRect(
            x + this.currentPiece.position.x,
            y + this.currentPiece.position.y,
            1,
            1,
          );
        }
      });
    });
    $score.innerText = this.score.toString();
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
        let previousPiece = this.currentPiece;
        this.currentPiece = this.pieceService.rotate(this.currentPiece);
        if (this.boardService.checkCollision(this.currentPiece)) {
          this.currentPiece = previousPiece;
        }
        moved = true;
        break;
    }

    if (moved && this.boardService.checkCollision(this.currentPiece)) {
      this.currentPiece.position = originalPosition;
    }
  }
}
