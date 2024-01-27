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
    return { ...piece, position: { x: 0, y: 0 } };
  }

  public rotate(piece: Piece): Piece {
    let rotatedShape = piece.shape
      .map((_, index) => piece.shape.map((column) => column[index]))
      .reverse();

    return { ...piece, shape: rotatedShape };
  }
}
