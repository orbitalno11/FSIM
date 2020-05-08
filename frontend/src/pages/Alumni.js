import React, {Component, Fragment} from "react";

import {
    Dropdown,
    Divider,
    Grid,
    Header,
    Container,
    Card,
    Table,
    Image
} from "semantic-ui-react";

import bgyel from "../img/bg-head3.png";
import GraphPie from "../components/Graph/Pie";
import GraphBar from "../components/Graph/Bar";


class Alumni extends Component {
    render() {
        return (
            <Fragment>
                <Image size="big" className="head-right" src={bgyel}/>
                <Container className="container my-5">
                    <Header as="h5" align='center'>
                        ค้นหาข้อมูลศิษย์เก่าของปีการศึกษา{" "}
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
                        
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Card className="card-circle-modal">
                                    <Card.Header as="h3">
                                        กราฟแสดงจำนวนศิษย์เก่าแยกตามสาขา
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphPie/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Row columns={2} >
                                <Grid.Column>
                                    <Card className="card-twin-modal">
                                        <Card.Header as="h3">
                                            กราฟแสดงจำนวนภาวะการทำงานของศิษย์เก่า
                                        </Card.Header>
                                        <Card.Content>
                                            <GraphPie/>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                                <br/>
                                <Grid.Column>
                                    <Card className="card-twin-modal">
                                        <Card.Header as="h3">
                                         กราฟแสดงจำนวนนักศึกษที่เข้าร่วมฝึกงาน
                                        </Card.Header>
                                        <Card.Content>
                                        <GraphPie/>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid.Row>
                        <Grid.Row >
                            <Grid.Column width={16}>
                                <Card className="card-default">
                                    <Card.Header as="h3">
                                    กราฟแสดงเกรดเฉลี่ยตลอดหลักสูตร
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
                                    </Card.Content>

                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row >
                            <Grid.Column width={16}>
                                <Card className="card-default">
                                    <Card.Header as="h3">
                                    กราฟแสดงช่วงเงินเดือนของศิษย์เก่า
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Header as="h2">
                                ตารางสรุปความพึงพอใจของผู้เรียนต่อคุณภาพหลักสูตรและการจัดการเรียนการสอน
                            </Header>
                            <Divider/>
                            <Table celled structured>
                                <Table.Header>
                                    <Table.Row active>
                                        <Table.HeaderCell width={12} textAlign="center">
                                            ประเด็นการประเมิน
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={2} textAlign="center">
                                            ระดับความพึงพอใจเฉลี่ย
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={2} textAlign="center">
                                            ส่วนเบี่ยงเบนมาตรฐาน
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                               
                            </Table>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Fragment>
        )
    }
}

export default Alumni