import React, {Fragment} from "react";
import {Table} from "semantic-ui-react";

const  AlumniTypePanel = () => (
    <Fragment>
        <Table celled padded>
            <Table.Body>
                <Table.Row textAlign="center">
                    <Table.Cell sm={6} lg={3} >
                        คณิตศาสตร์ <br/>
                        100 <br/> 
                    </Table.Cell>
                    <Table.Cell sm={6} lg={3} >
                        จุลชีววิทยา <br/>
                        100 <br/> 
                    </Table.Cell>
                    <Table.Cell sm={6} lg={3} >
                       เคมี <br/>
                        100 <br/> 
                    </Table.Cell>
                    <Table.Cell sm={6} lg={3} >
                        ฟิสิกส์ <br/>
                        100 <br/>
                    </Table.Cell>
                   
                </Table.Row>
            </Table.Body>
        </Table>
    </Fragment>
)

export default AlumniTypePanel