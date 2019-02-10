import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div>
        <div>Home Component</div>
        <Link to={`/overview`} style={{ textDecoration: 'none' }}>
          <button>Ride with Alto</button>
        </Link>
      </div>
    );
  }
}

export default Home;
