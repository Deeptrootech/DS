# create a 2D array of size 3x4
# import numpy as np --> sorting can be done using numpy

rows = 3
cols = 4
matrix = [[i+j for j in range(cols)] for i in range(rows)]
transposed_matrix = list(zip(*matrix))

def print_matrix(m1):
    for i in m1:
        if isinstance(i,list) or isinstance(i,tuple):
            print_matrix(i)
            print()
        else:
            print(i, end=" ")

def search_value_from_matrix(m1,search_value):
    for i in m1:
        if isinstance(i,list) or isinstance(i,tuple):
            search_value_from_matrix(i,search_value)
        else:
            if i == search_value:
                print("Search Found")
                
            

print("Normal matrix")            
print_matrix(matrix)
print()
print("transposed matrix")
print_matrix(transposed_matrix)
print()
search_value_from_matrix(matrix,2)