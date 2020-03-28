import React, { Component } from 'react';
import SearchStudent from './SearchStudent';
import AddStudent from './AddStudent';
import { Container, Nav, Tab } from 'react-bootstrap';
import { Header } from "semantic-ui-react";

class Student extends Component{
  state = {
    key: "SearchStudent"
  };

  handleSelected = selectedtab => {
    this.setState({ key: selectedtab });
  };

  render(){

    return(
      <React.Fragment>
        <Container className="card-admin">
          <Header as='h3' style={{ marginBottom: '5%'}}>จัดการข้อมูลนักศึกษา</Header>
          <Tab.Container defaultActiveKey="SearchStudent">
            <Nav fill variant="tabs" activeKey={this.state.activeKey}
            onSelect={this.handleSelected}>
              <Nav.Item className={this.state.key === "SearchStudent" ? null : "Tb2"}>
                <Nav.Link eventKey="SearchStudent" className={this.state.key === "SearchStudent" ? null : "Tab2-text"}>
                  ดูข้อมูลนักศึกษา
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className={this.state.key === "SearchStudent" ? "Tab2" : null}>
                <Nav.Link eventKey="AddStudent" className={this.state.key === "SearchStudent" ? "Tab2-text" : null}>
                  เพิ่มข้อมูลนักศึกษา
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="SearchStudent">
                <SearchStudent />
              </Tab.Pane>
              <Tab.Pane eventKey="AddStudent">
                <AddStudent/>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Container>
      </React.Fragment>
    );
  }
}

export default Student;