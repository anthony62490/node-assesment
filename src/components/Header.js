import React, { Component } from 'react';
import './Header.scss';
import './Mockup.scss';

class Header extends Component {
  constructor(){
    super();
  }
  render() {
    return (
      <div className='header-block'>
        <div>
          <span className="text-logo">ALTO</span>
        </div>
        <div class='indicator-container'>
          <div class={'indicator-circle ' + (this.props.page === 1 ? 'active' : 'valid')}></div>
          <div class={'indicator-circle ' + (this.props.page === 2 ? 'active' : 'valid')}></div>
          <div class={'indicator-circle ' + (this.props.page === 3 ? 'active' : 'valid')}></div>
          <div class={'indicator-circle ' + (this.props.page === 4 ? 'active' : 'valid')}></div>
          <div class='indicator-circle'></div>
        </div>
      </div>
    );
  }
}

export default Header;