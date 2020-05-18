import React, { Component, Fragment } from 'react'

import { Container, Nav, Tab, Col, Row, Button, Form, InputGroup, ButtonGroup } from 'react-bootstrap'

import axios from 'axios'

// 
import TabDialog from '../../../components/TabDialog'


const DepartmentDetail = ({ data }) => (
    <Fragment>
        <Row>
            <Col lg={4}>
                <h2 className="text-sub-header">ชื่อภาควิชา</h2>
            </Col>
            <Col lg={8}>
                <h2 className="text-sub-header">{data['dept_name']}</h2>
            </Col>
        </Row>
        <hr />
        <Row>
            <Col lg={4}>
                <h2 className="text-sub-header">หลักสูตรที่เปิดสอน</h2>
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
                <h2 className="text-sub-header">สาขาวิชา</h2>
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

const DepartmentEdit = ({ data }) => (
    <Fragment>
        <Form>
            <h2 className="text-sub-header">ชื่อภาควิชา</h2>
            <Form.Group>
                <InputGroup>
                    <Form.Control type="text" placeholder="ชื่อภาควิชา" required defaultValue={data['dept_name']} />
                    <Button variant="success">บันทึก</Button>
                </InputGroup>
            </Form.Group>
        </Form>
        <hr />
        <Row noGutters className="my-2">
            <Col sm={3}>
                <h2 className="text-sub-header">ข้อมูลสาขาวิชา</h2>
            </Col>
            <Col sm={9}>
                <ButtonGroup>
                    <Button variant="primary">เพิ่มสาขาวิชา</Button>
                    <Button variant="warning">แก้ไขสาขาวิชา</Button>
                </ButtonGroup>
            </Col>
        </Row>
        <Form className="my-2">
            <Form.Control as={"select"}>
                <option>สาขา1</option>
                <option>สาขา2</option>
                <option>สาขา3</option>
            </Form.Control>
            <Form.Group>
                <Form.Label>ชื่อสาขาวิชา</Form.Label>
                <Form.Control type="text" placeholder="ชื่อสาขาวิชา" required />
            </Form.Group>
            <Button variant="success">บันทึก</Button>
        </Form>
    </Fragment>
)


class Department extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tabKey: null,
            departmentList: null
        }
    }

    componentDidMount() {
        axios.get('/admin/information')
            .then(res => {
                let data = res.data.data

                if (data.length < 1) return

                data.sort((prev, curr) => {
                    let comparison = 0
                    if (prev['dept_name'] > curr['dept_name']) {
                        comparison = 1
                    } else if (prev['dept_name'] < curr['dept_name']) {
                        comparison = -1
                    }
                    return comparison
                })

                this.setState({
                    departmentList: data
                })
            })
            .catch(err => {
                console.error(err)
            })
    }

    handleTabSelect = selectedTab => {
        this.setState({
            tabKey: selectedTab
        })
    }

    render() {
        let { tabKey, departmentList } = this.state
        let key = departmentList !== null && departmentList[0]['dept_id']
        return (
            <Fragment>
                <div className="my-3 w-75 mx-auto">
                    <h1 className="admin-page-header">ข้อมูลภาควิชา</h1>
                    <hr className="yellow-hr" />
                    <Container fluid>
                        {
                            key && (
                                <Tab.Container defaultActiveKey={key}>
                                    <Row>
                                        <Col lg={3}>
                                            <Nav variant="pills" activeKey={tabKey} className="flex-column sub-nav">
                                                {
                                                    departmentList !== null && (
                                                        departmentList.map((item, index) => (
                                                            <Nav.Item key={index}>
                                                                <Nav.Link eventKey={item['dept_id']} className="sub-nav">{item['dept_name']}</Nav.Link>
                                                            </Nav.Item>
                                                        ))
                                                    )
                                                }
                                            </Nav>
                                        </Col>
                                        <Col lg={9}>
                                            <Tab.Content>
                                                {
                                                    departmentList !== null && (
                                                        departmentList.map((item, index) => (
                                                            <Tab.Pane eventKey={item['dept_id']} key={index}>
                                                                <DepartmentDetail data={item} />
                                                                {/* <TabDialog tabList={['ข้อมูลภาควิชา', "แก้ไขข้อมูล"]} paneList={[<DepartmentDetail data={item} />, <DepartmentEdit data={item} />]} /> */}
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

export default Department