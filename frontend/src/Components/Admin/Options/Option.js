import React, { Component } from "react";


class Option extends Component {
  render() {
    return (
      <React.Fragment>
        <option value={this.props.items.id} key={this.props.items.id}>{this.props.items.name}</option>
      </React.Fragment>
    );
  }
}

export default Option;
