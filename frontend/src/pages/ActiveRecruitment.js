import React, {Component, Fragment} from "react";

import {
    Header,
    Dropdown,
    Divider,
    Grid,
    Card,
    CardContent,
    Container,
    Image
} from "semantic-ui-react";

import bgyel from "../img/bg-head3.png";

import { Bar } from 'react-chartjs-2';



class ActiveRecruitment extends Component {

    render() {
 

    return (
        <Fragment>
             <Image size="big" className="head-right" src={bgyel} />
            <Header as="h5" align='center'>
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
            <Container>
                <Grid>
                    <Grid.Row >
                        <Grid.Column width={16}>
                            <Card className="card-default">
                                <Card.Header as="h5">
                                    กราฟแสดงจำนวนนักเรียนแต่ละสาขาที่รับเข้ามาจากโครงการ  แต่ละสาขา
                                    </Card.Header>
                                <Card.Content>
                                    
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column width={16}>
                            <Card className="card-default">
                                <Card.Header as="h5">
                                    กราฟเปรียบเทียบแสดงเกรดเฉลี่ยของนักศึกษาที่รับเข้ามาจากโครงกการ  แต่ละสาขา
                                    </Card.Header>
                                <Card.Content>
                                
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Fragment>
    )
}
}
export default ActiveRecruitment