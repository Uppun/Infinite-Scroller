import React, { Component } from 'react';
import Scroller from './Scroller';
import './main.css';

class App extends Component {

  renderChild = (data) => {
    return(
      <div className="ChildElement" key={data}>
        {data}
      </div> 
    );
  }

  render() {
    const childArray = [];

    for(let i = 0; i < 1000; i++) {
      childArray.push(i);
    }

    return (
      <Scroller renderChild={this.renderChild} elementHeight={100} elementNum={1000}>
        {childArray}
      </Scroller>
    );
  }
}

export default App;
