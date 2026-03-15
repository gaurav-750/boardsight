/**
 * ChessBoard component — renders the visual chess board.
 * This is a pure display component — it receives everything via props
 * from App.jsx and delegates all logic to useChessBoard hook.
 * Like a @RestController that just renders, no business logic here.
 */


import { Chessboard } from "react-chessboard";

export default function ChessBoard({position, onPieceDrop}) {

  return (
    <div className="board-wrapper">
      <Chessboard
        id="boardsight-board"
        boardWidth={560}
        position={position}
        onPieceDrop={onPieceDrop}
        boardOrientation="white"

        // Custom square colors — warm subtle tones like lichess/chess.com
        customDarkSquareStyle={{ backgroundColor: "#b58863" }}
        customLightSquareStyle={{ backgroundColor: "#f0d9b5" }}

        // Allow all piece dragging — no rules enforced (free editor)
        arePiecesDraggable={true}
      />
    </div>
  );
}
