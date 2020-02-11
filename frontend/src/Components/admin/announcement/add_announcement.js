import React, { Component }  from 'react'
import SearchAnnouncement from './searchAnnouncement'
import Addannouncement from './Addannouncement'
import { Container, Nav, Button, Tab } from 'react-bootstrap';

class add_announcement extends Component {

    state = {
        key: 'SearchActivity',
    }
    handleSelect = (selectedtab) => {
        this.setState({ key: selectedtab });
    }
    render() {
        return (
            <React.Fragment>
                <Container className="contrain_css" >
                    <h3 style={{ marginBottom: '5%' }}>จัดการข้อมูลประชาสัมพันธ์โรงเรียน</h3>
                    <Tab.Container defaultActiveKey="SearchActivity" >
                        <Nav fill variant="tabs" activeKey={this.state.activeKey}
                            onSelect={this.handleSelect}
                        >
                            <Nav.Item >
                                <Nav.Link
                                    eventKey="SearchActivity">ดูข้อมูลกิจกรรม</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="Tab2">
                                <Nav.Link className="Tab2-text" eventKey="AddActivity" >เพิ่มข้อมูลกิจกรรม</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content className='TabContent' >
                            <Tab.Pane eventKey="SearchActivity" >
                                <SearchAnnouncement />
                            </Tab.Pane>
                            <Tab.Pane eventKey="AddActivity">
                                <Addannouncement />
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </Container>
            </React.Fragment>

        )
    }
}

export default add_announcement