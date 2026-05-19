import requests

access_token = "BQAWOVkeMxCqbF-Xi__O22MFUtsyhdFWzR3of054Y_6tEHvw--sn7jmaRZmhRCxGzZXjfrQm0yd_8EPzVGXvcK2xeoNknQnKN0zM3V65O-RIJS8U877bysnizYMqHOw_H5Uv2-RgIYcqU0gjg9ti9OcVQm70DWju8deR1oI5o6AjeG03tJ3IYEmRx4L8uXXcNtZu_2JkVXu6_SRe2RuW-qhDOHVlRVAHYgvG28UY1bA6sMLNEktes7jhXAijfhDWFTXDsG0ydQWHG3n2rnfBww"
def add_tracks(track_uris, token, playlist_id):
    """
    :param track_uris: this is a list of uri's that need to be added to the playlist
    :param token: authentcation token for the spotify api
    :param playlist_id: the unique identifier id for the playlist to which the tracks will be added
    :return:
    """
    API_BASE_URL = "https://api.spotify.com/v1/"

    # List of track URIs to add (you can get these URIs by searching for tracks)
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    track_data = {
        "uris": track_uris
    }

    add_tracks_response = requests.post(f"{API_BASE_URL}playlists/{playlist_id}/tracks", headers=headers,
                                        json=track_data)

    if add_tracks_response.status_code == 201:
        print("Tracks added successfully!")
        print(add_tracks_response.json())
    else:
        print(f"Failed to add tracks: {add_tracks_response.status_code}")
        print(add_tracks_response.json())


