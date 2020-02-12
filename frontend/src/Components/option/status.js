import React from 'react'
import ReactDOM from 'react-dom';
import { FormControl } from 'react-bootstrap';


class status extends React.Component {
    onSelected = (search) => {
        this.props.option(search)
    }
    render() {

        return (
            <React.Fragment>
                <FormControl as="select"
                    onChange={this.onSelected} >
                    <option value='0'>ภาวะการทำงาน</option>
                    <option value='1'>ทำงานแล้ว</option>
                    <option value='2'>ทำงานพร้อมกับศึกษาต่อ</option>
                    <option value='3'>กำลังศึกษาต่ออย่างเดียว</option>
                    <option value='4'>ยังไม่ได้ทำงานและยังไม่ได้ศึกษาต่อ</option>
                </FormControl>
            </React.Fragment>
        )
    }
}

export default status