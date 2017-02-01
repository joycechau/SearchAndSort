import { connect } from 'react-redux';
import { getBinarySearch } from '../../actions/binary_search_actions';
import BinarySearch from './binary_search';


const mapStateToProps = ({binarySearch}, ownProps) => {
  return ({
    binarySearch: binarySearch
  });
};

const mapDispatchToProps = dispatch => ({
  getBinarySearch: (array) => dispatch(getBinarySearch(array))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BinarySearch);
