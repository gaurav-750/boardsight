"""Defines API routes for chess position analysis."""

from fastapi import APIRouter, UploadFile, File, HTTPException
import logging

from app.models.schemas import AnalyzeImageResponse, ErrorResponse
from app.services.gemini import analyze_chess_image
from app.utils.fen_validator import is_valid_fen

# Set up logging — like using SLF4J/Logback in Spring Boot
# This lets us see what's happening at each step in the terminal
logger = logging.getLogger(__name__)

# APIRouter is like a @RestController in Spring — groups related endpoints together
router = APIRouter()


@router.get("/health")
def health_check():
  # Simple health check endpoint — useful for deployment platforms like Render
  # to verify your service is alive and responding
  # Equivalent to a @GetMapping("/health") in Spring Boot
  return {"status": "Good Going..", "service": "boardsight"}


@router.post("/analyze-image", response_model=AnalyzeImageResponse)
async def analyze_image(file: UploadFile = File(...)):
  # File(...) means this field is required — like @RequestParam in Spring Boot
  # UploadFile is FastAPI's equivalent of MultipartFile in Spring
  logger.info(f"Received file: {file.filename}, type: {file.content_type}")

  # --- Validation: must be an image ---
  # content_type is like the Content-Type header — e.g. "image/png", "image/jpeg"
  if not file.content_type or not file.content_type.startswith("image/"):
    logger.error(f"Invalid file type: {file.content_type}")
    # 400 Bad Request — client sent wrong file type
    raise HTTPException(
        status_code=400,
        detail="Invalid file type. Please upload an image."
    )

  try:
    # Read the raw bytes from the uploaded file
    # Like reading an InputStream in Java
    image_bytes = await file.read()
    logger.info(f"Successfully read {len(image_bytes)} bytes")

    # Call our Gemini service to analyze the image and return a FEN string
    # This is like calling another @Service from your @RestController in Spring
    fen = await analyze_chess_image(image_bytes, file.content_type)
    logger.info(f"Gemini returned FEN: {fen}")

    # 200 OK — return the FEN wrapped in our response model
    return AnalyzeImageResponse(fen=fen)

  except HTTPException:
    # Re-raise HTTP exceptions as-is — don't swallow them in the catch-all below
    raise

  except ValueError as e:
    # ValueError means Gemini responded but with something invalid
    # e.g. "I cannot analyze this image" or an invalid FEN
    # We surface the exact message so the client knows what happened
    logger.error(f"Gemini returned invalid response: {str(e)}")
    raise HTTPException(
        status_code=400,
        detail=str(e)  # pass Gemini's exact message through
    )

  except Exception as e:
    # Catch-all for unexpected errors — like Gemini being down, network issues etc.
    # Always log the full error for debugging
    logger.error(f"Unexpected error during image analysis: {str(e)}")
    # 500 Internal Server Error
    raise HTTPException(
        status_code=500,
        detail="Something went wrong while analyzing the image. Please try again."
    )
