"""Entry point for the Chess Practice API."""

import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import analysis

# Configure logging — without this, logger.info() silently does nothing
# basicConfig sets up the root logger to print to terminal
# Like configuring logback.xml in Spring Boot
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    # Output example: 2024-01-01 12:00:00 - app.routers.analysis - INFO - Received file: chess.png
)

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
