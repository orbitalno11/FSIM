import React, { Component } from "react";
import {
  Container,
  Header,
  Grid,
  Segment,
  Row,
  Image,
  Button,
  Icon,
  Form,
  Menu
} from "semantic-ui-react";

class Index extends Component {
  state = { activeItem: "bio" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <React.Fragment>
        <div className="container">
          <Form.Group>
            <Menu tabular style={{ marginTop: "3em" }}>
              <Menu.Item name="ข้อมูลนักศึกษา" active={activeItem === "bio"} />
              <Menu.Item position="right">
                <Button>จัดการข้อมูล</Button>
              </Menu.Item>
            </Menu>
            <Grid columns={4} divided style={{ marginTop: "3em" }}>
              <Grid.Row>
                <Grid.Column>
                  <button type="button" class="btn btn-light btn-circle btn-xl">
                    <img className="logo-branch" src="../img/mth.png"></img>
                  </button>
                  <Header size="small">Mathematic</Header>
                </Grid.Column>
                <Grid.Column>
                  <button type="button" class="btn btn-light btn-circle btn-xl">
                    <img className="logo-branch" src="../img/phy.png"></img>
                  </button>
                  <Header size="small">Physic</Header>
                </Grid.Column>
                <Grid.Column>
                  <button type="button" class="btn btn-light btn-circle btn-xl">
                    <img className="logo-branch" src="../img/mic.png"></img>
                  </button>
                  <Header size="small">Microbiology</Header>
                </Grid.Column>
                <Grid.Column>
                  <button type="button" class="btn btn-light btn-circle btn-xl">
                    <img className="logo-branch" src="../img/chm.png"></img>
                  </button>
                  <Header size="small">Chemical</Header>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <hr />
          </Form.Group>

          <Form.Group>
            <Menu tabular style={{ marginTop: "5em" }}>
              <Menu.Item position="left">
                <Button>จัดการข้อมูล</Button>
              </Menu.Item>
              <Menu.Item
                position="right"
                name="กิจกรรมประชาสัมพันธ์"
                active={activeItem === "bio"}
              />
            </Menu>
            <Grid
              columns={2}
              style={{ marginTop: "3em" }}
              className="bg-deepblue"
            >
              <Grid.Row>
                <Grid.Column width={8}>
                <Image className="banner-active" src="../img/img-1.jpg" />
                </Grid.Column>
                <Grid.Column textAlign="center" style={{ marginTop: "10%" }}>
                  <Form.Group>
                    <Button color="yellow">การรับเข้า</Button>
                    <Button color="yellow">โครงการรับเข้า</Button>
                    <Button color="yellow">ประชาสัมพันธ์</Button>
                  </Form.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form.Group>

          <Form.Group>
            <Menu tabular style={{ marginTop: "5em" }}>
              <Menu.Item name="ข้อมูลศิษย์เก่า" active={activeItem === "bio"} />
              <Menu.Item position="right">
                <Button>จัดการข้อมูล</Button>
              </Menu.Item>
            </Menu>

            <Container width={12}>
              <Button animated size="massive">
                <Button.Content visible>Login</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow right" />
                </Button.Content>
              </Button>
            </Container>
          </Form.Group>
        </div>
      </React.Fragment>
    );
  }
}

export default Index;
