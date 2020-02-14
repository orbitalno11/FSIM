import React, { Component } from "react";
import Logomth from "../../img/mth.png";
import Logochm from "../../img/chm.png";
import Logomic from "../../img/mic.png";
import Logophy from "../../img/phy.png";

import {
  Container,
  Grid,
  Image,
  Button,
  Icon,
  Form,
  Menu
} from "semantic-ui-react";

import IndexButton from "./IndexButtonStudent";
import TemplateModal from "./TemplateModal";
import TemplateButton from "./TemplateButton";

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      modal_header: "",
      modal_data: "",
      modal_body: []
    };

    this.handleClickModel = this.handleClickModel.bind(this);
    this.close = this.close.bind(this);
  }

  close(mystate) {
    this.setState({
      open: mystate
    });
  }

  handleClickModel(e) {
    this.state.modal_header = e.header_modal;
    this.state.modal_body = e.branch;
    this.setState({
      open: true
    });
  }

  render() {
    const { activeItem } = this.state;
    const { open } = this.state;
    const pageStudent = [
      {
        id: "Mathematics",
        img: Logomth,
        header_modal: "ภาควิชาคณิตศาสตร์",
        branch: [
          {
            id: "math",
            title: "คณิตศาสตร์",
            data: "100"
          },
          {
            id: "stat",
            title: "สถิติ",
            data: "100"
          },
          {
            id: "comsci",
            title: "วิทยาการคอมพิวเตอร์ประยุกต์",
            data: "100"
          }
        ]
      },
      {
        id: "Physic",
        img: Logophy,
        header_modal: "ภาควิชาฟิสิกส์",
        branch: [
          {
            id: "phy",
            title: "ฟิสิกส์",
            data: "100"
          }
        ]
      },
      {
        id: "Microbiology",
        img: Logomic,
        header_modal: "ภาควิชาจุลชีววิทยา",
        branch: [
          {
            id: "mic",
            title: "จุลชีววิทยา",
            data: "100"
          },
          {
            id: "fst",
            title: "วิทยาศาสตร์และเทคโนโลยีอาหาร",
            data: "100"
          }
        ]
      },
      {
        id: "Chemical",
        img: Logochm,
        header_modal: "ภาควิชาเคมี",
        branch: [
          {
            id: "chm",
            title: "เคมี",
            data: "100"
          }
        ]
      }
    ];

    const buttonNewStudent = [
      {
        name: "การรับเข้า",
        color: "yellow",
        url: "/"
      },
      {
        name: "โครงการรับเข้า",
        color: "yellow",
        url: "/"
      },
      {
        name: "ประชาสัมพันธ์",
        color: "yellow",
        url: "/"
      }
    ];

    return (
      <React.Fragment>
        <Container>
          <Form.Group>
            <Menu tabular style={{ marginTop: "3em" }} centered>
              <Menu.Item name="ข้อมูลนักศึกษา" />
              <Menu.Item position="right">
                <Button>จัดการข้อมูล</Button>
              </Menu.Item>
            </Menu>
            <Grid columns={4} style={{ marginTop: "3em" }}>
              <Grid.Row>
                {pageStudent.map(item => (
                  <IndexButton item={item} onClick={this.handleClickModel} />
                ))}
                <TemplateModal
                  dept="phy"
                  show={open}
                  state={this.close}
                  header={this.state.modal_header}
                  body={this.state.modal_body}
                />
              </Grid.Row>
            </Grid>
            <hr />
          </Form.Group>

          <Form.Group>
            <Menu tabular style={{ marginTop: "5em" }}>
              <Menu.Item position="left">
                <Button>จัดการข้อมูล</Button>
              </Menu.Item>
              <Menu.Item position="right" name="กิจกรรมประชาสัมพันธ์" />
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
                    {buttonNewStudent.map(item => (
                      <TemplateButton item={item} />
                    ))}
                  </Form.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form.Group>

          <Form.Group>
            <Menu tabular style={{ marginTop: "5em" }}>
              <Menu.Item name="ข้อมูลศิษย์เก่า" />
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
        </Container>
      </React.Fragment>
    );
  }
}

export default Index;
