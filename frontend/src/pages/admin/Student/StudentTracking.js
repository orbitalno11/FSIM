import React, { Component, Fragment } from 'react'

import { Container, Nav, Tab, Col, Row,Button,Modal } from 'react-bootstrap'
import SideTab, { convertTabName, convertDetail } from '../../../components/SideTabDialog'


import {
    Table,
  } from "semantic-ui-react";

 
import axios from "axios";


import { connect } from 'react-redux'
import { getStudentList, selectYear } from '../../../redux/action/adminStudentAction'
import { getDepartmentList } from '../../../redux/action/adminInformationAction'


const Traching = ({dept_name,data,handleTracking})=>{
        
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
                        <Table.Cell> <Button onClick={() => handleTracking(item['student_id'],dept_name)}>ติดตามผลการเรียน</Button></Table.Cell> 
                      
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
            trackingStudent:null,
            dept :null,
            showTrack:false
        }
    }

    async componentDidMount() {
        this.getData()
    }

    getData = () => {
        let { selectedYear } = this.props.student
        this.props.getDepartmentList()
        this.props.getStudentList(selectedYear)
    }


    handleTracking = (id_student,dept_name)=>{
      alert(dept_name)
      axios.get(`/admin/student/tracking?id_student=59090500801`)
      .then(res => {
         
          let data = res.data.data
          this.setState({
              trackingStudent: data,
              dept : dept_name,
              showTrack:true
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
      })
  }

    render() {
        let {showTrack} = this.state
        let { departmentList } = this.props.information

        let { studentList } = this.props.student

        let key = departmentList !== null && departmentList[0]['dept_id']

        let tabName = null, tabDetail = []
        
        if (departmentList !== null&&studentList!==null) {
            tabName = convertTabName(departmentList, "dept_id", "dept_name")
            departmentList.forEach(item => {
                let student  = studentList.filter(data => data['dept_id'] == item['dept_id'])
                tabDetail.push(convertDetail(item['dept_id'], <Traching dept_name={item['dept_name']} data={student[0]['student']} handleTracking={this.handleTracking}/>))
            })
        }

        return (
            <Fragment>
                <div className="my-2 w-100 mx-auto">

                        <Modal
                            size="lg"
                            centered
                            show={showTrack}
                            onHide={this.handlTrackClose}
                        >
                            <Modal.Header closeButton>
                                <h2>ต้องการลบข้อมูลแบบสอบถาม ปีการศึกษา </h2>
                            </Modal.Header>
                            <Modal.Body>
                                หากลบข้อมูลแบบสอบถาม ปีการศึกษา  แล้วจะไม่สามารถยกเลิกได้ 
                            </Modal.Body>
                        </Modal>

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

export default connect(mapStateToProps,mapDispatchToProps)(StudentTracking)