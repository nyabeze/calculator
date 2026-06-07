student_heights = input().split()
for a in range(0 , len(student_heights)) :
    student_heights[a] = int(student_heights[a])

total_height = 0
for height in student_heights :
    total_height += height
print(f"total height = {total_height}")

no_of_students = 0
for students in student_heights :
    no_of_students += 1
print(f"the number of students = {no_of_students}")

average_height = round(total_height / no_of_students)
print(f"average height = {average_height}")


