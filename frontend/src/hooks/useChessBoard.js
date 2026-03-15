/**
 * Custom hook that manages all chess board state.
 * Think of this like a @Service in Spring — all board logic lives here,
 * components just consume what this hook exposes.
 */

import {useState} from "react";
import {Chess} from "chess.js";

// Starting position FEN — the standard chess starting layout
const STARTING_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

// Empty board FEN — no pieces, just an empty 8x8 board
const EMPTY_FEN = "8/8/8/8/8/8/8/8 w - - 0 1";

export default function useChessBoard() {
  // chess.js instance — manages the board state under the hood
  // We use useState so React re-renders when we update it

  const [game, setGame] = useState(new Chess());

  // --- Piece Drop Handler ---
  // Called by react-chessboard when user drags a piece from one square to another
  // sourceSquare and targetSquare are strings like "e2", "e4"

  function onPieceDrop(sourceSquare, targetSquare) {
    // We use a functional update (prev => ...) to safely update state
    // based on the previous value — like using a prev state in React

    const updatedGame = new Chess(game.fen());

    // Get the piece sitting on the source square
    const piece = updatedGame.get(sourceSquare);

    // If there's no piece there, do nothing
    if (!piece) {
      return false;
    }

    // Remove piece from source square
    updatedGame.remove(sourceSquare);

    // Place piece on target square — no rules enforced, free editor!
    updatedGame.put(piece, targetSquare);

    // Update state — triggers re-render with new position
    setGame(updatedGame);
    return true;
  }

  // --- Load FEN ---
  // Loads a given FEN string onto the board
  // Called when AI returns a FEN from an uploaded image

  function loadFen(fen) {
    try {
      const newGame = new Chess(fen);
      setGame(newGame);
    } catch (error) {
      console.error("Invalid FEN string:", error);
    }
  }

  // --- Reset Board ---
  // Resets to the standard chess starting position
  function resetBoard() {
    setGame(new Chess(STARTING_FEN));
  }

  // --- Clear Board ---
  // Removes all pieces — useful for manually setting up a position
  function clearBoard() {
    setGame(new Chess(EMPTY_FEN));
  }

  // Expose state and handlers to components
  // Components never touch the chess.js instance directly — only these
  return {
    position: game.fen(),  
    fen: game.fen(),          // Current FEN string — shown in FenDisplay
    onPieceDrop,
    loadFen,
    resetBoard,
    clearBoard,
  };
}