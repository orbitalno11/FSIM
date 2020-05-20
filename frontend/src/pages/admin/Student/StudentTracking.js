import React, { Component, Fragment } from 'react'

import { Container, Nav, Tab, Col, Row } from 'react-bootstrap'
import SideTab, { convertTabName, convertDetail } from '../../../components/SideTabDialog'


//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicroscope, faAtom, faSquareRootAlt, faFlask } from '@fortawesome/free-solid-svg-icons'

// 


import { connect } from 'react-redux'
import { getStudentList, selectYear } from '../../../redux/action/adminStudentAction'
import { getDepartmentList } from '../../../redux/action/adminInformationAction'

// import TabDialog from '../../../components/TabDialog';
import DataTracking from "./DataTracking";


// 
// import LineChart from '../../../components/Graph/Line'



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


    handleYearSelect = async event => {
        let value = event.target.value
        await this.props.setYear(value)
        this.getData()
    }


   

    render() {

        let { departmentList } = this.props.information

        let key = departmentList !== null && departmentList[0]['dept_id']

        let tabName = null, tabDetail = []

        if (departmentList !== null) {
            tabName = convertTabName(departmentList, "dept_id", "dept_name")
            departmentList.forEach(item => {
                tabDetail.push(convertDetail(item['dept_id'], <DataTracking data={item} />))
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
        setYear: (year) => dispatch(selectYear(year))
    }
)

export default connect(mapStateToProps,mapDispatchToProps)(StudentTracking)