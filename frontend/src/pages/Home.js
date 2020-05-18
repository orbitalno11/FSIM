import React, { Component, Fragment } from "react";

import {
  Image,
  Container,
  Grid,
  Button,
  Form,
  Icon,
  Tab,
  Label
} from "semantic-ui-react";

import bgyel from "../img/bg-head.png";

import banner3 from "../img/mockup2.png";
import bannerbot from "../img/bottom-left.png";

// logo
import Logomth from "../img/mth.png";
import Logomic from "../img/mic.png";
import Logophy from "../img/phy.png";
import Logochm from "../img/chm.png";
import { Link } from "react-router-dom";

const ButtonStudent = ({ id, name, image }) => (
  <Fragment>
    <Grid.Column>
      <Button
        animated
        size="massive"
        id={id}
        type="button"
        as={Link}
        to={`/student/${id}`}
        className="btn btn-light btn-circle btn-xl"
      >
        <Button.Content visible>
          <Image className="logo-branch" src={image} />
        </Button.Content>
        <Button.Content hidden>
          <Icon name="arrow right" />
        </Button.Content>
      </Button>
      <p textalign="center" className="labelbranch" size="small">
        {name}
      </p>
    </Grid.Column>
  </Fragment>
);

const PaneTemplate = ({ label, content, direction }) => (
  <Fragment>
    <Container>
      <Grid padded>
        <Grid.Row>
          <Label className="font-18">{label}</Label>
        </Grid.Row>
        <p className="font-16">{direction}</p>
        {content}
      </Grid>
    </Container>
  </Fragment>
);

const pageStudent = [
  {
    name: "Mathematics",
    id_modal: "mth",
    Image: Logomth,
    header_modal: "ภาควิชาคณิตศาสตร์",
  },
  {
    name: "Physic",
    id_modal: "phy",
    Image: Logophy,
    header_modal: "ภาควิชาฟิสิกส์",
  },
  {
    name: "Microbiology",
    id_modal: "mic",
    Image: Logomic,
    header_modal: "ภาควิชาจุลชีววิทยา",
  },
  {
    name: "Chemical",
    id_modal: "chm",
    Image: Logochm,
    header_modal: "ภาควิชาเคมี",
  },
];

const buttonNewStudent = [
  {
    name: "ActiveRecruitement",
    color: "yellow",
    url: "/active",
  },
  {
    name: "กิจกรรมประชาสัมพันธ์",
    color: "yellow",
    url: "/activity",
  },
];

const buttonAdmission = [
  {
    name: "Admission",
    color: "yellow",
    url: "/admission",
  },
];

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pane: [],
    };
  }

  componentDidMount() {
    this.setState({
      pane: [
        {
          menuItem: "ข้อมูลนักศึกษา",
          render: () => (
            <PaneTemplate
              label="แสดงผลการวิเคราะห์การเรียนของนักศึกษาแต่ละภาควิชาโดยสรุปออกมาเป็นกราฟ"
              direction="กรุณาเลือกภาควิชา"
              content={
                <Grid.Row columns={4}>
                  {pageStudent.map((item) => (
                    <ButtonStudent
                      name={item.header_modal}
                      id={item.id_modal}
                      image={item.Image}
                      key={item.id_modal}
                    />
                  ))}
                </Grid.Row>
              }
            />
          ),
        },
        {
          menuItem: "ข้อมูลการรับนักศึกษา",
          render: () => (
            <PaneTemplate
              label="แสดงผลการวิเคราะห์โครงการต่างๆในคณะวิทยาศาสตร์"
              direction="กรุณาเลือกกิจกรรม"
              content={
                <Grid.Row>
                  <Grid.Column textAlign="center">
                    <Form.Group>
                      {buttonAdmission.map((item, index) => (
                        <Button
                          animated
                          size="massive"
                          color={item.color}
                          as={Link}
                          to={item.url}
                          key={index}
                        >
                          <Button.Content visible> {item.name}</Button.Content>
                          <Button.Content hidden>
                            <Icon name="arrow right" />
                          </Button.Content>
                        </Button>
                      ))}
                    </Form.Group>
                  </Grid.Column>
                </Grid.Row>
              }
            />
          ),
        },
        {
          menuItem: "ข้อมูลกิจกรรมประชาสัมพันธ์",
          render: () => (
            <PaneTemplate
              label="แสดงผลการวิเคราะห์โครงการต่างๆในคณะวิทยาศาสตร์"
              direction="กรุณาเลือกกิจกรรม"
              content={
                <Grid.Row>
                  <Grid.Column textAlign="center">
                    <Form.Group>
                      {buttonNewStudent.map((item, index) => (
                        <Button
                          animated
                          size="massive"
                          color={item.color}
                          as={Link}
                          to={item.url}
                          key={index}
                        >
                          <Button.Content visible> {item.name}</Button.Content>
                          <Button.Content hidden>
                            <Icon name="arrow right" />
                          </Button.Content>
                        </Button>
                      ))}
                    </Form.Group>
                  </Grid.Column>
                </Grid.Row>
              }
            />
          ),
        },
        {
          menuItem: "ข้อมูลศิษย์เก่า",
          render: () => (
            <PaneTemplate
              label="แสดงผลการวิเคราะห์หน้าที่การงานของนักศึกษาที่จบการศึกษา"
              content={
                <Grid.Row>
                  <Grid.Column textAlign="center">
                    <Button 
                    animated 
                    as={Link}
                    to='/alumni'
                    size="massive" 
                    color="yellow">
                      <Button.Content visible>สรุปแบบสอบถาม</Button.Content>
                      <Button.Content hidden>
                        <Icon name="arrow right" />
                      </Button.Content>
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              }
            />
          ),
        },
      ],
    });
  }

  render() {
    let { pane } = this.state;

    return (
      <Fragment>
        <Image size="massive" className="background-yellow" src={bgyel} />
        <Image size="massive" className="bottom-left" src={bannerbot} />
        <Container>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column width={6}>
                <p className="head-index" as="huge" textalign="center">
                  WELCOME TO
                  <br />
                  FSci Student Information Management System
                </p>
                <Button primary href="/login">
                  จัดการข้อมูล
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Image
                  //   size="massive"

                  src={banner3}
                  className="header-chart"
                  floated="right"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid>
            <Tab
              menu={{ fluid: true, vertical: true, tabular: true }}
              panes={pane}
            />
          </Grid>
        </Container>
      </Fragment>
    );
  }
}

export default Home;
