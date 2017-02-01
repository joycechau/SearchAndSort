import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import {getBubbleSolution} from './actions/bubble_sort_actions';
import {getBinarySearch} from './actions/binary_search_actions';


document.addEventListener('DOMContentLoaded', () => {
  window.getBinarySearch = getBinarySearch;
  window.getBubbleSolution = getBubbleSolution;
  const store = configureStore();
  window.store = store;
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store}/>, root);
});
