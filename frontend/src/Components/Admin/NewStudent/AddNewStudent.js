import React, { Component } from "react";
import { Form, Input } from "semantic-ui-react-form-validator";
import { Container, Label } from "semantic-ui-react";
import { Button, Col, Row } from "react-bootstrap";
import { FaCloudUploadAlt } from "react-icons/fa";
import Year from "../Options/Year";
import Admissionchannel from "../Options/Admission_channel";
import Project from "../Options/Project";

import api from '../../../Class/ApiManage'

class AddNewStudent extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      admission_type: "",
      admission_channel: [],
      yeaar: "",
      upload: [],
      fileURL: "",
      dta: "",
      isLoaded: false,
      selectedFile: null,
      Nameupload: []
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeAround = search => {
    this.setState({ admission_channel: search.target.value });
  };

  handleChangeProject = search => {
    this.setState({ admission_type: search.target.value });
    this.setState({ admission_channel: 0 });
  };

  handleChangeYear = search => {
    this.setState({ year: search.target.value });
  };

  onChange(e) {
    let filesName = e.target.file;
    let files = e.target.file[0];
    let filesArr = Array.prototype.slice.cell(filesName);

    this.setState({
      loaded: 0,
      upload: [...filesArr],
      selectedFile: files,
      Nameupload: [...filesArr]
    });
  }

  removefile(f) {
    this.setState({
      upload: this.state.upload.filter(x => x !== f),
      Nameupload: this.state.Nameupload.filter(x => x !== f)
    });
  }

  handleReset = event => {
    this.setState({
      admission_type: 0,
      admission_channel: 0,
      year: 0,
      upload: [],
      Nameupload: []
    });
  };

  // handleSubmit(event) {
  //   event.preventDefault();
  //   let data = new FormData();
  //   const target = event.target;

  //   let year = target[0].value;
  //   let type = target[1].value;
  //   let channel = target[2].value;

  //   data.append("year", year);
  //   data.append("admission_type", type);
  //   data.append("admission_channel", channel);
  //   data.append("upload", this.state.selectedFile);

  //   ApiManage.post("admission", data)
  //     .then(res => {
  //       console.log(res);
  //       alert("บันทึกสำเร็จ");
  //     })
  //     .catch(error => {
  //       console.log(error.response.data.message);
  //       console.log(error.response.data.value);
  //       if (error.response.data.value === " file not match") {
  //         alert("กรุณาตรวจสอบไฟล์ใหม่");
  //       } else {
  //         alert("บันทึกล้มเหลว กรุณาตรวจสอบข้อมูลอีกครั้ง");
  //       }
  //     });
  // }

  componentDidMount() {
    api.get("admission/channel")
      .then(res => {
        this.setState({
          isLoaded: true,
          admission_channel: res.data.data
        })
      })
  }

  render() {

    let { isLoaded, admission_channel } = this.state
    let show_channel

    if (isLoaded) {
      show_channel = <Admissionchannel value={admission_channel} />
    }

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

    // let CheckProject = num_project =>
    //   project_name.filter(p => {
    //     return p.fk === num_project;
    //   });

    return (
      <React.Fragment>
        <Container>
          <Form style={{ padding: "5%" }} onSubmit={this.handleSubmit}>
            <Row className="style-addData">
              <Col sm="3">
                <Label>ปีที่รับเข้า</Label>
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
                <Label>โครงการรับเข้า</Label>
              </Col>
              <Col sm="6">
                {show_channel}
              </Col>
            </Row>

            <Row className="style-addData interval-top">
              <Col sm="3">
                <Label>ข้อมูลนักศึกษารับเข้า</Label>
              </Col>
              <Col sm="9">
                <Label className="custom-file-upload">
                  <Input
                    type="file"
                    accept=".excel,.xlsx,.csv"
                    onChange={e => this.onChange(e)}
                  />
                  <FaCloudUploadAlt style={{ color: "#FFFFFF" }} /> UPLOAD
                    CSV FILE
                  </Label>
                {this.state.Nameupload.map(x => (
                  <div
                    className="file-previews"
                    onClick={this.removefile.bind(this, x)}
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
                onClick={this.handleReset}
              >
                RESET
                </Button>

              <Button type="submit" className="btn-info interval-1">
                SUBMIT
                </Button>
            </div>
          </Form>
        </Container>
      </React.Fragment>
    );
  }
}

export default AddNewStudent;
