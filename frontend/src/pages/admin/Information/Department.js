import React, { Component, Fragment } from 'react'

import { Container, Nav, Tab, Col, Row, Button, Form, InputGroup, ButtonGroup } from 'react-bootstrap'

//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicroscope, faAtom, faSquareRootAlt, faFlask } from '@fortawesome/free-solid-svg-icons'

// 
import TabDialog from '../../../components/TabDialog'

// 
import LineChart from '../../../components/Graph/Line'

const DepartmentDetail = () => (
    <Fragment>
        <h2 className="text-sub-header">ชื่อภาควิชา</h2>
        <hr />
        <Row>
            <Col lg={4}>
                <h2 className="text-sub-header">หลักสูตรที่เปิดสอน</h2>
            </Col>
            <Col lg={8}>
                <ul>
                    <li>หลักสูตร 1</li>
                    <li>หลักสูตร 2</li>
                    <li>หลักสูตร 3</li>
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
                    <li>สาขา1</li>
                    <li>สาขา2</li>
                    <li>สาขา3</li>
                </ul>
            </Col>
        </Row>
    </Fragment>
)

const DepartmentEdit = () => (
    <Fragment>
        <Form>
            <h2 className="text-sub-header">ชื่อภาควิชา</h2>
            <Form.Group>
                <InputGroup>
                    <Form.Control type="text" placeholder="ชื่อภาควิชา" required />
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
            tabKey: 'mth'
        }
    }

    handleTabSelect = selectedTab => {
        this.setState({
            tabKey: selectedTab
        })
    }

    render() {
        let { location, match } = this.props
        let { tabKey } = this.state
        return (
            <Fragment>
                <div className="my-3 w-75 mx-auto">
                    <h1 className="admin-page-header">ข้อมูลภาควิชา</h1>
                    <hr className="yellow-hr" />
                    <Container fluid>
                        <Tab.Container defaultActiveKey={tabKey}>
                            <Row>
                                <Col lg={3}>
                                    <Nav variant="pills" activeKey={tabKey} onSelect={this.handleTabSelect} className="flex-column sub-nav">
                                        <Nav.Item>
                                            <Nav.Link eventKey="mth" className="sub-nav"><FontAwesomeIcon icon={faSquareRootAlt} /> ภาควิชาคณิตศาสตร์</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="chm" className="sub-nav"><FontAwesomeIcon icon={faFlask} /> ภาควิชาเคมี</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="mic" className="sub-nav"><FontAwesomeIcon icon={faMicroscope} /> ภาควิชาจุลชีววิทยา</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="phy" className="sub-nav"><FontAwesomeIcon icon={faAtom} /> ภาควิชาฟิสิกส์</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col lg={9}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="home">
                                            <LineChart />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="mth">
                                            <TabDialog tabList={['ข้อมูลภาควิชา', "แก้ไขข้อมูล"]} paneList={[<DepartmentDetail />, <DepartmentEdit />]} />
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

export default Department