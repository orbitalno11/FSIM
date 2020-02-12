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

import { Bar, Line, HorizontalBar, Pie, Bubble } from "react-chartjs-2";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

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
            <Grid.Row>
              <Grid.Column width={8}>
                <Card className="card-default">
                  <Card.Header as="h3">
                    การแสดงจำนวนนักศึกษารับเข้าจากโครงการ A
                  </Card.Header>
                  <Card.Content>
                    <Bar
                      ref="chart"
                      data={data}
                      options={{
                        title: {
                          display: true,
                          text: "Average Rainfall per month",
                          fontSize: 20
                        },
                        legend: {
                          display: true,
                          position: "right"
                        }
                      }}
                    />
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
                    <Pie
                      ref="chart"
                      data={data}
                      options={{
                        title: {
                          display: true,
                          text: "Average Rainfall per month",
                          fontSize: 20
                        },
                        legend: {
                          display: true,
                          position: "right"
                        }
                      }}
                    />
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
                    <HorizontalBar
                      ref="chart"
                      data={data}
                      options={{
                        title: {
                          display: true,
                          text: "Average Rainfall per month",
                          fontSize: 20
                        },
                        legend: {
                          display: true,
                          position: "right"
                        }
                      }}
                    />
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
                    <Bar
                      ref="chart"
                      data={data}
                      options={{
                        title: {
                          display: true,
                          text: "Average Rainfall per month",
                          fontSize: 20
                        },
                        legend: {
                          display: true,
                          position: "right"
                        }
                      }}
                    />
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
                    <Pie
                      ref="chart"
                      data={data}
                      options={{
                        title: {
                          display: true,
                          text: "Average Rainfall per month",
                          fontSize: 20
                        },
                        legend: {
                          display: true,
                          position: "right"
                        }
                      }}
                    />
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
                    <Pie
                      ref="chart"
                      data={data}
                      options={{
                        title: {
                          display: true,
                          text: "Average Rainfall per month",
                          fontSize: 20
                        },
                        legend: {
                          display: true,
                          position: "right"
                        }
                      }}
                    />
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
                    <Bar
                      ref="chart"
                      data={data}
                      options={{
                        title: {
                          display: true,
                          text: "Average Rainfall per month",
                          fontSize: 20
                        },
                        legend: {
                          display: true,
                          position: "right"
                        }
                      }}
                    />
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
