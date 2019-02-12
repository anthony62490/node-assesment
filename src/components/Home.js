import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import "./Mockup.scss";

class Home extends Component {
  render() {
    return (
      <div className="center-logo">
        <Link to={`/overview`} style={{ textDecoration: "none" }}>
          <img src={logo} className="img-logo-main" />
          <span className="text-logo">
            <br />
            Click it to Ride
          </span>
        </Link>
      </div>
    );
  }
}

export default Home;
