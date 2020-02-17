import React, { Component }  from 'react'
import SearchAnnouncement from './SearchAnnouncement'
import Addannouncement from './Addannouncement'
import { Container, Nav,Tab } from 'react-bootstrap';

class add_announcement extends Component {

    state = {
        key: 'SearchAnnouncement',
    }
    handleSelect = (selectedtab) => {
        this.setState({ key: selectedtab });
    }
    render() {
        return (
            <React.Fragment>
                <Container className="card-admin" >
                    <h3 style={{ marginBottom: '5%' }}>จัดการข้อมูลประชาสัมพันธ์โรงเรียน</h3>
                    <Tab.Container defaultActiveKey="SearchAnnouncement" >
                        <Nav fill variant="tabs" activeKey={this.state.activeKey}
                            onSelect={this.handleSelect}
                        >
                            <Nav.Item className={this.state.key==='SearchAnnouncement' ? null: "Tab2"} >
                                <Nav.Link
                                    eventKey="SearchAnnouncement"
                                    className={this.state.key==='SearchAnnouncement' ?  null: "Tab2-text"}>ดูข้อมูลกิจกรรม</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className={this.state.key==='SearchAnnouncement' ? "Tab2" : null} >
                                <Nav.Link  className={this.state.key==='SearchAnnouncement' ? "Tab2-text" :null} eventKey="AddAnnouncement" >เพิ่มข้อมูลกิจกรรม</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content className='TabContent' >
                            <Tab.Pane eventKey="SearchAnnouncement" >
                                <SearchAnnouncement />
                            </Tab.Pane>
                            <Tab.Pane eventKey="AddAnnouncement">
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