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
import { analyzeImage } from "./services/api";


export default function App() {

  // Get board state and handlers from our hook
  const { position, fen, onPieceDrop, loadFen, resetBoard, clearBoard } = useChessBoard();

  // isLoading — true while waiting for Gemini to respond
  // Passed to Toolbar to disable the upload button + show spinner
  const [isLoading, setIsLoading] = useState(false);
  
   // Error toast state — null means no toast shown
   const [errorMessage, setErrorMessage] = useState(null);

  // Placeholder upload handler — will call the real API in F5
  async function handleUpload(file) {
    console.log("File selected:", file.name);

    setIsLoading(true);
    setErrorMessage(null);  // clear any previous error

    try {
      // Call the API service — sends image to backend, gets FEN back
      const fen = await analyzeImage(file);

      // Load the returned FEN onto the board
      loadFen(fen);

    } catch (error) {
      // Show the error message in the toast
      setErrorMessage(error.message);

    } finally {
      // Always stop loading — whether success or failure
      // Like a finally block in Java — always runs
      setIsLoading(false);
    }
  }

  return (
    <div className="app">
      <h1 className="app-title">BoardSight</h1>

      {/* Main content area — board with room for future sidebars */}
      <div className="app-content">
        <div className="app-sidebar" />     {/* left sidebar placeholder */}

        <div className="app-center">
          <ChessBoard
            position={position}
            onPieceDrop={onPieceDrop}
          />

          <Toolbar
            onUpload={handleUpload}
            onReset={resetBoard}
            onClear={clearBoard}
            isLoading={isLoading}
          />

          <FenDisplay fen={fen} />
        </div>

        <div className="app-sidebar" />     {/* right sidebar placeholder */}
      </div>

      {/* Error toast — only rendered when there's an error */}
      {errorMessage && (
        <ErrorToast
          message={errorMessage}
          onDismiss={() => setErrorMessage(null)}
        />
      )}
    </div>
  );
}