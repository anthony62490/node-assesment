import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./Mockup.scss";

class Vehicle extends Component {
  render() {
    return (
      <div>
        <div>Vehicle Component</div>
        <Link to={`/trip`} style={{ textDecoration: 'none' }}>
          <button>Go to Trip</button>
        </Link>
      </div>
    );
  }
}

export default Vehicle;