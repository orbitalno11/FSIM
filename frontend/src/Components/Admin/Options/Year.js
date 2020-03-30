import React, { Component } from "react";
import { FormControl } from "react-bootstrap";

class Year extends Component {
  onSelected = search => {
    this.props.option(search);
  };

  render() {
  

    return (
      <React.Fragment>
        <FormControl
          as="select"
          id="year"
          onChange={this.onSelected}
          value={this.props.value}
        >
          <option value='0'>เลือกปีการศึกษา</option>
          {this.props.year.map(item => (
            <option value={item.id} key={item.id}>{item.name}</option>
          ))}


        </FormControl>
      </React.Fragment>
    );
  }
}

export default Year;