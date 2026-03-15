"""Pydantic request/response models — like Java DTOs with built-in validation."""

# Pydantic models are like your Java DTOs / POJOs with validation built in
# Similar to records with @Valid annotations in Spring Boot


from pydantic import BaseModel


class AnalyzeImageResponse(BaseModel):
  # Returned when image analysis succeeds
  # e.g. {"fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"}
  fen: str


class ErrorResponse(BaseModel):
  # Returned when something goes wrong
  # e.g. {"detail": "Invalid file type. Please upload an image."}
  detail: str