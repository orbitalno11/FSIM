import React from 'react'
import ReactDOM from 'react-dom';
import { FormControl } from 'react-bootstrap';


class activity extends React.Component {
    onSelected = (search) => {
        this.props.option(search)
       
    }
    render() {

        return (
            <React.Fragment>
                <FormControl as="select"
                    onChange={this.onSelected} >
                    <option value='0'>ชื่อกิจกรรมรับเข้า</option>
                    <option value='SciCamp'>Sci Camp</option>
                </FormControl>
            </React.Fragment>
        )
    }
}

export default activity