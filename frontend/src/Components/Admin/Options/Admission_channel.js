import React, { Component } from "react";
import { FormControl } from "react-bootstrap";
// import Option from "./Option";

class Channel extends Component {

  // onSelected = search => {
  //   this.props.option(search);
  // };


  render() {
    let channel = this.props.value
    let project = channel.map(item => {
      const { channel_id, channel_name } = item
    return <option key={channel_id} value={channel_id}>{channel_name}</option>
    })
    return (
      <React.Fragment>
        <FormControl
          as="select"
          id="admission_channel"
        >
          <option>กรุณาเลือกช่องทางการรับเข้า</option>
          {project}
        </FormControl>
      </React.Fragment>
    );
  }
}

export default Channel;
