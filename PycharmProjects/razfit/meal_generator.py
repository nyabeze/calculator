from openai import OpenAI
from models import User, UserProfile

# IMPORTANT: Move API key to environment variables/config
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.environ.get("OPENROUTER_API_KEY"),
)

# Combined prompt to send to the API

system_prompt = f"""
    You are a fitness coach that generates personalized workout plans in structured JSON format.

    User Profile:
    - Age: 23
    - Sex: male
    - Goal: muscle gain
    - Weight: 63
    - Target body parts: legs,bac
    - Workout duration: 60 minutes

    Based on this input, return a JSON object with:
    1. A list called "workout", where each item includes:
        - name (string): exercise name
        - sets (integer)
        - reps (integer)
        - calories_burned (integer)
    2. total_calories_burned: sum of calories from all exercises
    3. tip: a short motivational or educational workout tip

    Respond in strict JSON format only.
    """



completion = client.chat.completions.create(
  extra_headers={
    "HTTP-Referer": "<YOUR_SITE_URL>", # Optional. Site URL for rankings on openrouter.ai.
    "X-Title": "<YOUR_SITE_NAME>", # Optional. Site title for rankings on openrouter.ai.
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
