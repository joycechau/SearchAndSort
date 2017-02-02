
def binary_search(numbers, target)
  return nil if numbers.empty?
  midpoint = numbers.length / 2

  case target <=> numbers[midpoint]
  when -1
    binary_search(numbers.take(midpoint), target)
  when 0
    midpoint
  when 1
    sub_answer = binary_search(numbers.drop(midpoint + 1), target)
    sub_answer.nil? ? nil : (midpoint + 1) + sub_answer
  end
end
