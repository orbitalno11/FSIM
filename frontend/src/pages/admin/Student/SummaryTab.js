import React, { Component, Fragment } from 'react'

import { Container, Nav, Tab, Col, Row } from 'react-bootstrap'
import SideTab, { convertTabName, convertDetail } from '../../../components/SideTabDialog'

import {
    Dropdown,
    Divider,
    Image,
    Grid,
    Header,
    Card
} from "semantic-ui-react";


// import GraphBar from "../../../components/Graph/Bar";
import Piechart from "../../../components/Graph/Pie";
import Barchart from "../../../components/Graph/Bar";
import Horizontal from "../../../components/Graph/BarHorizontal";
import { Pie } from "react-chartjs-2"

import { setupPieChart, setupStackBarChart, setupNoneStackBarChart } from '../../../components/Graph/GraphController'


//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicroscope, faAtom, faSquareRootAlt, faFlask } from '@fortawesome/free-solid-svg-icons'

//


import { connect } from 'react-redux'
import { getStudentData, selectYear } from '../../../redux/action/adminStudentAction'
import { getDepartmentList } from '../../../redux/action/adminInformationAction'

import StudentData from "./StudentData";


class StudentSummary extends Component {

    componentDidMount() {
        this.props.getDepartmentList()
     
    }


    render() {
       
        let { departmentList } = this.props.information

        let key = departmentList !== null && departmentList[0]['dept_id']

        let tabName = null, tabDetail = []

        if (departmentList !== null) {
            tabName = convertTabName(departmentList, "dept_id", "dept_name")
            departmentList.forEach(item => {
                tabDetail.push(convertDetail(item['dept_id'], <StudentData id={item['dept_id']} data={item} />))
            })
        }

       
        return (
            <Fragment>
                <div className="my-2 w-100 mx-auto">

                    <Container fluid>
                        <Tab.Container defaultActiveKey={key}>
                            <Row>
                                <Col lg={16}>

                                        {
                                            key ? (
                                                tabName !== null && (
                                                    <SideTab startKey={key} tabName={tabName} tabDetail={tabDetail} dropdownTitle={tabName[0]['tabTitle']} />
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
        information: state.admin_information
    }
)

const mapDispatchToProps = dispatch => (
    {
        getDepartmentList: () => dispatch(getDepartmentList()),
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(StudentSummary)
