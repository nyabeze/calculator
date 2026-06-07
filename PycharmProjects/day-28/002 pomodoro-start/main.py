from tkinter import *
import math

# ---------------------------- CONSTANTS ------------------------------- #
PINK = "#e2979c"
RED = "#e7305b"
GREEN = "#9bdeac"
YELLOW = "#f7f5dd"
FONT_NAME = "Courier"
WORK_MIN = 25
SHORT_BREAK_MIN = 5
LONG_BREAK_MIN = 20
reps = 0
total_rounds = ''
timer = None
# ---------------------------- TIMER RESET ------------------------------- #
def reset_timer():
    window.after_cancel(timer)
    canvas.itemconfig(timer_text, text='00:00')
    timer_label.config(text='Timer')
    checkmark_tag.config(text='')
    global reps
    reps = 0
# ---------------------------- TIMER MECHANISM ------------------------------- # 
def start_timer():
    checks = '✔️'
    global total_rounds
    global reps
    if reps == 7:
        count_down(LONG_BREAK_MIN * 1)
        timer_label.config(text='BREAK', fg=RED)
        total_rounds += checks
        checkmark_tag.config(text=total_rounds)
    elif reps % 2 != 0:
        count_down(SHORT_BREAK_MIN * 1)
        timer_label.config(text='BREAK', fg=PINK)
        total_rounds += checks
        checkmark_tag.config(text=total_rounds)
    elif reps % 2 == 0:
        count_down(WORK_MIN * 1)
        timer_label.config(text='WORK', fg=GREEN)




# ---------------------------- COUNTDOWN MECHANISM ------------------------------- #
def count_down(count):
    global reps
    count_min = math.floor(count / 60)
    count_sec = count % 60
    if count_sec == 0:
        count_sec = '00'
    elif count_sec < 10:
        count_sec = '0' + str(count_sec)
    if count == 0:
        reps += 1


    canvas.itemconfig(timer_text, text=f'{count_min}:{count_sec}')
    if count > 0:
        global timer
        timer = window.after(1000, count_down, count - 1)
    else:
        start_timer()


# ---------------------------- UI SETUP -------------------------------xz #
window = Tk()

window.title('Pomodoro')
window.config(padx=100, pady=50, bg=YELLOW)

timer_label = Label(text='Timer', font=('Arial', 35), fg=GREEN, bg=YELLOW)

timer_label.grid(row=0, column=1)

canvas = Canvas(width=200, height=224, bg=YELLOW, highlightthickness=0)
tomato_img = PhotoImage(file="tomato.png")
canvas.create_image(100, 112, image=tomato_img)
timer_text = canvas.create_text(100, 130, text='00:00', fill='white', font=(FONT_NAME, 35, 'bold'))
canvas.grid(row=1, column=1)

start_btn = Button(text='Start', command=start_timer)
start_btn.grid(row=2, column=0)

reset_btn = Button(text='Reset', highlightthickness=0, command=reset_timer)
reset_btn.grid(row=2, column=2)

checkmark_tag = Label(text='', bg=YELLOW, fg='green')
checkmark_tag.grid(row=3, column=1)

window.mainloop()
