import React, { Component, Fragment } from "react";

import { Container, Nav, NavItem, NavLink, TabContainer, TabContent, TabPane } from "react-bootstrap";

class TabDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogName: props.dialogName,
            tabList: props.tabList,
            paneList: props.paneList,
            key: "tab1"
        }
    }

    handleSelect = selectTab => {
        this.setState({
            key: selectTab
        })
        
    }

    render() {
        let { dialogName, tabList, paneList, key } = this.state

        return (
            <Fragment>
                <Container>
                    <h3>{dialogName}</h3>

                    <TabContainer defaultActiveKey={0}>
                        <Nav fill variant={"tabs"} activeKey={this.state.activeKey} onSelect={this.handleSelect}>
                            {tabList !== undefined && tabList.map((item, index) => (
                                <NavItem key={index} className={key === index ? null : "Tab2"}>
                                    <NavLink eventKey={index} className={key === index ? "Tab2-text" : null}>
                                        {item }
                                    </NavLink>
                                </NavItem>
                            ))}
                        </Nav>
                        <TabContent className="mt-4">
                            {paneList !== undefined && paneList.map((item, index) => (
                                <TabPane eventKey={index} key={index}>
                                    {item }
                                </TabPane>
                            ))}
                        </TabContent>
                    </TabContainer>
                </Container>
            </Fragment>
        );
    }

}

export default TabDialog