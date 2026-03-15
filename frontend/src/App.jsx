/**
 * App.jsx — root component, wires everything together.
 * Will grow each milestone as we add Toolbar, FenDisplay etc.
 */

import "./styles/globals.css";
import ChessBoard from "./components/Board/ChessBoard";
import useChessBoard from "./hooks/useChessBoard";


export default function App() {

   // Get board state and handlers from our hook
   const { position, fen, onPieceDrop, resetBoard, clearBoard } = useChessBoard();

   return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      paddingTop: "40px" 
    }}>
      <h1 style={{ color: "var(--text-primary)", marginBottom: "24px" }}>
        Chess Practice
      </h1>

      <ChessBoard
        position={position}
        onPieceDrop={onPieceDrop}
      />
    </div>
  );
}