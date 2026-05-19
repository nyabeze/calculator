import requests
from flask import Flask, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from extensions import db, jwt
from config import Config
from models import User,UserProfile ,MealLog,Workout # Make sure this imports ALL your models
from flask_cors import CORS

from openai import OpenAI
import random
import json
import signal
from datetime import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart



app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
db.init_app(app)
jwt.init_app(app)
CORS(app, resources={
    r"/signup": {"origins": "*"},
    r"/login": {"origins": "*"}
})

# Fallback meal options (15 items)
FALLBACK_MEALS = [
    {"name": "150g of Grilled Chicken", "calories": 300},
    {"name": "200g of Brown Rice", "calories": 220},
    {"name": "100g of Steamed Broccoli", "calories": 55},
    {"name": "250g of Baked Salmon", "calories": 450},
    {"name": "100g of Avocado", "calories": 160},
    {"name": "300g of Vegetable Stir Fry", "calories": 280},
    {"name": "150g of Boiled Eggs", "calories": 210},
    {"name": "250g of Sweet Potato", "calories": 200},
    {"name": "180g of Tuna Salad", "calories": 270},
    {"name": "200g of Turkey Breast", "calories": 330},
    {"name": "150g of Quinoa", "calories": 220},
    {"name": "100g of Almonds", "calories": 580},
    {"name": "300g of Greek Yogurt", "calories": 200},
    {"name": "150g of Oatmeal with Banana", "calories": 310},
    {"name": "100g of Cottage Cheese", "calories": 120},
]


def generate_fitness_plan_email(username, goal, activity_level, target_calories, protein, carbs, fats):
    """Generate personalized fitness plan using OpenAI"""
    prompt = f"""
    Create a personalized fitness plan email for {username} with the following details:
    - Goal: {goal}
    - Activity Level: {activity_level}
    - Daily Calorie Target: {target_calories}
    - Macronutrient Targets: {protein}g protein, {carbs}g carbs, {fats}g fats

    The email should:
    1. Start with a friendly greeting
    2. Summarize their fitness goals and targets
    3. Provide a 3-part plan covering:
       - Nutrition recommendations
       - Exercise suggestions based on activity level
       - Lifestyle tips
    4. Include motivational encouragement
    5. End with a call-to-action to check the app

    Use a warm, professional tone and format as HTML with headings.
    """

    try:
        completion = client.chat.completions.create(
            model="deepseek/deepseek-r1:free",
            messages=[
                {"role": "system",
                 "content": "You are a helpful fitness coach that creates personalized fitness plans."},
                {"role": "user", "content": prompt}
            ],
            timeout=10  # Set timeout directly in the API call
        )

        return completion.choices[0].message.content

    except Exception as e:
        print(f"Error generating fitness plan: {str(e)}")
        # Fallback generic email
        return f"""
        <h2>Welcome to Your Fitness Journey, {username}!</h2>
        <p>We're excited to help you achieve your {goal} goal!</p>

        <h3>Your Daily Targets:</h3>
        <ul>
            <li>Calories: {target_calories}</li>
            <li>Protein: {protein}g</li>
            <li>Carbs: {carbs}g</li>
            <li>Fats: {fats}g</li>
        </ul>

        <p>Based on your {activity_level} activity level, we recommend:</p>
        <ul>
            <li>Balanced meals focusing on whole foods</li>
            <li>Regular exercise appropriate for your level</li>
            <li>Adequate hydration and rest</li>
        </ul>

        <p>Login to the app to see your personalized plan!</p>
        """

client = OpenAI(
  base_url="https://openrouter.ai/api/v1",
  api_key=os.environ.get("OPENROUTER_API_KEY"),
)

NUTRITIONIX_URL = 'https://trackapi.nutritionix.com/v2/natural/nutrients'
HEADERS = {
    'Content-Type': 'application/json',
    'x-app-id': '185d86bd',
    'x-app-key': '05897ca9d90a6c7efc93d593bc0bf145',
    'x-remote-user-id': '0',
}

def generate_report_text(data):
    prompt = f"""
    Create a detailed daily fitness report using html formatting for good structure with the following data:

    User Profile:
    - Name: {data['user']['name']}
    - Goal: {data['user']['goal']}
    - Daily Calorie Target: {data['user']['target_calories']} kcal
    - Current Weight: {data['user']['current_weight']} kg
    {f"- Target Weight: {data['user']['target_weight']} kg" if data['user']['target_weight'] else ""}

    Today's Activity:
    - Calories Consumed: {data['today']['calories_consumed']} kcal
    - Calories Burned: {data['today']['calories_burned']} kcal
    - Net Calories: {data['today']['net_calories']} kcal
    - Workouts Completed: {data['today']['workouts_completed']}
    - Meals Logged: {data['today']['meals_logged']}

    Generate a 3-paragraph report that:
    1. Summarizes the user's daily performance
    2. Compares it to their goals
    3. Provides specific, actionable advice based on their fitness goal
    Use a friendly, motivational tone.
    4. dont write any other comments besides the report itself
    """

    try:
        completion = client.chat.completions.create(
            model="deepseek/deepseek-r1:free ",
            messages=[
                {"role": "system",
                 "content": "You are a helpful fitness coach name Ryan Nyabeze that generates personalized daily reports."},
                {"role": "user", "content": prompt}
            ]
        )
        return completion.choices[0].message.content
    except Exception as e:
        return f"""
        <h2>Daily Fitness Report</h2>
        <p>Here's your summary for today:</p>
        <ul>
            <li>Calories Consumed: {data['today']['calories_consumed']} kcal</li>
            <li>Calories Burned: {data['today']['calories_burned']} kcal</li>
            <li>Net Calories: {data['today']['net_calories']} kcal</li>
        </ul>
        <p>Keep working towards your {data['user']['goal']} goal!</p>
        """


def send_email(to_email, subject, html_content):
    # Configure your email settings
    sender = "ryannyabeze@yahoo.com"
    app_password = "utzfyulakaneuncy"  # Move to environment variables!

    # Create message - FIXED VERSION
    msg = MIMEMultipart()  # Changed from MIMEText to MIMEMultipart
    msg['From'] = sender
    msg['To'] = to_email
    msg['Subject'] = subject

    # Attach HTML content properly
    msg.attach(MIMEText(html_content, 'html'))

    # Send email
    try:
        with smtplib.SMTP("smtp.mail.yahoo.com", 587) as server:
            server.starttls()
            server.login(sender, app_password)
            server.send_message(msg)
        return True
    except Exception as e:
        print(f"Failed to send email: {str(e)}")
        return False


def get_target_body_parts_by_day():
    day = datetime.now().strftime('%A')

    return {
        'Monday': ['chest', 'triceps'],
        'Tuesday': ['back', 'biceps'],
        'Wednesday': ['legs', 'core'],
        'Thursday': ['shoulders', 'traps'],
        'Friday': ['full body', 'cardio'],
        'Saturday': ['core', 'mobility'],
        'Sunday': ['recovery']
    }.get(day, ['full body'])  # default fallback

# Create database tables within application context
with app.app_context():
    db.create_all()


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Prevent duplicate users
    if User.query.filter((User.username == username) | (User.email == email)).first():
        return jsonify({'message': 'Username or email already exists'}), 409

    user = User(username=username, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    # Auto-login after signup (return token)
    access_token = create_access_token(identity=user.id)
    return jsonify({'access_token': access_token}), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username_or_email = data.get('username')
    password = data.get('password')

    user = User.query.filter(
        (User.username == username_or_email) | (User.email == username_or_email)
    ).first()

    if user and user.check_password(password):
        access_token = create_access_token(identity=user.id)
        return jsonify({'access_token': access_token}), 200

    return jsonify({'message': 'Invalid credentials'}), 401


@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({'message': f'Welcome {user.username}'}), 200


@app.route('/fitness', methods=['POST'])
@jwt_required()
def save_fitness_data():
    current_user_id = get_jwt_identity()
    data = request.get_json()

    # Get user info for email - using modern SQLAlchemy 2.0 syntax
    user = db.session.get(User, current_user_id)  # Changed from User.query.get()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    try:
        # Validate required fields
        required_fields = ['age', 'weight_kg', 'height_cm', 'gender', 'activity_level', 'goal']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400

        # Get or create user profile
        profile = UserProfile.query.filter_by(user_id=current_user_id).first()

        if not profile:
            profile = UserProfile(user_id=current_user_id)
            db.session.add(profile)

        # Update profile data
        profile.age = int(data['age'])
        profile.weight = float(data['weight_kg'])
        profile.height = float(data['height_cm'])
        profile.gender = data['gender']
        profile.activity_level = data['activity_level']
        profile.goal = data['goal']

        # Calculate and update targets
        profile.calculate_targets()

        db.session.commit()

        # Generate personalized fitness plan email
        email_content = generate_fitness_plan_email(
            username=user.username,
            goal=data['goal'],
            activity_level=data['activity_level'],
            target_calories=profile.target_calories,
            protein=profile.target_protein,
            carbs=profile.target_carbs,
            fats=profile.target_fats
        )

        # Send email (in background if possible)
        send_email(
            to_email=user.email,
            subject="Your Personalized Fitness Plan",
            html_content=email_content
        )

        return jsonify({
            'message': 'Fitness profile updated successfully',
            'data': {
                'age': profile.age,
                'weight_kg': profile.weight,
                'height_cm': profile.height,
                'gender': profile.gender,
                'activity_level': profile.activity_level,
                'goal': profile.goal,
                'targets': {
                    'calories': profile.target_calories,
                    'protein_g': profile.target_protein,
                    'carbs_g': profile.target_carbs,
                    'fats_g': profile.target_fats,
                    'water_ml': profile.target_water
                }
            }
        }), 200

    except ValueError as e:
        db.session.rollback()
        return jsonify({'error': f'Invalid data format: {str(e)}'}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Server error: {str(e)}'}), 500


@app.route('/generate-workout', methods=['GET'])
@jwt_required()
def generate_workout():
    user_id = get_jwt_identity()
    user = db.session.get(User, user_id)  # ✅ Modern SQLAlchemy 2.0

    if not user:
        return jsonify({'error': 'User not found'}), 404

    profile = user.profile
    if not profile:
        return jsonify({'error': 'User profile not found'}), 404

    data = request.get_json(silent=True) or {}
    duration_minutes = data.get('duration_minutes', 45)

    target_body_parts = get_target_body_parts_by_day()

    system_prompt = f"""
        You are a fitness coach that generates personalized workout plans in structured JSON format.

        User Profile:
        - Age: {profile.age}
        - Sex: {profile.gender}
        - Goal: {profile.goal}
        - Weight: {profile.weight} kg
        - Target body parts: {', '.join(target_body_parts)}
        - Workout duration: {duration_minutes} minutes

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

    try:
        completion = client.chat.completions.create(
            model="deepseek/deepseek-r1:free",  # or another model name
            messages=[
                {"role": "user", "content": system_prompt}
            ]
        )

        ai_response = completion.choices[0].message.content

        # Clean AI response if needed
        ai_response = ai_response.strip().lstrip("```json").rstrip("```")
        workout_data = json.loads(ai_response)
        print(workout_data)

        return jsonify(workout_data), 200

    except Exception as e:
        return jsonify({'error': f'Failed to generate workout: {str(e)}'}), 500


@app.route('/get-total-calories', methods=['POST'])
def get_total_calories():
    try:
        body = request.get_json()
        foodlist = body.get('foodlist')

        if not isinstance(foodlist, list):
            return jsonify({'error': '"foodlist" must be a list of food items'}), 400

        total_calories = 0
        food_results = []

        for item in foodlist:
            food_name = item.get('food')
            weight = item.get('weight')

            if not food_name or not weight:
                return jsonify({'error': 'Each item in "foodlist" must contain "food" and "weight"'}), 400

            query = f"{weight} grams of {food_name}"
            response = requests.post(
                NUTRITIONIX_URL,
                json={'query': query},
                headers=HEADERS
            )

            if response.status_code != 200:
                return jsonify({'error': f'Nutritionix API error: {response.text}'}), 500

            food_data = response.json().get('foods')
            if not food_data:
                return jsonify({'error': 'No food data found for query'}), 404

            calories = food_data[0].get('nf_calories', 0)
            total_calories += calories
            food_results.append({
                'food': food_name,
                'weight': weight,
                'calories': calories
            })
            print(total_calories)

        return jsonify({
            'total_calories': total_calories,
            'details': food_results
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/generate-meals', methods=['GET'])
@jwt_required()
def generate_meals():
    try:
        # Get user ID from JWT
        user_id = get_jwt_identity()

        # Fetch user's target_calories
        user_profile = db.session.scalar(
            db.select(UserProfile).where(UserProfile.user_id == user_id)
        )
        if not user_profile or not user_profile.target_calories:
            return jsonify({"error": "User profile or target calories not found"}), 404

        calorie_goal = user_profile.target_calories

        # Setup timeout signal (15 seconds)


        try:
            # Prompt for meal generation
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
                    "HTTP-Referer": "https://your-site.com",
                    "X-Title": "YourAppName",
                },
                model="deepseek/deepseek-r1:free",
                messages=[
                    {"role": "user", "content": system_prompt}
                ]
            )

            signal.alarm(0)  # Cancel alarm after success

            response_text = completion.choices[0].message.content
            response_text = response_text.strip().lstrip("```json").rstrip("```")
            meals = json.loads(response_text)
            return jsonify(meals)


        except Exception as e:
            print(f"AI model error: {e}. Using fallback meals.")

        # Fallback logic: filter fallback meals to get ~target calories
        meals = []
        total_calories = 0
        calorie_limit = int(calorie_goal * 1.05)

        fallback_pool = FALLBACK_MEALS.copy()
        random.shuffle(fallback_pool)

        for meal in fallback_pool:
            if len(meals) >= 5:
                break
            if total_calories + meal["calories"] <= calorie_limit:
                meals.append(meal)
                total_calories += meal["calories"]

        return jsonify({"meals": meals})

    except json.JSONDecodeError:
        return jsonify({"error": "Failed to parse JSON from model response"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/user-profile', methods=['GET'])
@jwt_required()
def get_user_profile():
    user_id = get_jwt_identity()

    profile = UserProfile.query.filter_by(user_id=user_id).first()

    if not profile:
        return jsonify({'success': False, 'error': 'User profile not found'}), 404

    print(f'''
            current_weight : {profile.weight},
            calorie_goal : {profile.target_calories}
            ''')

    return jsonify({
        'success': True,
        'data': {
            'current_weight': profile.weight,
            'calorie_goal': profile.target_calories
        }
    }), 200


@app.route('/log-meals', methods=['POST'])
@jwt_required()
def log_meals():
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()

        # Validate required fields
        if not data or 'meals' not in data:
            return jsonify({'error': 'Missing meals data'}), 400

        meals = data['meals']
        if not isinstance(meals, list):
            return jsonify({'error': 'Meals should be an array'}), 400

        logged_meals = []
        current_time = datetime.now()

        for meal in meals:
            # Validate meal structure
            if not all(k in meal for k in ('name', 'calories')):
                continue

            new_meal = MealLog(
                user_id=current_user_id,
                name=meal['name'],
                calories=float(meal['calories']),
                logged_at=current_time
            )
            db.session.add(new_meal)
            logged_meals.append({
                'id': new_meal.id,
                'name': new_meal.name,
                'calories': new_meal.calories,
                'logged_at': current_time.isoformat()
            })

        db.session.commit()

        return jsonify({
            'success': True,
            'message': f'Successfully logged {len(logged_meals)} meals',
            'logged_meals': logged_meals,
            'total_calories': sum(m['calories'] for m in logged_meals)
        }), 200

    except ValueError as e:
        db.session.rollback()
        return jsonify({'error': f'Invalid number format: {str(e)}'}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Server error: {str(e)}'}), 500


@app.route('/get-meals', methods=['GET'])
@jwt_required()
def get_meals():
    try:
        current_user_id = get_jwt_identity()

        # Get optional date filter from query params
        date_filter = request.args.get('date')
        query = MealLog.query.filter_by(user_id=current_user_id)

        if date_filter:
            try:
                filter_date = datetime.strptime(date_filter, '%Y-%m-%d').date()
                query = query.filter(
                    db.func.date(MealLog.logged_at) == filter_date
                )
            except ValueError:
                return jsonify({'error': 'Invalid date format (use YYYY-MM-DD)'}), 400

        meals = query.order_by(MealLog.logged_at.desc()).all()

        return jsonify({
            'success': True,
            'meals': [{
                'id': m.id,
                'name': m.name,
                'calories': m.calories,
                'logged_at': m.logged_at.isoformat()
            } for m in meals],
            'total_calories': sum(m.calories for m in meals)
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/log-workout', methods=['POST'])
@jwt_required()
def log_workout():
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()

        # Validate required fields
        if not data or 'workout' not in data:
            return jsonify({'error': 'Missing workout data'}), 400

        workout_data = data['workout']

        # Create notes from difficulty/soreness if available
        notes = ""
        if 'difficulty' in workout_data and 'soreness' in workout_data:
            notes = f"Difficulty: {workout_data['difficulty']}/5, Soreness: {workout_data['soreness']}/5"

        new_workout = Workout(
            user_id=current_user_id,
            name=workout_data.get('name', datetime.now().strftime('%A')),  # Default to day of week
            calories_burned=workout_data.get('calories_burned', 0),
            exercises=workout_data.get('exercises', []),
            completed=True,
            scheduled_date=datetime.now().date(),
            completed_at=datetime.now(),
            notes=notes
        )

        db.session.add(new_workout)
        db.session.commit()

        return jsonify({
            'success': True,
            'message': 'Workout logged successfully',
            'workout_id': new_workout.id
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/send-daily-report', methods=['POST'])
@jwt_required()
def send_daily_report():
    try:
        current_user_id = get_jwt_identity()

        # Get user profile data
        user = User.query.get(current_user_id)
        if not user:
            return jsonify({'success': False, 'error': 'User not found'}), 404

        profile = UserProfile.query.filter_by(user_id=current_user_id).first()
        if not profile:
            return jsonify({'success': False, 'error': 'Profile not found'}), 404

        # Calculate date range for today
        today = datetime.now().date()
        start_of_day = datetime.combine(today, datetime.min.time())
        end_of_day = datetime.combine(today, datetime.max.time())

        # Get workout data
        workouts_today = Workout.query.filter(
            Workout.user_id == current_user_id,
            Workout.completed_at >= start_of_day,
            Workout.completed_at <= end_of_day

        ).all()

        total_calories_burned = sum(w.calories_burned for w in workouts_today if w.calories_burned)

        # Get meal data
        meals_today = MealLog.query.filter(
            MealLog.user_id == current_user_id,
            MealLog.logged_at >= start_of_day,
            MealLog.logged_at <= end_of_day
        ).all()

        total_calories_consumed = sum(m.calories for m in meals_today if m.calories)

        # Prepare data for AI analysis
        report_data = {
            'user': {
                'name': user.username,
                'email': user.email,
                'goal': profile.goal,
                'target_calories': profile.target_calories,
                'current_weight': profile.weight,
                'target_weight': profile.target_weight if hasattr(profile, 'target_weight') else None
            },
            'today': {
                'calories_consumed': total_calories_consumed,
                'calories_burned': total_calories_burned,
                'net_calories': total_calories_consumed - total_calories_burned,
                'workouts_completed': len(workouts_today),
                'meals_logged': len(meals_today)
            }
        }

        # Generate report text with AI
        report_text = generate_report_text(report_data)
        print(report_text)

        # Send email
        send_email(
            to_email=user.email,
            subject=f"Your Daily Fitness Report - {today.strftime('%B %d, %Y')}",
            html_content=report_text
        )

        return jsonify({
            'success': True,
            'message': 'Daily report sent successfully'
        })

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)