import React from 'react'
import ReactDOM from 'react-dom';
import { FormControl } from 'react-bootstrap';


class faulty extends React.Component {
    onSelected = (search) => {
        this.props.option(search)
    }
    render() {

        return (
            <React.Fragment>
                <FormControl as="select"
                    onChange={this.onSelected} >
                    <option value='0'>ภาควิชา</option>
                    <option value='Math'>Math</option>
                    <option value='CHM'>CHM</option>
                </FormControl>
            </React.Fragment>
        )
    }
}

export default faulty