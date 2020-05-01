import React, { Component, Fragment } from "react";

import { Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import { NavLink } from "react-router-dom";

// 
import Logo from '../img/60year-fsci.png'

class AdminMenu extends Component {

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
                                <LinkContainer to={"/admin/information"} className="navHover" activeClassName="navActive">
                                    <NavDropdown title="ข้อมูลพื้นฐาน">
                                        <NavDropdown.Item as={NavLink} exact to={"/admin/information/department"} className="nav-link" activeClassName="active">ข้อมูลภาควิชา</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} exact to={"/admin/information/course"} className="nav-link" activeClassName="active">ข้อมูลหลักสูตร</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} exact to={"/admin/information/subject"} className="nav-link" activeClassName="active">ข้อมูลรายวิชา</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={NavLink} exact to={"/admin/information"} className="nav-link" activeClassName="active">จัดการข้อมูลพื้นฐาน</NavDropdown.Item>
                                    </NavDropdown>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to={"/admin/student"} className="navHover" activeClassName="navActive">
                                    <NavLink exact to={"/admin/activity"} className="nav-link" activeClassName="active">ข้อมูลนักศึกษาปัจจุบัน</NavLink>
                                    {/* <NavDropdown title="ข้อมูลนักศึกษาปัจจุบัน">
                                        <NavDropdown.Item as={NavLink} exact to={"/admin/student"} className="nav-link" activeClassName="active">ข้อมูลนักศึกษาปัจจุบัน</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} exact to={"/admin/student/academic"} className="nav-link" activeClassName="active">สรุปข้อมูลผลการศึกษา</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} exact to={"/admin/student/tracking"} className="nav-link" activeClassName="active">Student tracking</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={NavLink} exact to={"/admin/student/add"} className="nav-link" activeClassName="active">เพิ่มข้อมูลนักศึกษา</NavDropdown.Item>
                                    </NavDropdown> */}
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to={"/admin/admission"} className="navHover" activeClassName="navActive">
                                    <NavLink exact to={"/admin/activity"} className="nav-link" activeClassName="active">ข้อมูลการรับนักศึกษา</NavLink>
                                    {/* <NavDropdown title="ข้อมูลการรับนักศึกษา">
                                        <NavDropdown.Item as={NavLink} exact to={"/admin/admission"} className="nav-link" activeClassName="active">ข้อมูลการรับนักศึกษา</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} exact to={"/admin/admission/summary"} className="nav-link" activeClassName="active">สรุปข้อมูลการรับนักศึกษา</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} exact to={"/admin/admission/summary/student"} className="nav-link" activeClassName="active">สรุปข้อมูลนักศึกษาใหม่</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={NavLink} exact to={"/admin/admission/add"} className="nav-link" activeClassName="active">เพิ่มข้อมูลการรับนักศึกษาใหม่</NavDropdown.Item>
                                    </NavDropdown> */}
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to={"/admin/activity"} className="navHover" activeClassName="navActive">
                                    <NavLink exact to={"/admin/activity"} className="nav-link" activeClassName="active">ข้อมูลกิจกรรม</NavLink>
                                    {/* <NavDropdown title="ข้อมูลกิจกรรม">
                                        <NavDropdown.Item as={NavLink} exact to={"/admin/activity"} className="nav-link" activeClassName="activeactive">ข้อมูลกิจกรรม</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} exact to={"/admin/activity/pr"} className="nav-link" activeClassName="activeactive">ข้อมูลกิจกรรมประชาสัมพันธ์</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} exact to={"/admin/activity/ar"} className="nav-link" activeClassName="activeactive">ข้อมูล Active Recruitment</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={NavLink} exact to={"/admin/activity/add"} className="nav-link" activeClassName="activeactive">เพิ่มข้อมูลกิจกรรมใหม่</NavDropdown.Item>
                                    </NavDropdown> */}
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to={"/admin/alumni"} className="navHover" activeClassName="navActive">
                                    <NavLink exact to={"/admin/alumni"} className="nav-link" activeClassName="active">ข้อมูลศิษย์เก่า</NavLink>
                                    {/* <NavDropdown title="ข้อมูลศิษย์เก่า">
                                        <NavDropdown.Item as={NavLink} exact to={"/admin/alumni"} className="nav-link" activeClassName="active">ข้อมูลศิษย์เก่า</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} exact to={"/admin/alumni/summary"} className="nav-link" activeClassName="active">สรุปข้อมูลศิษย์เก่า</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} exact to={"/admin/alumni/survey"} className="nav-link" activeClassName="active">สรุปข้อมูลแบบสอบถาม</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={NavLink} exact to={"/admin/alumni/survey/manage"} className="nav-link" activeClassName="active">จัดการแบบสอบถาม</NavDropdown.Item>
                                    </NavDropdown> */}
                                </LinkContainer>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                    <NavDropdown title={"สวัสดี! " + this.props.username}>
                        <NavDropdown.Item className="nav-link">ออกจากระบบ</NavDropdown.Item>
                    </NavDropdown>
                </Navbar>
            </Fragment>
        )
    }
}

export default AdminMenu