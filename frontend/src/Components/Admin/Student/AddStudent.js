import React, { Component } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { Label } from "semantic-ui-react";
import { FaCloudUploadAlt } from "react-icons/fa";
import Year from "../Options/Year";
import Faculty from "../Options/Faculty";

class Add extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      faculty: "",
      year: "",
      upload: [],
      fileURL: "",
      data: "",
      isLoaded: false,
      selectedFile: null
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeFaculty = search => {
    this.setState({ faculty: search.target.value });
  };

  handleChangeYear = search => {
    this.setState({ year: search.target.value });
  };

  onChange(e) {
    let files = e.target.files[0];
    let filesArr = Array.prototype.slice.call(files);

    this.setState({
      loaded: 0,
      upload: [...filesArr],
      selectedFile: files
    });
  }

  removeFile(f) {
    this.setState({ upload: this.state.upload.filter(x => x !== f) });
  }

  handleReset = event => {
    this.setState({
      admission_type: 0,
      admission_channel: 0,
      year: 0,
      upload: []
    });
  };

  render() {
    const year = [
      {
        id: 1,
        name: "2012"
      },
      {
        id: 2,
        name: "2013"
      },
      {
        id: 3,
        name: "2014"
      }
    ];

    let { isLoaded, data } = this.state;
    let show_data;

    if (isLoaded) {
      show_data = data.map(data => {
        const { firstname, lastname } = data;
        return (
          <p>
            {firstname} -- {lastname}
          </p>
        );
      });
    }

    return (
      <React.Fragment>
        {show_data}
        <Form style={{ padding: "5%" }} onSubmit={this.onSubmit}>
          <Row className="style-addData">
            <Col sm="3">
              <Label>ปีที่รับเข้า</Label>
              <formErrors fromErrors={this.state.formErrors} />
            </Col>
            <Col sm="6">
              <Year
                option={this.handleChangeYear}
                value={this.state.year}
                year={year}
              />
            </Col>
          </Row>
          <Row className="style-addData interval-top">
            <Col sm="3">
              <Label>ภาควิชา</Label>
            </Col>
            <Col sm="6">
              <Faculty
                option={this.handleChangeFaculty}
                value={this.state.Faculty}
              />
            </Col>
          </Row>
          <Row className="style-addData interval-top">
            <Col sm="3">
              <Label>ข้อมูลนักศึกษารับเข้า</Label>
            </Col>
            <Col sm="9">
              <Label className="custom-file-upload">
                <input
                  type="file"
                  accept=".exel,.csv"
                  onChange={e => this.onChange(e)}
                />
                <FaCloudUploadAlt style={{ color: "#FFFFFF" }} /> UPLOAD CSV
                FILE
              </Label>
              {this.state.upload.map(x => (
                <div
                  className="file-preview"
                  onClick={this.removeFile.bind(this, x)}
                  key={x.name}
                >
                  {x.name}
                </div>
              ))}
            </Col>
          </Row>
          <div className="style-addData " style={{ marginTop: "5%" }}>
            <Button
              className="btn-EditData interval-1"
              onClick={this.handleSearch}
            >
              RESET
            </Button>

            <Button className="btn-info interval-1" onClick={this.handleSearch}>
              SUBMIT
            </Button>
          </div>
        </Form>
      </React.Fragment>
    );
  }
}

export default Add;
