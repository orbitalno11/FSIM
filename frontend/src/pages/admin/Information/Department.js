import React, { Component, Fragment } from 'react'

import { Container, Col, Row } from 'react-bootstrap'

import SideTab, { convertTabName, convertDetail } from '../../../components/SideTabDialog'

import { connect } from 'react-redux'
import { getDepartmentList } from '../../../redux/action/adminInformationAction'


const DepartmentDetail = ({ data }) => (
    <Fragment>
        <Row>
            <Col lg={4}>
                <h2 className="fs-tx-sub-hd">ชื่อภาควิชา</h2>
            </Col>
            <Col lg={8}>
                <h2 className="fs-tx-sub-hd">{data['dept_name']}</h2>
            </Col>
        </Row>
        <hr />
        <Row>
            <Col lg={4}>
                <h2 className="fs-tx-sub-hd">หลักสูตรที่เปิดสอน</h2>
            </Col>
            <Col lg={8}>
                <ul>
                    {
                        data['course'].map((item, index) => (
                            <li key={index}>{item['course_id']}&nbsp;{item['course_name']}</li>
                        ))
                    }
                </ul>
            </Col>
        </Row>
        <hr />
        <Row className="my-2">
            <Col lg={4}>
                <h2 className="fs-tx-sub-hd">สาขาวิชา</h2>
            </Col>
            <Col lg={8}>
                <ul>
                    {
                        data['branch'].map((item, index) => (
                            <li key={index}>{item['branch_name']}</li>
                        ))
                    }
                </ul>
            </Col>
        </Row>
    </Fragment>
)

class Department extends Component {

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
                tabDetail.push(convertDetail(item['dept_id'], <DepartmentDetail data={item} />))
            })
        }

        return (
            <Fragment>
                <div className="my-3 w-75 mx-auto">
                    <h1 className="fs-tx-hd-admin">ข้อมูลภาควิชา</h1>
                    <hr className="fs-line-yellow" />
                    <Container fluid>
                        {
                            key ? (
                                tabName !== null && (
                                    <SideTab startKey={key} tabName={tabName} tabDetail={tabDetail} dropdownTitle={tabName[0]['tabTitle']} />
                                )
                            ) : (
                                    <h1 className="text-center">ไม่พบข้อมูล</h1>
                                )
                        }
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
        getDepartmentList: () => dispatch(getDepartmentList())
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Department)