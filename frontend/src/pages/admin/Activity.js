import React, {Component, Fragment} from "react";
import { Form, FormControl, InputGroup } from 'react-bootstrap'
import { Table, Button } from 'semantic-ui-react'

import SearchActivity from "../../components/SearchActivity";
// import AddActivity from "../../components/AddActivity";
import TabDialog from '../../components/TabDialog'
import SummaryActivity from "../../pages/admin/SummaryActivity";
import AR from "../../pages/admin/AR";
import AddActivity  from "../../pages/admin/AddActivity";

const ManageTab = () => (
    <Fragment>
        <Table>
        <Table.Header>
                <Table.Row textAlign="center">
                    <Table.HeaderCell>
                        ลำดับ
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        ปีการศึกษา
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                       ประเภทโครงการ
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                       โครงการ
                    </Table.HeaderCell>
                   
                    <Table.HeaderCell>
                     ลิงก์ Google Sheet
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        ดำเนินการ
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row textAlign="center" >
                    <Table.Cell>
                        1
                    </Table.Cell>
                    <Table.Cell>
                        2560
                    </Table.Cell>
                    <Table.Cell>
                        Active Recruitment
                    </Table.Cell>
                    <Table.Cell>
                        I AM SCI
                    </Table.Cell>
                    <Table.Cell>
                         ลิงก์ Google Sheet
                    </Table.Cell>
                    <Table.Cell>
                        <Button>แก้ไข</Button>
                        <Button>ลบ</Button>
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    </Fragment>
)

class Activity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: "SearchActivity"
        }
    }

    render() {
        let tabName = ["ข้อมูลกิจกรรมประชาสัมพันธ์", "ข้อมูล Active Recruitment", "จัดการข้อมูลกิจกรรม", "เพิ่มข้อมูล"]
        let pane = [<SummaryActivity/>, <AR/>,< ManageTab/>, <AddActivity/>]
        return (
            <Fragment>
                <TabDialog
                    dialogName="กิจกรรมประชาสัมพันธ์ และ Active Recruitment"
                    tabList={tabName}
                    paneList={pane}
                />
            </Fragment>
        );
    }
}

export default Activity