import React, { Component } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { Label } from "semantic-ui-react";
import Year from "../Options/Year";
import Announcement from "../Options/Announcement";
import ProductRow from "../Options/Row";

class Add extends Component {
  constructor() {
    super();
    this.state = {};
    this.state.school = [
      {
        id: 0,
        name: ""
      }
    ];
    this.state.year = "0";
    this.state.anno = "0";
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeAnno = search => {
    this.setState({ anno: search.target.value });
  };

  handleChangeYear = search => {
    this.setState({ year: search.target.value });
  };

  handleRowDel(product) {
    let index = this.state.school.indexOf(product);
    this.state.school.splice(index, 1);
    this.setState(this.state.school);
  }

  handleAddEvent = () => {
    let id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    let product = {
      id: id,
      name: ""
    };
    this.state.school.push(product);
    this.setState(this.state.school);
    console.log(this.state.school);
  };

  handleReset = () => {
    let schoolNew = [
      {
        id: 0,
        name: ""
      }
    ];
    this.state.school = schoolNew;
    this.state.year = "0";
    this.state.anno = "0";
    this.setState(this.state.school);
  };

  handleProductTable(event) {
    let item = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value
    };
    let schools = this.state.school.slice();
    let newSchools = schools.map(function(sc) {
      for (var key in sc) {
        if (key === item.name && sc.id === item.id) {
          sc[key] = item.value;
        }
      }
      return sc;
    });
    this.setState({ school: newSchools });
  }

  handleSubmit(event) {
    alert("OK");
    let data = this.state;

    fetch("http://...", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(function(respone) {
        return respone.json();
      })
      .then(function(daat) {
        return console.log(data);
      });
  }

  render() {
    // const SchoolName = [
    //   {
    //     id: 1,
    //     name: "รร.1"
    //   },
    //   {
    //     id: 2,
    //     name: "รร.2"
    //   }
    // ];

    const Activity = [
      {
        id: 1,
        name: "Open House"
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
      }
    ];

    return (
      <React.Fragment>
        <Form style={{ padding: "5%" }} onSubmit={this.handleSubmit}>
          <Row className="style-addData">
            <Col sm="3">
              <Label>กิจกรรมประชาสัมพันธ์</Label>
            </Col>
            <Col sm="6">
              <Announcement
                option={this.handleChangeAnno}
                announcement={Activity}
                value={this.state.anno}
              />
            </Col>
          </Row>
          <Row className="style-addData interval-top">
            <Col sm="3">
              <Label>ปีที่ประชาสัมพันธ์</Label>
            </Col>
            <Col sm="6">
              <Year
                option={this.handleChangeYear}
                year={year}
                value={this.state.year}
              />
            </Col>
          </Row>
          <Row className="style-addData interval-top">
            <Col sm="3">
              <Label>โรงเรียนที่เข้าร่วม</Label>
            </Col>
            <Col sm="6">
              {this.state.school.map(product => (
                <ProductRow
                  onProductTableUpdate={this.handleProductTable.bind(this)}
                  row={product}
                  name={"name"}
                  onDelEvent={this.handleRowDel.bind(this)}
                  onAddEvent={this.handleAddEvent.bind(this)}
                  style={{ marginTop: "5%" }}
                />
              ))}
            </Col>
          </Row>
          <div className="style-addData" style={{ marginTop: "5%" }}>
            <Button
              className="btn-EditData interval-1"
              onClick={this.handleReset}
            >
              RESET
            </Button>
            <Button
              type="submit"
              className="btn-info interval-1"
              onClick={this.onSubmit}
            >
              SUBMIT
            </Button>
          </div>
        </Form>
      </React.Fragment>
    );
  }
}

export default Add;
