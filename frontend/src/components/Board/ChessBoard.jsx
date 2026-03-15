/**
 * ChessBoard component — renders the visual chess board.
 * This is a pure display component — it receives everything via props
 * from App.jsx and delegates all logic to useChessBoard hook.
 * Like a @RestController that just renders, no business logic here.
 */


import { Chessboard } from "react-chessboard";
import "./ChessBoard.css";

export default function ChessBoard({ position, onPieceDrop, isLoading }) {
  return (
    // Position relative so the overlay can be positioned on top of the board
    <div className="board-wrapper">
      <Chessboard
        id="boardsight-board"
        boardWidth={560}
        position={position}
        onPieceDrop={onPieceDrop}
        boardOrientation="white"
        customDarkSquareStyle={{ backgroundColor: "#b58863" }}
        customLightSquareStyle={{ backgroundColor: "#f0d9b5" }}
        arePiecesDraggable={!isLoading}   // disable dragging while analyzing
      />

      {/* Overlay — only rendered while loading */}
      {isLoading && (
        <div className="board-overlay">
          <div className="board-overlay-spinner" />
        </div>
      )}
    </div>
  );
}
