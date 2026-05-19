from datetime import datetime, time
from extensions import db
from werkzeug.security import generate_password_hash, check_password_hash


# ====================== USER MODELS ======================
class User(db.Model):
    __tablename__ = 'user'  # Changed from 'users' to match foreign key references

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class UserProfile(db.Model):
    __tablename__ = 'user_profiles'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True, nullable=False)

    # Biometrics
    age = db.Column(db.Integer)
    weight = db.Column(db.Float)  # kg
    height = db.Column(db.Float)  # cm
    gender = db.Column(db.String(20))  # 'male', 'female', 'non_binary', 'other'

    # Goals
    goal = db.Column(db.String(50))  # 'muscle_gain', 'weight_loss', 'maintenance'
    activity_level = db.Column(db.String(50))  # 'sedentary', 'lightly_active', etc.

    # Calculated Targets
    target_calories = db.Column(db.Integer)
    target_protein = db.Column(db.Integer)  # grams
    target_carbs = db.Column(db.Integer)  # grams
    target_fats = db.Column(db.Integer)  # grams
    target_water = db.Column(db.Integer)  # ml


    def calculate_targets(self):
        """Calculate nutrition targets based on profile data"""
        # BMR Calculation
        if self.gender.lower() in ('male', 'm'):
            bmr = 88.362 + (13.397 * self.weight) + (4.799 * self.height) - (5.677 * self.age)
        else:
            bmr = 447.593 + (9.247 * self.weight) + (3.098 * self.height) - (4.330 * self.age)

        # Activity multiplier
        multipliers = {
            'sedentary': 1.2,
            'lightly_active': 1.375,
            'moderately_active': 1.55,
            'very_active': 1.725,
            'extra_active': 1.9
        }
        tdee = bmr * multipliers.get(self.activity_level.lower(), 1.2)

        # Goal adjustment
        if self.goal == 'weight_loss':
            self.target_calories = int(tdee * 0.8)
        elif self.goal == 'muscle_gain':
            self.target_calories = int(tdee * 1.1)
        else:  # maintenance
            self.target_calories = int(tdee)

        # Macronutrients
        self.target_protein = int(self.weight * (2.2 if self.goal == 'muscle_gain' else 1.6))
        self.target_fats = int((self.target_calories * 0.25) / 9)  # 25% of calories from fat
        self.target_carbs = int((self.target_calories - (self.target_protein * 4 + self.target_fats * 9)) / 4)
        self.target_water = int(self.weight * 35)  # 35ml/kg


# ====================== TRACKING MODELS ======================
class MealLog(db.Model):
    __tablename__ = 'meal_logs'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    calories = db.Column(db.Float, nullable=False)
    protein = db.Column(db.Float)
    carbs = db.Column(db.Float)
    fats = db.Column(db.Float)
    image_url = db.Column(db.String(255))  # For ML-analyzed meals
    meal_type = db.Column(db.String(20))  # 'breakfast', 'lunch', 'dinner', 'snack'
    logged_at = db.Column(db.DateTime, default=datetime.now)
    is_ml_analyzed = db.Column(db.Boolean, default=False)


class WaterLog(db.Model):
    __tablename__ = 'water_logs'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    amount = db.Column(db.Integer, nullable=False)  # in ml
    logged_at = db.Column(db.DateTime, default=datetime.utcnow)


class SleepLog(db.Model):
    __tablename__ = 'sleep_logs'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    duration = db.Column(db.Float, nullable=False)  # in hours
    quality = db.Column(db.Integer)  # 1-5 scale
    date = db.Column(db.Date, nullable=False)  # Just date
    bedtime = db.Column(db.Time)
    wake_time = db.Column(db.Time)
    notes = db.Column(db.Text)


class Workout(db.Model):
    __tablename__ = 'workouts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    duration = db.Column(db.Integer)  # in minutes
    calories_burned = db.Column(db.Integer)
    exercises = db.Column(db.JSON, nullable=False)  # List of exercises with sets/reps
    completed = db.Column(db.Boolean, default=False)
    scheduled_date = db.Column(db.Date)
    completed_at = db.Column(db.DateTime)
    notes = db.Column(db.Text)


class ProgressPhoto(db.Model):
    __tablename__ = 'progress_photos'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    notes = db.Column(db.Text)
    taken_at = db.Column(db.DateTime, default=datetime.now)
    body_fat_estimate = db.Column(db.Float)  # Optional from ML analysis
    front_view = db.Column(db.Boolean, default=True)  # Front/side/back view


# Add relationships to User model AFTER all models are defined
User.meal_logs = db.relationship('MealLog', backref='user', lazy=True, cascade='all, delete-orphan')
User.water_logs = db.relationship('WaterLog', backref='user', lazy=True, cascade='all, delete-orphan')
User.sleep_logs = db.relationship('SleepLog', backref='user', lazy=True, cascade='all, delete-orphan')
User.workouts = db.relationship('Workout', backref='user', lazy=True, cascade='all, delete-orphan')
User.progress_photos = db.relationship('ProgressPhoto', backref='user', lazy=True, cascade='all, delete-orphan')
User.profile = db.relationship('UserProfile', backref='user', uselist=False, cascade='all, delete-orphan')