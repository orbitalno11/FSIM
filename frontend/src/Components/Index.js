import React, { Component } from "react";

class Index extends Component {
  render() {
    return (
      <React.Fragment>
        <body>
          <div className="container my-5">
            <div className="form-group">
              <h3>ข้อมูลนักศึกษา</h3>
            </div>
            <hr />
            <form>
              <div className="form-group">
                <div className="row">
                  <div className="col-12 col-lg-3">
                    <div className="card">
                      <a href="#">MTH</a>
                    </div>
                  </div>
                  <div className="col-12 col-lg-3">
                    <div className="card">
                      <a href="#">CHM</a>
                    </div>
                  </div>
                  <div className="col-12 col-lg-3">
                    <div className="card">
                      <a href="#">PHY</a>
                    </div>
                  </div>
                  <div className="col-12 col-lg-3">
                    <div className="card">
                      <a href="#">MIC</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group my-5">
                <h3>กิจกรรมประชาสัมพันธ์นักศึกษา</h3>
                <hr />
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-12 col-lg-4">
                    <div className="card2">
                      <a href="#">การรับเข้า</a>
                    </div>
                  </div>
                  <div className="col-12 col-lg-4">
                    <div className="card2">
                      <a href="#">โครงการรับเข้า</a>
                    </div>
                  </div>
                  <div className="col-12 col-lg-4">
                    <div className="card2">
                      <a href="#">ประชาสัมพันธ์</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group my-5">
                <h3>ข้อมูลศิษย์เก่า</h3>
                <hr />
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-12 col-lg-4"></div>
                  <div className="col-12 col-lg-4 text-center">
                    <button href="#" type="button" className="btn btn-warning">
                      สรุปแบบสอบถาม
                    </button>
                  </div>
                  <div className="col-12 col-lg-4"></div>
                </div>
              </div>
            </form>
          </div>
        </body>
      </React.Fragment>
    );
  }
}

export default Index;
