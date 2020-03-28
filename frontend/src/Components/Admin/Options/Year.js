import React, { Component } from "react";
import { FormControl } from "react-bootstrap";
import Option_channel from "./Option";

class Year extends Component {
  onSelected = search => {
    this.props.option(search);
  };

  render() {
    let year = this.props.year.map(function(item) {
      return <Option_channel items={item} key={item.id} />;
    });
  

    return (
      <React.Fragment>
        <FormControl
          as="select"
          id="year"
          onChange={this.onSelected}
          value={this.props.value}
        >
          <option value="0">เลือกปีการศึกษา</option>
          {year}
        </FormControl>
      </React.Fragment>
    );
  }
}

export default Year;
