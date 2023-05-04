import queue
# Create an empty queue
q = queue.Queue()
# Add elements to the queue
q.put('red')
q.put('green')
q.put('blue')
# Check if the queue is empty
if q.empty():
    print('Queue is empty')
else:
    print('Queue is not empty')
# Get the size of the queue
print('Queue size:', q.qsize())
# Remove elements from the queue
print('Removing', q.get())
print('Removing', q.get())
print('Removing', q.get())
# Check if the queue is empty again
if q.empty():
    print('Queue is empty')
else:
    print('Queue is not empty')
elements = list(q.queue)
# Iterate over the list of elements
for elem in elements:
    print(elem)