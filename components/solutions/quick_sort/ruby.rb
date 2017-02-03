
class Array
  def quick_sort
    return self if length <= 1
    pivot = self[0]
    less, greater = self[1..-1].partition { |x| x < pivot }
    less.quick_sort + [pivot] + greater.quick_sort
  end
end
