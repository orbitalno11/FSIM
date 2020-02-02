import React from 'react'
import ReactDOM from 'react-dom';
import { FormControl } from 'react-bootstrap';


class faulty extends React.Component {
    onSelected = (search) => {
        let faulty = search.target.value
        this.props.option(faulty)
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