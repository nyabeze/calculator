import requests
import datetime
from twilio.rest import Client

import html

STOCK = "TSLA"
COMPANY_NAME = "Tesla Inc"

## STEP 1: Use https://www.alphavantage.co
# When STOCK price increase/decreases by 5% between yesterday and the day before yesterday then print("Get News").


#checking current date

now = datetime.datetime.now()
day = now.day
month = now.month
if month < 10:
    month = "0" + str(month)
year = now.year
date = now

yesterday_date = f'{year}-{month}-{day - 1}'
alphavantage_endpoint = "https://www.alphavantage.co/query"
params = {
    "function": "TIME_SERIES_DAILY",
    "symbol": STOCK,
    "apikey": "0B4AOAAG6LI5FDPD"
}

response = requests.get(alphavantage_endpoint, params=params)
data = response.json()

opening = float(data['Time Series (Daily)'][yesterday_date]['1. open'])
closing = float(data['Time Series (Daily)'][yesterday_date]['4. close'])

percentage_diff = round(((opening - closing) / opening) * 100)
print(percentage_diff)

## STEP 2: Use https://newsapi.org
# Instead of printing ("Get News"), actually get the first 3 news pieces for the COMPANY_NAME.


parameters = dict(q="starlink", apiKey="bdcc6900fa5b4c7db9de412e04497c28", pageSize=3, sortBy="relevancy")
n_response = requests.get(url="https://newsapi.org/v2/everything", params=parameters)
news = n_response.json()

headline = html.escape(news["articles"][0]["title"])
brief = html.escape(news["articles"][0]["description"])
news_url = news["articles"][0]["url"]
print(brief)
if percentage_diff > 0:
    sign = "🔻"
else:
    sign = "🔺"
message = f"""
TSLA:{sign}{percentage_diff}% 
Headline:{headline}
Brief:{brief}
URL:{news_url}
"""
print(html.escape(message))
## STEP 3: Use https://www.twilio.com
#Send a seperate message with the percentage change and each article's title and description to your phone number.
account_sid = os.environ.get('TWILIO_SID')
auth_token  = os.environ.get('TWILIO_AUTH')
client = Client(account_sid, auth_token)

message = client.messages.create(
    from_='+17624658712',
    body=message,
    to='+263774271900'
)

#Optional: Format the SMS message like this: 
"""
TSLA: 🔺2%
Headline: Were Hedge Funds Right About Piling Into Tesla Inc. (TSLA)?. 
Brief: We at Insider Monkey have gone over 821 13F filings that hedge funds and prominent investors are required to file by the SEC The 13F filings show the funds' and investors' portfolio positions as of March 31st, near the height of the coronavirus market crash.
or
"TSLA: 🔻5%
Headline: Were Hedge Funds Right About Piling Into Tesla Inc. (TSLA)?. 
Brief: We at Insider Monkey have gone over 821 13F filings that hedge funds and prominent investors are required to file by the SEC The 13F filings show the funds' and investors' portfolio positions as of March 31st, near the height of the coronavirus market crash.
"""
