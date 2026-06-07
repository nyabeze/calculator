import requests
import urllib3
api_key = "a7aa7fc30f50a9689c04a472671f2c0e"
api_url = "https://openweathermap.org/forecast5#5days"

params = {
    "lat": "-17.825167",
    "long": "31.033510",
    "appid": "a7aa7fc30f50a9689c04a472671f2c0e"
}

response = requests.get(api_url, params=params)
print(response.raise_for_status())
data = response.json()
print(data)