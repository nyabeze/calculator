#
import json
from datetime import datetime
import json
from flask import jsonify
from openai import OpenAI
from models import User, UserProfile

from datetime import datetime
import json
from flask import jsonify
from openai import OpenAI
from models import User, UserProfile

# IMPORTANT: Move API key to environment variables/config
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.environ.get("OPENROUTER_API_KEY"),
)

calorie_goal = input("calorie goal: ")
# Combined prompt to send to the API

system_prompt = f"""
    Generate exactly 3-5 meal suggestions as a JSON object where:
    - Each meal in the "meals" array contains:
      - "name": Meal name with weight in grams (format: "XXXg of Meal Name")
      - "calories": Calorie count (integer)

    Requirements:
    1. Total calories should be within 5% of {calorie_goal}
    2. Weight should be realistic and included in the name (e.g., "300g of Grilled Chicken")
    3. Respond with ONLY the JSON object, no additional text
    4. Maintain nutritional plausibility
    """

completion = client.chat.completions.create(
    extra_headers={
        "HTTP-Referer": "<YOUR_SITE_URL>",  # Optional. Site URL for rankings on openrouter.ai.
        "X-Title": "<YOUR_SITE_NAME>",  # Optional. Site title for rankings on openrouter.ai.
    },
    extra_body={},
    model="deepseek/deepseek-r1:free",
    messages=[
        {
            "role": "user",
            "content": system_prompt,
        }
    ]
)


data = completion.choices[0].message.content
print(data)
meal_data = json.loads(data)
# dict = (data.split('n', 1)[-1]).rstrip("`")
# print(dict)
# print(json.loads(dict))

# print(workout_data)
