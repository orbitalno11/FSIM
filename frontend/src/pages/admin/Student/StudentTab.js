import React, { Component, Fragment } from 'react'

import { Container, Nav, Tab, Col, Row } from 'react-bootstrap'


//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicroscope, faAtom, faSquareRootAlt, faFlask } from '@fortawesome/free-solid-svg-icons'

// 


import { connect } from 'react-redux'
import { getStudentData, getDepartmentList, selectYear } from '../../../redux/action/adminStudentAction'
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
        let { tabKey } = this.state

        let { studentData, departmentList, selectedYear, yearList } = this.props.student

        let key = false

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
                                <Col lg={3}>
                                    <Nav variant="pills" activeKey={tabKey} onSelect={this.handleTabSelect} className="flex-column sub-nav">
                                        {
                                            departmentList !== null && (
                                                departmentList.map((item, index) => (
                                                    <Nav.Item key={index}>
                                                        <Nav.Link eventKey={item['dept_id']}
                                                            className="sub-nav">{item['dept_name']}</Nav.Link>
                                                    </Nav.Item>
                                                ))
                                            )
                                        }
                                    </Nav>
                                </Col>
                                <Col lg={9}>
                                    <Tab.Content>

                                        <Tab.Pane eventKey="mth">
                                            <StudentData />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="chm">
                                            <StudentData />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="mic">
                                            <StudentData />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="phy">
                                            <StudentData />
                                        </Tab.Pane>

                                    </Tab.Content>
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
        student: state.admin_student
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