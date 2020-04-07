import React, { Component, Fragment } from "react";

import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import { NavLink } from "react-router-dom";

// 
import Logo from '../img/60year-fsci.png'

class AdminMenu extends Component {

    render() {
        let { cur_url } = this.props
        return (
            <Fragment>
                <Navbar bg="white" expand="lg">
                    <Navbar.Brand><img src={Logo} width="250px" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navBarContent" />
                    <Navbar.Collapse id="navBarContent">
                        <Nav className="mr-auto" activeKey="/admin">
                            <Nav.Item>
                                <NavLink exact to={cur_url} className="nav-link" activeClassName="adminActiveLink">หน้าหลัก</NavLink>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to={`${cur_url}/information`} activeClassName="active">
                                    <NavDropdown title="ข้อมูลพื้นฐาน">
                                        <NavDropdown.Item as={NavLink} exact to={`${cur_url}/department`} className="nav-link" activeClassName="adminActiveLink">ข้อมูลภาควิชา</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} exact to={`${cur_url}/course`} className="nav-link" activeClassName="adminActiveLink">ข้อมูลหลักสูตร</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} exact to={`${cur_url}/subject`} className="nav-link" activeClassName="adminActiveLink">ข้อมูลรายวิชา</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={NavLink} exact to={`${cur_url}/information`} className="nav-link" activeClassName="adminActiveLink">จัดการข้อมูลพื้นฐาน</NavDropdown.Item>
                                    </NavDropdown>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to={`${cur_url}/student`} activeClassName="active">
                                    <NavDropdown title="ข้อมูลนักศึกษาปัจจุบัน">
                                        <NavDropdown.Item as={NavLink} exact to={`${cur_url}/student`} className="nav-link" activeClassName="adminActiveLink">ข้อมูลนักศึกษาปัจจุบัน</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} exact to={`${cur_url}/student/academic`} className="nav-link" activeClassName="adminActiveLink">สรุปข้อมูลผลการศึกษา</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} exact to={`${cur_url}/student/tracking`} className="nav-link" activeClassName="adminActiveLink">Student tracking</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={NavLink} exact to={`${cur_url}/student/add`} className="nav-link" activeClassName="adminActiveLink">เพิ่มข้อมูลนักศึกษา</NavDropdown.Item>
                                    </NavDropdown>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to={`${cur_url}/admission`} activeClassName="active">
                                    <NavDropdown title="ข้อมูลการรับนักศึกษา">
                                        <NavDropdown.Item as={NavLink} exact to={`${cur_url}/admission`} className="nav-link" activeClassName="adminActiveLink">ข้อมูลการรับนักศึกษา</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} exact to={`${cur_url}/admission/summary`} className="nav-link" activeClassName="adminActiveLink">สรุปข้อมูลการรับนักศึกษา</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} exact to={`${cur_url}/admission/summary/student`} className="nav-link" activeClassName="adminActiveLink">สรุปข้อมูลนักศึกษาใหม่</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={NavLink} exact to={`${cur_url}/admission/add`} className="nav-link" activeClassName="adminActiveLink">เพิ่มข้อมูลการรับนักศึกษาใหม่</NavDropdown.Item>
                                    </NavDropdown>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to={`${cur_url}/activity`} activeClassName="active">
                                    <NavDropdown title="ข้อมูลกิจกรรม">
                                        <NavDropdown.Item as={NavLink} exact to={`${cur_url}/activity`} className="nav-link" activeClassName="adminActiveLink">ข้อมูลกิจกรรม</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} exact to={`${cur_url}/activity/pr`} className="nav-link" activeClassName="adminActiveLink">ข้อมูลกิจกรรมประชาสัมพันธ์</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} exact to={`${cur_url}/activity/ar`} className="nav-link" activeClassName="adminActiveLink">ข้อมูล Active Recruitment</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={NavLink} exact to={`${cur_url}/activity/add`} className="nav-link" activeClassName="adminActiveLink">เพิ่มข้อมูลกิจกรรมใหม่</NavDropdown.Item>
                                    </NavDropdown>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to={`${cur_url}/alumni`} activeClassName="active">
                                    <NavDropdown title="ข้อมูลศิษย์เก่า">
                                        <NavDropdown.Item as={NavLink} exact to={`${cur_url}/alumni`} className="nav-link" activeClassName="adminActiveLink">ข้อมูลศิษย์เก่า</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} exact to={`${cur_url}/alumni/summary`} className="nav-link" activeClassName="adminActiveLink">สรุปข้อมูลศิษย์เก่า</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} exact to={`${cur_url}/alumni/survey`} className="nav-link" activeClassName="adminActiveLink">สรุปข้อมูลแบบสอบถาม</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={NavLink} exact to={`${cur_url}/alumni/survey/manage`} className="nav-link" activeClassName="adminActiveLink">จัดการแบบสอบถาม</NavDropdown.Item>
                                    </NavDropdown>
                                </LinkContainer>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Fragment>
        )
    }
}

export default AdminMenu