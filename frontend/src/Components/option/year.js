import React from 'react'
import ReactDOM from 'react-dom';
import {  FormControl } from 'react-bootstrap';


class year extends React.Component {

    onSelected=(search)=>{
        this.props.option(search)
    }
    render() {
        return (
            <React.Fragment>
                <FormControl as="select"
                 onChange={this.onSelected}
                 value={this.props.value}>
                    <option value='0'>เลือกปีการศึกษา</option>
                    <option value='2560'>2560</option>
                    <option value='2561'>2561</option>
                </FormControl>
            </React.Fragment>
        )
    }
}

export default year