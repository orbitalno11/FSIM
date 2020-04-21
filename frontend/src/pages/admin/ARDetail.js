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
import {getAllBranch} from "../../redux/action/BranchAction";


import GraphPie from "../../components/Graph/Pie";
import GraphBar from "../../components/Graph/Bar";



class ARDetail extends Component {
    
  
    render() {
        
        return (
            <Fragment>
                 <Container>
                    <Header as="h4" align = 'center'>
                            ค้นหาข้อมูล Road Show ของปีการศึกษา{" "}
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
                                        <Card.Header as="h5">
                                            กราฟเปรียบเทียบจำนวนนักเรียนที่เข้าศึกษาในพื้นที่ต่างๆแบ่งตามภาควิชา
                                        </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Row columns={2} >
                               
                                    <Card className="card-circle-modal">
                                        <Card.Header as="h5">
                                            กราฟเปรียบเทียบจำนวนนักเรียนที่เข้าศึกษาจากพื้นที่ต่างๆ
                                        </Card.Header>
                                        <Card.Content>
                                            <GraphPie/>
                                        </Card.Content>
                                    </Card>    
                            
                            </Grid.Row>
                        </Grid.Row>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Card className="card-circle-modal">
                                        <Card.Header as="h5">
                                            กราฟแสดงพื้นที่ที่นักศึกษามา 5 อันดับแรก
                                        </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Row columns={2} >
                               
                                    <Card className="card-circle-modal">
                                        <Card.Header as="h5">
                                            กราฟแสดงจำนวนนักศึกษาที่เข้าศึกษาตามเหตุผลที่เข้าเรียนคณะวิทยาศาสตร์ มจธ.
                                        </Card.Header>
                                        <Card.Content>
                                            <GraphBar/>
                                        </Card.Content>
                                    </Card>    
                            
                            </Grid.Row>
                        </Grid.Row>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Card className="card-circle-modal">
                                        <Card.Header as="h5">
                                            กราฟแสดงสัดส่วนนักศึกษาที่เข้าศึกษาตามเหตุผลที่เข้าเรียนคณะวิทยาศาสตร์ มจธ.
                                        </Card.Header>
                                    <Card.Content>
                                        <GraphPie/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Row columns={2} >
                               
                                    <Card className="card-circle-modal">
                                        <Card.Header as="h5">
                                            กราฟแสดงช่วงทางที่นักศึกษารู้จัก มจธ.
                                        </Card.Header>
                                        <Card.Content>
                                            <GraphPie/>
                                        </Card.Content>
                                    </Card>    
                            
                            </Grid.Row>
                        </Grid.Row>
                        <Grid.Row >
                            <Grid.Column  width={16}>
                                <Card className="card-default">
                                        <Card.Header as="h5">
                                            กราฟเปรียบเทียบจำนวนนักศึกษาที่เข้าศึกษาตามเหตุผลที่เข้าเรียนคณะวิทยาศาสตร์ มจธ. ตามปีการศึกษา
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
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Card className="card-circle-modal">
                                        <Card.Header as="h5">
                                            กราฟแสดงจำนวนนักเรียนที่เข้าศึกษาจากแต่ละโรงเรียน
                                        </Card.Header>
                                    <Card.Content>
                                      <GraphBar/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Row columns={2} >
                               
                                    <Card className="card-circle-modal">
                                        <Card.Header as="h5">
                                            กราฟเปรียบเทียบแสดงเกรดเฉลี่ยของนักศึกษาที่รับเข้ามาจากแต่ละโรงเรียน
                                        </Card.Header>
                                        <Card.Content>
                                          <GraphBar/>
                                        </Card.Content>
                                    </Card>    
                            
                            </Grid.Row>
                        </Grid.Row>
                    </Grid>        
                </Container>

            </Fragment>
        )
    }
}
export default ARDetail