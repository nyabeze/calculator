import requests

# Replace with your WhatsApp Business API key
api_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTEwMmEyYzBlOTI3MzZhMmQ0Zjc1YyIsIm5hbWUiOiJTYW50aWFnbyBIb2xkaW5ncyIsImFwcE5hbWUiOiJBaVNlbnN5IiwiY2xpZW50SWQiOiI2NjkxMDJhMmMwZTkyNzM2YTJkNGY3NGYiLCJhY3RpdmVQbGFuIjoiQkFTSUNfTU9OVEhMWSIsImlhdCI6MTcyMDc3OTQyNn0.nK0z9b9fjhyhrLto9BGNDR-eV_SDqouZnFT_vGmiODI"

# Replace with the recipient's phone number
recipient_phone_number = "+263774271900"

# Replace with the message you want to send
message = "Hello, this is a test message from AiSensy!"

# Set the API endpoint and headers
endpoint = f"https://api.whatsapp.com/v3/messages"
headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

# Create the request payload
payload = {
    "messaging_product": "whatsapp",
    "to": recipient_phone_number,
    "type": "text",
    "text": {
        "body": message
    }
}

# Send the request
response = requests.post(endpoint, headers=headers, json=payload)

# Check if the request was successful
if response.status_code == 200:
    print("Message sent successfully!")
else:
    print("Error sending message:", response.text)