from flask import Flask, render_template
import requests
import random
import datetime

app = Flask(__name__)


@app.route('/')
def home():
    random_number = random.randint(1, 10)
    current_year = datetime.datetime.now().year
    return render_template("index.html", num=random_number, year=current_year)


@app.route("/guess/<name>")
def guess(name):
    params = {"name": name}
    gender_data = (requests.get("https://api.genderize.io", params=params)).json()
    age_data = (requests.get("https://api.agify.io", params=params)).json()
    user_gender = gender_data['gender']
    user_age = age_data['age']
    return render_template("guess.html", username=name, age=user_age, gender=user_gender)

@app.route("/blog/<num>")
def get_blog(num):
    print(num)
    blog_url = "https://api.npoint.io/50e9e5f99255fce3e4a6"
    response = requests.get(blog_url)
    all_post = response.json()
    return render_template("blog.html", posts=all_post)


if __name__ == "__main__":
    app.run(debug=True)
