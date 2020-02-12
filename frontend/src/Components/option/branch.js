import React from 'react'
import ReactDOM from 'react-dom';
import { FormControl } from 'react-bootstrap';


class branch extends React.Component {
    onSelected = (search) => {
        this.props.option(search)
    }
    render() {

        return (
            <React.Fragment>
                <FormControl as="select"
                    onChange={this.onSelected} >
                    <option value='0'>สาขา</option>
                    <option value='Math'>Math</option>
                    <option value='CHM'>CHM</option>
                    <option value='PHY'>PHY</option>
                    <option value='Math'>MIC</option>
                    <option value='FSI'>FSI</option>
                    <option value='STA'>STA</option>
                    <option value='COM-SCI'>COM-SCI</option>
                </FormControl>
            </React.Fragment>
        )
    }
}

export default branch