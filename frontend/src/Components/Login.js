import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <section className="section container my-5">
        <div className="card3 col-4">
          <h3>เข้าสู่ระบบ</h3>
          <hr />
          <div className="form-group">
            <input className="form-control col-12"
              ref={ref => {
                this.fileName = ref;
              }}
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="form-group">
            <input className="form-control col-12"
              ref={ref => {
                this.fileName = ref;
              }}
              type="text"
              placeholder="Password"
            />
          </div>
          <div className="row col-12 center-block">
          <button type="button" className="btn btn-success center-block">เข้าสู่ระบบ</button>
          <button type="button" className="btn btn-danger center-block">ย้อนกลับ</button>
          </div>
          <br/>

          {/* <div className="form-control">
            <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
        </div> */}
        </div>
      </section>
    );
  }
}

export default Login;
