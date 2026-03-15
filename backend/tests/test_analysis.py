"""Integration tests for the chess analysis API endpoints."""

from unittest.mock import patch, AsyncMock

from fastapi.testclient import TestClient

from app.main import app

# TestClient is like Spring's MockMvc — lets you make HTTP requests
# to your app without actually running a server
client = TestClient(app)


# --- Test 1: Health Check ---

def test_health_check():
  # Simplest test — just verify the service is alive
  response = client.get("/api/v1/health")

  assert response.status_code == 200
  assert response.json() ==  {"status": "Good Going..", "service": "boardsight"}


# --- Test 2: No file uploaded ---

def test_analyze_image_no_file():
  # Sending a POST with no file at all
  # FastAPI should return 422 Unprocessable Entity
  # (means required field is missing — like @Valid failing in Spring)
  response = client.post("/api/v1/analyze-image")

  assert response.status_code == 422


# --- Test 3: Non-image file ---

def test_analyze_image_invalid_file_type():
  # Sending a .txt file instead of an image
  # Our validation should catch this and return 400
  response = client.post(
      "/api/v1/analyze-image",
      files={"file": ("test.txt", b"hello world", "text/plain")}
      #              filename      bytes          mime type
  )

  assert response.status_code == 400
  assert "Invalid file type" in response.json()["detail"]


# --- Test 4: Valid image + mocked Gemini ---

def test_analyze_image_success():
  # We don't want tests making real API calls to Gemini —
  # that would be slow, cost quota, and fail without internet
  # So we MOCK the gemini service — like @MockBean in Spring Boot
  #
  # patch() replaces analyze_chess_image with a fake version
  # that immediately returns a valid FEN without calling Gemini
  valid_fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

  with patch(
      "app.routers.analysis.analyze_chess_image",
      # path to the function we're mocking
      new=AsyncMock(return_value=valid_fen)
      # AsyncMock because it's an async function
  ):
    response = client.post(
        "/api/v1/analyze-image",
        files={"file": ("chess.png", b"fake-image-bytes", "image/png")}
    )

  assert response.status_code == 200
  assert response.json()["fen"] == valid_fen


# --- Test 5: Gemini returns invalid FEN ---

def test_analyze_image_invalid_fen_from_gemini():
  # Simulates Gemini hallucinating a non-FEN response
  # Our ValueError catch in the router should return 400
  with patch(
      "app.routers.analysis.analyze_chess_image",
      new=AsyncMock(side_effect=ValueError(
          "Gemini returned an invalid FEN: sorry I cannot help"))
  ):
    response = client.post(
        "/api/v1/analyze-image",
        files={"file": ("chess.png", b"fake-image-bytes", "image/png")}
    )

  assert response.status_code == 400
  assert "invalid FEN" in response.json()["detail"]
