#(For heapq): https://medium.com/plain-simple-software/python-heapq-use-cases-and-time-complexity-ee7cbb60420f#:~:text=The%20Python%20heapq.,function%20runs%20in%20linear%20time.


# Complete BST which satisfies the following heap property...
      # 1) min heap property: key of every parent is lesser or equal to child node's key
      # 2) max heap property: key of every parent is greater or equal to child node's key

# # ***********************  IMP ***************************
# # use of binary heap :
# #       1) To find nth largest/smallest element in list of numbers
# #       2) To implement priority queue 
# #       (deques highest priority element first in random list unlike normal queues' FIFO)

# # -------------- Using heapq we can perform all above uses (Amulya's academy video : 55)
# #       1) heapq.nlargest(n,list), heapq.nsmallest(n,list)  ---> O(m+ lon(n)) (almost linear)
# #       2) Heappop and heappush -----> O(log(n))
# #       ---> heappop returns the smallest element. 
# #            This is because heapq implements heaps as Min Heaps.


# min-heap:
#       1
#     /   \
#    2     3
#  /  \   / \
# 4   11

# max-heap:
#       11
#     /    \
#    4      3
#  /  \    / \
# 2    1



# *************** Note that a binary heap is not always a Binary Search Tree. ****************
#       1
#     /   \
#    3     2
#    This is a valid min-heap, but an invalid binary search tree.
#       1
#     /   \
#    2     3
#    This is a valid min-heap that also happens to be a binary search tree.


# ***************** STACK VS HEAP DS *************************** 
# STACK:- 1) Memory is allocated in a "contiguous block".
#         2) Automatic by compiler instructions.
#         3) Static memory allocation is preferred in an array.
#         4) 4) size smaller then heap memory.
          
# HEAP:-  1) Memory is allocated in any "random order".
#         2) Manual by the programmer.
#         3) Heap memory allocation is preferred in the linked list. 
#         4) larger then stack memory. 
