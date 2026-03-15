"""Defines API routes for chess position analysis — empty shell for now."""

from fastapi import APIRouter

# APIRouter is like a @RestController in Spring — groups related endpoints together
router = APIRouter()


@router.get("/health")
def health_check():
  # Simple health check endpoint — useful for deployment platforms like Render
  # to verify your service is alive and responding
  # Equivalent to a @GetMapping("/health") in Spring Boot
  return {"status": "Good Going..", "service": "boardsight"}
