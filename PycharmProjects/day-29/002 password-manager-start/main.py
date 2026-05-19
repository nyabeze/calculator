from tkinter import *
from tkinter import messagebox, Entry
import random
import pyperclip
import json


# ---------------------------- PASSWORD GENERATOR ------------------------------- #
# Password Generator Project
def password_generator():
    letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
               'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
               'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    symbols = ['!', '#', '$', '%', '&', '(', ')', '*', '+']

    nr_letters = random.randint(8, 10)
    nr_symbols = random.randint(2, 4)
    nr_numbers = random.randint(2, 4)

    password_letters = [random.choice(letters) for _ in range(nr_letters)]
    password_symbols = [random.choice(symbols) for _ in range(nr_symbols)]
    password_numbers = [random.choice(numbers) for _ in range(nr_numbers)]

    password_list = password_letters + password_symbols + password_numbers
    random.shuffle(password_list)
    password = "".join(password_list)

    pyperclip.copy(password)
    print(f"Your password is: {password}")
    password_entry.insert(0, password)


# ---------------------------- SAVE PASSWORD ------------------------------- #
def save_passwords():
    website = website_entry.get()
    username = user_entry.get()
    password = password_entry.get()
    new_data = {
        website: {
            'email': username,
            'password': password
        }
    }
    if website == '' or username == '' or password == '':
        messagebox.showerror(title='Error', message='None of the fields can be left blank\n'
                                                    'Please make sure all fields are filled in')
    else:
        try:
            with open('passwords.json', mode='r') as file:
                # Reading old data
                data = json.load(file)
                # Updating old data with new data
                data.update(new_data)
        except FileNotFoundError:
            with open('passwords.json', mode='w') as file:
                json.dump(new_data, file, indent=4)
        else:
            with open('passwords.json', mode='w') as file:
                # Saving updated data
                json.dump(data, file, indent=4)

                website_entry.delete(0, 'end')
                user_entry.delete(0, 'end')
                password_entry.delete(0, 'end')


# ---------------------------- SAVE PASSWORD ------------------------------- #
def find_password():
    searched_website = website_entry.get()
    try:
        with open('passwords.json', mode='r') as file:
            data = json.load(file)
            website_data = data[searched_website]
    except FileNotFoundError:
        messagebox.showerror(title='Oops', message='Unfortunately you have no passwords saved yet')
    except KeyError:
        messagebox.showerror(title='Oops', message='You don\'t have any information saved for that website')
    else:
        website_username = website_data['email']
        website_password = website_data['password']
        messagebox.showinfo(title=searched_website, message=f'Email   :{website_username}\n'
                                                            f'Password:{website_password}')
        pyperclip.copy(website_password)


# ---------------------------- UI SETUP ------------------------------- #
window = Tk()
window.title('Password Manager')
window.config(padx=20, pady=20)

canvas = Canvas(width=200, height=200)
logo_image = PhotoImage(file='logo.png')
canvas.create_image(100, 100, image=logo_image)
canvas.grid(row=1, column=2)

website_label = Label(text='Website:')
website_label.grid(row=2, column=1)
website_entry = Entry(width=26)
website_entry.grid(row=2, column=2)

search_btn = Button(text='Search', width=14, command=find_password)
search_btn.grid(row=2, column=3)

user_label = Label(text='Email/Username:')
user_label.grid(row=3, column=1)
user_entry = Entry(width=26)
user_entry.grid(row=3, column=2, columnspan=1)

password_label = Label(text='Password:', width=21)
password_label.grid(row=4, column=1)
password_entry: Entry = Entry(width=26)
password_entry.grid(row=4, column=2, padx=0)

generate_btn = Button(text='Generate Password', padx=0, command=password_generator)
generate_btn.grid(row=4, column=3)

add_btn = Button(text='Add', width=38, command=save_passwords)
add_btn.grid(row=5, column=2, columnspan=2)

window.mainloop()
