import React, { Component } from "react";
import { FaSistrix, FaDatabase, FaEdit, FaTrash } from "react-icons/fa";
import { InputGroup } from "react-bootstrap";
import { Divider, Table, Button } from "semantic-ui-react";

import Activity from "../Options/Activity";

class SearchActivity extends Component {
  state = {
    activity: 0
  };
  handleChangeActivity = search => {
    this.setState({ activity: search });
  };

  handleSearch = () => {
    console.log(this.state.activity);
  };

  render() {
    return (
      <React.Fragment>
        <InputGroup className="mb-3" style={{ padding: "5%" }}>
          <Activity option={this.handleChangeActivity} />
          <InputGroup.Append>
            <Button className="btn-info" onClick={this.handleSearch}>
              <FaSistrix />
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <Divider />
        <Table>
          <Table.Header >
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>กิจกรรมรับเข้า</Table.HeaderCell>
            <Table.HeaderCell>ประเภทโครงการ</Table.HeaderCell>
            <Table.HeaderCell>การจัดการ</Table.HeaderCell>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>1</Table.Cell>
              <Table.Cell>Sci Camp</Table.Cell>
              <Table.Cell>Active</Table.Cell>
              <Table.Cell>
                <Button
                  className="btn-info interval"
                  onClick={this.handleSearch}
                >
                  <FaDatabase />
                </Button>
                <Button
                  className="btn-EditData interval"
                  onClick={this.handleSearch}
                >
                  <FaEdit />
                </Button>
                <Button
                  className="btn-DeleteData interval"
                  onClick={this.handleSearch}
                >
                  <FaTrash />
                </Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </React.Fragment>
    );
  }
}

export default SearchActivity;
