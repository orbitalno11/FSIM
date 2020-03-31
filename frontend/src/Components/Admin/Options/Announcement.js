import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';

class Announcement extends Component {
  onSelected = (search) => {
    this.props.option(search)
  }

  render(){
  
    return(
      <React.Fragment>
        <FormControl as="select"
        onChange={this.onSelected}
        value={this.props.value}>
          <option value='0'>กิจกรรมประชาสัมพันธ์</option>
          {this.props.announcement.map(item => (
            <option value={item.id} key={item.id}>{item.name}</option>
          ))}
        </FormControl>
      </React.Fragment>
    );
  }
}

export default Announcement;