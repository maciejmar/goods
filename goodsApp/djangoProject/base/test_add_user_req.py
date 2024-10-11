import requests

url = 'http://localhost:8000/add_user/'

data = {
    "username": "admin",
    "password": "<PASSWORD>",
    "email": "something.gmail.com",
}
response = requests.post(url, json=data)
print(response.json)