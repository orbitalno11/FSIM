import React, { Component, Fragment } from 'react'

import { Container, Nav, Tab, Col, Row, Button, Form, InputGroup, ButtonGroup } from 'react-bootstrap'

//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicroscope, faAtom, faSquareRootAlt, faFlask } from '@fortawesome/free-solid-svg-icons'

// 
import TabDialog from '../../components/TabDialog'
import ARDetail from "../../pages/admin/ARDetail";
import AMSci from "../../pages/admin/AMSci";

// 
import LineChart from '../../components/Graph/Line'


class AR extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tabKey: '1'
        }
    }

  

    render() {
        let { location, match } = this.props
        let { tabKey } = this.state
        return (
            <Fragment>
                <div className="my-2 w-100 mx-auto">
                    {/* <h1 className="admin-page-header">ข้อมูลภาควิชา</h1>
                    <hr className="yellow-hr" /> */}
                    <Container fluid>
                        <Tab.Container defaultActiveKey={tabKey}>
                            <Row>
                                <Col lg={3}>
                                    <Nav variant="pills" activeKey={tabKey} onSelect={this.handleTabSelect} className="flex-column sub-nav">
                                        <Nav.Item>
                                            <Nav.Link eventKey="1" className="sub-nav" paneList={[<ARDetail />]} > RodaShow</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="2" className="sub-nav">I AM SCI</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="" className="sub-nav"></Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="" className="sub-nav"> </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col lg={9}>
                                    <Tab.Content>
                                        
                                        <Tab.Pane eventKey="1">
                                            <ARDetail />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="2">
                                           <AMSci/>
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

export default AR