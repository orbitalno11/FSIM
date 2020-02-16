import React, { Component } from "react";
import { Header, Dropdown, Divider, Grid, Card } from "semantic-ui-react";

import TabAmount from "./TabShowAmountStudent";
import AmountStudent from "../Graph/AmountStudent";
import GraphPie from "../Graph/GraphPie";
import GraphLine from "../Graph/GraphLine";
import GraphBar from "../Graph/GraphBar";

class AddmissionInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      receive_data: []
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="container my-5">
          <Header as="h5">
            ค้นหาการรับเข้าโดยสาขาวิชาและปีการศึกษา{" "}
            <Dropdown
              options={[
                { key: "2560", value: "2560", text: "2560" },
                { key: "2561", value: "2561", text: "2561" }
              ]}
              placeholder="Select"
              selection
            />
            <Dropdown
              options={[
                { key: "2560", value: "2560", text: "2560" },
                { key: "2561", value: "2561", text: "2561" }
              ]}
              placeholder="Select"
              selection
            />
          </Header>
          <Divider />

          <Grid>
            <Grid.Row>
              <Card fluid>
                <TabAmount />
              </Card>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <Card className="card-default">
                  <Card.Header as="h5">
                    กราฟแสดงเปรียบเทียบจำนวนนักเรียนที่รับเข้าในโครงการต่างๆประจำปี
                    2560
                  </Card.Header>
                  <Card.Content>
                    <GraphBar />
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column width={8}>
                <Card className="card-default">
                  <Card.Header as="h5">
                    กราฟแสดงผลการศึกษาโครงการต่างๆ ประจำปี 2560
                  </Card.Header>
                  <Card.Content>
                    <GraphBar />
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row fluid>
              <Grid.Column width={16}>
                <Card className="card-default">
                  <Card.Header as="h5">
                    กราฟแสดงค่าเฉลี่ยเกรดของแต่ละโครงการประจำปีการศึกษา 2560
                  </Card.Header>
                  <Card.Content>
                    <GraphLine />
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <Card className="card-default">
                  <Card.Header as="h5">
                    กราฟแสดงโรงเรียนที่เข้าศึกษา 5 โรงเรียนแรก
                    ที่เข้าศึกษามากที่สุด
                  </Card.Header>
                  <Card.Content>
                    <GraphBar />
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column width={8}>
                <Card className="card-default">
                  <Card.Header as="h5">
                    10 อันดับโรงเรียนที่เข้าศึกษามากที่สุด
                  </Card.Header>
                  <Card.Content>
                    <GraphLine />
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <Card className="card-default">
                  <Card.Header as="h5">
                    กราฟเปรียบเทียบจำนวนนักเรียนที่เข้าศึกษาแบ่งตามโรงเรียน
                    ประจำปี 2560 และ 2561
                  </Card.Header>
                  <Card.Content>
                    <GraphLine />
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column width={8}>
                <Card className="card-default">
                  <Card.Header as="h5">
                    กราฟเปรียบเทียบจำนวนนักเรียนที่เข้าศึกษาแบ่งตามโครงการประจำปี
                    2560 และ 2561
                  </Card.Header>
                  <Card.Content>
                    <GraphLine />
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default AddmissionInfo;
