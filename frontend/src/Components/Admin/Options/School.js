import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';
import Channel from './Option';

class School extends Component{
  onSelected = (search) => {
    this.props.option(search)
  }

  render(){
    let school = this.props.school.map(function (item) {
      return (<Channel items={item} key={item.id} />)
    })

    return(
      <React.Fragment>
        <FormControl as="select"
        onChange={this.onSelected}
        value={this.props.value}>
          <option value='0'>กรุณาเลือกโรงเรียน</option>
          {school}
        </FormControl>
      </React.Fragment>
    );
  }
}

export default School;