import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Button, Form, Col, Row } from "react-bootstrap";
import { FaCloudUploadAlt } from "react-icons/fa";
import Year from "../../option/year";
import Admission_channel from "../../option/admission_channel";
import Project from "../../option/project";

import ApiManage from "../../../Class/ApiManage";

class AddNewStudent extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      admission_type: "",
      admission_channel: "",
      year: "",
      upload: [],
      fileURL: "",
      data: "",
      isLoaded: false,
      selectedFile: null,
      Nameupload:[]

    };

    this.handleSubmit = this.handleSubmit.bind(this);
    // this.onSubmit = this.onSubmit.bind(this)
  }

  handleChangeAround = search => {
    // console.log(search.target.value);
    this.setState({ admission_channel: search.target.value });
  };

  handleChangeProject = search => {
    // console.log(search.target.value);
    this.setState({ admission_type: search.target.value });
    this.setState({ admission_channel: 0 });
  };

  handleChangeYear = search => {
    this.setState({ year: search.target.value });
  };

  onChange(e) {
    let filesName = e.target.files;
    let files = e.target.files[0];
    let filesArr = Array.prototype.slice.call(files);
    let filesArrName = Array.prototype.slice.call(filesName);

 
    this.setState(
      {
        loaded: 0,
        upload: [...filesArr],
        selectedFile: files,
        Nameupload:[...filesArrName]
      }
    );


    // alert(
    //   this.state.year +
    //     " " +
    //     this.state.admission_channel +
    //     " " +
    //     this.state.admission_type
    // );
    // this.setState({
    //     selectedFile: event.target.files[0],
    //     loaded: 0,
    //   })
  }

  removeFile(f) {
    this.setState({ upload: this.state.upload.filter(x => x !== f) ,
                    Nameupload: this.state.Nameupload.filter(x => x !== f)});
  }

  handleReset = event => {
    this.setState({
      admission_type: 0,
      admission_channel: 0,
      year: 0,
      upload: [],
      Nameupload:[]
    });
  };


  handleSubmit(event) {
    
    event.preventDefault();
    let data = new FormData();
    const target = event.target;
    // alert(data)

    let year = target[0].value;
    let type = target[1].value;
    let channel = target[2].value;

    data.append("year", year);
    data.append("admission_type", type);
    data.append("admission_channel", channel);
    data.append("upload", this.state.selectedFile);

    // console.log(this.state.selectedFile)
    ApiManage.post("admission", data)
      .then(res => {
        console.log(res);
        alert('บันทึกสำเร็จ')
       
      })
      .catch(error => {
        console.log(error.response.data.message);
        console.log(error.response.data.value);
        if(error.response.data.value==='file not match'){
          alert('กรุณาตรวจสอบไฟล์ใหม่')
        }else{
          alert('บันทึกล้มเหลว กรุณาตรวจสอบข้อมูลอีกครั้ง')
        }
       
      });
  
  }

  // onSubmit(event) {
  //     alert(this.state)

  // let data = this.state
  // alert(data)

  // fetch("http://127.0.0.1:5000/api/v1/admission", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json", },
  //     body: JSON.stringify(data)
  // })
  //     .then(function (response) {
  //         return response.json();
  //     })
  //     .then(function (data) {
  //         console.log(data)
  //     });
  // }

  render() {
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

    const project_name = [
      { id: 1, fK: 1, name: "รอบที่ 1/1 โครงการ 2B-KMUTT" },
      { id: 2, fK: 1, name: "รอบที่ 1/1 โครงการ Active Recruitment" },
      { id: 3, fK: 1, name: "รอบที่ 1/1 โครงการคัดเลือกตรง ประเภทเรียนดี" },
      {
        id: 4,
        fK: 1,
        name:
          "รอบที่ 1/1 โครงการคัดเลือกตรงความสามารถพิเศษ และทุนเพชรพระจอมเกล้า"
      },
      { id: 5, fK: 1, name: "รอบที่ 1/2 โครงการ Active Recruitment" },
      {
        id: 6,
        fK: 1,
        name: "รอบที่ 1/2 โครงการ Active Recruitment (จากโครงการ I am SCI)"
      },
      {
        id: 7,
        fK: 1,
        name: "รอบที่ 1/2 โครงการรับนักศึกษาจากโรงเรียนเทคโนโลยีฐานวิทยาศาสตร์ 	"
      },
      { id: 8, fK: 1, name: "รอบที่ 1/2 โครงการรับนักศึกษาพิการ" },
      { id: 9, fK: 1, name: "รอบที่ 1/2 โครงการรับนักเรียน โครงการ วมว." },
      { id: 10, fK: 1, name: "รอบที่ 1/2 โครงการรับนักเรียน จากมูลนิธิ สอวน." },
      {
        id: 11,
        fK: 1,
        name: "รอบที่ 1/2 โครงการรับนักศึกษาโดยใช้สิทธิ์บุตรบุคลากร ของ มจธ."
      },
      {
        id: 12,
        fK: 2,
        name:
          "รอบที่ 2 โครงการคัดเลือกตรงโดยใช้คะแนน GAT/PAT เพื่อผู้เรียนดี มีคุณธรรม (รับนักเรียนเขต* 1,3,4,5,9 เเละกรุงเทพฯ))"
      },
      {
        id: 13,
        fK: 2,
        name:
          "รอบที่ 2 โครงการคัดเลือกตรงโดยใช้คะแนน GAT/PAT เพื่อการกระจายโอกาสทางการศึกษา (รับนักเรียนทุกเขต* ยกเว้นเขต 1 เเละกรุงเทพฯ)"
      },
      {
        id: 14,
        fK: 2,
        name: "รอบที่ 2 โครงการคัดเลือกตรง มจธ. รักษาธรรม เพิ่มโอกาสทางการศึกษา"
      },
      { id: 15, fK: 2, name: "รอบที่ 2 โครงการคัดเลือกตรงกลุ่ม ปวช." },
      { id: 16, fK: 2, name: "รอบที่ 2 โครงการ Active Recruitment" },
      { id: 17, fK: 3, name: "รอบที่ 3/1 โครงการรับตรงร่วมกัน" },
      { id: 18, fK: 3, name: "รอบที่ 3/2 โครงการรับตรงร่วมกัน" },
      { id: 19, fK: 4, name: "รอบที่ 4 โครงการรับนักศึกษาผ่านระบบ Admissions" },
      {
        id: 20,
        fK: 5,
        name:
          "รอบที่ 5 โครงการคัดเลือกตรงเพื่อผลิตบุคลากรด้านวิทยาศาสตร์เทคโนโลยีเเละนวัตกรรม (ครั้งที่ 2) ;"
      }
    ];

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

    let CheckProject = num_project =>
      project_name.filter(p => {
        return p.fK == num_project;
      });

    return (
      <React.Fragment>
        {show_data}
        <Form style={{ padding: "5%" }} onSubmit={this.handleSubmit}>
          <Row className="style-addData">
            <Col sm="3">
              <label>ปีที่รับเข้า</label>
              <formErrors formErrors={this.state.formErrors} />
            </Col>
            <Col sm="6" >
              <Year
                option={this.handleChangeYear}
                value={this.state.year}
                year={year}
              />
            </Col>
          </Row>
          <Row className="style-addData interval-top">
            <Col sm="3">
              <label>โครงการรับเข้า</label>
            </Col>
            <Col sm="6" >
              <Project
                option={this.handleChangeProject}
                value={this.state.admission_type}
              />
            </Col>
          </Row>
          <Row className="style-addData interval-top">
            <Col sm="3">
              <label>รอบรับเข้า</label>
            </Col>
            <Col sm="6" >
              <Admission_channel
                option={this.handleChangeAround}
                project={CheckProject(this.state.admission_type)}
                value={this.state.admission_channel}
              />
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
                  accept=".excel,.xlsx,.csv"
                  onChange={(e) => this.onChange(e)}
                />
                <FaCloudUploadAlt style={{ color: "#FFFFFF" }} /> UPLOAD CSV
                FILE{" "}
              </label>
              {this.state.Nameupload.map(x => (
                <div
                  className="file-preview"
                  onClick={this.removeFile.bind(this, x)}
                  key={x.name}
                >
                  {x.name}
                </div>
              //  alert(x.name)
              ))
              }
            </Col>
          </Row>
          <div className="style-addData " style={{ marginTop: "5%" }}>
            <Button
              className="btn-EditData interval-1"
              onClick={this.handleReset}
            >
              RESET
            </Button>

            <Button
              type="submit"
              className="btn-info interval-1"             
            >
              SUBMIT
            </Button>
          </div>
        </Form>
      </React.Fragment>
    );
  }
}

export default AddNewStudent;
