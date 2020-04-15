import React, { Component, Fragment } from "react";

import TabDialog from "../../components/TabDialog";
import { Table, Button } from 'semantic-ui-react'
import { Form, FormControl, InputGroup } from 'react-bootstrap'


const AddTab = () => (
    <Fragment>
        <Form>
            <Form.Group>
                <Form.Label>
                    ปีที่รับเข้า
                </Form.Label>
                <InputGroup>
                    <FormControl as="select">
                        <option>กรุณาเลือกโครงการที่รับเข้า</option>
                        {/* {list.map(item => (<option value={item.id} key={item.id}>{item.name}</option>))} */}
                    </FormControl>
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    โครงการที่รับเข้า
                </Form.Label>
                <InputGroup>
                    <FormControl as="select">
                        <option>กรุณาเลือกโครงการที่รับเข้า</option>
                    </FormControl>
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    รอบรับเข้า
                </Form.Label>
                <InputGroup>
                    <FormControl as="select">
                        <option>กรุณาเลือกรอบที่รับเข้า</option>
                    </FormControl>
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    ข้อมูลการรับนักศึกษา
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

class NewStudent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: "SearchNewStudent",
            branch: []
        }
    }

    render() {
        let tab = ["สรุปข้อมูลนักศึกษาใหม่", "สรุปข้อมูลการรับนักศึกษา", "จัดการข้อมูล", "เพิ่มข้อมูลการรับนักศึกษาใหม่"]
        let pane = [, , , <AddTab />]
        return (
            <Fragment>
                <TabDialog
                    dialogName="ข้อมูลการรับนักศึกษา"
                    tabList={tab}
                    paneList={pane}
                />
            </Fragment>
        );
    }
}

export default NewStudent