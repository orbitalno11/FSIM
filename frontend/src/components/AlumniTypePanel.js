import React, { Fragment } from "react";
import { Table } from "semantic-ui-react";

const AlumniTypePanel = ({ data }) => (
    <Fragment>
        <Table celled padded>
            <Table.Body>
                <Table.Row textAlign="center">
                    {
                        data.map((item, index) => (
                            <Table.Cell sm={6} lg={3} key={index} >
                                {item['name']} <br />
                                {item['number']} <br />
                            </Table.Cell>
                        ))
                    }
                </Table.Row>
            </Table.Body>
        </Table>
    </Fragment>
)

export default AlumniTypePanel