"""Loads and exposes app configuration from the .env file."""

from pydantic_settings import BaseSettings, SettingsConfigDict


# BaseSettings automatically reads from your .env file
# In Spring Boot, this is your @ConfigurationProperties or application.properties
class Settings(BaseSettings):
  GEMINI_API_KEY: str  # Will throw an error on startup if this is missing in .env

  # New Pydantic V2 way — replaces the inner Config class
  model_config = SettingsConfigDict(env_file=".env")


# Create a single shared instance — import this `settings` object wherever you need config
# Similar to @Autowired in Spring, but simpler — just a module-level singleton
settings = Settings()