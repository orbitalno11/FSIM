import React, { Component, Fragment } from 'react'

import { Container, Card, Tab, Col, Row, Button, Modal } from 'react-bootstrap'
import SideTab, { convertTabName, convertDetail } from '../../../components/SideTabDialog'


import {
  Table,
} from "semantic-ui-react";

import Line from "../../../components/Graph/Line";
import { setupLineChart } from "../../../components/Graph/GraphController";

import axios from "axios";


import { connect } from 'react-redux'
import { getStudentList, selectYear } from '../../../redux/action/adminStudentAction'
import { getDepartmentList } from '../../../redux/action/adminInformationAction'


const Traching = ({ dept_name, data, handleTracking }) => {

  return (
    <Fragment>

      <Table>
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell> ลำดับ </Table.HeaderCell>
            <Table.HeaderCell> รหัสนักศึกษา </Table.HeaderCell>
            <Table.HeaderCell>ชื่อ-นามสกุล</Table.HeaderCell>
            <Table.HeaderCell> สาขา </Table.HeaderCell>
            <Table.HeaderCell>GPA</Table.HeaderCell>
            <Table.HeaderCell>กราฟผลการเรียน</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            data !== null ? (
              data.map((item, index) => (
                <Table.Row textAlign="center" key={index}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>{item['student_id']}</Table.Cell>
                  <Table.Cell>{item['firstname']}</Table.Cell>
                  <Table.Cell>{item['branch_name']}</Table.Cell>
                  <Table.Cell>{item['current_gpax']}</Table.Cell>
                  <Table.Cell> <Button onClick={() => handleTracking(item['student_id'], dept_name)}>ติดตามผลการเรียน</Button></Table.Cell>

                </Table.Row>
              ))
            ) : (
                <Table.Row>
                  <Table.Cell colSpan={3}>
                    <h2 className="text-center">ไม่พบข้อมูล</h2>
                  </Table.Cell>
                </Table.Row>
              )
          }
        </Table.Body>
      </Table>
    </Fragment>

  );
}

class StudentTracking extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tabKey: null,
      trackingStudent: [],
      showTrack: false

    }
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    let { selectedYear } = this.props.student
    this.props.getDepartmentList()
    this.props.getStudentList(selectedYear)
  }


  handleTracking = (id_student, dept_name) => {
    axios.get(`/admin/student/tracking?id_student=${id_student}`)
      .then(res => {

        let data = res.data.data
        this.setState({
          trackingStudent: {
            student_id: data.student_id,
            firstname: data.firstname,
            lastname: data.lastname,
            trackking: setupLineChart(data.trackking),
            dept: dept_name,
          },

          showTrack: true
        },

        )
      })
      .catch(error => {
        console.error(error)
        this.setState({
          loadTime: 1
        })
      })
  }

  handlTrackClose = () => {
    this.setState({
      showTrack: false,
      trackingStudent: [],

    })
  }

  render() {
    let { showTrack, trackingStudent, dept } = this.state
    let { departmentList } = this.props.information
    let key=false,tabName = null, tabDetail = []
    let { studentList } = this.props.student
    if (departmentList !== null) {
      key = departmentList[0]['dept_id']
      if (departmentList !== null && studentList !== null) {
        tabName = convertTabName(departmentList, "dept_id", "dept_name")
        departmentList.forEach(item => {
          let student = studentList.filter(data => data['dept_id'] == item['dept_id'])
          tabDetail.push(convertDetail(item['dept_id'], <Traching dept_name={item['dept_name']} data={student[0]['student']} handleTracking={this.handleTracking} />))
        })

      }
    }



    return (
      <Fragment>
        <div className="my-2 w-100 mx-auto">
          {
            trackingStudent !== null ?
              (<Modal
                size="lg"
                centered
                show={showTrack}
                onHide={this.handlTrackClose}
              >
                <Modal.Header closeButton>
                  <h2>กราฟแสดงผลการเรียน</h2>
                </Modal.Header>
                <Modal.Body>
                  <Container className="mb-5">
                    <Row>
                      <Col sm={12} lg={12} className="my-2">
                        <div style={{ marginBottom: '4%' }}>
                          <h5>รหัสนักศึกษา : {trackingStudent.student_id}</h5>
                          <h5>ชื่อ-นามสกุล : {trackingStudent.firstname} - {trackingStudent.lastname} </h5>
                          <h5>ภาควิชา    : {trackingStudent.dept}</h5>
                        </div>
                        <Line data={trackingStudent.trackking} legend={{ display: false }} />
                      </Col>
                    </Row>
                  </Container>
                </Modal.Body>
              </Modal>) : null
          }
          <Container fluid>
            <Tab.Container defaultActiveKey={key}>
              <Row>
                <Col >
                  {
                    key ? (
                      tabName !== null && (
                        <SideTab startKey={key} tabName={tabName} tabDetail={tabDetail} dropdownTitle={"รายชื่อภาควิชา"} />
                      )
                    ) : (
                        <h1 className="text-center">ไม่พบข้อมูล</h1>
                      )
                  }

                </Col>
              </Row>
            </Tab.Container>

          </Container>
        </div>
      </Fragment>
    )
  }
}



const mapStateToProps = state => (
  {
    student: state.admin_student,
    information: state.admin_information
  }
)

const mapDispatchToProps = dispatch => (
  {
    getStudentList: (selectedYear) => dispatch(getStudentList(selectedYear)),
    getDepartmentList: () => dispatch(getDepartmentList()),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(StudentTracking)