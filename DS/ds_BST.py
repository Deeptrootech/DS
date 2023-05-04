# 1) A Binary Search Tree is a data structure that enables us
#    to keep a list of numbers that is sorted.

# 2) A Binary Search Tree Python is used to find any
#    element present in a Binary Search Tree in just O(n) worst-case time.

# 3) Left_Subtree(node) <= node <= Right_Subtree(node)


# ********* Perfect Binary Tree *********:
# 1. All the Internal nodes must having two children.
# 2. All the leaf nodes are at the same level.

# Example :
#          A1
#      B1       B2
#   C1    C2  C3  C4

# ********* Complete Binary Tree *********:
# 1. All the levels are completely filled except possibly the last level

# Example :
#          A1
#      B1       B2
#   C1    C2  C3  C4
# D1  D2 D3

# ********* Full Binary Tree *********:
# 1. Simply Every node has 0 or 2 children.

# Example :

#          A1
#      B1       B2
#   C1    C2  C3  C4
# D1  D2

class BST:
     def __init__(self, data):
          self.key = data
          self.left = None
          self.right = None

     def insert(self, data):
          if self.key is None:
               self.key = data
               return
          if self.key == data:
               return
          if self.key > data:
               if self.left:
                    self.left.insert(data)
               else:
                    self.left = BST(data)
          else:
               if self.right:
                    self.right.insert(data)
               else:
                    self.right = BST(data)
     def BST_search(self, find_key):
          if self.key == find_key:    
               print("The node is found!")
               return
          if find_key < self.key:   
               if self.left:   
                    self.left.BST_search(find_key)
               else:
                    print("Node is not present in tree!")
          else:
               if self.right:
                    self.right.BST_search(find_key) 
               else:   
                    print("Node is not present in tree!") 
def delete_Node(root, del_key):
     # if root doesn't exist, just return it
     if not root: 
          print("Tree is Empty")
          return root
     # Find the node in the left subtree if del_key value is less than root value
     if del_key < root.key: 
          if root.left:
               root.left = delete_Node(root.left, del_key)
          else:
               print("Given Node is not present in tree!") 
     # Find the node in right subtree if del_key value is greater than root value, 
     elif del_key > root.key: 
          if root.right:
               root.right= delete_Node(root.right, del_key)
          else:
               print("Given Node is not present in tree!") 
     # Delete the node if root.value == del_key
     else: 
          # If there is no right children delete the node and new root would be root.left
          if not root.right:
               temp = root.left
               root = None
               return temp
          # If there is no left children delete the node and new root would be root.right	
          if not root.left:
               temp = root.right
               root = None
               return temp
          # If both left and right children exist in the node replace its value with 
          # the minmimum value in the right subtree. Now delete that minimum node
          # in the right subtree
          temp_val = root.right

          while temp_val.left:
               temp_val = temp_val.left
               mini_val = temp_val.key
          # Delete the minimum node in right subtree
          root.right = root.right.delete(temp_val.key)
     return root    
           
# Function to display the output of the tree
def inorder(root):
     if root:
          inorder(root.left)
          print(root.key,end=",")
          inorder(root.right)
def preorder(root):
     if root:
          print(root.key,end=",")
          preorder(root.left)
          preorder(root.right)
def postorder(root):
     if root:
          postorder(root.left)
          postorder(root.right)          
          print(root.key,end=",")


if __name__ == '__main__':
     root = BST(10)
     list1 = [6,3,1,3,98,3,7]
     for i in list1:
          root.insert(i)

     root.BST_search(10)
     print(f"InOrder: ")
     inorder(root)
     print()
     print(f"PreOrder: ")
     preorder(root)
     print()
     print(f"PostOrder: ")
     postorder(root)

     print()
     delete_Node(root, 7)
     print(f"InOrder: ")
     inorder(root)
     print()
     print(f"PreOrder: ")
     preorder(root)
     print()
     print(f"PostOrder: ")
     postorder(root)
