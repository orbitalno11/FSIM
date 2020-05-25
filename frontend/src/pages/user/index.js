import React, { Component, Fragment } from "react";

import {
  Image,
  Container,
  Grid,
  Button,
  Form,
  Label
} from "semantic-ui-react";

import { Col, Row } from 'react-bootstrap'

import banner3 from "../../img/mockup2.png";

import SideTab from '../../components/SideTabDialog'

// logo
import Logomth from "../../img/mth.png";
import Logomic from "../../img/mic.png";
import Logophy from "../../img/phy.png";
import Logochm from "../../img/chm.png";
import { Link } from "react-router-dom";

import MediaQuery from 'react-responsive'
import { minDeviceWidth } from '../../Constant'

const ButtonStudent = ({ id, name, image }) => (
  <Fragment>
    <Grid.Column mobile={16} tablet={4} computer={4} className="text-center">
      <Link to={`/student/${id}`}>
        <div className="fs-circle-user mx-auto">
          <Image src={image} />
        </div>
        <label>{name}</label>
      </Link>
    </Grid.Column>
  </Fragment>
);

const PaneTemplate = ({ label, content, direction }) => (
  <Fragment>
    <Container>
      <Grid padded textAlign="center">
        <Grid.Row>
          <Label className="fs-font-18">{label}</Label>
        </Grid.Row>
        <p className="fs-font-16">{direction}</p>
        {content}
      </Grid>
    </Container>
  </Fragment>
);


const StudentTab = () => {
  return (
    <PaneTemplate
      label="แสดงผลการวิเคราะห์การเรียนของนักศึกษาแต่ละภาควิชาโดยสรุปออกมาเป็นกราฟ"
      direction="กรุณาเลือกภาควิชา"
      content={
        <Grid.Row>
          {pageStudent.map((item, index) => (
            <Grid.Column key={index} mobile={6} computer={4}>
              <ButtonStudent
                name={item.header_modal}
                id={item.id_modal}
                image={item.Image}
                key={item.id_modal}
              />
            </Grid.Column>
          ))}
        </Grid.Row>
      }
    />
  )
}


const AdmissionTab = () => {
  return (
    <PaneTemplate
      label="แสดงผลการวิเคราะห์ข้อมูลโครงการรับเข้าของนักศึกษาภายในคณะวิทยาศาสตร์"
      direction="กรุณากดปุ่มแอดมิชชั่น"
      content={
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Form.Group>
              {buttonAdmission.map((item, index) => (

                <Button className="btn-color-default" size='massive' color={item.color} as={Link}
                  to={item.url}
                  key={index}>{item.name}</Button>

              ))}
            </Form.Group>
          </Grid.Column>
        </Grid.Row>
      }
    />
  )
}

const ActivirtTab = () => {
  return (

    <PaneTemplate
      label="แสดงผลการวิเคราะห์ข้อมูลกิจกรรมประชาสัมพันธ์ภายในคณะวิทยาศาสตร์"
      direction="กรุณาเลือกกิจกรรม"
      content={
        <Row  >
          {buttonNewStudent.map((item, index) => (
            <Col xs={12} md={6} align="center" key={index}>
              <Button
                size='massive'
                className="btn-color-default"
                as={Link}
                to={item.url}
                style={{ margin: '3%', textAlign: 'center' }}
              >{item.name}</Button>
            </Col>
          ))}

        </Row>
      }
    />
  )
}


const AlumniTab = () => {
  return (
    <PaneTemplate
      label="แสดงผลการวิเคราะห์หน้าที่การงานของนักศึกษาที่จบการศึกษาจากคณะวิทยาศาสตร์"
      direction="กรุณากดปุ่มสรุปแบบสอบถาม"
      content={
        <Grid.Row>
          <Grid.Column align="center">
            <Button
              size='massive'
              className="btn-color-default"
              as={Link}
              to='/alumni'
            >สรุปแบบสอบถาม</Button>
          </Grid.Column>
        </Grid.Row>
      }
    />
  )
}


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
    name: "Active Recruitement",
    url: "/activity/ar",
  },
  {
    name: "กิจกรรมประชาสัมพันธ์",
    url: "/activity",
  },
];

const buttonAdmission = [
  {
    name: "Admission",
    url: "/admission",
  },
];

class Home extends Component {

  render() {

    let tabName = [
      {
        tabId: '1',
        tabTitle: 'ข้อมูลนักศึกษา'
      },
      {
        tabId: '2',
        tabTitle: 'ข้อมูลการรับนักศึกษา'
      },
      {
        tabId: '3',
        tabTitle: 'ข้อมูลกิจกรรมประชาสัมพันธ์'
      },
      {
        tabId: '4',
        tabTitle: 'ข้อมูลศิษย์เก่า'
      },
    ]
    let tabDetail = [
      {
        tabId: '1',
        tabDetail: <StudentTab />
      },
      {
        tabId: '2',
        tabDetail: <AdmissionTab />
      },
      {
        tabId: '3',
        tabDetail: <ActivirtTab />
      },
      {
        tabId: '4',
        tabDetail: <AlumniTab />
      }

    ]

    return (
      <Fragment>
        <Container >
          <Grid columns={2}>
            <Row>
              <MediaQuery minDeviceWidth={minDeviceWidth}>
                <Col xs={12} lg={6} >
                  <Image
                    src={banner3}
                    className="fs-cr-lf"
                    floated="right"
                  />
                </Col>
                <Col xs={12} lg={6} md={12}  >
                  <p className="fs-tx-rg" as="huge" >
                    WELCOME TO
                  <br />
                  FSci Student Information <br />Management System
                </p>
                  <Button style={{ position: 'relative' }} className="fs-centered my-2" primary href="/login">
                    จัดการข้อมูล
                </Button>
                </Col>

              </MediaQuery>
              <MediaQuery maxDeviceWidth={minDeviceWidth - 1}>
                <Col xs={12} lg={6} md={10} sm={12}>
                  <Image
                    src={banner3}
                    className="fs-cr-lf"
                    floated="right"
                  />
                </Col>
                <Col xs={12} lg={6} md={8} sm={12}>
                  <p className="fs-tx-rg">
                    WELCOME TO
                    <br />
                    FSci Student Information Management System
                  </p>
                  <Button style={{ position: 'relative' }} className="fs-centered my-2" primary as={Link} to="/login">
                    จัดการข้อมูล
                </Button>
                </Col>
              </MediaQuery>
            </Row>
          </Grid>

          <Grid>{
            tabDetail !== null && (
              <SideTab startKey={"1"} tabName={tabName} tabDetail={tabDetail} dropdownTitle={tabName[0]['tabTitle']} /
              >)}
          </Grid>
        </Container>
      </Fragment>
    );
  }
}

export default Home;
