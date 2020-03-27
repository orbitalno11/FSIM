import React, { Component } from "react";
import {
  FaSisTrix,
  FaDatabase,
  FaEdit,
  FaTrash,
  FaSistrix
} from "react-icons/fa";
import { InputGroup } from "react-bootstrap";
import { Button, Divider } from "semantic-ui-react";
import Year from "../Options/Year";
import School from "../Options/School";

class SearchAnnouncement extends Component {
  state = {
    schoolName: "",
    year: 0
  };

  handleChangeSchoolName = search => {
    this.setState({ schoolName: search.target.value });
  };

  haandleChangeYear = search => {
    this.setState({ yer: search.target.value });
  };

  handleSearch = search => {
    alert(this.state.schoolName + " , " + this.state.year);
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
      }
    ];

    const SchoolName = [
      {
        id: 1,
        name: "รร.อนุราชประสิทธิ์"
      },
      {
        id: 2,
        name: "รร."
      }
    ];

    return (
      <React.Fragment>
        <InputGroup className="md-3" style={{ padding: "5%" }}>
          <School option={this.handleChangeSchoolName} school={SchoolName} />
          <Year option={this.haandleChangeYear} year={year} />

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

export default SearchAnnouncement;