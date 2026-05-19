import requests


def search_track(track, token):
    """
    :param track: the title of the track to be searched for
    :param token: the authentication token for the Spotify API
    :return: It returns the specific Spotify URI for that particular track
    """
    search_track_endpoint = "https://api.spotify.com/v1/search"

    params = {
        "q": track,
        "type": "track",
        "limit": 1
    }
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    response = requests.get(search_track_endpoint, params=params, headers=headers)
    data = response.json()
    uri = data["tracks"]["items"][0]["uri"]
    return uri
