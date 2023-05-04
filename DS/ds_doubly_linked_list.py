class Node:
    def __init__(self, data) -> None:
        self.prev = None
        self.data = data
        self.next = None

class doubly_linked_list:
    def __init__(self) -> None:
        self.head = None
    
    # Forward Traversing:
    def print_LL(self):
        print()
        if self.head is None:
            print("Linked List is empty!")
        else:
            n = self.head
            while n is not None:
                print(n.data, end=",")
                n = n.next

    # Backward Traversing:
    def print_LL_reverse(self):
        print()
        if self.head is None:
            print("Linked List is empty!")
        else:
            n = self.head
            while n.next is not None:
                n = n.next
            while n is not None:
                print(n.data, end=",")
                n = n.prev

    def insert_empty(self,data):
      if self.head is None:
          new_node = Node(data)
          self.head = new_node
      else:
          print("Linked List is not empty!")

    def add_begin(self,data):
        new_node = Node(data)
        if self.head is None:
            self.head = new_node
        else:
            new_node.next = self.head
            self.head.prev = new_node
            self.head = new_node

    def add_end(self,data):
        new_node = Node(data)
        if self.head is None:
            self.head = new_node
        else:
            n = self.head
            while n.next is not None:
                n = n.next
            n.next = new_node
            new_node.prev = n

    def add_after(self,data,x):
          if self.head is None:
              print("LL is empty!")
          else:
              n =self.head
              while n is not None:
                  if x==n.data:
                      break
                  n = n.nref
              if n is None:
                  print("Given Node is not present in DLL")
              else:
                  new_node = Node(data)
                  new_node.nref = n.nref
                  new_node.pref = n
                  if n.nref is not None:
                      n.nref.pref = new_node
                  n.nref = new_node
                  
    def add_before(self,data,x):
        if self.head is None:
            print("LL is empty!")
        else:
            n = self.head
            while n is not None:
                if x==n.data:
                    break
                n = n.nref
            if n is None:
                print("Given Node is not present in DLL")
            else:
                new_node = Node(data)
                new_node.nref = n
                new_node.pref = n.pref                
                if n.pref is not None:
                    n.pref.nref = new_node
                else:
                    self.head = new_node
                n.pref = new_node
                
    def delete_begin(self):
          if self.head is None:
              print("DLL is empty can't delte !")
              return
          if self.head.nref is None:
              self.head = None
              print("DLL is empty after deleting the node!")
          else:
              self.head = self.head.nref
              self.head.pref = None
              
    def delete_end(self):
        if self.head is None:
            print("DLL is empty can't delte !")
            return
        if self.head.nref is None:
            self.head = None
            print("DLL is empty after deleting the node!")
        else:
            n = self.head
            while n.nref is not None:
                n = n.nref
            n.pref.nref = None

    def delete_by_value(self,x):
        if self.head is None:
            print("DLL is empty can't delte !")
            return
        if self.head.nref is None:
            if x==self.head.data:
                self.head = None
            else:
                print("x is not present in DLL")
            return
        if self.head.data == x:
            self.head = self.head.nref
            self.head.pref = None
            return
        n = self.head
        while n.nref is not None:
            if x==n.data:
                break
            n = n.nref
        if n.nref is not None:
            n.nref.pref = n.pref
            n.pref.nref = n.nref
        else:
            if n.data==x:
                n.pref.nref = None
            else:
                print("x is not present in dll!")

dList = doubly_linked_list();    
#Add nodes to the list    
dList.add_end(1);    
dList.add_end(2);    
dList.add_end(3);    
dList.add_end(4);    
dList.add_end(5);    
     
#Displays the nodes present in the list    
dList.print_LL();  
dList.print_LL_reverse();  