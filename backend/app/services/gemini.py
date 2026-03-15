"""Handles all communication with the Google Gemini AI API for chess image analysis."""

# This will be like a @Service class in Spring Boot
# All Gemini API logic lives here, keeping it separate from the route handlers


import google.generativeai as genai

# Import our config to get the API key — like @Value("${gemini.api.key}") in Spring
from app.config import settings

# Import our FEN validator to verify Gemini's response
from app.utils.fen_validator import is_valid_fen

# Configure the Gemini SDK with our API key — this is a one-time global setup
genai.configure(api_key=settings.GEMINI_API_KEY)


async def analyze_chess_image(image_bytes: bytes, mime_type: str) -> str:
  # Initialize the Gemini model — we use Flash because it's fast and free tier
  model = genai.GenerativeModel("gemini-1.5-flash")

  # Build the image payload — Gemini accepts raw bytes with a mime type
  image_part = {
    "mime_type": mime_type,  # e.g. "image/png" or "image/jpeg"
    "data": image_bytes  # raw bytes of the uploaded image
  }

  # The exact prompt — we tell Gemini to return ONLY the FEN, nothing else
  # Being very explicit here because AI models like to add extra explanation
  prompt = (
    "You are a chess position analyzer. Analyze this chess diagram "
    "and return ONLY the FEN string representing the position. "
    "Return nothing else — no explanation, no markdown, no punctuation. "
    "Just the raw FEN string."
  )

  # Send the image + prompt to Gemini and get the response
  # generate_content() accepts a list of parts — text and/or images
  response = model.generate_content([image_part, prompt])

  # Strip any accidental whitespace or newlines from the response
  fen = response.text.strip()

  # Validate the returned FEN — if model hallucinated something invalid, raise an error
  # The router will catch this ValueError and return a 400 to the client
  if not is_valid_fen(fen):
    raise ValueError(f"Gemini returned an invalid FEN: {fen}")

  return fen
