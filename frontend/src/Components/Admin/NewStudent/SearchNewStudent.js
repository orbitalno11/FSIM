import React, { Component } from "react";
import { FaSistrix, FaDatabase, FaEdit, FaTrash } from "react-icons/fa";
import { InputGroup, Button, Table } from "react-bootstrap";
import { Divider } from "semantic-ui-react";
import Year from "../Options/Year";
import Faculty from "../Options/Faculty";

class SearchNewStudent extends Component {
  state = {
    faculty: 0,
    year: 0
  };

  handleChangeFaculty = search => {
    this.setState({ faculty: search });
  };

  handleChangeYear = search => {
    this.setState({ year: search });
    console.log(search);
  };

  handleSearch = () => {
    console.log(this.state.faculty + " , " + this.state.year);
  };

  render() {
    const year = [
      {
        id: 1,
        name: "2012"
      },
      {
        id: 2,
        name: "2013"
      },
      {
        id: 3,
        name: "2014"
      }
    ];

    return (
      <React.Fragment>
        <InputGroup className="mb-3" style={{ padding: "5%" }}>
          <Faculty option={this.handleChangeFaculty} />
          <Year option={this.handleChangeYear} year={year} />

          <InputGroup.Append>
            <Button className="btn-info" onClick={this.handleSearch}>
              <FaSistrix />
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <Divider />
        {/* <Table>
          <Table.Header>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>ภาควิชา</Table.HeaderCell>
            <Table.HeaderCell>ปีการศึกษา</Table.HeaderCell>
            <Table.HeaderCell>จำนวนนักศึกษา</Table.HeaderCell>
            <Table.HeaderCell>การจัดการ</Table.HeaderCell>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>1</Table.Cell>
              <Table.Cell>คณิตศาสตร์</Table.Cell>
              <Table.Cell>2560</Table.Cell>
              <Table.Cell>25</Table.Cell>
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
        </Table> */}
      </React.Fragment>
    );
  }
}

export default SearchNewStudent;
