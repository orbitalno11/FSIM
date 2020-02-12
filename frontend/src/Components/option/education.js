import React from 'react'
import ReactDOM from 'react-dom';
import {  FormControl } from 'react-bootstrap';


class education extends React.Component {

    onSelected=(search)=>{
        this.props.option(search)
    }
    render() {
        return (
            <React.Fragment>
                <FormControl as="select"
                 onChange={this.onSelected}>
                    <option value='0'>เลือก</option>
                    <option value='ปริญญาตรี'>ปริญญาตรี</option>
                    <option value='ปริญญาโท'>ปริญญาโท</option>
                </FormControl>
            </React.Fragment>
        )
    }
}

export default education