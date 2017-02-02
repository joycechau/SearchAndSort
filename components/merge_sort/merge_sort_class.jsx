import React from 'react';


export default class MergeSort extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      merge_deconstructed_hash: {},
      decon_iteration: 0,
      merge_reconstructed_hash: {},
      recon_iteration: 0
    };

    this.merge = this.merge.bind(this);
    this.mergeSort = this.mergeSort.bind(this);
  }

  mergeSort(array){
    let length = array.length;
    if (length === 1) { return array; }
debugger
    let mid = Math.floor(length / 2);
    let left = array.slice(0, mid);
    let right = array.slice(mid);

    this.state.merge_deconstructed_hash[this.state.decon_iteration] = [left, right];
    this.state.decon_iteration += 1;
debugger
    let sortedLeft = this.mergeSort(left);
debugger
    let sortedRight = this.mergeSort(right);
debugger
    return this.merge(sortedLeft, sortedRight);
  }

  merge(left, right){
    let array = [];
    while (left.length && right.length) {
      (right[0] < left[0]) ? array.push(right.shift()) : array.push(left.shift());
    }
    while (left.length) {
      array.push(left.shift());
    }
    while (right.length) {
      array.push(right.shift());
    }
    return array;
  }

  render() {
    return(
      <div>{this.mergeSort([8,7,6,5,4,3,2,1])}</div>
    );
  }
}
