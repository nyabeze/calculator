import datetime as dt
import random
import smtplib

# ---------------------------Checking if the Day of the week is Wednesday---------------------------#

now = dt.datetime.now()
day_of_week = now.weekday()


def send_email_today():
    with open('quotes.txt', mode='r') as file:
        quotes = file.readlines()
    chosen_quote = random.choice(quotes)
    connection = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    #connection.starttls()
    connection.login(user='nyabeze02@gmail.com', password='ljokbtggnrgibbxr')
    connection.sendmail(from_addr='nyabez02@gmail.com', to_addrs='ryannyabeze@yahoo.com', msg=f'Subject:inspiration  '
                                                                                              f'\n \n {chosen_quote}')
    connection.close()


if day_of_week == 2:
    send_email_today()
