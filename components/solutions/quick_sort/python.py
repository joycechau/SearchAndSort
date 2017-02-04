
def quickSort(array):
    less = []
    pivot = []
    more = []
    if len(array) <= 1:
        return array
    else:
        pivot = array[0]
        for i in array:
            if i < pivot:
                less.append(i)
            elif i > pivot:
                more.append(i)
            else:
                pivot.append(i)
        less = quickSort(less)
        more = quickSort(more)
        return less + pivot + more
