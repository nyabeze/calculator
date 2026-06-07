import tkinter
from quiz_brain import QuizBrain

THEME_COLOR = "#375362"


class QuizInterface:

    def __init__(self, quiz_brain: QuizBrain):
        self.quiz = quiz_brain
        self.window = tkinter.Tk()
        self.window.title("Quizzler")
        self.window.config(padx=20, pady=50, bg=THEME_COLOR)
        self.score_label = tkinter.Label(text="Score:0", bg=THEME_COLOR, fg="white")
        self.score_label.grid(row=1, column=2)
        self.canvas = tkinter.Canvas(width=300, height=250)
        self.question_text = self.canvas.create_text(
            150,
            125,
            width=280,
            text="Question text",
            font=("Arial", 20, "italic")
        )
        self.canvas.grid(row=2, column=1, columnspan=2, pady=50)
        true_img = tkinter.PhotoImage(file="images/true.png")
        false_img = tkinter.PhotoImage(file="images/false.png")
        self.true_btn = tkinter.Button(self.window, image=true_img, command=self.true_pressed)
        self.true_btn.grid(row=3, column=1, pady=20)
        self.false_btn = tkinter.Button(self.window, image=false_img, command=self.false_pressed)
        self.false_btn.grid(row=3, column=2, pady=20)
        self.get_next_question()
        self.window.mainloop()

    def get_next_question(self):
        self.canvas.config(bg="white")
        if self.quiz.still_has_questions():
            self.score_label.config(text=f"Score: {self.quiz.score}")
            q_text = self.quiz.next_question()
            self.canvas.itemconfig(self.question_text, text=q_text)
        else:
            self.canvas.itemconfig(self.question_text, text="You've reached the end of the quiz.")
            self.true_btn.config(state="disabled")
            self.false_btn.config(state="disabled")

    def true_pressed(self):
        is_right = self.quiz.check_answer("True")
        self.give_feedback(is_right)

    def false_pressed(self):
        is_right = self.quiz.check_answer("False")
        self.give_feedback(is_right)

    def give_feedback(self, is_right):
        if is_right:
            self.canvas.config(bg="green")
        else:
            self.canvas.config(bg="red")
        self.window.after(1000, self.get_next_question)