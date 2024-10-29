import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
mongo_user = os.getenv("MONGO_USER")
mongo_password = os.getenv("MONGO_PASSWORD")
mongo_host = os.getenv("MONGO_HOST")
mongo_db = os.getenv("MONGO_DB")
print("MONGO_HOST:", os.getenv("MONGO_HOST")) 
print("MONGO_USER",os.getenv("MONGO_USER"))
print("MONGO_PASSWORD",os.getenv("MONGO_PASSWORD"))
print("MONGO_DB",os.getenv("MONGO_DB"))
url = url = f"mongodb://{mongo_user}:{mongo_password}@{mongo_host}:27017/{mongo_db}?authSource={mongo_db}"
client = MongoClient(url)
db = client['goods-1']