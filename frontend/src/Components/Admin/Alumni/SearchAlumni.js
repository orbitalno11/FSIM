import React, { Component } from "react";
import { FaSistrix, FaDatabase, FaEdit, FaTrash } from "react-icons/fa";
import { InputGroup } from "react-bootstrap";
import { Button, Table, Divider } from "semantic-ui-react";
import Year from "../Options/Year";
import Faculty from "../Options/Faculty";

class Search extends Component {
  state = {
    faculty: 0,
    year: 0
  };

  handleChangeFaculty = search => {
    this.setState({ faculty: search });
  };

  handleChangeYear = search => {
    this.setState({ year: search });
    console.log(search)
  };

  haandleSearch = () => {
    console.log(this.state.faculty + " , " + this.state.year)
  }

  render(){
    const year = [
      {
        id:1,
        name:'2012'
      },
      {
        id:2,
        name:'2013'
      },
      {
        id:3,
        name:'2014'
      }
    ]

    return(
      <React.Fragment>
        <InputGroup className="mb-3" style={{ padding: '5%'}} >
          <Faculty option={this.handleChangeFaculty} />
          <Year option={this.handleChangeYear} year={year} />
          <InputGroup.Append>
            <Button className="btn-info" onClick={this.haandleSearch}>
              <FaSistrix/>
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <Divider/>
      </React.Fragment>
    );
  }
}

export default Search;