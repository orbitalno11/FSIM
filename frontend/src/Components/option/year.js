import React from 'react'
import ReactDOM from 'react-dom';
import {  FormControl } from 'react-bootstrap';


class year extends React.Component {

    onSelected=(search)=>{
        let year=search.target.value
        this.props.option(year)
    }
    render() {

        return (
            <React.Fragment>

                <FormControl as="select"
                 onChange={this.onSelected}>
                    <option value='0'>เลือกปีการศึกษา</option>
                    <option value='2560'>2560</option>
                    <option value='2561'>2561</option>
                </FormControl>
            </React.Fragment>
        )
    }
}

export default year