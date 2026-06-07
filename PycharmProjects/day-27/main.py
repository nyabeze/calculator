from tkinter import *

window = Tk()
window.title("Miles to KM converter")
window.minsize(500, 300)


mile_entry = Entry()
mile_entry.grid(row=0, column=1)

mile_label = Label(text='Miles')
mile_label.grid(row=0, column=2)

equal_to_label = Label(text='is equal to')
equal_to_label.grid(row=1, column=0)

km_answer = Label(text='0')
km_answer.grid(row=1,  column=1)

km_tag = Label(text='Km')
km_tag.grid(row=1, column=2)

def calculate():
    miles = mile_entry.get()
    km = round((float(miles) * 1.2),3)
    km_answer.config(text=str(km))


calculate_button = Button(text='calculate' ,command=calculate)
calculate_button.grid(row=2, column=1)


window.mainloop()