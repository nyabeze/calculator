from tkinter import *
import pandas
import random

BACKGROUND_COLOR = "#B1DDC6"
data = pandas.read_csv('data/french_words.csv')
words_dictionary = data.to_dict()
chosen_index = None
known_list = []


# -------------------------------------Accessing the CSV---------------------------------------------#
def choose_index():
    global known_list
    global chosen_index
    chosen_index = random.randint(0, 100)
    if chosen_index not in known_list:
        show_card_front()
        known_list.append(chosen_index)
    else:
        choose_index()

    print(f'{known_list}')
    print(len(known_list))


def show_card_front():
    global words_dictionary
    global chosen_index
    canvas = Canvas(width=800, height=526)
    card_front = PhotoImage(file='images/card_front.png')
    canvas.create_image(400, 263, image=card_front)
    canvas.grid(row=0, column=0, columnspan=2)
    french_word = words_dictionary['French'][chosen_index]
    canvas.create_text(400, 150, text='French', font=('Arial', 40, 'italic'), fill='black')
    canvas.create_text(400, 263, text=french_word, font=('Arial', 60, 'bold'), fill='black')

def flip_card():
    global words_dictionary
    global chosen_index
    card_back = PhotoImage(file='images/card_back.png')
    canvas = Canvas(width=800, height=526)
    canvas.create_image(400, 263, image=card_back)
    canvas.config(bg=BACKGROUND_COLOR, highlightthickness=0)
    canvas.grid(row=0, column=0, columnspan=2)
    english_word = words_dictionary['English'][chosen_index]
    canvas.create_text(400, 150, text='English', font=('Arial', 40, 'italic'), fill='black')
    canvas.create_text(400, 263, text=english_word, font=('Arial', 60, 'bold'), fill='black')
    window.after(3000, choose_index)


# -------------------------------------UI Setup------------------------------------------------------#
window = Tk()
window.config(pady=50, padx=50, bg=BACKGROUND_COLOR)

# canvas.create_text(400, 150, text='French', font=('Arial', 40, 'italic'), fill='black')
choose_index()
show_card_front()

wrong_img = PhotoImage(file="images/wrong.png")
wrong_btn = Button(window, image=wrong_img,command=flip_card)
wrong_btn.grid(row=1, column=0)

correct_img = PhotoImage(file='images/right.png')
correct_btn = Button(image=correct_img, command=choose_index)
correct_btn.config(highlightthickness=0)
correct_btn.grid(row=1, column=1)

window.mainloop()
