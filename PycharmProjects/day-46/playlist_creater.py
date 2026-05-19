import requests

def create_playlist(user_date, token):
    """
    :param user_date: this is a date parameter in the form YYYY-MM-DD used in the naming of the Playlist
    :param token:the authentication token for the Spotify API
    :return: it returns the playlist ID for the created Playlist
    """
    USER_ID = "31zn4mzxe7i34rrx3ptoq3q3dwki"
    scope = "playlist-modify-public playlist-modify-private user-read-private user-read-email"
    API_BASE_URL = "https://api.spotify.com/v1/"

    #Access token and refresh token

    refresh_token = ("AQAjgtBe2KoWior6gOD76VaMnHcx10-ex-5Ok1xyoH5bztdBQAGNOCvKjhlxJTjvehz9pB4hz6mLkhZjW0WOO49CwmiyF"
                     "-Y0LQ7utchLQj1-cw9MUH9rsHT06IoTDVyqQjg")

    #user input on the playlist
    playlist_name = f"{user_date} Billboard Hot 100"
    playlist_description = input("Enter a description for your playlist: ")

    #creating the playlist
    playlist_data = {
        "name": playlist_name,
        "description": playlist_description,
        "public": True
    }
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    #Creating the playlist
    playlist_response = requests.post(f"{API_BASE_URL}users/{USER_ID}/playlists", headers=headers, json=playlist_data)
    print(playlist_response.status_code)

    playlist = playlist_response.json()
    print(f"Playlist URI:{playlist["external_urls"]["spotify"]}")

    print("Playlist created successfully!")
    return playlist['id']

