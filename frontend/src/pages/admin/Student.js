import React, {Component, Fragment} from "react";
import { Form, FormControl, InputGroup } from 'react-bootstrap'
import { Table, Button } from 'semantic-ui-react'

import SearchActivity from "../../components/SearchActivity";
import AddActivity from "../../components/AddActivity";
import TabDialog from '../../components/TabDialog'
import SummaryStudent from "../../pages/admin/SummaryStudent";
import AR from "../../pages/admin/AR";

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
const AddTab = () => (
    <Fragment>
        <Form>
            <Form.Group>
                <Form.Label>
                    ปีการศึกษา
                </Form.Label>
                <InputGroup>
                    <FormControl as="select">
                        <option>กรุณาเลือกปีการศึกษา</option>
                        {/* {list.map(item => (<option value={item.id} key={item.id}>{item.name}</option>))} */}
                    </FormControl>
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    ประเภทข้อมูล
                </Form.Label>
                <InputGroup>
                    <FormControl as="select">
                        <option>กรุณาเลือกประเภทข้อมูล</option>
                    </FormControl>
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    ข้อมูลกิจกรรมประชาสัมพันธ์
                </Form.Label>
                <InputGroup>
                    <FormControl type="file" accept=".excel,.xlsx,.csv">
                    </FormControl>
                </InputGroup>
            </Form.Group>
            <Button className="btn-EditData interval-1" >RESET</Button>
            <Button className="btn-info interval-1" >SUBMIT</Button>
        </Form>
    </Fragment>
)


class Student extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: "SearchActivity"
        }
    }

    render() {
        let tabName = ["สรุปข้อมูลผลการศึกษา", "Student tracking", "จัดการข้อมูล", "เพิ่มข้อมูล"]
        let pane = [<SummaryStudent/>, <AR/>,< ManageTab/>, <AddTab />]
        return (
            <Fragment>
                <TabDialog
                    dialogName="ข้อมูลนักศึกษาปัจจุบัน"
                    tabList={tabName}
                    paneList={pane}
                />
            </Fragment>
        );
    }
}

export default Student