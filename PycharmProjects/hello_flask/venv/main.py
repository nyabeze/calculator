from flask import Flask

app = Flask(__name__)
print(__name__)

def bold_decorator(function):
    def wrapper():
        return f'<b>{function()}<b/>'
    return wrapper

@app.route("/")
def hello_world():
    return "<p>Hello, world!</p>"

@app.route("/bye")
@bold_decorator
def bye():
    return "<p>Bye</p>"

@app.route("/username/")
def greet():
    return ('<h1 style="text-align:center">Hello ,World</h1>'
            "<p>This is a paragraph</p>"
            '<img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzQ3eTZ4ZDFmY2RqZzlhMjd1cDMxcGdiamVncWp3cG1oMDRycmR0byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tXL4FHPSnVJ0A/giphy.gif"/>')

if __name__ == "__main__":
    app.run(debug=True)