/**
 * App.jsx — root component, wires everything together.
 * Will grow each milestone as we add Toolbar, FenDisplay etc.
 */

import "./styles/globals.css";
import ChessBoard from "./components/Board/ChessBoard";
import Toolbar from "./components/Toolbar/Toolbar";
import useChessBoard from "./hooks/useChessBoard";


export default function App() {

  // Get board state and handlers from our hook
  const { position, fen, onPieceDrop, resetBoard, clearBoard } = useChessBoard();

  // Placeholder upload handler — will call the real API in F5
  function handleUpload(file) {
    console.log("File selected:", file.name);
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
        isLoading={false}         /* will be wired to real state in F5 */
      />
    </div>
  );
}