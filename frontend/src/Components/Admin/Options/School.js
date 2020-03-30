import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';

class School extends Component{
  onSelected = (search) => {
    this.props.option(search)
  }

  render(){
  
    return(
      <React.Fragment>
        <FormControl as="select"
        onChange={this.onSelected}
        value={this.props.value}>
          <option value='0'>กรุณาเลือกโรงเรียน</option>
          {this.props.school.map(item => (
            <option value={item.id} key={item.id}>{item.name}</option>
          ))}
        </FormControl>
      </React.Fragment>
    );
  }
}

export default School;