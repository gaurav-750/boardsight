"""Entry point for the Chess Practice API."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import analysis

# Create the FastAPI app instance — think of this as your @SpringBootApplication class
app = FastAPI(title="Chess Practice API")

# Add CORS middleware — allows any frontend origin to call this API
# In Spring Boot you'd use CorsConfigurationSource or @CrossOrigin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    # Allow all origins for now (lock this down in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow GET, POST, etc.
    allow_headers=["*"],
)

# Register the analysis router — equivalent to @RestController being picked up by component scan
# All routes inside analysis.py will be prefixed with /api/v1
app.include_router(analysis.router, prefix="/api/v1")
