import requests

url = 'http://localhost:8000/add_user/'
data = {
    "username": "jacek",
    "password": "abracki",
    "email": "abracki@webaby.io"
}

response = requests.post(url, json=data)
print(response.json())