import urllib.parse
import requests

# Define your credentials and URLs
CLIENT_ID = "840151c224194671a0a2d0370b274c80"
CLIENT_SECRET = "ec78b156fc8d4519ab32fda105792790"
REDIRECT_URI = "http://example.com"
AUTH_URL = "https://accounts.spotify.com/authorize"
TOKEN_URL = "https://accounts.spotify.com/api/token"
API_BASE_URL = "https://api.spotify.com/v1/"
scope = "playlist-modify-public playlist-modify-private user-read-private user-read-email"

# Step 1: Get the authorization URL and redirect the user
params = {
    "client_id": CLIENT_ID,
    "response_type": 'code',
    "scope": scope,
    "redirect_uri": REDIRECT_URI,
}

auth_url = f"{AUTH_URL}?{urllib.parse.urlencode(params)}"
print("Go to the following URL and authorize the app:")
print(auth_url)

# Step 2: Capture the authorization code from the redirected URL
authorization_code = input("Enter the authorization code from the URL: ")

# Step 3: Exchange the authorization code for an access token
token_data = {
    "grant_type": "authorization_code",
    "code": authorization_code,
    "redirect_uri": REDIRECT_URI,
    "client_id": CLIENT_ID,
    "client_secret": CLIENT_SECRET
}

response = requests.post(TOKEN_URL, data=token_data)
response_data = response.json()

access_token = response_data.get("access_token")
print(access_token)
refresh_token = response_data.get("refresh_token")
print(refresh_token)

# Step 4: Use the access token to create a playlist
headers = {
    "Authorization": f"Bearer {access_token}",
    "Content-Type": "application/json"
}

