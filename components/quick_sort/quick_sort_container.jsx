import { connect } from 'react-redux';
import { getQuickSort } from '../../actions/quick_sort_actions';
import QuickSort from './quick_sort'

const mapStateToProps = ({quickSort}, ownProps) => {
  return {
    quickSort: quickSort
  }
};

const mapDispatchToProps = dispatch => ({
  getQuickSort: (array) => dispatch(getQuickSort(array))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (QuickSort)
