import React from 'react';
import { hashHistory } from 'react-router';


export default class Header extends React.Component{
  constructor(props) {
    super(props);
    this.handleBinarySearchButton = this.handleBinarySearchButton.bind(this);
    this.handleQuickSortButton = this.handleQuickSortButton.bind(this);
    this.handleMergeSortButton = this.handleMergeSortButton.bind(this);
  }

  handleBinarySearchButton(e) {
    e.preventDefault();
    $(".bsearch-button").addClass("selected-button");
    $(".quicksort-button").removeClass("selected-button");
    $(".mergesort-button").removeClass("selected-button");
    hashHistory.push('/bsearch');
  }

  handleQuickSortButton(e) {
    e.preventDefault();
    $(".quicksort-button").addClass("selected-button");
    $(".bsearch-button").removeClass("selected-button");
    $(".mergesort-button").removeClass("selected-button");
    hashHistory.push('/quicksort');
  }

  handleMergeSortButton(e) {
    e.preventDefault();
    $(".mergesort-button").addClass("selected-button");
    $(".bsearch-button").removeClass("selected-button");
    $(".quicksort-button").removeClass("selected-button");
    hashHistory.push('/mergesort');
  }

  render() {
    return (
      <div>
        <div className="header-main">
          <div className="header-title">
            Search and Sort Visualizer
          </div>
          <div className="collaborators">
            <div className="collaborators-title">
              Collaborators:
            </div>
            <div className="authors">
              <div className="andrew">
                <div>Andrew Yueh</div>
                <div className="links">
                  <a href="https://www.linkedin.com/in/andrewyueh/"
                    target="_blank"
                    className="linkedin-link">
                    <img src="https://res.cloudinary.com/joycechau/image/upload/v1486025481/linkedin2.png"
                      alt="linkedin"
                      className="linkedin-image"/>
                  </a>
                  <a href="https://github.com/andrew1007"
                    target="_blank"
                    className="github-link">
                    <img src="https://res.cloudinary.com/joycechau/image/upload/c_scale,w_20/v1485282244/github.png"
                      alt="github"
                      className="github-image"/>
                  </a>
                </div>
              </div>
              <div className="jeffrey">
                <div>Jeffrey Fan</div>
                <div className="links">
                  <a href="https://www.linkedin.com/in/jeffrey-fan"
                    target="_blank"
                    className="linkedin-link">
                    <img src="https://res.cloudinary.com/joycechau/image/upload/v1486025481/linkedin2.png"
                      alt="linkedin"
                      className="linkedin-image"/>
                  </a>
                  <a href="https://github.com/jeffreyfan93"
                    target="_blank"
                    className="github-link">
                    <img src="https://res.cloudinary.com/joycechau/image/upload/c_scale,w_20/v1485282244/github.png"
                      alt="github"
                      className="github-image"/>
                  </a>
                </div>
              </div>
              <div className="joyce">
                <div>Joyce Chau</div>
                <div className="links">
                  <a href="https://www.linkedin.com/in/joycechau/"
                    target="_blank"
                    className="linkedin-link">
                    <img src="https://res.cloudinary.com/joycechau/image/upload/v1486025481/linkedin2.png"
                      alt="linkedin"
                      className="linkedin-image"/>
                  </a>
                  <a href="https://github.com/joycechau"
                    target="_blank"
                    className="github-link">
                    <img src="https://res.cloudinary.com/joycechau/image/upload/c_scale,w_20/v1485282244/github.png"
                      alt="github"
                      className="github-image"/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-nav">
          <button
            onClick={this.handleBinarySearchButton}
            className="bsearch-button selected-button">
            Binary Search
          </button>
          <button
            onClick={this.handleQuickSortButton}
            className="quicksort-button">
            Quick Sort
          </button>
          <button
            onClick={this.handleMergeSortButton}
            className="mergesort-button">
            Merge Sort
          </button>
        </div>
      </div>
    );
  }
}
