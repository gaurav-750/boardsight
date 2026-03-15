/**
 * ErrorToast component — shows a dismissible error notification.
 * Appears top-right, auto-dismisses after 4 seconds.
 * Shown when the API call to the backend fails.
 */

import { useEffect } from "react";
import { X } from "lucide-react";
import "./ErrorToast.css";


export default function ErrorToast({message, onDismiss}) {

// Auto-dismiss after 4 seconds
  // useEffect with a cleanup — like a scheduled task that cancels itself
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 4000);

    // Cleanup — if component unmounts before 4s, cancel the timer
    // Like cancelling a ScheduledFuture in Spring
    return () => clearTimeout(timer);
  }, [message]); // re-run if a new message comes in

  return (
    <div className="error-toast">
      <span className="error-toast-message">{message}</span>

      {/* Manual dismiss button */}
      <button className="error-toast-close" onClick={onDismiss}>
        <X size={14} />
      </button>
    </div>
  );
}