import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Header from './Header';
import "./Mockup.scss";

class Driver extends Component {
  render() {
    return (
      <div className="content-main">
        <div>
          <Header page={2}/>
        </div>
        <div>Driver Component</div>
        <Link to={`/vehicle`} style={{ textDecoration: 'none' }}>
          <button>Go to Vehicle</button>
        </Link>
      </div>
    );
  }
}

export default Driver;