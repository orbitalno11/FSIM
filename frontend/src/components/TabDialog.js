import React, { Component, Fragment } from "react";

import { Container, Nav, NavItem, NavLink, TabContainer, TabContent, TabPane } from "react-bootstrap";
import { Header } from "semantic-ui-react";

class TabDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogName: props.dialogName,
            tab1Name: props.tab1Name,
            tab2Name: props.tab2Name,
            tab1Pane: props.tab1Pane,
            tab2Pane: props.tab2Pane,
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
                    <Header as="h3" style={{ marginBottom: "5%" }}>
                        {dialogName}
                    </Header>

                    <TabContainer defaultActiveKey={0}>
                        <Nav fill={true} variant={"tabs"} activeKey={this.state.activeKey} onSelect={this.handleSelect}>
                            {tabList.map((item, index) => (
                                <NavItem key={index} className={key === index ? null : "Tab2"}>
                                    <NavLink eventKey={index} className={key === index ? "Tab2-text" : null}>
                                        {item}
                                    </NavLink>
                                </NavItem>
                            ))}
                        </Nav>
                        <TabContent className="mt-4">
                            {paneList.map((item, index) => (
                                <TabPane eventKey={index} key={index}>
                                    {item}
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