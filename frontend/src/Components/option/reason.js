import React from 'react'
// import ReactDOM from 'react-dom';
import {  FormControl } from 'react-bootstrap';


class reason extends React.Component {

    onSelected=(search)=>{
        this.props.option(search)
    }
    render() {
        return (
            <React.Fragment>
                <FormControl as="select"
                 onChange={this.onSelected}>
                    <option value='0'>เลือกเหตุผล</option>
                    <option value=''>ยังอยากพักก่อน</option>
                    <option value=''>กำลังเตรียมตัวศึกษาต่อ</option>
                </FormControl>
            </React.Fragment>
        )
    }
}

export default  reason