from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient("mongodb://localhost:27017")
db = client.item_exchange_app

# Define routes
@app.route('/login', methods=['POST'])
def login():
    # Implement user login logic
    username = request.form['username']
    password = request.form['password']
    user = db.users.find_one({'username': username, 'password': password})
    if user:
        # Return authentication token or set session cookie
        return jsonify({'message': 'Login successful'})
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/register', methods=['POST'])
def register():
    # Implement user registration logic
    username = request.form['username']
    password = request.form['password']
    db.users.insert_one({'username': username, 'password': password})
    return jsonify({'message': 'Registration successful'})

@app.route('/items', methods=['GET'])
def get_items():
    # Implement fetching items logic
    items = list(db.items.find())
    return jsonify({'items': items})

@app.route('/items/<item_id>', methods=['GET'])
def get_item(item_id):
    # Implement fetching item details logic
    item = db.items.find_one({'_id': item_id})
    if item:
        return jsonify({'item': item})
    else:
        return jsonify({'message': 'Item not found'}), 404

@app.route('/user/items', methods=['GET'])
def get_user_items():
    # Implement fetching user's items logic
    user_id = request.headers.get('User-Id')
    items = list(db.items.find({'owner': user_id}))
    return jsonify({'items': items})

@app.route('/user/items/<item_id>', methods=['PUT'])
def update_user_item(item_id):
    # Implement updating user's item logic
    user_id = request.headers.get('User-Id')
    item = db.items.find_one({'_id': item_id, 'owner': user_id})
    if item:
        # Update item details
        # ...
        return jsonify({'message': 'Item updated'})
    else:
        return jsonify({'message': 'Item not found or not owned by user'}), 404

if __name__ == '__main__':
    app.run()
