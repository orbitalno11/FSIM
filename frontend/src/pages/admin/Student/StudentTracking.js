import React, { Component, Fragment } from 'react'

import { Container, Nav, Tab, Col, Row,Button } from 'react-bootstrap'
import SideTab, { convertTabName, convertDetail } from '../../../components/SideTabDialog'


import {
    Table,
  } from "semantic-ui-react";

 


import { connect } from 'react-redux'
import { getStudentList, selectYear } from '../../../redux/action/adminStudentAction'
import { getDepartmentList } from '../../../redux/action/adminInformationAction'


const Traching = ({id_dep,data})=>{
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
                   <Table.HeaderCell>ดำเนินการ</Table.HeaderCell>
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
                        <Table.Cell>{item['current_gpax']}</Table.Cell> 
                         <Table.Cell>
                                                <Button onClick={() => this.handleDeleteActivity(item['activity_id'])}>ลบ</Button>
                                            </Table.Cell> 
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
            tabKey: null
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


    // handleYearSelect = async event => {
    //     let value = event.target.value
    //     await this.props.setYear(value)
    //     this.getData()
    // }


   

    render() {

        let { departmentList } = this.props.information

        let { studentList } = this.props.student

        let key = departmentList !== null && departmentList[0]['dept_id']

        let tabName = null, tabDetail = []

        if (departmentList !== null&&studentList!==null) {
            tabName = convertTabName(departmentList, "dept_id", "dept_name")
            departmentList.forEach(item => {
                let student  = studentList.filter(data => data['dept_id'] == item['dept_id'])
                tabDetail.push(convertDetail(item['dept_id'], <Traching id={item['dept_id']} data={student[0]['student']} />))
            })
        }

        return (
            <Fragment>
                <div className="my-2 w-100 mx-auto">

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