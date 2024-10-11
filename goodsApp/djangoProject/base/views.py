from django.shortcuts import render
from .models import goods_coollection, User
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from db_connection import db
from pydantic import ValidationError
from bson.objectid import ObjectId
import hashlib
import json

# the views are to created below

goods_collection = db['user']


# Home page - home address response
def index(request):
    return HttpResponse("<h1>App goods-django-mongodb is running</h1>")


# Create a new user POST request
@csrf_exempt
def add_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            # Hash the password (ensure you have hashlib imported)
            if 'password' in data:
                data['password'] = hashlib.sha256(data['password'].encode()).hexdigest()
            user = User(**data)
            result = goods_collection.insert_one(user.dict(exclude={'_id'}))
            return JsonResponse({
                'message': 'New user added',
                'user_id': str(result.inserted_id)
            }, status=201)
        except ValidationError as e:
            return JsonResponse({'error': e.errors()}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid HTTP method. Use POST.'}, status=405)


# List all users stored in User collection
def get_all_users(request):
    if request.method == 'GET':
        try:
            # Retrieve all users from the MongoDB collection
            users_cursor = goods_collection.find()
            users = list(users_cursor)
            # Convert ObjectId to string for JSON serialization
            for user in users:
                user['_id'] = str(user['_id'])
            # Return the list of users as JSON
            return JsonResponse(users, safe=False)
        except Exception as e:
            # Handle exceptions and return an error response
            return JsonResponse({'error': str(e)}, status=400)
    else:
        # Return an error if the HTTP method is not GET
        return JsonResponse({'error': 'Invalid HTTP method. Use GET.'}, status=405)


# GET user by id of the User collection
@csrf_exempt
def get_user(request, user_id):
    if request.method == 'GET':
        try:
            # Fetch the user by the given ObjectId
            user = goods_collection.find_one({'_id': ObjectId(user_id)})
            if user:
                user['_id'] = str(user['_id'])  # Convert ObjectId to string
                return JsonResponse(user, status=200)
            else:
                return JsonResponse({'error': 'User not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid HTTP method. Use GET.'}, status=405)


# Delete request of the User collection
@csrf_exempt
def delete_user(request, user_id):
    if request.method == 'DELETE':
        try:
            # Attempt to delete the user by the given ObjectId
            result = goods_collection.delete_one({'_id': ObjectId(user_id)})
            if result.deleted_count == 1:
                return JsonResponse({'message': 'User deleted successfully'}, status=200)
            else:
                return JsonResponse({'error': 'User not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid HTTP method. Use DELETE.'}, status=405)


# Find the id of User by the unique email
@csrf_exempt
def get_user_by_email(request, email):
    if request.method == 'GET':
        try:
            # Search for a user with the provided email
            user = goods_collection.find_one({'email': email})
            if user:
                # Convert ObjectId to string before returning the user ID
                user_id = str(user['_id'])
                return JsonResponse({'_id': user_id}, status=200)
            else:
                return JsonResponse({'error': 'User not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid HTTP method. Use GET.'}, status=405)


@csrf_exempt
def update_user(request, user_id):
    if request.method == 'PUT':
        try:
            data = json.loads(request.body)  # Parse the incoming JSON data
            # Ensure the ObjectId is valid
            if not ObjectId.is_valid(user_id):
                return JsonResponse({'error': 'Invalid user ID format'}, status=400)

            # Find and update the user document by its _id
            result = goods_collection.update_one(
                {'_id': ObjectId(user_id)},
                {'$set': data}
            )

            if result.matched_count == 0:
                return JsonResponse({'error': 'User not found'}, status=404)

            return JsonResponse({'message': 'User updated successfully'}, status=200)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid HTTP method. Use PUT.'}, status=405)