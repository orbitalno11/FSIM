import React, {Component, Fragment} from 'react'

import TabDialog from '../../components/TabDialog'
import {Table, Button} from 'semantic-ui-react'
import {Form, InputGroup} from 'react-bootstrap'
import SummaryAlumni from "../../pages/admin/SummaryAlumni";
import SummarySurvey from "../../pages/admin/SummarySurvey";

// 


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
                        ตารางที่เลือก
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
                <Table.Row>
                    <Table.Cell>
                        ลำดับ
                    </Table.Cell>
                    <Table.Cell>
                        ปีการศึกษา
                    </Table.Cell>
                    <Table.Cell>
                        ตารางที่เลือก
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
                    ลิงก์ Google Sheet
                </Form.Label>
                <InputGroup>
                    <Form.Control type="text" placeholder="วางลิงก์ Google Sheet"/>
                    <Button>ตรวจสอบ</Button>
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <Form.Label>เลือกหัวข้อที่ต้องการ</Form.Label>
                <Form.Check
                    label="topic1"/>
            </Form.Group>
        </Form>
    </Fragment>
)


class AlumniManage extends Component {
    render() {
        let tabName = ["สรุปข้อมูลศิษย์เก่า", "สรุปข้อมูลแบบสอบถาม", "จัดการรายการแบบสอบถาม", "เพิ่มข้อมูลแบบสอบถาม"]
        let paneTab = [<SummaryAlumni/>,<SummarySurvey/>, <ManageTab/>, <AddTab/>]
        return (
            <Fragment>
                <TabDialog
                    dialogName="ข้อมูลศิษย์เก่า"
                    tabList={tabName}
                    paneList={paneTab}
                />
            </Fragment>
        )
    }
}

export default AlumniManage