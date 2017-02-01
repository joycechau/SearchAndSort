import { connect } from 'react-redux';
import { getMergeSort } from '../../actions/merge_sort_actions';
import MergeSort from './merge_sort'

const mapStateToProps = ({mergeSort}, ownProps) => {
  return {
    mergeSort: mergeSort.data
  }
}

const mapDispatchToProps = dispatch => ({
  getMergeSort: (data) => dispatch(getMergeSort(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (MergeSort)
