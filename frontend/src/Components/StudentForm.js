import React, { Component } from "react";
import { Form, Row, Col } from "react-bootstrap";
// import axios from 'axios'
import ApiManage from "../Class/ApiManage";

class StudentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: "",
      file: null
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  handleUploadImage(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append("file", this.uploadInput.files[0]);
    data.append("filename", this.fileName.value);

    let Api = new ApiManage();
    let path = Api.uploadApi();

    console.log(path);

    fetch(path, {
      method: "POST",
      body: data
    }).then(response => response.json());
  }

  render() {
    return (
      <React.Fragment>
        <div className="container my-5">
          <form onSubmit={this.handleUploadImage}>
            <h3>จัดการข้อมูลนักศึกษา</h3>
            <hr />
            {/* <div>
                            <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                        </div>
                        <div>
                            <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
                        </div>
                        <br />
                        <div>
                            <button>Upload</button>
                        </div>
                        <img src={this.state.imageURL} alt="img" /> */}
            <Form.Group as={Row} controlId="formPlaintextEmail">
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue="email@example.com"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Password
              </Form.Label>
              <Col sm="10">
                <Form.Control type="password" placeholder="Password" />
              </Col>
            </Form.Group>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default StudentForm;
