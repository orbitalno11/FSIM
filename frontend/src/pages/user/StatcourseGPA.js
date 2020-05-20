import React, {Component, Fragment} from "react";

import {
    Header,
    Dropdown,
    Divider,
    Container,
    Table,
    Image
} from "semantic-ui-react";


class StatcourseGPA extends Component {

   
    render() {
        
        return (
            <Fragment>
                <Container  className="container my-5">
                    <Header as="h3"  align='center'>
                        สรุปคะแนนรายวิชา Mean / GPA 
                    </Header>
                    <Divider/>
                    <Table celled structured>
                                <Table.Header>
                                    <Table.Row active>
                                        <Table.HeaderCell width={2} textAlign="center">
                                           รหัศวิชา
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={9} textAlign="center">
                                            ชื่อวิชา
                                        </Table.HeaderCell>
                                       
                                        <Table.HeaderCell width={2} textAlign="center">
                                            หน่วยกิต
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={3} textAlign="center">
                                            จำนวน น.ศ.
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={2} textAlign="center">
                                            Mean
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={2} textAlign="center">
                                            SD
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={2} textAlign="center">
                                            GPA
                                        </Table.HeaderCell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell  textAlign="center"> CSS112</Table.Cell>
                                        <Table.Cell textAlign="center">COMPUTER PROGRAMMING</Table.Cell>
                                        <Table.Cell textAlign="center">3(2-2-6)</Table.Cell>
                                        <Table.Cell textAlign="center">51</Table.Cell>
                                        <Table.Cell textAlign="center">50.31</Table.Cell>
                                        <Table.Cell textAlign="center">10.02</Table.Cell>
                                        <Table.Cell textAlign="center">2.30</Table.Cell>
                                       
                                    </Table.Row>
                                </Table.Header>

                   </Table>  

                </Container>
            </Fragment>
        )
    }
}


export default StatcourseGPA