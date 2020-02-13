import React, { Component } from "react";
import Logomth from "../img/mth.png";
import Logochm from "../img/chm.png";
import Logomic from "../img/mic.png";
import Logophy from "../img/phy.png";
import { Bar } from "react-chartjs-2";
import {
  Container,
  Header,
  Grid,
  Modal,
  Breadcrumb,
  Image,
  Button,
  Icon,
  Form,
  Menu
} from "semantic-ui-react";

import HomeModal from "./HomeModal";

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: "bio",
      open: false
    };

    this.handleClickModel = this.handleClickModel.bind(this);
    this.close = this.close.bind(this);
  }

  // showModal() {
  //   this.setState({
  //     open: true
  //   });
  //   // console.log(this.state.open)
  // }

  close(mystate) {
    this.setState({
      open: mystate
    });
  }

  handleClickModel(e) {
    alert(e.currentTarget.id)
    // this.setState({
    //   open: true
    // });
  }
  
  // show = dimmer => () => this.setState({ dimmer, open: true });

  // handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const { open } = this.state;
    

    return (
      <React.Fragment>
        <div className="container">
          <Form.Group>
            <Menu tabular style={{ marginTop: "3em" }} centered>
              <Menu.Item name="ข้อมูลนักศึกษา" active={activeItem === "bio"} />
              <Menu.Item position="right">
                <Button>จัดการข้อมูล</Button>
              </Menu.Item>
            </Menu>
            <Grid columns={4} style={{ marginTop: "3em" }}>
              <Grid.Row>
                <Grid.Column>
                  <button
                    type="button"
                    class="btn btn-light btn-circle btn-xl"
                    id="math"
                    onClick={this.handleClickModel}
                  >
                    <img className="logo-branch" src={Logomth}></img>
                  </button>
                  <HomeModal dept="mth" show={open} state={this.close} />

                  <Header size="small">Mathematic</Header>
                </Grid.Column>
                <Grid.Column>
                  <button
                    type="button"
                    class="btn btn-light btn-circle btn-xl"
                    id="phys"
                    onClick={this.handleClickModel}
                    // onClick={this.show(true)}
                  >
                    <img className="logo-branch" src={Logophy}></img>
                  </button>
                  <HomeModal dept="phy" show={open} state={this.close} />

                  <Header size="small">Physic</Header>
                </Grid.Column>
                <Grid.Column>
                  <button
                    type="button"
                    class="btn btn-light btn-circle btn-xl"
                    id="mic"
                    onClick={this.handleClickModel}
                    //   onClick={ this.handleClick()}
                  >
                    <img className="logo-branch" src={Logomic}></img>
                  </button>
                  <HomeModal dept="mic" show={open} state={this.close} />

                  <Header size="small">Microbiology</Header>
                </Grid.Column>
                <Grid.Column>
                  <button
                    type="button"
                    class="btn btn-light btn-circle btn-xl"
                    id="chm"
                    onClick={this.handleClickModel}
                    // onClick={this.show(true)}
                  >
                    <img className="logo-branch" src={Logochm}></img>
                  </button>
                  <HomeModal dept="chm" show={open} state={this.close} />

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
