import React, { Component } from "react";
import { FaSistrix} from "react-icons/fa";
import { InputGroup, Button, Table } from "react-bootstrap";
// import Year from "../option/year";

class Tableinfo extends Component {
  handleChangeActivity = search => {
    this.setState({ activity: search });
  };

  handleSearch = () => {
    console.log(this.state.activity);
  };

  handleChangeYear = search => {
    this.setState({ year: search });
    console.log(search);
  };

  handleSearch = () => {
    console.log(this.state.year);
  };

  render() {
    return (
      <React.Fragment>
        <InputGroup className="mb-3" style={{ padding: "5%" }}>
          {/* <Year option={this.handleChangeYear} year={this.props.year} /> */}
          <InputGroup.Append>
            <Button className="btn-info" onClick={this.handleSearch}>
              <FaSistrix />
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <hr></hr>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No.</th>
              <th>รหัสนักศึกษา</th>
              <th>ชื่อ-นามสกุล</th>
              <th>สาขา</th>
              <th>GPA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Sci Camp</td>
              <td>Active</td>
              <td>mth</td>
              <td>3</td>
            </tr>
          </tbody>
        </Table>
      </React.Fragment>
    );
  }
}

export default Tableinfo;
