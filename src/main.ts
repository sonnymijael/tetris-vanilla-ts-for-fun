import "./style.css";
import { BoardService, PieceService, GameService } from "./core/services";
import { DISPLAY } from "./core/enums";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement;
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;

  const boardService = new BoardService(
    DISPLAY.BOARD_WIDTH,
    DISPLAY.BOARD_HEIGHT,
  );
  const pieceService = new PieceService();
  const gameService = new GameService(boardService, pieceService);

  gameService.configureCanvas(canvas);

  document.addEventListener("keydown", (event) => {
    gameService.handleKeyPress(event);
  });

  let lastTime = 0;

  function gameLoop(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    gameService.update(deltaTime, context);
    gameService.draw(context);

    requestAnimationFrame(gameLoop);
  }

  gameLoop();
});
