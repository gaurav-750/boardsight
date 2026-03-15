"""Utility functions for validating FEN strings — empty shell for now."""

# FEN (Forsyth–Edwards Notation) is the standard text format for chess positions
# e.g. "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" = starting position


def is_valid_fen(fen: str) -> bool:
  # A FEN string looks like this :
  # "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  # The first part (before the space) describes the board — 8 ranks separated by "/"
  # e.g. "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
  # Guard against empty or non-string input
  if not fen or not isinstance(fen, str):
    return False

  # FEN has multiple parts separated by spaces
  # e.g. ["rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR", "w", "KQkq", "-", "0", "1"]
  parts = fen.strip().split(" ")

  # Must have at least the board part
  if len(parts) < 1:
    return False

  # The board part is the first segment — split by "/" to get individual ranks
  ranks = parts[0].split("/")

  # a valid chess board always has 8 ranks
  if len(ranks) != 8:
    return False

  return True
