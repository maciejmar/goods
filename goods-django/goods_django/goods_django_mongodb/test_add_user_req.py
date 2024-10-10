import requests

url = 'http://localhost:8000/add_user/'
data = {
    "username": "marek",
    "password": "drecki",
    "email": "mdreckiecki@webaby.io"
}

response = requests.post(url, json=data)
print(response.json())