import React from 'react';

export default class BinarySearch extends React.Component{
  constructor(props){
    super(props);
    // this.state ={
    //   array: "",
    //   isLoaded: false,
    //   result: null,
    //   target: null
    // };

    this.state = {
      counter: 0,
      0: {
        final: false,
        target: 2,
        current_array: [1,2,3,4,5,6,7,8,9,10],
        mid_idx: 5,
        mid_num: 6
      },
      1: {
        final: false,
        target: 2,
        current_array: [1,2,3,4,5],
        mid_idx: 2,
        mid_num: 3
      },
      2: {
        final: true,
        target: 2,
        current_array: [1,2],
        mid_idx: 1,
        mid_num: 2
      },
      3: {
        final: true,
        target: 2,
        current_array: [2],
        mid_idx: 1,
        mid_num: 2
      }
    };


    // this.handleArraySubmit = this.handleArraySubmit.bind(this);
    // this.solution = this.solution.bind(this);
  }

  // handleArraySubmit(e){
  //   e.preventDefault();
  //   const startIdx = this.props.binarySearch.startIdx ? this.props.binarySearch.startIdx : 0;
  //   this.props.getBinarySearch({array: this.state.array, target: this.state.targetNum, start_idx: startIdx}).then(()=>{
  //     this.setState({isLoaded: true});
  //   });
  // }

  // solution(){
  //   return(
  //     <div>
  //       {this.props.binarySearch.newArr}
  //     </div>
  //   );
  // }

  // update(input){
  //   return e => this.setState({
  //     [input]: e.currentTarget.value
  //   });
  // }


  componentDidMount() {
    this.interval = setInterval(this.changeState.bind(this), 1000);
  }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  changeState() {
    this.setState({
      counter: this.state.counter += 1
    });
  }

  render(){
    return (
      <div>
        <div>asdfasdfasdf</div>
        <div>{this.state[this.state.counter].current_array}</div>
      </div>
    );
  }
}
