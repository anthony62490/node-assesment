import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import "./Mockup.scss";

class Driver extends Component {
  constructor(){
    super();
    this.state = {
      imgDriver: './assets/profile1.png'
    };
  }
  render() {
    return (
      <div className="content-main">
        <div>
          <Header page={2}/>
          <img className='img-driver' src={require(this.state.imgDriver)}/>
        </div>
        <div>Driver Component</div>
        <Footer dest={"DFW Int'l Airport"} eta={"15:39"} page={2}/>
      </div>
    );
  }
}

export default Driver;