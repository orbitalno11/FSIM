import React, { Component } from "react";
import { FaSistrix, FaDatabase, FaEdit, FaTrash } from "react-icons/fa";
import { InputGroup } from "react-bootstrap";
import { Button, Table, Input, Divider } from "semantic-ui-react";
import Year from "../Options/Year";
import Faculty from "../Options/Faculty";

class SearchStudent extends Component {
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
    return (
      <React.Fragment>
        <InputGroup className="mb-3" style={{ padding: "5%" }}>
          <Faculty option={this.handleChangeFaculty} />
          <Year option={this.handleChangeYear} year={this.props.year} />
          <InputGroup.Append>
            <Button className="btn-info" onClick={this.handleSearch}>
              <FaSistrix />
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <Divider/>
        
      </React.Fragment>
    );
  }
}

export default SearchStudent;