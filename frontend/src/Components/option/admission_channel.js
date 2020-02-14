import React from 'react'
// import ReactDOM from 'react-dom';
import { FormControl } from 'react-bootstrap';
import Option_channel from './option'


class around extends React.Component {
    onSelected = (search) => {
        this.props.option(search)
    }
   
    render() {
        let project = this.props.project.map(function (item) {
            return (<Option_channel items={item}/>)
        });
        return (
            <React.Fragment>
                <FormControl as="select"
                    onChange={this.onSelected} 
                    value={this.props.value}>
                    <option value='0'>กรุณาเลือกช่องทางการับเข้า</option>
                    {
                       project
                    }
                  
                </FormControl>
            </React.Fragment>
        )
    }
}

export default around