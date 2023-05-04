# Deque implementaion in python O(1) for enqueue and dequeue

from collections import deque
# create an empty deque
d = deque()
# add some elements to the deque
d.append(1)
d.append(2)
d.append(3)
# get the length of the deque
length = len(d)
print(length)  # output: 3
# check if the deque is empty
is_empty = not d
print(is_empty) # output: False
# remove all elements from the deque
d.clear()
# get the length of the deque
length = len(d)
print(length) # output: 0
# check if the deque is empty
is_empty = not d
print(is_empty) # output: True