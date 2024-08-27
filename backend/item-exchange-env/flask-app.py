from flask import Flask, request, jsonify, session, redirect, url_for
from flask_cors import CORS
from pymongo import MongoClient
import jwt
import bcrypt
from datetime import datetime, timedelta
import json
import functools
from functools import wraps
import secrets
import pdb
from flask import make_response
from bson import json_util, ObjectId
import os
from werkzeug.utils import secure_filename


app = Flask(__name__)
CORS(app)
client = MongoClient("mongodb://localhost:27017")
db = client.item_exchange_app


# Generate JWT token
def generate_token(user_id):
    payload = {
        'user_id': user_id,
        'exp': datetime.utcnow() + timedelta(hours=1)  # Token expiration time
    }
    token = jwt.encode(payload, 'secret_key', algorithm='HS256')
    print('here is generated token ', token)
    return token


# Verify JWT token
def verify_token(token):
    print('verification')

    try:
        payload = jwt.decode(token, 'secret_key', algorithms=['HS256'])
        print('payload token  ', payload)
        return payload['user_id']
    except jwt.ExpiredSignatureError:
        return jsonify({'message': "Token expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': "Invalid token"}), 401


# Hash user password
def hash_password(password):
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return hashed_password.decode('utf-8')


# Verify user password
def verify_password(password, hashed_password):
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))


# Define routes
@app.route('/login', methods=['POST'])
def login():
    # Retrieve login data from the request
    reqbody = request.data.decode('UTF-8')
    reqbody = json.loads(reqbody)
    print('register i am here', reqbody['password'])
    username = reqbody['username']
    password = reqbody['password']
    print('credentials for loggin ', username, ' ', password)
    # Retrieve the user document from the database
    user = db.users.find_one({'username': username})
    # print ('user from db ', user)
    # Check if the user exists and validate the password
    password = password.encode('utf-8')
    userPass = user['password']

    if user and bcrypt.checkpw(password, userPass):
        token = generate_token(username)

        response = make_response({'message': 'login successful'})
        response.headers['Authorization'] = f'Bearer {token}'
        return redirect(url_for('dashboard', token=token))  # jsonify(message= 'Login successful')

    else:
        return jsonify({'message': 'Invalid credentials are here'}), 401


# Authentication middleware
def authenticate(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        token = request.headers.get('Authorization')
        if token:
            try:
                user_id = verify_token(token)
                request.user_id = user_id
                return func(*args, **kwargs)
            except (jwt.ExpiredSignatureError, jwt.InvalidTokenError) as e:
                return jsonify({'message': str(e)}), 401
        return jsonify({'message': 'Authentication required'}), 401

    return wrapper


# Protected route
@app.route('/protected', methods=['GET'])
@authenticate
def protected_route():
    user_id = request.user_id
    # Handle protected route logic
    return jsonify({'message': f'Protected route for user {user_id}'})


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == "POST":
        # Retrieve registration data from the request
        print('register here get ', request.data.decode('UTF-8'))
        aspo = request.data.decode('UTF-8')
        aspo = json.loads(aspo)
        print('register i am here', aspo['password'])
        # print('request in register - ', request.form['username'],request.form['password'])
        username = aspo['username']
        password = aspo['password']

        # Check if the username is already taken
        if db.users.find_one({'username': username}):
            return jsonify({'message': 'Username already exists'}), 400

        # Hash the password
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        # Create a new user document in the database
        user = {
            'username': username,
            'password': hashed_password
        }
        db.users.insert_one(user)

        print('registration successful ', username)
        return jsonify({'message': 'Registration successful'})
    print('Registration incorrect')
    return jsonify(message="this isnt post request or request is incorrect"), 403


@app.route('/dashboard', methods=['GET'])
def dashboard():
    # Get the token from the request headers

    if request.args.get('token') or request.args['token']:
        if request.args.get('token'):
            token = request.args.get('token')
        else:
            token = request.args['token']
        # Verify the JWT token

        username = verify_token(token)

        if username:
            # Retrieve the user's items from the database
            user_items = db.items.find({'owner': username})
            # Retrieve a few items of other users for display on the dashboard
            other_users_items = db.items.find().limit(5)

            # Prepare the dashboard data
            dashboard_data = {
                'username': username,
                'user_items': [item for item in user_items],
                'other_users_items': [item for item in other_users_items]
            }
            dashboard_data_sanitized = json.loads(json_util.dumps(dashboard_data))

            print("dashboard data sanitzied ", dashboard_data_sanitized)
            return dashboard_data_sanitized
        else:
            return jsonify({'message': 'Unauthorized'}), 401
    else:
        return jsonify({'message': 'there are no bearer token in headers'}), 401


@app.route('/', methods=['GET'])
def home():
    return "this is homepage"


@app.route('/items', methods=['GET'])
def get_items():
    # Get query parameters
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 10))
    filter_category = request.args.get('category', None)
    sort_field = request.args.get('sort', 'name')
    sort_order = int(request.args.get('order', 1))

    # Apply pagination, filtering, and sorting
    query = {}
    if filter_category:
        query['category'] = filter_category

    try:
        items_cursor = db.items.find(query).sort([(sort_field, sort_order)]).skip((page - 1) * limit).limit(limit)
        items = [item for item in items_cursor]
        # Process the retrieved items as needed
        items = json.loads(json_util.dumps(items))
        return jsonify({'items': items}), 200
    except Exception as e:
        return jsonify({'message': 'Error occurred while retrieving items', 'error': str(e)}), 500

    # items_cursor = db.items.find(query).sort([(sort_field, sort_order)]).skip((page - 1) * limit).limit(limit)
    # items = list(items_cursor)
    # return jsonify({'items': items})


@app.route('/showAllItems', methods=['GET'])
def get_all_items():
    # Get query parameters
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 10))
    filter_category = request.args.get('category', None)
    sort_field = request.args.get('sort', 'name')
    sort_order = int(request.args.get('order', 1))

    # Apply pagination, filtering, and sorting
    query = {}
    if filter_category:
        query['category'] = filter_category
    # items = db.items.find(query).sort([(sort_field, sort_order)]).skip((page - 1) * limit).limit(limit)
    items_cursor = db.items.find(query).sort([(sort_field, sort_order)]).skip((page - 1) * limit).limit(limit)
    items = list(items_cursor)
    items = json.loads(json_util.dumps(items))
    return jsonify({'items': items})


@app.route('/items/<item_id>', methods=['GET'])
def get_item(item_id):
    # Implement fetching item details logic
    pass


@app.route('/user/items', methods=['GET'])
def get_user_items():
    # Implement fetching user's items logic
    pass


@app.route('/user/items/<item_id>', methods=['PUT'])
def update_user_item(item_id):
    # Implement updating user's item logic
    pass


@app.route('/dashboard/new-item', methods=['POST'])
def add_new_item():
    reqbody = request.data.decode('UTF-8')
    item_data = json.loads(reqbody)

    title = item_data.get('title')
    desc = item_data.get('description')

    # Initialize the image path if it's available
    if 'image' in request.files:
        image_file = request.files['image']
        # Generate a secure filename for the image
        filename = secure_filename(image_file.filename)
        # Save the image to a designated folder
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)  # Ensure 'UPLOAD_FOLDER' is set correctly
        image_file.save(image_path)
        # Add the image path to the item data
        item_data['image_path'] = image_path

    if title:
        try:
            # Insert the new item into the database
            item_data = {
                "title": title,
                "description": desc,
                "category": item_data.get('category', ''),
                "price": item_data.get('price', 0),
                "owner": item_data.get('owner', ''),
                "image_path": item_data.get('image_path', ''),
                "createdAt": datetime.utcnow()
            }
            db.items.insert_one(item_data)
            return jsonify({'message': 'New item added successfully'}), 200
        except Exception as e:
            return jsonify({'message': 'Error occurred while adding item', 'error': str(e)}), 500
    else:
        return jsonify({'message': 'Title is required'}), 400

@app.route('/items/<item_id>/check', methods=['PUT'])
@authenticate
def check_item(item_id):
    user_id = request.user_id
    try:
        # Retrieve the item from the database
        item = db.items.find_one({'_id': ObjectId(item_id)})
        if not item:
            return jsonify({'message': 'Item not found'}), 404

        # Update the item status and selectedByUsers list
        selected_by_users = item.get('selectedByUsers', [])
        if user_id not in selected_by_users:
            selected_by_users.append(user_id)

        db.items.update_one(
            {'_id': ObjectId(item_id)},
            {
                '$set': {
                    'selected': True,
                    'selectedByUsers': selected_by_users
                }
            }
        )

        return jsonify({'message': 'Item checked successfully'}), 200

    except Exception as e:
        return jsonify({'message': 'Error occurred', 'error': str(e)}), 500


@app.route('/items/<item_id>/details', methods=['GET'])
def get_item_details(item_id):
    try:
        item = db.items.find_one({'_id': ObjectId(item_id)})
        if not item:
            return jsonify({'message': 'Item not found'}), 404

        # Populate user details for selectedByUsers
        selected_by_users = item.get('selectedByUsers', [])
        user_details = [db.users.find_one({'_id': ObjectId(user_id)}) for user_id in selected_by_users]

        item['selectedByUsers'] = user_details
        return jsonify(item), 200

    except Exception as e:
        return jsonify({'message': 'Error occurred', 'error': str(e)}), 500


@app.route('/user/profile', methods=['GET', 'PUT'])
def user_profile():
    user_id = request.headers.get('User-Id')
    if request.method == 'GET':
        # Get user profile
        user = db.users.find_one({'_id': user_id})
        if user:
            return jsonify({'user': user})
        else:
            return jsonify({'message': 'User not found'}), 404
    elif request.method == 'PUT':
        # Update user profile
        updated_data = request.get_json()
        db.users.update_one({'_id': user_id}, {'$set': updated_data})
        return jsonify({'message': 'User profile updated'})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
