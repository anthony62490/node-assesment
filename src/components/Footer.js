import React, { Component } from 'react';
import iconleft from './assets/icon-left.png';
import iconright from './assets/icon-right.png';
import './Footer.scss';

class Footer extends Component {
  constructor(){
    super();
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
          <div><img src={iconleft}/></div>
          <div className='flex flex-center-vertical'>
            <div>
              <p className='text-main'>{this.props.dest}</p>
              <p className='text-light'>{this.printTime(this.props.eta)}</p>
            </div>
          </div>
          <div><img src={iconright}/></div>
        </div>
      </div>
    );
  }
}

export default Footer;