
def merge_sort
	return array if count < 2

	middle = count / 2

	left, right = array.take(middle), array.drop(middle)
	sorted_left, sorted_right = left.merge_sort, right.merge_sort

	merge(sorted_left, sorted_right)
end

def merge(left, right)
	merged_array = []
	until left.empty? || right.empty?
		merged_array <<
			((left.first < right.first) ? left.shift : right.shift)
	end

	merged_array + left + right
end
