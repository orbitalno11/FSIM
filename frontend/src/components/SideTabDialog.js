import React, { Component, Fragment } from 'react'

import MediaQuery from 'react-responsive'

import { Nav, Tab, Row, Col, DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap'

import { minDeviceWidth } from '../Constant'


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

    handleChangeText = value => {
        this.setState({
            dropdownTitle: value
        })
    }

    render() {

        let { tabKey, tabName, tabDetail, dropdownTitle } = this.state

        return (
            <Fragment>
                <Tab.Container defaultActiveKey={tabKey} onSelect={this.handleTabSelector}>
                    <Row>
                        <Col xs={12} md={3}>
                            <MediaQuery minDeviceWidth={minDeviceWidth}>
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
                            <MediaQuery maxDeviceWidth={minDeviceWidth - 1}>
                                <DropdownButton title={dropdownTitle} variant="outline-warning" className="my-3">
                                    {
                                        tabName !== null && tabName.map((item, index) => (
                                            <Dropdown.Item key={index} eventKey={item['tabId']}><div onClick={() => this.handleChangeText(item['tabTitle'])}>{item['tabTitle']}</div></Dropdown.Item>
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