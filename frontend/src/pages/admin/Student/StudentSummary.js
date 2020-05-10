import React, { Component, Fragment } from 'react'

import { Container, Nav, Tab, Col, Row } from 'react-bootstrap'


//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicroscope, faAtom, faSquareRootAlt, faFlask } from '@fortawesome/free-solid-svg-icons'

// 
// import TabDialog from '../../../components/TabDialog';
import StudentData from "./StudentData";
import Statcourse from "../../../pages/Statcourse"

import Statcourse from '../../Statcourse'
// 
// import LineChart from '../../../components/Graph/Line'



class StudentSummary extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tabKey: 'mth'
        }
    }

   

    render() {
        // let { location, match } = this.props
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
                                        <Nav.Item>
                                            <Nav.Link eventKey="course" className="sub-nav"><FontAwesomeIcon icon={faAtom} /> สถิติรายวิชา</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col lg={9}>
                                    <Tab.Content>
                                        
                                        <Tab.Pane eventKey="mth">
                                             <StudentData/>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="chm">
                                            <StudentData/>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="mic">
                                             <StudentData/>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="phy">
                                            <StudentData/>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="course">
                                            <Statcourse/>
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

export default StudentSummary