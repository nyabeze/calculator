import os
import random
import requests
from twilio.rest import Client


def create_msg(rain_flag):
    weather_details = []
    greetings = ["wadii", "ndeip", "ukuita sei", "bho here", ""]
    names = ["Yuda", "tembeya", "kwembeya", "jedza", "gweshe gweshe", "goda", "chenge", "ganato", "wida"]
    for daily in data["list"]:
        forecast_dict = {
            "temperature": daily["main"]["temp"],
            "description": daily['weather'][0]["description"]
        }
        weather_details.append(forecast_dict)
    morning_details = weather_details[0]
    afternoon_details = weather_details[1]
    late_afternoon = weather_details[2]
    if rain_flag:
        umbrella_msg = "Kunogona kunaya saka takura umbrella kana raincoat waiziya usazoti handina kukuudza"
    else:
        umbrella_msg = "nhasi hakunaye ndomessege yabva kuvakomana veweather ska usakwate"
    message = f"""{random.choice(greetings)} {random.choice(names)} mazuvano ndakuita zveweather 
                    mornaz yakamira so 
                    {morning_details}
                    skarten yakamira so
                    {afternoon_details}
                    chi late number zvakadai
                    {late_afternoon}
                    {umbrella_msg}"""

    return message

def send_msg(msg):


    account_sid = os.environ.get('TWILIO_SID')
    auth_token = os.environ.get('TWILIO_AUTH')
    client = Client(account_sid, auth_token)

    message = client.messages.create(
        from_='+17624658712',
        body=msg,
        to='+263774271900'
    )

    print(message.sid)



api_key = os.environ.get('OWM_API_KEY')
OWM_api_endpoint = "https://api.openweathermap.org/data/2.5/forecast"
lat = "-17.825167"
long = "31.033510"

params = {
    "lat": lat,
    "lon": long,
    "cnt": "4",
    "appid": api_key,
    "units": "metric"
}

response = requests.get(url=OWM_api_endpoint, params=params)
data = response.json()

print(response.status_code)
print(data)
will_it_rain = False
for forecast in data['list']:
    print(forecast["weather"][0])
    weather_id = forecast['weather'][0]['id']
    if weather_id < 700:
        will_it_rain = True
        print("Bring an umbrella")
        break
if not will_it_rain:
    print("No need for an umbrella")
msg = create_msg(will_it_rain)
send_msg(msg)
