import React, { Component } from "react";
import AddNewStudent from "./AddNewStudent";
import SearchNewStudent from "./SearchNewStudent";
import { Container, Nav, Tab } from "react-bootstrap";
import { Header } from "semantic-ui-react";
// import { FaHeart } from "react-icons/fa";

class NewStudent extends Component {
  state = {
    key: "SearchNewStudent",
    branch: []
  };

  handleSelect = selectedtab => {
    this.setState({ key: selectedtab });
  };

  render() {
    return (
      <React.Fragment>
        <Container className="card-admin">
          <Header as="h3" style={{ marginBottom: "5%" }}>
            จัดการข้อมูลนักศึกษารับเข้า
          </Header>

          <Tab.Container defaultActiveKey="SearchNewStudent">
            <Nav
              fill
              variant="tabs"
              activeKey={this.state.activeKey}
              onSelect={this.handleSelect}
            >
              <Nav.Item
                className={
                  this.state.key === "SearchNewStudent" ? null : "Tab2"
                }
              >
                <Nav.Link
                  eventKey="SearchNewStudent"
                  className={
                    this.state.key === "SearchNewStudent" ? null : "Tab2-text"
                  }
                >
                  ดูข้อมูลนักศึกษารับเข้า
                </Nav.Link>
              </Nav.Item>
              <Nav.Item
                className={
                  this.state.key === "SearchNewStudent" ? "Tab2" : null
                }
              >
                <Nav.Link
                  eventKey="AddNewStudent"
                  className={
                    this.state.key === "SearchNewStudent" ? "Tab2-text" : null
                  }
                >
                  เพิ่มข้อมูลนักศึกษารับเข้า
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="SearchNewStudent">
                  <SearchNewStudent/>
              </Tab.Pane>
              <Tab.Pane eventKey="AddNewStudent">
                  <AddNewStudent/>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Container>
      </React.Fragment>
    );
  }
}

export default NewStudent;