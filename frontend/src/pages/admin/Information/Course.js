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
        <h2 className="text-sub-header">ชื่อหลักสูตร</h2>
        <hr />
        <Row>
            <Col lg={4}>
                <h2 className="text-sub-header">รหัศหลักสูตร</h2>
            </Col>
            <Col lg={8}>
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </ul>
            </Col>
        </Row>
        <hr />
        <Row>
            <Col lg={4}>
                <h2 className="text-sub-header">ปีหลักสูตร</h2>
            </Col>
            <Col lg={8}>
                <ul>
                    <li>2560</li>
                    <li>2554</li>
                   
                </ul>
            </Col>
        </Row>
        <hr />
        <Row className="my-2">
            <Col lg={4}>
                <h2 className="text-sub-header">รายชื่อรายวิชา</h2>
            </Col>
            <Col lg={8}>
                <ul>
                    <li>A</li>
                    <li>B</li>
                    <li>C</li>
                </ul>
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
            tabKey: 'mth'
        }
    }

    handleTabSelect = selectedTab => {
        this.setState({
            tabKey: selectedTab
        })
    }

    render() {
        let { tabKey } = this.state
        return (
            <Fragment>
                <div className="my-3 w-75 mx-auto">
                    <h1 className="admin-page-header">ข้อมูลหลักสูตร</h1>
                    <hr className="yellow-hr" />
                    <Container fluid>
                        <Tab.Container defaultActiveKey={tabKey}>
                            <Row>
                                <Col lg={3}>
                                    <Nav variant="pills" activeKey={tabKey} onSelect={this.handleTabSelect} className="flex-column sub-nav">
                                        <Nav.Item>
                                            <Nav.Link eventKey="mth" className="sub-nav"><FontAwesomeIcon icon={faSquareRootAlt} /> วท.บ. คณิตศาสตร์</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="sta" className="sub-nav"><FontAwesomeIcon icon={faSquareRootAlt} /> วท.บ. วิชาสถิติ</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="acs" className="sub-nav"><FontAwesomeIcon icon={faSquareRootAlt} /> วท.บ. สาขาวิทยาการคอมพิวเตอร์</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="phy" className="sub-nav"><FontAwesomeIcon icon={faAtom} /> วท.บ. สาขาวิชาฟิสิกส์ประยุกต์</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="chm" className="sub-nav"><FontAwesomeIcon icon={faFlask} /> วท.บ. วิชาเคมี</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="mic" className="sub-nav"><FontAwesomeIcon icon={faMicroscope} /> วท.บ. จุลชีววิทยา</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="fst" className="sub-nav"> วท.บ. วิทยาศาสตร์และเทคโนโลยีการอาหาร</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col lg={9}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="home">
                                            <LineChart />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="mth">
                                            <TabDialog tabList={['ข้อมูลหลักสูตร', "แก้ไขข้อมูล"]} paneList={[<DepartmentDetail />, <DepartmentEdit />]} />
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

export default Course