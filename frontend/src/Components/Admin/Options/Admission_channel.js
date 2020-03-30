import React, { Component } from "react";
import { FormControl } from "react-bootstrap";

class Channel extends Component {
  onSelected = search => {
    this.props.option(search);
  };

  render() {

    return (
      <React.Fragment>
        <FormControl
          as="select"
          id="admission_channel"
          onChange={this.onSelected}
          value={this.props.value}
        >
          <option value="0">กรุณาเลือกช่องทางการรับเข้า</option>
          {this.props.project.map(item => (
            <option value={item.id} key={item.id}>{item.name}</option>
          ))}
        </FormControl>
      </React.Fragment>
    );
  }
}

export default Channel;
