import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';

class Faulty extends Component{
  onSelected = (search) => {
    this.props.option(search)
  }

  render() {
    return(
      <React.Fragment>
        <FormControl as="select"
        onChange={this.onSelected}>
          <option value='0'>ภาควิชา</option>
          <option value='mth'>คณิตศาสตร์</option>
          <option value='chm'>เคมี</option>
          <option value='phy'>ฟิสิกส์</option>
          <option value='mic'>จุลชีววิทยา</option>
        </FormControl>
      </React.Fragment>
    );
  }
}

export default Faulty;