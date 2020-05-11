import React, { Component, Fragment } from 'react'

import { Container, Nav, Tab, Col, Row } from 'react-bootstrap'

import axios from 'axios'


import ActiveRecruitmentDetail from './ActivityActiveRecruitementDetail'


class ActivityActiveRecruitment extends Component {

    constructor(props) {
        super(props)
        this.state = {
            projectList: null,
            tabKey: 2
        }
    }

    componentDidMount() {
        axios.get('/activity/project?project_type=1')
        .then(res => {
            let data = res.data.data
            
            if (data.length < 1) return

            this.setState({
                projectList: data
            })

        })
        .catch(err =>{
            console.error(err)
        })
    }

    render() {
        let { tabKey, projectList } = this.state
        return (
            <Fragment>
                <div className="my-2 w-100 mx-auto">
                    <Container fluid>
                        <Tab.Container defaultActiveKey={tabKey}>
                            <Row>
                                <Col lg={3}>
                                    <Nav variant="pills" activeKey={tabKey} onSelect={this.handleTabSelect} className="flex-column sub-nav">
                                        {
                                            projectList !== null && (
                                                projectList.map((item, index) => (
                                                    <Nav.Item key={index}>
                                                        <Nav.Link eventKey={item['project_id']} className="sub-nav">{item['project_name']}</Nav.Link>
                                                    </Nav.Item>
                                                ))
                                            )
                                        }
                                    </Nav>
                                </Col>
                                <Col lg={9}>
                                    <Tab.Content>
                                        {
                                            projectList !== null && (
                                                projectList.map((item, index) => (
                                                    <Tab.Pane key={index} eventKey={item['project_id']}>
                                                        <ActiveRecruitmentDetail data={item} />
                                                    </Tab.Pane>
                                                ))
                                            )
                                        }
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