import requests


url = 'https://trackapi.nutritionix.com/v2/natural/nutrients'
headers = {
    'Content-Type': 'application/json',
    'x-app-id': '185d86bd',
    'x-app-key': '05897ca9d90a6c7efc93d593bc0bf145',
    'x-remote-user-id': '0',
  }

foodItem = input('Enter Food: ')
payload = {'query': foodItem}

response = requests.post(url, json=payload, headers=headers)

data = (response.json())
print(data['foods'][0]['nf_calories'])