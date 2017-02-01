import React from 'react';
import { Router, Route, IndexRoute, hashHistory, withRouter, IndexRedirect } from 'react-router';
import {Provider} from 'react-redux';
import App from './app';
import BubbleSortContainer from './bubble_sort/bubble_sort_container';
import BinarySearchContainer from './binary_search/binary_search_container';
import QuickSortContainer from './quick_sort/quick_sort_container';
import MergeSortContainer from './merge_sort/merge_sort_container';

const Root =({store}) => {
  return(
    <Provider store={ store }>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="bubblesort" component={BubbleSortContainer}/>
          <Route path="bsearch" component={BinarySearchContainer}/>
          <Route path="quicksort" component={QuickSortContainer}/>
          <Route path="mergesort" component={MergeSortContainer}/>
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
