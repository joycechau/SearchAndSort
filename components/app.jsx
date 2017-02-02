import React from 'react';
import {hashHistory} from 'react-router';


export default class App extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}
