import requests
import json

user_id = "66f6fc60627fbd0312cd2bfe"  # Replace with a valid user_id from your database
url = f'http://localhost:8000/update_user/{user_id}/'


data = {
    "username": "maciejmarosz",
    "email": "maciej.marosz01@webaby.io"
}

# Send the PUT request with the data to update the user
response = requests.put(
    url,
    headers={'Content-Type': 'application/json'},
    data=json.dumps(data)  # Convert the dictionary to a JSON string
)


if response.status_code == 200:
    print("Success: User updated")
    print(response.json())
elif response.status_code == 404:
    print("Error: User not found")
    print(response.json())
elif response.status_code == 400:
    print("Error: Invalid user ID format or bad request")
    print(response.json())
else:
    print(f"Unexpected error: {response.status_code}")
    print(response.text)