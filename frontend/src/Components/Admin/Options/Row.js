import React, { Component } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";

class Row extends Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.row);
  }

  render() {
    return (
      <React.Fragment>
        <InputGroup className="mb-3">
          <FormControl
            type="text"
            name={this.props.name}
            id={this.props.row.id}
            onChange={this.props.onProductTableUpdate}
            value={this.props.row.name}
            placeholder="ชื่อโครงการ"
          />
          <InputGroup.Append>
            <Button
              onClick={this.props.onAddEve}
              className="btn-EditData interval-1"
            >
              +
            </Button>
            <Button className="btn-DeleteData interval-1"
            onClick={this.onDelEvent.bind(this)}>-</Button>
          </InputGroup.Append>
        </InputGroup>
      </React.Fragment>
    );
  }
}

export default Row;