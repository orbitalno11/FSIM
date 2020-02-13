import React from 'react'
import ReactDOM from 'react-dom';
import SearchStudent from './SearchStudent'
import AddStudent from './AddStudent'
import { Container, Nav, Button, Tab } from 'react-bootstrap';

class see_student extends React.Component {

    state = {
        key: 'SearchStudent',
    }
    handleSelect = (selectedtab) => {
        this.setState({ key: selectedtab });
    }
    render() {
        const year=[
			{
				id:1,
				name:'2012'
			},
			{
				id:2,
				name:'2013'
			},
			{
				id:3,
				name:'2014'
			}
		]
        return (
            <React.Fragment>
                <Container className="contrain_css" >
                    <h3 style={{ marginBottom: '5%' }}>จัดการข้อมูลนักศึกษา</h3>
                    <Tab.Container defaultActiveKey="SearchStudent" >
                        <Nav fill variant="tabs" activeKey={this.state.activeKey}
                            onSelect={this.handleSelect}
                        >
                            <Nav.Item className={this.state.key==='SearchStudent' ? null: "Tab2"} >
                                <Nav.Link
                                    eventKey="SearchStudent" className={this.state.key==='SearchStudent' ?  null: "Tab2-text"}  >ดูข้อมูลนักศึกษา</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className={this.state.key==='SearchStudent' ? "Tab2" : null}>
                                <Nav.Link className={this.state.key==='SearchStudent' ? "Tab2-text" :null} eventKey="AddAnnouncement" >เพิ่มข้อมูลนักศึกษา</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content className='TabContent' >
                            <Tab.Pane eventKey="SearchStudent" >
                                <SearchStudent year={year}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="AddStudent">
                                <AddStudent year={year}/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </Container>
            </React.Fragment>

        )
    }
}

export default see_student