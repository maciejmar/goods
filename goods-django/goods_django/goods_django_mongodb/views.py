from django.shortcuts import render
from .models import goods_coollection
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from db_connection import db  
import json
#the views are to created below

goods_collection = db['user'] 
def index(request):
    return HttpResponse("<h1>App goods-django-mongodb is running</h1>")

@csrf_exempt
def add_user(request):
    if request.method == 'POST':
        try:
            # Parse JSON data from the request body
            data = json.loads(request.body)
            # Validate data using the User model
            user = User(**data)
            # Convert to dictionary and insert into MongoDB
            result = goods_collection.insert_one(user.dict(exclude={'_id'}))
            # Return a success response with the inserted ID
            return JsonResponse({
                'message': 'New user added',
                'user_id': str(result.inserted_id)
            }, status=201)
        except ValidationError as e:
            # validation errors occure
            return JsonResponse({'error': e.errors()}, status=400)
        except Exception as e:
            # Handle other exceptions
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid HTTP method. Use POST.'}, status=405)


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


