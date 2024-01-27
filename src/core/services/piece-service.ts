import { DISPLAY } from "../enums";
import { Piece } from "../interface";

export class PieceService {
  private pieces: Piece[] = [
    {
      // Pieza O
      shape: [
        [1, 1],
        [1, 1],
      ],
      position: { x: 0, y: 0 },
    },
    {
      // Pieza I
      shape: [[1, 1, 1, 1]],
      position: { x: 0, y: 0 },
    },
    {
      // Pieza T
      shape: [
        [0, 1, 0],
        [1, 1, 1],
      ],
      position: { x: 0, y: 0 },
    },
    {
      // Pieza L
      shape: [
        [0, 0, 1],
        [1, 1, 1],
      ],
      position: { x: 0, y: 0 },
    },
    {
      // Pieza J
      shape: [
        [1, 0, 0],
        [1, 1, 1],
      ],
      position: { x: 0, y: 0 },
    },
    {
      // Pieza S
      shape: [
        [0, 1, 1],
        [1, 1, 0],
      ],
      position: { x: 0, y: 0 },
    },
    {
      // Pieza Z
      shape: [
        [1, 1, 0],
        [0, 1, 1],
      ],
      position: { x: 0, y: 0 },
    },
  ];

  public createPiece(): Piece {
    const piece = this.pieces[Math.floor(Math.random() * this.pieces.length)];
    return {
      ...piece,
      position: { x: Math.floor(DISPLAY.BOARD_WIDTH / 2 - 2), y: 0 },
    };
  }

  public rotate(piece: Piece): Piece {
    const rotatedShape: any = [];
    for (let i = 0; i < piece.shape[0].length; i++) {
      const row = [];
      for (let j = piece.shape.length - 1; j >= 0; j--) {
        row.push(piece.shape[j][i]);
      }
      rotatedShape.push(row);
    }

    return { ...piece, shape: rotatedShape };
  }
}
