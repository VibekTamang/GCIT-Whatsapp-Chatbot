from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

class Database:
    client: AsyncIOMotorClient = None
    db = None

db_helper = Database()

def get_db():
    """
    Returns the database instance for dependencies
    """
    if db_helper.client is None:
        # Initialize connection
        db_helper.client = AsyncIOMotorClient(settings.MONGO_URI)
        db_helper.db = db_helper.client[settings.MONGO_DB_NAME]
    return db_helper.db
