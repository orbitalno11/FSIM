import React from 'react'
import ReactDOM from 'react-dom';
import { FormControl } from 'react-bootstrap';


class nametitle extends React.Component {
    onSelected = (search) => {
        this.props.option(search)
    }
    render() {

        return (
            <React.Fragment>
                <FormControl as="select"
                    onChange={this.onSelected} >
                    <option value='0'>เลือก</option>
                    <option value='นาง'>นาง</option>
                    <option value='นาย'>นาย</option>
                    <option value='นางสาว'>นางสาว</option>
                </FormControl>
            </React.Fragment>
        )
    }
}

export default nametitle