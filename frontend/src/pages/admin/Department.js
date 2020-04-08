import React, { Component, Fragment } from 'react'

import { Container, Nav, Tab, Col, Row } from 'react-bootstrap'

//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicroscope, faAtom, faSquareRootAlt, faFlask, faChartPie } from '@fortawesome/free-solid-svg-icons'

// 
import TabDialog from '../../components/TabDialog'

// 
import LineChart from '../../components/Graph/Line'


class Department extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tabKey: 'home'
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
                        <Tab.Container defaultActiveKey="home">
                            <Row>
                                <Col lg={3}>
                                    <Nav variant="pills" activeKey={tabKey} onSelect={this.handleTabSelect} className="flex-column sub-nav">
                                        <Nav.Item>
                                            <Nav.Link eventKey="home" className="sub-nav"><FontAwesomeIcon icon={faChartPie} /> ภาพรวม</Nav.Link>
                                        </Nav.Item>
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
                                            <TabDialog tabList={['ข้อมูลภาควิชา', "แก้ไขข้อมูล"]} />
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