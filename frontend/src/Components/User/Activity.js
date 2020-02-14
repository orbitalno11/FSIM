import React, { Component } from "react";
import {
  Header,
  Dropdown,
  Divider,
  Grid,
  Card,
  Item,
  Table
} from "semantic-ui-react";
import GraphPie from "../Graph/GraphPie";
import GraphLine from "../Graph/GraphLine";
import GraphBar from "../Graph/GraphBar";

class Activity extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container my-5">
          <Header as="h5">
            ค้นหาจำนวนช่องทางการสมัครของนักศึกษาประจำปี{" "}
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
            <Grid.Row stretched>
              <Grid.Column width={8}>
                <Card className="card-default">
                  <Card.Header as="h3">
                    การแสดงจำนวนนักศึกษารับเข้าจากโครงการ A
                  </Card.Header>
                  <Card.Content>
                    <GraphBar />
                  </Card.Content>
                  <Card.Content>
                    <Grid columns={4}>
                      <Grid.Row>
                        <Grid.Column>
                          <Card className="card-count">100</Card>
                        </Grid.Column>
                        <Grid.Column>
                          <Card className="card-count">100</Card>
                        </Grid.Column>
                        <Grid.Column>
                          <Card className="card-count">100</Card>
                        </Grid.Column>
                        <Grid.Column>
                          <Card className="card-count">100</Card>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column>
                          <Header as="h5">ทั้งหมด</Header>
                        </Grid.Column>
                        <Grid.Column>
                          <Header as="h5">สูงสุด</Header>
                        </Grid.Column>
                        <Grid.Column>
                          <Header as="h5">ต่ำสุด</Header>
                        </Grid.Column>
                        <Grid.Column>
                          <Header as="h5">ค่าเฉลี่ย</Header>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column width={8}>
                <Card className="card-default">
                  <Card.Header as="h3">
                    การแสดงจำนวนนักศึกษารับเข้าจากโครงการ B
                  </Card.Header>
                  <Card.Content>
                    <GraphPie />
                  </Card.Content>
                  <Card.Content>
                    <Grid columns={4}>
                      <Grid.Row>
                        <Grid.Column>
                          <Card className="card-count">100</Card>
                        </Grid.Column>
                        <Grid.Column>
                          <Card className="card-count">100</Card>
                        </Grid.Column>
                        <Grid.Column>
                          <Card className="card-count">100</Card>
                        </Grid.Column>
                        <Grid.Column>
                          <Card className="card-count">100</Card>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column>
                          <Header as="h5">ทั้งหมด</Header>
                        </Grid.Column>
                        <Grid.Column>
                          <Header as="h5">สูงสุด</Header>
                        </Grid.Column>
                        <Grid.Column>
                          <Header as="h5">ต่ำสุด</Header>
                        </Grid.Column>
                        <Grid.Column>
                          <Header as="h5">ค่าเฉลี่ย</Header>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row fluid>
              <Grid.Column width={8}>
                <Card className="card-default">
                  <Card.Header as="h3">
                    การแสดงจำนวนนักศึกษารับเข้าจากโครงการ A
                  </Card.Header>
                  <Card.Content>
                    <GraphBar />
                  </Card.Content>
                  <Card.Content>
                    <Grid columns={4}>
                      <Grid.Row>
                        <Grid.Column>
                          <Card className="card-count">100</Card>
                        </Grid.Column>
                        <Grid.Column>
                          <Card className="card-count">100</Card>
                        </Grid.Column>
                        <Grid.Column>
                          <Card className="card-count">100</Card>
                        </Grid.Column>
                        <Grid.Column>
                          <Card className="card-count">100</Card>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column>
                          <Header as="h5">ทั้งหมด</Header>
                        </Grid.Column>
                        <Grid.Column>
                          <Header as="h5">สูงสุด</Header>
                        </Grid.Column>
                        <Grid.Column>
                          <Header as="h5">ต่ำสุด</Header>
                        </Grid.Column>
                        <Grid.Column>
                          <Header as="h5">ค่าเฉลี่ย</Header>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column width={8}>
                <Card className="card-default">
                  <Card.Header as="h3">
                    การแสดงจำนวนนักศึกษารับเข้าจากโครงการ A
                  </Card.Header>
                  <Card.Content>
                    <GraphBar />
                  </Card.Content>
                  <Card.Content>
                    <Grid columns={4}>
                      <Grid.Row>
                        <Grid.Column>
                          <Card className="card-count">100</Card>
                        </Grid.Column>
                        <Grid.Column>
                          <Card className="card-count">100</Card>
                        </Grid.Column>
                        <Grid.Column>
                          <Card className="card-count">100</Card>
                        </Grid.Column>
                        <Grid.Column>
                          <Card className="card-count">100</Card>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column>
                          <Header as="h5">ทั้งหมด</Header>
                        </Grid.Column>
                        <Grid.Column>
                          <Header as="h5">สูงสุด</Header>
                        </Grid.Column>
                        <Grid.Column>
                          <Header as="h5">ต่ำสุด</Header>
                        </Grid.Column>
                        <Grid.Column>
                          <Header as="h5">ค่าเฉลี่ย</Header>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <Card className="card-default">
                  <Card.Header as="h3">
                    การแสดงจำนวนนักศึกษารับเข้าจากโครงการ A
                  </Card.Header>
                  <Card.Content>
                    <GraphPie />
                  </Card.Content>
                  <Card.Content>
                    <Grid columns={4}>
                      <Grid.Row>
                        <Grid.Column>
                          <Card className="card-count">100</Card>
                        </Grid.Column>
                        <Grid.Column>
                          <Card className="card-count">100</Card>
                        </Grid.Column>
                        <Grid.Column>
                          <Card className="card-count">100</Card>
                        </Grid.Column>
                        <Grid.Column>
                          <Card className="card-count">100</Card>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column>
                          <Header as="h5">ทั้งหมด</Header>
                        </Grid.Column>
                        <Grid.Column>
                          <Header as="h5">สูงสุด</Header>
                        </Grid.Column>
                        <Grid.Column>
                          <Header as="h5">ต่ำสุด</Header>
                        </Grid.Column>
                        <Grid.Column>
                          <Header as="h5">ค่าเฉลี่ย</Header>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column width={8}>
                <Card className="card-default">
                  <Card.Header as="h3">
                    การแสดงจำนวนนักศึกษารับเข้าจากโครงการ B
                  </Card.Header>
                  <Card.Content>
                    <GraphPie />
                  </Card.Content>
                  <Card.Content>
                    <Grid columns={4}>
                      <Grid.Row>
                        <Grid.Column>
                          <Card className="card-count">100</Card>
                        </Grid.Column>
                        <Grid.Column>
                          <Card className="card-count">100</Card>
                        </Grid.Column>
                        <Grid.Column>
                          <Card className="card-count">100</Card>
                        </Grid.Column>
                        <Grid.Column>
                          <Card className="card-count">100</Card>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column>
                          <Header as="h5">ทั้งหมด</Header>
                        </Grid.Column>
                        <Grid.Column>
                          <Header as="h5">สูงสุด</Header>
                        </Grid.Column>
                        <Grid.Column>
                          <Header as="h5">ต่ำสุด</Header>
                        </Grid.Column>
                        <Grid.Column>
                          <Header as="h5">ค่าเฉลี่ย</Header>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <Card className="card-default">
                  <Card.Header as="h3">
                    การแสดงจำนวนนักศึกษารับเข้าจากโครงการ A
                  </Card.Header>
                  <Card.Content>
                    <GraphBar />
                  </Card.Content>
                  <Card.Content>
                    <Grid columns={4}>
                      <Grid.Row>
                        <Grid.Column>
                          <Card className="card-count">100</Card>
                        </Grid.Column>
                        <Grid.Column>
                          <Card className="card-count">100</Card>
                        </Grid.Column>
                        <Grid.Column>
                          <Card className="card-count">100</Card>
                        </Grid.Column>
                        <Grid.Column>
                          <Card className="card-count">100</Card>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column>
                          <Header as="h5">ทั้งหมด</Header>
                        </Grid.Column>
                        <Grid.Column>
                          <Header as="h5">สูงสุด</Header>
                        </Grid.Column>
                        <Grid.Column>
                          <Header as="h5">ต่ำสุด</Header>
                        </Grid.Column>
                        <Grid.Column>
                          <Header as="h5">ค่าเฉลี่ย</Header>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
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

export default Activity;
