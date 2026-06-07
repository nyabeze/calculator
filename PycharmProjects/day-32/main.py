##################### Extra Hard Starting Project ######################

import datetime as dt
import pandas
import random
import smtplib

its_a_birthday = False

# 2. Check if today matches a birthday in the birthdays.csv
birthday_df = pandas.read_csv('birthdays.csv')
today_date = dt.date.today()

for (index, row) in birthday_df.iterrows():
    if today_date.month == row.month and today_date.day == row.day:
        its_a_birthday = True
        receiving_email = row.email
        person_name = row['name']

# 3. If step 2 is true, pick a random letter from letter templates and replace the [NAME] with the person's actual
# name from birthdays.csv
if its_a_birthday:
    message = random.choice(['letter_templates/letter_1.txt', 'letter_templates/letter_2.txt', 'letter_templates'
                                                                                               '/letter_3.txt'])
    with open(file=message, mode='r') as file:
        data = file.read()
        data = data.replace('[NAME]', str(person_name))
        print(data)
        
# 4. Send the letter generated in step 3 to that person's email address.
connection = smtplib.SMTP('smtp.gmail.com')
connection.starttls()

my_email = 'nyabeze02@gmail.com'
password = 'fhxbczgghtoefoff'

connection.login(user=my_email, password=password)
connection.sendmail(from_addr=my_email, to_addrs=receiving_email, msg=f'Subject:Happy Birthday\n\n{data}')
connection.close()