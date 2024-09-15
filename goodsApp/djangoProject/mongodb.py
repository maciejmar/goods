from pymongo import MongoClient
from datetime import datetime

# Connect to MongoDB
client = MongoClient('mongodb://kurapikasphatbum:yilmazebru2002!@localhost:27017/')
db = client['ebru_net']

# Create collections
users_collection = db['users']
items_collection = db['items']

# Define a sample user
user = {
    "username": "johndoe",
    "password": "securepassword123",
    "email": "johndoe@example.com",
    "phone": "555-1234",
    "trustsdegree": 5,
    "image": "profilepic.png",
    "created_at": datetime.utcnow()
}

# Insert user into the collection
user_id = users_collection.insert_one(user).inserted_id
print(f"Inserted User ID: {user_id}")

# Define a sample item
item = {
    "name": "Vintage Lamp",
    "description": "An old-fashioned lamp with intricate designs.",
    "category": "Home Decor",
    "price": 45.99,
    "owner": str(user_id),  # Use the user's ID here
    "image": "lamp.png",
    "createdAt": datetime.utcnow()
}

# Insert item into the collection
item_id = items_collection.insert_one(item).inserted_id
print(f"Inserted Item ID: {item_id}")
