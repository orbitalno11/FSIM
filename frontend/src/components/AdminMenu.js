import React, {Component, Fragment} from "react";

import {Nav} from "react-bootstrap";

import { NavLink } from "react-router-dom";

class AdminMenu extends Component {

    render() {
        let {cur_url} = this.props
        return (
            <Fragment>
                <Nav defaultActiveKey="/admin" className="flex-column text-left">
                    <NavLink exact to={cur_url} className="nav-link" activeClassName="adminActiveLink">หน้าหลัก</NavLink>
                    <NavLink exact to={`${cur_url}/information`} className="nav-link" activeClassName="adminActiveLink">ข้อมูลพื้นฐาน</NavLink>
                    <NavLink exact to={`${cur_url}/admission`} className="nav-link" activeClassName="adminActiveLink">ข้อมูลการรับนักศึกษา</NavLink>
                    <NavLink exact to={`${cur_url}/activity`} className="nav-link" activeClassName="adminActiveLink">ข้อมูลกิจกรรม</NavLink>
                    <NavLink exact to={`${cur_url}/alumni`} className="nav-link" activeClassName="adminActiveLink">ข้อมูลศิษย์เก่า</NavLink>
                </Nav>
            </Fragment>
        )
    }
}

export default AdminMenu