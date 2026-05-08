import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from app.core.security import get_password_hash
from app.core.config import settings

async def seed_admin():
    print(f"Connecting to MongoDB at {settings.MONGO_URI}...")
    client = AsyncIOMotorClient(settings.MONGO_URI)
    db = client[settings.MONGO_DB_NAME]
    
    admin_email = "admin.gcit@rub.edu.bt"
    # Prompting for password securely or reading from env
    # For automated demonstration setup, we will use a default password if not provided in env.
    admin_password = os.getenv("INITIAL_ADMIN_PASSWORD", "GCITAdmin123!")
    
    existing_admin = await db.users.find_one({"email": admin_email})
    if existing_admin:
        print(f"Admin user {admin_email} already exists. Skipping seeding.")
        return
        
    print(f"Creating admin user: {admin_email}")
    hashed_password = get_password_hash(admin_password)
    
    admin_user = {
        "email": admin_email,
        "hashed_password": hashed_password,
        "role": "admin"
    }
    
    result = await db.users.insert_one(admin_user)
    print(f"Successfully created admin user with ID: {result.inserted_id}")
    print(f"Default admin password is: {admin_password}")
    print("Please change this password in a production environment!")

if __name__ == "__main__":
    asyncio.run(seed_admin())
