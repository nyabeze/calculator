import requests
from bs4 import BeautifulSoup
import html

response = requests.get("https://web.archive.org/web/20200518073855/https://www.empireonline.com/movies/features/best-movies-2/")
data = response.text

soup = BeautifulSoup(data, "html.parser")
titles = soup.find_all(name="h3", class_="title")
title_list = [title.getText() for title in titles]
print(title_list)
with open("movies.txt", "w", encoding="utf-8") as file:
    for title in title_list:
        new_title = html.unescape(title)
        file.write(f"{new_title}\n")

