import React from "react";
import { NavLink } from "react-router-dom";

import fsci from "../img/60year-fsci.png";


function Header() {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-yellow navbar-fixed-top">
        <div className="container">
            <a className="navbar-brand" href="#"><img src={fsci} width="200px" height="50px"></img></a>
            {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"> */}
                {/* <span className="navbar-toggler-icon"></span>
            </button> */}
            <div className="navbar-collapse0" id="navbarNav">
                <ul className="navbar-nav ">
                <li class="nav-item active">
                        <a class="nav-link" href="#" ><i class="fa fa-home" aria-hidden="true"></i>หน้าหลัก <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">ข้อมูลนักศึกษา</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">กิจกรรมประชาสัมพันธ์นักศึกษา</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link " href="#">ข้อมูลศิษย์เก่า</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div className="carousel-inner"> 
            <img src="../img/banner.png" className="d-block w-100" height="300px"></img>
    </div>
    </React.Fragment>
  );
}
export default Header;
