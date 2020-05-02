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

// redux
import {connect} from 'react-redux'


import GraphBar from "../../../components/Graph/Bar";



class AMSci extends Component {
    
  
    render() {
        
        return (
            <Fragment>
                 <Container>
                    <Header as="h4" align = 'center'>
                            ค้นหาข้อมูล I AM SCI ของปีการศึกษา{" "}
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
                        <Grid.Row >
                            <Grid.Column  width={16}>
                                <Card className="card-default">
                                        <Card.Header as="h5">
                                        กราฟแสดงจำนวนนักเรียนแต่ละสาขาที่รับเข้ามาจากโครงการ I AM SCI 
                                        </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row >
                            <Grid.Column  width={16}>
                                <Card className="card-default">
                                        <Card.Header as="h5">
                                        กราฟเปรียบเทียบแสดงเกรดเฉลี่ยของนักศึกษาที่รับเข้ามาจากโครงกการ I AM SCI แต่ละสาขา
                                        </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
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
export default AMSci