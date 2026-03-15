/**
 * Toolbar component — Upload, Reset, and Clear actions.
 * Pure display component — all logic comes in via props from App.jsx.
 * No business logic here, just UI.
 */

import { useRef } from "react";
import { Upload, RotateCcw, Trash2, Loader2 } from "lucide-react";
import "./Toolbar.css";


export default function Toolbar({onUpload, onReset, onClear, isLoading}) {
  // Hidden file input — we programmatically click it when user clicks Upload button
  // This is the standard pattern for custom-styled file upload buttons

  const fileInputRef = useRef(null);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Pass the file up to App.jsx via the onUpload prop
    onUpload(file);

    // Reset the input so the same file can be uploaded again if needed
    e.target.value = "";
  }

  return (
    <div className="toolbar">

      {/* ── Upload Button ── */}
      <button
        className="toolbar-btn"
        onClick={() => fileInputRef.current.click()}
        disabled={isLoading}
        title="Upload a chess diagram image"
      >
        {/* Show spinner while loading, Upload icon otherwise */}
        {isLoading
          ? <Loader2 size={16} className="spinner" />
          : <Upload size={16} />
        }
        <span>{isLoading ? "Analyzing..." : "Upload Position"}</span>
      </button>

      {/* Hidden file input — only accepts images */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* ── Reset Button ── */}
      <button
        className="toolbar-btn"
        onClick={onReset}
        title="Reset to starting position"
      >
        <RotateCcw size={16} />
        <span>Reset Board</span>
      </button>

      {/* ── Clear Board Button ── */}
      <button
        className="toolbar-btn toolbar-btn--danger"
        onClick={onClear}
        title="Clear all pieces from the board"
      >
        <Trash2 size={16} />
        <span>Clear Board</span>
      </button>

    </div>
  );

}
