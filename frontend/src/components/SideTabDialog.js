import React, { Component, Fragment } from 'react'

import MediaQuery from 'react-responsive'

import { Nav, Tab, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap'


export const convertTabName = (data, idIndicator, nameIndicator) => {
    let outData = []

    data.forEach(item => {
        let detail = {
            tabId: item[idIndicator],
            tabTitle: item[nameIndicator]
        }

        outData.push(detail)
    })

    return outData
}

export const convertDetail = (idIndicator, detailComponent) => {
    return {
        tabId: idIndicator,
        tabDetail: detailComponent
    }
}

class SideTabDialog extends Component {

    constructor(props) {
        super(props)

        this.state = {
            tabKey: props.startKey || null,
            tabName: props.tabName || null,
            tabDetail: props.tabDetail || null,
            dropdownTitle: props.dropdownTitle || "รายการ"
        }
    }

    handleTabSelector = value => {
        this.setState({
            tabKey: value
        })
    }

    render() {

        let { tabKey, tabName, tabDetail, dropdownTitle } = this.state

        return (
            <Fragment>
                <Tab.Container defaultActiveKey={tabKey} onSelect={this.handleTabSelector}>
                    <Row>
                        <Col xs={12} md={3}>
                            <MediaQuery minDeviceWidth={769}>
                                <Nav variant="pills"
                                    activeKey={tabKey}
                                    className="flex-column sub-nav">
                                    {
                                        tabName !== null && tabName.map((item, index) => (
                                            <Nav.Item key={index}>
                                                <Nav.Link eventKey={item['tabId']}
                                                    className="sub-nav">
                                                    {item['tabTitle']}
                                                </Nav.Link>
                                            </Nav.Item>
                                        ))
                                    }
                                </Nav>
                            </MediaQuery>
                            <MediaQuery maxWidth={768}>
                                <DropdownButton title={dropdownTitle} variant="outline-warning" className="my-3 w-100">
                                    {
                                        tabName !== null && tabName.map((item, index) => (
                                            <Dropdown.Item key={index} eventKey={item['tabId']}>{item['tabTitle']}</Dropdown.Item>
                                        ))
                                    }
                                </DropdownButton>
                            </MediaQuery>
                        </Col>
                        <Col xs={12} md={9}>
                            <Tab.Content>
                                {
                                    tabDetail !== null && tabDetail.map((item, index) => (
                                        <Tab.Pane key={index} eventKey={item['tabId']}>
                                            {item['tabDetail']}
                                        </Tab.Pane>
                                    ))
                                }
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Fragment>
        )
    }
}

export default SideTabDialog