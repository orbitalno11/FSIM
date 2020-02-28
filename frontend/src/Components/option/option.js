import React from 'react'
// import ReactDOM from 'react-dom';
// import { FormControl } from 'react-bootstrap';
// import { Item } from 'semantic-ui-react';


class option extends React.Component {
  
    render() {

        return (
            <React.Fragment>
                <option value={this.props.items.id}>{this.props.items.name}</option>
            </React.Fragment>
        )
    }
}

export default option