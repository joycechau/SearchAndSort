
def bsearch(nums, target, low = 0, high = -1):
    if not nums: return -1
    if(high == -1): high = len(nums)-1
    if low >= high:
        if nums[low] == target: return low
        else: return -1
    mid = (low+high)//2
    if nums[mid] > target: return bsearch(nums, target, low, mid-1)
    elif nums[mid] < target: return bsearch(nums, target, mid+1, high)
    else: return mid
