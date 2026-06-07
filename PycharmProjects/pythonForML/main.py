import numpy as np

n1 = np.array([1, 2, 3, 4, 5, 6])
n11 = np.array([2, 5, 7, 9, 9, 4])

print(n1)
print(type(n1))

n2 = np.array([[1, 2, 3, 4, 5, 6], [10, 20, 30, 40, 50, 60]])
print(n2)

n3 = np.zeros((1, 2))
print(n3)

n4 = np.full((2, 2), 10)
print(n4)

n5 = np.arange(10, 120)
print(n5)

n6 = np.arange(12, 90, 6)
print(n6)

n_random = np.random.randint(1, 100, 8)
print(n_random)

n8 = np.hstack((n1, n6))
print(n8)

set_intersect = np.intersect1d(n_random, n6)
set_diff = np.setdiff1d(n_random, n6)
print(set_intersect)
print(set_diff)