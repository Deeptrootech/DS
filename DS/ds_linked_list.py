class Node:
    def __init__(self, value):
        self.value = value
        self.next = None
class LinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
    def add_node(self, value):
        new_node = Node(value)
        if self.head is None:
            self.head = new_node
        else:
            self.tail.next = new_node
        self.tail = new_node
    def insert_at_beginning(self, value):
        new_node = Node(value)
        new_node.next = self.head
        self.head = new_node
    def insert_between_nodes(self, prev_node_value, new_node_value):
        new_node = Node(new_node_value)
        current_node = self.head
        while current_node is not None:
            if current_node.value == prev_node_value:
                new_node.next = current_node.next
                current_node.next = new_node
                if current_node == self.tail:
                    self.tail = new_node
                return
            current_node = current_node.next
        print(f"Error: {prev_node_value} not found in linked list")
    def delete_node(self, value):
        current_node = self.head
        if current_node is not None and current_node.value == value:
            self.head = current_node.next
            current_node = None
            return
        while current_node is not None:
            if current_node.value == value:
                break
            prev_node = current_node
            current_node = current_node.next
        if current_node == None:
            return
        prev_node.next = current_node.next
        current_node = None
    def traverse(self):
        current_node = self.head
        while current_node is not None:
            print(current_node.value)
            current_node = current_node.next
my_list = LinkedList()
my_list.add_node(100)
my_list.add_node(200)
my_list.add_node(300)
my_list.insert_at_beginning(100)
my_list.add_node(300)
my_list.insert_between_nodes(100, 200)
my_list.delete_node(200)
my_list.traverse()