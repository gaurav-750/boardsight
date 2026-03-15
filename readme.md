# Boardsight — Feature Roadmap

## ✅ Phase 1 — Foundation (Completed)
> The core app is live.

- [x] Interactive chessboard with drag and drop (free movement, no rules enforced)
- [x] Image upload → Gemini Vision → FEN loads on board
- [x] Reset board (starting position)
- [x] Clear board (empty board)
- [x] FEN display with copy button
- [x] Dark theme UI

---

## Phase 2 — Complete the Core Tool
> Goal: Make Boardsight a better board editor than logiqboard

- [ ] Piece tray — drag white/black pieces from a sidebar onto the board
- [ ] Flip board — study positions from both sides
- [ ] Load FEN manually — paste a FEN string to instantly load a position
- [ ] Move history + forward/backward navigation — step through moves with arrow keys

## Phase 3 — Make it Powerful
> Goal: A serious chess study tool

- [ ] Stockfish integration — best move arrows + position evaluation (runs in browser, no API needed)
- [ ] PGN import — paste a full game, step through every move
- [ ] Save positions to localStorage — save/load positions without a login

## Phase 4 — Make it a Product
> Goal: Something worth sharing and using daily

- [ ] Google login + cloud save — positions saved to a database, accessible from any device
- [ ] 🤖 "Explain this position" — send current board to Gemini, get a coach-style breakdown in a side panel
- [ ] 🤖 Puzzle mode — upload a diagram, AI detects the position + best move, user tries to find the solution

## Phase 5 — Make it Exceptional
> Goal: Polish and differentiation

- [ ] Opening explorer — auto-detect and display opening name as moves are played
- [ ] Share position via URL — encode FEN in the URL, share with anyone
- [ ] Mobile responsive polish

---

## AI Features Summary

| Feature | AI Used | How |
|---|---|---|
| Image upload → position | ✅ Gemini Vision | Image → FEN (already built) |
| Explain this position | ✅ Gemini | FEN → verbal analysis |
| Puzzle mode | ✅ Gemini | Image → position + solution reasoning |
| Cloud save | ⚙️ No AI | Auth + database |
| Stockfish | ⚙️ No AI | Chess engine (WebAssembly) |
| Everything else | ⚙️ No AI | Pure frontend/backend logic |

---

*Built with React + Vite + FastAPI + Gemini*