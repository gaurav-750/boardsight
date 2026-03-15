/**
 * API service — centralises all backend communication.
 *
 * Every function in this module talks to VITE_API_URL and returns
 * parsed JSON (or throws on non-2xx responses).
 *
 * ┌──────────────────────────────────────────────────────────┐
 * │  Future API functions will be added here, e.g.:         │
 * │                                                          │
 * │  • analysePosition(fen)  – POST /analyse                │
 * │  • getOpeningName(fen)   – GET  /opening?fen=…          │
 * │  • healthCheck()         – GET  /health                  │
 * └──────────────────────────────────────────────────────────┘
 */

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export { API_BASE };
