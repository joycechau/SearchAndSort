
import React from 'react';
import {hashHistory} from 'react-router'

export default class App extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <div>
        {this.props.children}
      </div>
    )
  }
}
