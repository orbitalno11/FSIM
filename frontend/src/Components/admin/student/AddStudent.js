import React from "react";
// import ReactDOM from 'react-dom';
import { Button, Form, Col, Row } from "react-bootstrap";
import { FaCloudUploadAlt } from "react-icons/fa";
import Year from "../../option/year";
import Faulty from "../../option/faulty";

class AddStudent extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.state = {
      faulty: "",
      year: "",
      upload: [],
      fileURL: "",
      data: "",
      isLoaded: false,
      selectedFile: null
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeFaulty = search => {
    this.setState({ faulty: search.target.value });
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
        <Form style={{ padding: "5%" }} onSubmit={this.onSubmit}>
          <Row className="style-addData">
            <Col sm="3">
              <label>ปีที่รับเข้า</label>
              <formErrors formErrors={this.state.formErrors} />
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
              <label>ภาควิชา</label>
            </Col>
            <Col sm="6">
              <Faulty option={this.handleChangeFaulty}
              value={this.state.Faulty} />
            </Col>
          </Row>
          <Row className="style-addData interval-top">
            <Col sm="3">
              <label>ข้อมูลนักศึกษารับเข้า</label>
            </Col>
            <Col sm="9">
              <label className="custom-file-upload">
                <input
                  type="file"
                  accept=".excel,.csv"
                    onChange={(e) => this.onChange(e)}
                />
                <FaCloudUploadAlt style={{ color: "#FFFFFF" }} /> UPLOAD CSV
                FILE
              </label>
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

export default AddStudent;
