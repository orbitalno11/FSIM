import React, { Component, Fragment } from 'react'

import { Container, Nav, Tab, Col, Row } from 'react-bootstrap'


import ARDetail from "./ARDetail";
import AMSci from "./AMSci";


class ActivityActiveRecruitment extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tabKey: '1'
        }
    }

  

    render() {
        let { tabKey } = this.state
        return (
            <Fragment>
                <div className="my-2 w-100 mx-auto">
                    <Container fluid>
                        <Tab.Container defaultActiveKey={tabKey}>
                            <Row>
                                <Col lg={3}>
                                    <Nav variant="pills" activeKey={tabKey} onSelect={this.handleTabSelect} className="flex-column sub-nav">
                                        <Nav.Item>
                                            <Nav.Link eventKey="1" className="sub-nav" paneList={[<ARDetail />]} > RoadShow</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="2" className="sub-nav">I AM SCI</Nav.Link>
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

export default ActivityActiveRecruitment