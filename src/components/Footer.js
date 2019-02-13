import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import iconleft from './assets/icon-left.png';
import iconright from './assets/icon-right.png';
import './Footer.scss';

class Footer extends Component {
  constructor(){
    super();
    this.state = {
      prev: null,
      next: null,
      pages: ['/', '/overview', '/driver', '/vehicle', '/trip']
    };
  }

  componentDidMount() {
    this.setState({ 
      prev: this.state.pages[this.props.page - 1], 
      next: this.state.pages[this.props.page + 1] 
    });
    if(this.props.page + 1 > this.state.pages.length - 1) {
      this.setState({next: this.state.pages[0]})
    }
  }

  printTime(strTime) {
    let suffix = 'AM';
    let splitTime = strTime.split(':').map((e) => parseInt(e));
    if(splitTime[0] > 12) {
      splitTime[0] -= 12;
      suffix = 'PM';
    }
    return `${splitTime[0]}:${splitTime[1]} ${suffix}`;
  }

  render() {
    return (
      <div className='soft-border'>
        <div className='flex flex-row flex-row-distribute'>
          <div>
            <Link to={this.state.prev !== null ? this.state.prev : "/"} style={{ textDecoration: "none" }}>
              <img src={iconleft}/>
            </Link>
          </div>
          <div className='flex flex-center-vertical'>
            <div>
              <p className='text-main'>{this.props.dest}</p>
              <p className='text-light'>{this.printTime(this.props.eta)}</p>
            </div>
          </div>
          <div>
            <Link to={this.state.next !== null ? this.state.next : "/"} style={{ textDecoration: "none" }}>
              <img src={iconright}/>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;