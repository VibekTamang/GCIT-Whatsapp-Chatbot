from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "GCIT Chatbot Backend"
    API_V1_STR: str = "/api/v1"
    
    # Database
    MONGO_URI: str = "mongodb://localhost:27017"
    MONGO_DB_NAME: str = "gcit_dashboard"
    
    # Security Details
    SECRET_KEY: str = "change_this_to_a_secure_random_string_in_production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 Days
    INITIAL_ADMIN_PASSWORD: str = "GCITAdmin123!"

    class Config:
        env_file = ".env"

settings = Settings()
