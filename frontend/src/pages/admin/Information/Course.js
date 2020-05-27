import React, { Component, Fragment } from 'react'

import { Container, Col, Row, Table } from 'react-bootstrap'

import SideTab, { convertTabName, convertDetail } from '../../../components/SideTabDialog'

import { connect } from 'react-redux'
import { getCourseList, getCourseData } from '../../../redux/action/adminInformationAction'


const CourseDetail = ({ data }) => (
    <Fragment>
        <Row>
            <Col lg={4}>
                <h2 className="fs-tx-sub-hd">ชื่อหลักสูตร</h2>
            </Col>
            <Col lg={8}>
                <label className="fs-tx-sub-hd">{data['course_name']}</label>
            </Col>
        </Row>
        <hr />
        <Row>
            <Col lg={4}>
                <h2 className="fs-tx-sub-hd">รหัสหลักสูตร</h2>
            </Col>
            <Col lg={8}>
                {data['course_id']}
            </Col>
        </Row>
        <hr />
        <Row>
            <Col lg={4}>
                <h2 className="fs-tx-sub-hd">ปีหลักสูตร</h2>
            </Col>
            <Col lg={8}>
                {data['course_year']}
            </Col>
        </Row>
        <hr />
        <Row className="my-2">
            <Col lg={12}>
                <h2 className="fs-tx-sub-hd">รายชื่อรายวิชา</h2>
            </Col>
        </Row>
        <Row>
            <Col lg={12}>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>รหัสวิชา</th>
                            <th>ชื่อวิชา (ภาษาไทย)</th>
                            <th>ชื่อวิชา (ภาษาอังกฤษ)</th>
                            <th>หน่วยกิต</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data['subject'].map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item['subject_code']}</td>
                                    <td>{item['subject_name_th']}</td>
                                    <td>{item['subject_name_en']}</td>
                                    <td>{item['subject_weight']}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Col>
        </Row>
    </Fragment>
)


class Course extends Component {

    componentDidMount() {
        this.props.getCourseList()
        this.props.getCourseData()
    }

    render() {
        let { courseList, courseData } = this.props.information

        let key = courseList !== null && courseList[0]['course_id']

        let tabName = null, tabDetail = null

        if (courseList !== null && courseData !== null) {
            tabName = convertTabName(courseList, "course_id", "course_name")
            tabDetail = []

            courseData.forEach(item => {
                tabDetail.push(convertDetail(item['course_id'], <CourseDetail data={item} />))
            })
        }

        return (
            <Fragment>
                <div className="my-3 w-75 mx-auto">
                    <h1 className="admin-page-header">ข้อมูลหลักสูตร</h1>
                    <hr className="yellow-hr" />
                    <Container fluid>
                        {
                            key ? (
                                tabName !== null && (
                                    <SideTab startKey={key} tabName={tabName} tabDetail={tabDetail} dropdownTitle={"รายชื่อหลักสูตร"} />
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
        getCourseList: () => dispatch(getCourseList()),
        getCourseData: () => dispatch(getCourseData())
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Course)