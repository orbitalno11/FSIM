import React, { Component, Fragment } from "react";

import { Container } from 'react-bootstrap'

import TabLayout from '../../../components/TabDialog'

import DepartmentMangement from './DepartmentManagement'

class Information extends Component{
    render() {
        let tabList = ["ข้อมูลภาควิชา", "ข้อมูลสาขา", "ข้อมูลหลักสูตร"]
        let paneList = [<DepartmentMangement />, null, null]
        return (
            <Fragment>
                <Container className="my-3">
                    <h1>จัดการข้อมูลพื้นฐาน</h1>
                    <TabLayout tabList={tabList} paneList={paneList} />
                </Container>
            </Fragment>
        )
    }
}

export default Information