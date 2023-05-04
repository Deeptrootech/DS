# Implement a stack using a list data structure

class stack:
  def __new__(cls):
    return super().__new__(cls)
  
  def __init__(self) -> None:
    self.item = []

  def get_stack(self):
    return self.item
  
  def push(self, data):
    return self.item.append(data)

  def pop(self):
    return self.item.pop()

  def peek(self):
    try:
      return self.item[-1]
    except:
      return "Stack is empty"

s1 = stack()
s1.push(100)
print(s1.peek())
print(s1.pop())
s2= stack()
print(s1.get_stack())