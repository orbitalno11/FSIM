import React, { Component, Fragment } from 'react'

import { Container, Nav, Tab, Col, Row } from 'react-bootstrap'
import SideTab, { convertTabName, convertDetail } from '../../../components/SideTabDialog'


//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicroscope, faAtom, faSquareRootAlt, faFlask } from '@fortawesome/free-solid-svg-icons'

// 


import { connect } from 'react-redux'
import { getStudentData, selectYear } from '../../../redux/action/adminStudentAction'
import { getDepartmentList } from '../../../redux/action/adminInformationAction'

// import TabDialog from '../../../components/TabDialog';
import StudentData from "./StudentData";


// import Statcourse from '../../Statcourse'
// 
// import LineChart from '../../../components/Graph/Line'



class StudentSummary extends Component {

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
        let { dept_id } = this.props.student
        this.props.getDepartmentList()
        this.props.getStudentData(dept_id)
    }


    handleYearSelect = async event => {
        let value = event.target.value
        await this.props.setYear(value)
        this.getData()
    }



    render() {
        // let { location, match } = this.props
        let { departmentList } = this.props.information

        let key = departmentList !== null && departmentList[0]['dept_id']

        let tabName = null, tabDetail = []

        if (departmentList !== null) {
            tabName = convertTabName(departmentList, "dept_id", "dept_name")
            departmentList.forEach(item => {
                tabDetail.push(convertDetail(item['dept_id'], <StudentData data={item} />))
            })
        }

        let { studentData, selectedYear, yearList } = this.props.student


        // if (departmentList !== null) {
        //     let temp = departmentList.filter(data => data['project_type'] !== 0)
        //     key = temp[0]['project_id']
        // }
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
        getStudentData: (dept_id) => dispatch(getStudentData(dept_id)),
        getDepartmentList: () => dispatch(getDepartmentList()),
        setYear: (year) => dispatch(selectYear(year))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(StudentSummary)