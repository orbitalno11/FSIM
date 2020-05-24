import React, { Component, Fragment } from "react";

import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import { NavLink } from "react-router-dom";

// redux
import { connect } from 'react-redux'
import { userLogout } from '../redux/action/authAction'

// 
import Logo from '../img/60year-fsci.png'

class AdminMenu extends Component {

    handleLogout = () => {
        this.props.logout()
    }

    render() {
        return (
            <Fragment>
                <Navbar expand="lg">
                    <Navbar.Brand><img src={Logo} height="50px" alt="fsci-logo" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navBarContent" />
                    <Navbar.Collapse id="navBarContent">
                        <Nav className="mr-auto" activeKey="/admin">
                            <Nav.Item>
                                <NavLink exact to="/admin" className="nav-link navHover" activeClassName="navActive">หน้าหลัก</NavLink>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to={"/admin/information/department"} className="navHover" activeClassName="navActive">
                                    <NavLink exact to={"/admin/information/department"} className="nav-link" activeClassName="active">ข้อมูลภาควิชา</NavLink>
                                </LinkContainer>
                            </Nav.Item>
                            {/* <Nav.Item>
                                <LinkContainer to={"/admin/information"} className="navHover" activeClassName="navActive">
                                    <NavDropdown title="ข้อมูลพื้นฐาน">
                                        <NavLink exact to={"/admin/information"} className="nav-link" activeClassName="active">ข้อมูลภาควิชา</NavLink>
                                        <NavDropdown.Item as={NavLink} exact to={"/admin/information/department"} className="nav-link" activeClassName="active">ข้อมูลภาควิชา</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} exact to={"/admin/information/course"} className="nav-link" activeClassName="active">ข้อมูลหลักสูตร</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} exact to={"/admin/information/subject"} className="nav-link" activeClassName="active">ข้อมูลรายวิชา</NavDropdown.Item> */}
                                        {/* {/* <NavDropdown.Divider />
                                        <NavDropdown.Item as={NavLink} exact to={"/admin/information"} className="nav-link" activeClassName="active">จัดการข้อมูลพื้นฐาน</NavDropdown.Item> */}
                                    {/* </NavDropdown>
                                </LinkContainer>
                            </Nav.Item> */} 
                            <Nav.Item>
                                <LinkContainer to={"/admin/student"} className="navHover" activeClassName="navActive">
                                    <NavLink exact to={"/admin/student"} className="nav-link" activeClassName="active">ข้อมูลนักศึกษาปัจจุบัน</NavLink>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to={"/admin/admission"} className="navHover" activeClassName="navActive">
                                    <NavLink exact to={"/admin/admission"} className="nav-link" activeClassName="active">ข้อมูลการรับนักศึกษา</NavLink>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to={"/admin/activity"} className="navHover" activeClassName="navActive">
                                    <NavLink exact to={"/admin/activity"} className="nav-link" activeClassName="active">ข้อมูลกิจกรรม</NavLink>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to={"/admin/alumni"} className="navHover" activeClassName="navActive">
                                    <NavLink exact to={"/admin/alumni"} className="nav-link" activeClassName="active">ข้อมูลศิษย์เก่า</NavLink>
                                </LinkContainer>
                            </Nav.Item>
                        </Nav>
                        <NavDropdown title={"สวัสดี! " + this.props.auth.userName}>
                            <NavDropdown.Item className="nav-link" onClick={this.handleLogout}>ออกจากระบบ</NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                </Navbar>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(userLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminMenu)