import requests
from bs4 import BeautifulSoup
from search import search_track
from playlist_creater import create_playlist
from music_adder import add_tracks

access_token = (
    "BQAWOVkeMxCqbF-Xi__O22MFUtsyhdFWzR3of054Y_6tEHvw--sn7jmaRZmhRCxGzZXjfrQm0yd_8EPzVGXvcK2xeoNknQnKN0zM3V65O-RIJS8U877bysnizYMqHOw_H5Uv2-RgIYcqU0gjg9ti9OcVQm70DWju8deR1oI5o6AjeG03tJ3IYEmRx4L8uXXcNtZu_2JkVXu6_SRe2RuW-qhDOHVlRVAHYgvG28UY1bA6sMLNEktes7jhXAijfhDWFTXDsG0ydQWHG3n2rnfBww")
track_uris = []
date = input("Enter Date in the format(YYYY-MM-DD)")

#Step 1: Extracting the title of each of the 100 songs on the Billboard Hot 100 of that date
response = requests.get(f"https://www.billboard.com/charts/hot-100/{date}/")
data = response.text

soup = BeautifulSoup(data, "html.parser")
tracks = soup.select(".o-chart-results-list__item h3#title-of-a-story")
tracklist = [((track.getText())[14:])[:-5] for track in tracks]

#Step 2: Searching for every song on the list and extracting the Spotify URI adding it to a list
for title in tracklist:
    uri = search_track(track=title, token=access_token)
    track_uris.append(uri)

print(track_uris)

#Step 3: Creating the playlist
play_id = create_playlist(user_date=date, token=access_token)

#Step 4: Adding tracks to the playlist recently created
add_tracks(track_uris=track_uris, token=access_token, playlist_id=play_id)
