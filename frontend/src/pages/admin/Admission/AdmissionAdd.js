import React, { Component, Fragment } from "react";

import {Form,InputGroup,FormControl,Button} from 'react-bootstrap'

class Addamission extends Component{
    render(){
        return(
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
    }
}

export default Addamission