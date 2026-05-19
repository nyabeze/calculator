from bs4 import BeautifulSoup
import requests
from notification_manager import NotificationManager

response = requests.get("https://www.amazon.com/SAMSUNG-Smartphone-Unlocked-Android-Titanium/dp/B0CMDJ844V/ref=sr_1_1_sspa?sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY")
soup = BeautifulSoup(response.content, "html.parser")

price = soup.select("span.a-price-whole")
formatted_price = price[1].getText()[:-1]
if int(formatted_price) < 1300:
    email_manager = NotificationManager(formatted_price)
    email_manager.send_mail()
