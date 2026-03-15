/**
 * FenDisplay component — shows the current board position as a FEN string.
 * Lets the user copy it to clipboard with one click.
 */

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import "./FenDisplay.css";


export default function FenDisplay({fen}) {
  // Track whether we just copied — to show a brief checkmark confirmation
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(fen);

    // Show checkmark for 2 seconds then revert back to Copy icon
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="fen-display">
      <label className="fen-label">Current Position (FEN)</label>

      <div className="fen-row">
        {/* Read-only input showing the FEN string */}
        <input
          className="fen-input"
          type="text"
          value={fen}
          readOnly
        />

        {/* Copy to clipboard button */}
        <button
          className="fen-copy-btn"
          onClick={handleCopy}
          title="Copy FEN to clipboard"
        >
          {/* Show checkmark briefly after copying, then revert */}
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
    </div>
  );
}
