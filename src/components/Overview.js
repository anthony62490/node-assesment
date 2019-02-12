import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Overview.scss';
import './Mockup.scss';
import Header from "./Header";
import Footer from "./Footer";

class Overview extends Component {
  render() {
    return (
      <div className="content-main">
        <Header page={1}/>
        <div className="textalign-l padding-l-std" style={{marginBottom: "55px"}}>
          <span className="text-header">Your Trip</span>
        </div>
        <div className="textalign-l padding-l-std" style={{marginBottom: "30px"}}>
          <span className='text-big-header'>5:39</span>
          <span className='text-big-med-caps'>pm</span>
          <p className='text-main'>Estimated Arrival at DFW Intl Airport - Terminal E</p>
        </div>
        <div style={{marginBottom: "70px"}}>
          <table className="textalign-l padding-l-std">
            <tr>
              <td>
                <p className='text-minor'>Estimated Fare:</p>
                <p className='text-main'>$65 - $75</p>
              </td>
              <td>
                <p className='text-minor'>Passengers:</p>
                <p className='text-main'>1 - 5</p>
              </td>
              <td>
                <p className='text-minor'>Payment:</p>
                <p className='text-main'>Amex01</p>
              </td>
            </tr>
          </table>
        </div>
        <div className='textalign-l padding-l-std overview-info-block' style={{marginBottom: "120px"}}>
          <p className='text-light'>
          449 Flora St.<br/>
          Dallas, Texas 75201</p>
          <hr/>
          <p className='text-main' style={{marginBottom: "10px"}}>
          DFW International Airport<br/>
          American Airlines Terminal E<br/>
          Irving, Texas 75261</p>
          <p className='text-light'>Can you drop me off at AA International Bag Drop please?</p>
        </div>
        <div className='btn-cancel-trip' style={{marginBottom: "20px"}}>
          <span>CANCEL TRIP</span>
        </div>
        <Footer />
        <Link to={`/driver`} style={{ textDecoration: "none" }}>
          <button>Go To Driver</button>
        </Link>
      </div>
    );
  }
}

export default Overview;
