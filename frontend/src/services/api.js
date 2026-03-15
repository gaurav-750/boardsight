/**
 * API service — all backend communication lives here.
 * Components never call fetch() directly — always go through this file.
 * Like a @FeignClient or RestTemplate wrapper in Spring Boot.
 */

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

/**
 * Sends a chess diagram image to the backend and returns a FEN string.
 * @param {File} file - The image file selected by the user
 * @returns {Promise<string>} - The FEN string from Gemini
 * @throws {Error} - With the backend's error message if request fails
 */
export async function analyzeImage(file) {
  // FormData is the JS equivalent of MultipartFile in Spring
  // We append the file with key "file" — must match the backend's parameter name
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE}/api/v1/analyze-image`, {
    method: "POST",
    body: formData,
    // Note: do NOT set Content-Type header manually
    // The browser sets it automatically with the correct boundary for multipart
  });

  // Parse the JSON body regardless of success/failure
  const data = await response.json();

  if (!response.ok) {
    // Backend returns { detail: "..." } for errors — surface that message
    // Like reading the error body from a ResponseStatusException in Spring
    throw new Error(data.detail ?? "Something went wrong. Please try again.");
  }

  // Success — return just the FEN string
  return data.fen;
}