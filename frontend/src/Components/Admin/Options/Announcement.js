import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';
import Option_channel from './Option';

class Announcement extends Component {
  onSelected = (search) => {
    this.props.option(search)
  }

  render(){
    let announcement = this.props.announcement.map(function (item) {
      return (<Option_channel items={item} />)
    });

    return(
      <React.Fragment>
        <FormControl as="select"
        onChange={this.onSelected}
        value={this.props.value}>
          <option value='0'>กิจกรรมประชาสัมพันธ์</option>
          {announcement}
        </FormControl>
      </React.Fragment>
    );
  }
}

export default Announcement;