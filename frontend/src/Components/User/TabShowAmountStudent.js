import React, { Component } from "react";
import { Table } from "semantic-ui-react";

class TabAmount extends Component {
  render() {
    return (
      <React.Fragment>
        <Table fluid celled padded>
          <Table.Body>
            <Table.Row textAlign="center">
              <Table.Cell>
                Active <br />
                100 <br /> 5%
              </Table.Cell>
              <Table.Cell>
                Active <br />
                100 <br /> 5%
              </Table.Cell>
              <Table.Cell>
                Active <br />
                100 <br /> 5%
              </Table.Cell>
              <Table.Cell>
                Active <br />
                100 <br /> 5%
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </React.Fragment>
    );
  }
}

export default TabAmount;
