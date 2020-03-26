import React, { Component } from "react";
import { FormControl } from "react-bootstrap";
import Option from "./Option";

class Channel extends Component {
  onSelected = search => {
    this.props.option(search);
  };

  render() {
    let project = this.props.project.map(function(item) {
      return <Option item={item} key={item.id} />;
    });

    return (
      <React.Fragment>
        <FormControl
          as="select"
          id="admission_channel"
          onChange={this.onSelected}
          value={this.props.value}
        >
          <option value="0">กรุณาเลือกช่องทางการรับเข้า</option>
          {project}
        </FormControl>
      </React.Fragment>
    );
  }
}

export default Channel;
