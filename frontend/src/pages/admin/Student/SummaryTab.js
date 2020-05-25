import React, { Component, Fragment } from 'react'

import { Container, Tab, Col, Row } from 'react-bootstrap'
import SideTab, { convertTabName, convertDetail } from '../../../components/SideTabDialog'

import {
    Header,
    Card
} from "semantic-ui-react";


import Piechart from "../../../components/Graph/Pie";
import Barchart from "../../../components/Graph/Bar";
import Horizontal from "../../../components/Graph/BarHorizontal";

import { setupPieChart, setupStackBarChart } from '../../../components/Graph/GraphController'

import { connect } from 'react-redux'
import { getStudentData } from '../../../redux/action/adminStudentAction'
import { getDepartmentList } from '../../../redux/action/adminInformationAction'


import MediaQuery from 'react-responsive'
import { minDeviceWidth } from '../../../Constant'

const StudentData = ({ data }) => {

    return (
        <Fragment>
            <MediaQuery minDeviceWidth={minDeviceWidth}>
                <Container style={{ backgroundColor: "#FFFFFF", padding: "2%" }}>
                    <Header align="center" as="h2" style={{ marginBottom: "5%" }}>
                        จำนวนนักศึกษาทุกชั้นปี
                    </Header>
                    <Row >
                        <Col sm={12} lg={6} className="my-2">
                            <Card fluid>
                                <Card.Header as="h4" align="center">
                                    จำนวนนักศึกษาต่อสาขา
                                </Card.Header>
                                <Card.Content>
                                    {
                                        data !== null ? (
                                            <Piechart data={setupPieChart(data.branch)} />
                                        ) : (
                                                <h2 className="text-center">ไม่พบข้อมูล</h2>
                                            )
                                    }
                                </Card.Content>
                            </Card>
                        </Col>
                        <Col sm={12} lg={6} className="my-2">
                            <Card fluid>
                                <Card.Header as="h4" align="center">
                                   สถานะของนักศึกษาแต่ละชั้นปี
                                </Card.Header>
                                <Card.Content>
                                    {
                                        data !== null ? (
                                            <Barchart data={setupStackBarChart(data.status_by_year[0])} />
                                        ) : (
                                                <h2 className="text-center">ไม่พบข้อมูล</h2>
                                            )
                                    }
                                </Card.Content>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} lg={12} className="my-2">
                            <Card fluid>
                                <Card.Header as="h4" align="center">
                                    สถานะของนักศึกษาแต่ละสาขา
                                </Card.Header>
                                <Card.Content>
                                    {
                                        data !== null ? (
                                            <Horizontal data={setupStackBarChart(data.df_status_by_branch[0])} legend={{ display: false }} />
                                        ) : (
                                                <h2 className="text-center">ไม่พบข้อมูล</h2>
                                            )
                                    }
                                </Card.Content>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={minDeviceWidth - 1}>
                <Container style={{ backgroundColor: "#FFFFFF", padding: "2%" }}>
                    <Header align="center" as="h2" style={{ marginBottom: "5%" }}>
                        จำนวนนักศึกษาทุกชั้นปี
                    </Header>
                    <Row >
                        <Col sm={12} lg={6} className="my-2">
                            <Card fluid>
                                <Card.Header align="center">
                                    <h5>จำนวนนักศึกษาต่อสาขา</h5>
                                </Card.Header>
                                <Card.Content>
                                    {
                                        data !== null ? (
                                            <Piechart data={setupPieChart(data.branch)} />
                                        ) : (
                                                <h2 className="text-center">ไม่พบข้อมูล</h2>
                                            )
                                    }
                                </Card.Content>
                            </Card>
                        </Col>
                        <Col sm={12} lg={6} className="my-2">
                            <Card fluid>
                                <Card.Header align="center">
                                    <h5>สถานะของนักศึกษาแต่ละชั้นปี</h5>
                                </Card.Header>
                                <Card.Content>
                                    {
                                        data !== null ? (
                                            <Barchart data={setupStackBarChart(data.status_by_year[0])} />
                                        ) : (
                                                <h2 className="text-center">ไม่พบข้อมูล</h2>
                                            )
                                    }
                                </Card.Content>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} lg={6} className="my-2">
                            <Card fluid>
                                <Card.Header align="center">
                                    <h5>สถานะของนักศึกษาแต่ละสาขา</h5>
                                </Card.Header>
                                <Card.Content>
                                    {
                                        data !== null ? (
                                            <Horizontal data={setupStackBarChart(data.df_status_by_branch[0])}  />
                                        ) : (
                                                <h2 className="text-center">ไม่พบข้อมูล</h2>
                                            )
                                    }
                                </Card.Content>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </MediaQuery>

        </Fragment>
    )
}


class StudentSummary extends Component {

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        this.props.getDepartmentList()
        this.props.getStudentData()
    }


    render() {

        let { departmentList } = this.props.information
        let { studentData } = this.props.student
        let key = false, tabName = null, tabDetail = []
        if (departmentList !== null) {
            key = departmentList[0]['dept_id']
            tabName = convertTabName(departmentList, "dept_id", "dept_name")
            if (departmentList !== null && studentData !== null) {
                departmentList.forEach(item => {
                    let studentDept = studentData['analyze_by_dept'].filter(data => data['dept_id'] === item['dept_id'])
                    tabDetail.push(convertDetail(item['dept_id'], <StudentData data={studentDept[0]} />))
                })
            }
        }




        return (

            <Fragment>
                <div className="my-2 w-100 mx-auto">

                    <Container fluid>
                        <Tab.Container defaultActiveKey={key}>
                            <Row>
                                <Col >

                                    {
                                        key && tabName !== null && studentData !== null ? (
                                            <SideTab startKey={key} tabName={tabName} tabDetail={tabDetail} dropdownTitle={tabName[0]['tabTitle']} />

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
        information: state.admin_information,
        student: state.admin_student
    }
)

const mapDispatchToProps = dispatch => (
    {
        getDepartmentList: () => dispatch(getDepartmentList()),
        getStudentData: () => dispatch(getStudentData()),
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(StudentSummary)
