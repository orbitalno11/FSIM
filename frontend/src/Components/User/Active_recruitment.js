import React, { Component } from "react";
import {
  Header,
  Dropdown,
  Divider,
  Grid,
  Card,
  CardContent
} from "semantic-ui-react";

import AmountStudent from "../Graph/AmountStudent";
import GraphPie from "../Graph/GraphPie";
import GraphLine from "../Graph/GraphLine";
import GraphBar from "../Graph/GraphBar";
import GraphHorizaontaBar from "../Graph/GraphHorizontaBar";

class Active_Recruitment extends Component {
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
          </Header>

          <Divider />

          <Grid columns={2}>
            <Grid.Row stretched>
              <Grid.Column width={8}>
                <Card className="card-default">
                  <Card.Header as="h5">
                    การแสดงจำนวนนักศึกษารับเข้าจากโครงการต่างๆทั้งหมด 1000 คน
                  </Card.Header>
                  <CardContent>
                    <GraphHorizaontaBar />
                  </CardContent>
                </Card>
              </Grid.Column>
              <Grid.Column width={8}>
                <Card className="card-default">
                  <Card.Header as="h5">
                    การแสดงจำนวนนักศึกษารับเข้าจากโครงการต่างๆ
                  </Card.Header>
                  <Card.Content>
                    <GraphLine />
                  </Card.Content>
                  <Card.Content>
                    <AmountStudent />
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={8}>
                <Card className="card-default">
                  <Card.Header as="h5">
                    การแสดงจำนวนนักศึกษารับเข้าจากโครงการ A
                  </Card.Header>
                  <Card.Content>
                    <GraphLine />
                  </Card.Content>
                  <Card.Content>
                    <AmountStudent />
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column width={8}>
                <Card className="card-default">
                  <Card.Header as="h5">
                    การแสดงจำนวนนักศึกษารับเข้าจากโครงการ B
                  </Card.Header>
                  <Card.Content>
                    <GraphLine />
                  </Card.Content>
                  <Card.Content>
                  <AmountStudent />
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

export default Active_Recruitment;
