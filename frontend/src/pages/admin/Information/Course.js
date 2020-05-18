import React, { Component, Fragment } from 'react'

import { Container, Nav, Tab, Col, Row, Button, Form, InputGroup, ButtonGroup, Table } from 'react-bootstrap'

import TabDialog from '../../../components/TabDialog'

import { connect } from 'react-redux'
import { getCourseList, getCourseData } from '../../../redux/action/adminInformationAction'


const CourseDetail = ({ data }) => (
    <Fragment>
        <Row>
            <Col lg={4}>
                <h2 className="text-sub-header">ชื่อหลักสูตร</h2>
            </Col>
            <Col lg={8}>
                <label className="text-sub-header">{data['course_name']}</label>
            </Col>
        </Row>
        <hr />
        <Row>
            <Col lg={4}>
                <h2 className="text-sub-header">รหัสหลักสูตร</h2>
            </Col>
            <Col lg={8}>
                {data['course_id']}
            </Col>
        </Row>
        <hr />
        <Row>
            <Col lg={4}>
                <h2 className="text-sub-header">ปีหลักสูตร</h2>
            </Col>
            <Col lg={8}>
                {data['course_year']}
            </Col>
        </Row>
        <hr />
        <Row className="my-2">
            <Col lg={12}>
                <h2 className="text-sub-header">รายชื่อรายวิชา</h2>
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

const DepartmentEdit = () => (
    <Fragment>
        <Form>
            <h2 className="text-sub-header">ชื่อหลักสูตร</h2>
            <Form.Group>
                <InputGroup>
                    <Form.Control type="text" placeholder="ชื่อหลักสูตร" required />
                    <Button variant="success">บันทึก</Button>
                </InputGroup>
            </Form.Group>
        </Form>
        <hr />
        <Form>
            <h2 className="text-sub-header">รหัศหลักสูตร</h2>
            <Form.Group>
                <InputGroup>
                    <Form.Control type="text" placeholder="รหัศหลักสูตร" required />
                    <Button variant="success">บันทึก</Button>
                </InputGroup>
            </Form.Group>
        </Form>
        <hr />
        <Row noGutters className="my-2">
            <Col sm={3}>
                <h2 className="text-sub-header">รายชื่อรายวิชา</h2>
            </Col>
            <Col sm={9}>
                <ButtonGroup>
                    <Button variant="primary">เพิ่มรายวิชา</Button>
                    <Button variant="warning">แก้ไขรายวิชา</Button>
                </ButtonGroup>
            </Col>
        </Row>
        <Form className="my-2">
            <Form.Control as={"select"}>
                <option>A</option>
                <option>B</option>
                <option>C</option>
            </Form.Control>
            <Form.Group>
                <Form.Label>ชื่อรายวิชา</Form.Label>
                <Form.Control type="text" placeholder="ชื่อรายวิชา" required />
            </Form.Group>
            <Button variant="success">บันทึก</Button>
        </Form>
    </Fragment>
)


class Course extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tabKey: null
        }
    }

    componentDidMount() {
        this.props.getCourseList()
        this.props.getCourseData()
    }

    handleTabSelect = selectedTab => {
        this.setState({
            tabKey: selectedTab
        })
    }

    render() {
        let { tabKey } = this.state
        let { courseList, courseData } = this.props.information

        let key = courseList !== null && courseList[0]['course_id']

        return (
            <Fragment>
                <div className="my-3 w-75 mx-auto">
                    <h1 className="admin-page-header">ข้อมูลหลักสูตร</h1>
                    <hr className="yellow-hr" />
                    <Container fluid>
                        {
                            key && (
                                <Tab.Container defaultActiveKey={key}>
                                    <Row>
                                        <Col lg={3}>
                                            <Nav variant="pills" activeKey={tabKey} className="flex-column sub-nav">
                                                {
                                                    courseList !== null && (
                                                        courseList.map((item, index) => (
                                                            <Nav.Item key={index}>
                                                                <Nav.Link eventKey={item['course_id']} className="sub-nav">{item['course_name']}&nbsp;{item['course_year']}</Nav.Link>
                                                            </Nav.Item>
                                                        ))
                                                    )
                                                }
                                            </Nav>
                                        </Col>
                                        <Col lg={9}>
                                            <Tab.Content>
                                                {
                                                    courseList !== null && courseData != null && (
                                                        courseData.map((item, index) => (
                                                            <Tab.Pane key={index} eventKey={item['course_id']}>
                                                                <CourseDetail data={item} />
                                                            </Tab.Pane>
                                                        ))
                                                    )
                                                }
                                            </Tab.Content>
                                        </Col>
                                    </Row>
                                </Tab.Container>
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