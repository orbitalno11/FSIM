import React, { Component } from "react";
import { Form, Row, Col } from "react-bootstrap";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staff_id: "",
      password: "",
      currentUser: null,
      message: ""
    };
  }


  render() {
   
    return (
      <form onSubmit={this.onSubmit} >
        <section className="section container my-5">
          <div className="card3 col-4">
            <br />
            <h3>เข้าสู่ระบบ</h3>
            <hr />
            <Form.Group controlId="formGroupEmail">
              <Form.Control
                type="text"
                placeholder="Username"
                className="input"
                name="staff_id"
                onChange={this.onChange}
              />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                className="input"
                name="password"
                onChange={this.onChange}
              />
            </Form.Group>
            <hr />
            {["checkbox"].map(type => (
              <div key={`default-${type}`} className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Confirm"
                  name="Confirm"
                  id="Confirm"
                  onChange={this.onChange}
                />
              </div>
            ))}

            <button type="button" className="btn btn-success center-block">
              เข้าสู่ระบบ
            </button>
            <button type="button" className="btn btn-danger center-block">
              ย้อนกลับ
            </button>

            <br />
          </div>
        </section>
      </form>
    );
  }
}

export default Login;
