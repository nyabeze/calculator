import pandas as pd
import ast
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib

# 1. Load your CSV
data = pd.read_csv("workout_data.csv")  # Update path if needed

# 2. Convert JSON-like strings to Python lists of dicts
data["workout"] = data["workout"].apply(ast.literal_eval)  # Fix typo: "workout" not "workout"

# 3. Flatten workouts into strings (e.g., "Push-Ups:3x12;Squats:3x10")
data["workout_str"] = data["workout"].apply(
    lambda w: ";".join([f"{ex['name']}:{ex['sets']}x{ex['reps']}" for ex in w])
)

# 4. Encode workout strings as numeric labels
encoder = LabelEncoder()
data["workout_label"] = encoder.fit_transform(data["workout_str"])

# 5. Define features (X) and target (y)
X = data[["sex", "age", "weight", "height", "goal"]]
y = data["workout_label"]

# # 6. Split data into training and testing sets
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
#
# # 7. Train a Random Forest classifier
# model = RandomForestClassifier(n_estimators=50, max_depth=5, random_state=42)
# model.fit(X_train, y_train)
#
# # 8. Evaluate accuracy
# accuracy = model.score(X_test, y_test)
# print(f"Model Accuracy: {accuracy:.2f}")  # Aim for >70%
#
# joblib.dump(model, "workout_model.joblib")
# joblib.dump(encoder, "label_encoder.joblib")
# print("Model and encoder saved!")


# 10. Example prediction
# def predict_workout(sex, age, weight, height, goal):
#     model = joblib.load("workout_model.joblib")
#     encoder = joblib.load("label_encoder.joblib")
#
#     # Predict
#     user_input = [[sex, age, weight, height, goal]]
#     predicted_label = model.predict(user_input)[0]
#     workout_str = encoder.inverse_transform([predicted_label])[0]
#
#     # Reconstruct workout plan
#     exercises = []
#     for ex in workout_str.split(";"):
#         name, sets_reps = ex.split(":")
#         sets, reps = sets_reps.split("x")
#         exercises.append({
#             "name": name,
#             "sets": int(sets),
#             "reps": int(reps),
#             "calories_burned": 10 * int(sets)  # Placeholder
#         })
#
#     return {
#         "workout": exercises,
#         "total_calories_burned": sum(ex["calories_burned"] for ex in exercises),
#         "tip": "Adjust weights as needed!"  # Rule-based tip
#     }
#
#
# def predict_workout(sex, age, weight, height, goal):
#     model = joblib.load("workout_model.joblib")
#     encoder = joblib.load("label_encoder.joblib")
#
#     # Predict
#     user_input = [[sex, age, weight, height, goal]]
#     predicted_label = model.predict(user_input)[0]
#     workout_str = encoder.inverse_transform([predicted_label])[0]
#
#     # Reconstruct workout plan
#     exercises = []
#     for ex in workout_str.split(";"):
#         name, sets_reps = ex.split(":")
#         sets, reps = sets_reps.split("x")
#         exercises.append({
#             "name": name,
#             "sets": int(sets),
#             "reps": int(reps),
#             "calories_burned": 10 * int(sets)  # Placeholder
#         })
#
#     return {
#         "workout": exercises,
#         "total_calories_burned": sum(ex["calories_burned"] for ex in exercises),
#         "tip": "Adjust weights as needed!"  # Rule-based tip
#     }
#
#
# # Test
# print(predict_workout(0, 30, 75, 180, 0))