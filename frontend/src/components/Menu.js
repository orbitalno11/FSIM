import React, { Component, Fragment } from "react";
import { Menu, Responsive, Visibility, Image } from "semantic-ui-react";

import { Navbar, Container, NavDropdown } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { NavLink } from "react-router-dom";

import logo from "../img/60year-fsci.png";

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class UserNavbar extends Component {
  state = {};
  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Fragment>
        <Responsive
          getWidth={getWidth}
          minWidth={Responsive.onlyTablet.minWidth}
        >
          <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
          >
            <Container>
              <Navbar expand="lg">
                <Navbar.Brand href="/">
                  <Image className="logo" src={logo} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse
                  id="responsive-navbar-nav"
                  className="justify-content-end"
                >
                  <Nav className="justify-content-end" activeKey="/home">
                  <Nav.Item>
                                <NavLink exact to="/" className="nav-link navHover" activeClassName="navActive">หน้าหลัก</NavLink>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to={"/page"} className="navHover" activeClassName="navActive">
                                    <NavDropdown title="ข้อมูลนักศึกษา">
                                        <NavDropdown.Item as={NavLink} exact to={"/student/mth"} className="nav-link" activeClassName="active">ภาควิชาคณิตศาสตร์</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} exact to={"/student/phy"} className="nav-link" activeClassName="active">ภาควิชาฟิสิกส์</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} exact to={"/student/chm"} className="nav-link" activeClassName="active">ภาควิชาเคมี</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} exact to={"/student/mic"} className="nav-link" activeClassName="active">ภาควิชาจุลชีววิทยา</NavDropdown.Item>
                                    </NavDropdown>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to={"/page"} className="navHover" activeClassName="navActive">
                                    <NavDropdown title="กิจกรรมประชาสัมพันธ์">
                                        <NavDropdown.Item as={NavLink} exact to={"/admission"} className="nav-link" activeClassName="active">โครงการรับเข้า</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} exact to={"/active"} className="nav-link" activeClassName="active">ActiveRecruitement</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} exact to={"/activity"} className="nav-link" activeClassName="active">กิจกรรมประชาสัมพันธ์</NavDropdown.Item>
                                      
                                    </NavDropdown>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to={"/alumni"} className="navHover" activeClassName="navActive">
                                    <NavLink exact to={"/alumni"} className="nav-link" activeClassName="active">ข้อมูลศิษย์เก่า</NavLink>
                                </LinkContainer>
                            </Nav.Item>
                            
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </Container>
            {/* <Menu
                        secondary={!fixed}
                        size="large"
                    >
                        <Container>
                            <Image className="logo" src={logo}/>
                            <Menu.Menu position="right">
                                <Menu.Item as="a" href="/" name="หน้าหลัก">
                                    หน้าหลัก
                                </Menu.Item>

                                <Dropdown item as="a" text="ข้อมูลนักศึกษา">
                                    <Dropdown.Menu>
                                        <Dropdown.Item>
                                            ภาควิชาคณิตศาสตร์
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            ภาควิชาฟิสิกส์
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            ภาควิชาจุลชีววิทยา
                                        </Dropdown.Item>
                                        <Dropdown.Item>ภาควิชาเคมี</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Dropdown item as="a" text="กิจกรรมประชาสัมพันธ์นักศึกษา">
                                    <Dropdown.Menu>
                                        <Dropdown.Item>
                                            สรุปข้อมูลประชาสัมพันธ์
                                        </Dropdown.Item>
                                        <Dropdown.Item>สรุปข้อมูลรับเข้า</Dropdown.Item>
                                        <Dropdown.Item>
                                            สรุปข้อมูลโครงการรับเข้า
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Menu.Item as="a" name="ข้อมูลศิษย์เก่า"/>
                            </Menu.Menu>
                        </Container>
                    </Menu> */}
          </Visibility>
          {children}
        </Responsive>
      </Fragment>
    );
  }
}

export default UserNavbar;
