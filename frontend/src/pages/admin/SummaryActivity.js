import React, {Component, Fragment} from "react";
import { Link } from 'react-router-dom'
import {
    Header,
    Dropdown,
    Divider,
    Grid,
    Card,
    Container,
    Button,
    Table,
    Image
} from "semantic-ui-react";

// redux
import {connect} from 'react-redux'
import {getAllBranch} from "../../redux/action/BranchAction";


import GraphBar from "../../components/Graph/Bar";


class SummaryActivity extends Component {

 

    render() {
        let {branch_list} = this.props
        return (
            <Fragment>
                <Container>
                    <Header as="h5" textAlign="center">
                        ค้นหากิจกรรมประชาสัมพันธ์โดยเลือกปีการศึกษา{" "}
                       
                        <Dropdown
                            options={[
                                {key: "2560", value: "2560", text: "2560"},
                                {key: "2561", value: "2561", text: "2561"}
                            ]}
                            placeholder="Select"
                            selection
                        />
                    </Header>
                    <Divider/>
                    <Grid>
                        
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงจำนวนที่เข้าร่วมกิจกรรมในโครงการต่างๆ
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงจำนวนนักศึกษาที่เคยเข้าร่วมกิจกรรมในโครงการต่างๆ
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงเปรียบเทียบจำนวนคนที่เข้าร่วมในโครงการต่างๆ
                                        <Dropdown className="year-select"
                                            options={[
                                                {key: "2560", value: "2560", text: "2560"},
                                                {key: "2561", value: "2561", text: "2561"}
                                            ]}
                                            placeholder="Select"
                                            selection
                                        />
                                         <Dropdown className="year-select"
                                            options={[
                                                {key: "2560", value: "2560", text: "2560"},
                                                {key: "2561", value: "2561", text: "2561"}
                                            ]}
                                            placeholder="Select"
                                            selection
                                        />
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงเปรียบเทียบจำนวนนักศึกษาที่เคยเข้าร่วมกิจกรรมในโครงการต่างๆ
                                        <Dropdown className="year-select"
                                            options={[
                                                {key: "2560", value: "2560", text: "2560"},
                                                {key: "2561", value: "2561", text: "2561"}
                                            ]}
                                            placeholder="Select"
                                            selection
                                        />
                                         <Dropdown className="year-select"
                                            options={[
                                                {key: "2560", value: "2560", text: "2560"},
                                                {key: "2561", value: "2561", text: "2561"}
                                            ]}
                                            placeholder="Select"
                                            selection
                                        />
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Divider/>
                        <Grid.Row>
                             <Header as="h3" align = 'center'> งบประมาณที่ใช่ในการจัดกิจกรรมแต่ละโครงการ</Header>
                        </Grid.Row>
                        <Grid.Row>
                            <Table celled structured>
                                <Table.Header>
                                    <Table.Row active>
                                        <Table.HeaderCell width={4} textAlign="center">
                                            ปีการศึกษา
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={4} textAlign="center">
                                            ชื่อโครงการ
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={4} textAlign="center">
                                            งบประมาณที่ใช้
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell  textAlign="center">
                                           2560
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">KMUTT TOUR</Table.Cell>
                                        <Table.Cell textAlign="center">30000</Table.Cell>
                                        
                                    </Table.Row>
                                   
                                </Table.Body>
                            </Table>
                        </Grid.Row>
                    </Grid>
                   
                </Container>
            </Fragment>
        )
    }
}


export default SummaryActivity