import { connect } from 'react-redux';
import { getBubbleSort } from '../../actions/bubble_sort_actions';
import BubbleSort from './bubble_sort'

const mapStateToProps = ({bubbleSort}, ownProps) => {
  return {
    bubbleSort: bubbleSort
  }
};


const mapDispatchToProps = dispatch => ({
  getBubbleSort: (array) => dispatch(getBubbleSort(array))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (BubbleSort)
