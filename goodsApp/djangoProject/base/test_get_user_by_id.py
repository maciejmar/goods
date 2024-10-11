import requests

# The correct URL for the get_user endpoint
user_id = "66f6fe31627fbd0312cd2bff"
url = f'http://localhost:8000/get_user/{user_id}/'

# Send a GET request to the API
response = requests.get(url)

# Check if the response is valid and JSON content is present
if response.status_code == 200:
    try:
        # Try to decode the response as JSON
        print(response.json())
    except requests.exceptions.JSONDecodeError:
        print("Error: The response is not valid JSON.")
else:
    print(f"Error: Got response code {response.status_code}")
    print(response.text)  # Print the actual response text for debugging