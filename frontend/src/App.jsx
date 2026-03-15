/**
 * App.jsx — root component, wires everything together.
 * Will grow each milestone as we add Toolbar, FenDisplay etc.
 */

import { useState } from "react";
import "./styles/globals.css";
import ChessBoard from "./components/Board/ChessBoard";
import Toolbar from "./components/Toolbar/Toolbar";
import FenDisplay from "./components/FenDisplay/FenDisplay";
import ErrorToast from "./components/ErrorToast/ErrorToast";
import useChessBoard from "./hooks/useChessBoard";


export default function App() {

  // Get board state and handlers from our hook
  const { position, fen, onPieceDrop, resetBoard, clearBoard } = useChessBoard();

  
   // Error toast state — null means no toast shown
   const [errorMessage, setErrorMessage] = useState(null);

  // Placeholder upload handler — will call the real API in F5
  function handleUpload(file) {
    console.log("File selected:", file.name);
    // Real API call wired in F5
  }

  function dismissError() {
    setErrorMessage(null);
  }

   // Temporary — test the toast by clicking this button
  // Remove after validating
  function testToast() {
    setErrorMessage("Could not analyze image. Please try again.");
  }

  return (
    <div className="app">
      <h1 className="app-title">Chess Practice</h1>

      <ChessBoard
        position={position}
        onPieceDrop={onPieceDrop}
      />

      <Toolbar
        onUpload={handleUpload}
        onReset={resetBoard}
        onClear={clearBoard}
        isLoading={false}
      />

      <FenDisplay fen={fen} />

      {/* Only render toast when there's an error message */}
      {errorMessage && (
        <ErrorToast
          message={errorMessage}
          onDismiss={dismissError}
        />
      )}

      {/* Temporary test button — remove after validating toast */}
      <button onClick={testToast} style={{ marginTop: 16, color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer", fontSize: 12 }}>
        (test error toast)
      </button>
    </div>
  );
}