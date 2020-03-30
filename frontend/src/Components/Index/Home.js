import React, { Component } from "react";

import {
  Image,
  Container,
  Grid,
  Button,
  Form,
  Icon,
  Responsive,
  Visibility,
  Tab,
  Label
} from "semantic-ui-react";

import Logomth from "../Image/mth.png";
import Logochm from "../Image/chm.png";
import Logomic from "../Image/mic.png";
import Logophy from "../Image/phy.png";
import bgyel from "../Image/bg-head.png";
import logo from "../Image/60year-fsci.png";
// import banner2 from "../Image/banner3.JPG";
import banner3 from "../Image/mockup2.png";
import bannerbot from "../Image/bottom-left.png";
// import circle from "../Image/circle.png";

import IndexButton from "./IndexButtonStudent";
import TemplateModal from "./TemplateModal";
import TemplateButton from "./TemplateButton";
import axios from "axios";

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class Index extends Component {
  constructor(props) {
    super(props);

    

    this.handleClickModel = this.handleClickModel.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.close = this.close.bind(this);
    this.handleSuccessAuth = this.handleSuccessAuth.bind(this);
    this.handleLoggutClick = this.handleLoggutClick.bind(this);
  }

  handleSuccessAuth(data){
    this.props.handleLogin(data);
    this.props.history.push("/");
  }

  handleLogoutClick(){
    axios
      .delete("http://...",{withCredentials: true})
      .then(response => {
        this.props.handleLogout();
      })
      .catch(error => {
        console.log("logout error", error)
      });
  }

  state = {
    open: false,
    modal_header: "",
    modal_data: "",
    key: "SearchActivity"
  };

  handleSelect = selectedtab => {
    this.setState({ key: selectedtab });
  };

  close(mystate) {
    this.setState({
      open: mystate
    });
  }

  handleClickModel(e) {

    // this.setState({
    //   madal_header: e.header_modal,
    //   open: true
    // });
  }

  render() {
    const { open } = this.state;
    const pageStudent = [
      {
        name:"Mathematics",
        id: "mth",
        Image: Logomth,
        header_modal: "ภาควิชาคณิตศาสตร์"
     
      },
      {
        name:"Physic",
        id: "phy",
        Image: Logophy,
        header_modal: "ภาควิชาฟิสิกส์",
        
      },
      {
        name:"Microbiology",
        id: "mic",
        Image: Logomic,
        header_modal: "ภาควิชาจุลชีววิทยา",
      
      }
    ];

    const buttonNewStudent = [
      {
        name: "การรับเข้า",
        color: "yellow",
        url: "/admission"
      },
      {
        name: "โครงการรับเข้า",
        color: "yellow",
        url: "/active"
      },
      {
        name: "ประชาสัมพันธ์",
        color: "yellow",
        url: "/activity"
      }
      // {
      //   name: "จัดการข้อมูลรับเข้า",
      //   color: "yellow",
      //   url: "/admin/admission"
      // },
      // {
      //   name: "จัดการข้อมูลประชาสัมพันธ์",
      //   color: "yellow",
      //   url: "/admin/announcement"
      // }
    ];

    const panes = [
      {
        menuItem: "ข้อมูลนักศึกษา",
        render: () => (
          <Container>
            <Grid padded>
              <Grid.Row>
                <Label className="font-18">
                  แสดงผลการวิเคราะห์การเรียนของนักศึกษาแต่ละภาควิชาโดยสรุปออกมาเป็นกราฟ
                </Label>
              </Grid.Row>
              <Grid.Row columns={4}>
                {pageStudent.map(item => (
                  <IndexButton
                    item={item}
                    onClick={this.handleClickModel}
                    key={item.id}
                  />
                ))}
                <TemplateModal
                  dept="phy"
                  show={open}
                  state={this.close}
                  header={this.state.modal_header}
                />
              </Grid.Row>
            </Grid>
          </Container>
        )
      },
      {
        menuItem: "กิจกรรมประชาสัมพันธ์",
        render: () => (
          <Container>
            <Grid padded>
              <Grid.Row>
                <Label className="font-18">
                  แสดงผลการวิเคราะห์โครงการต่างๆในคณะวิทยาศาสตร์
                </Label>
              </Grid.Row>
              <Grid.Row>
                {/* <Grid.Column width={8}>
                  <Image className="banner-active" src={banner2} />
                </Grid.Column> */}
                <Grid.Column textalign="center">
                  <Form.Group>
                    {buttonNewStudent.map(item => (
                      <TemplateButton item={item} key={item.name} />
                    ))}
                  </Form.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        )
      },
      {
        menuItem: "ข้อมูลศิษย์เก่า",
        render: () => (
          <Container>
            <Grid padded>
              <Grid.Row>
                <Label className="font-18">
                  แสดงผลการวิเคราะห์หน้าที่การงานของนักศึกษาที่จบการศึกษา
                </Label>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Button animated size="massive" color="yellow">
                    <Button.Content visible>สรุปแบบสอบถาม</Button.Content>
                    <Button.Content hidden>
                      <Icon name="arrow right" />
                    </Button.Content>
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        )
      }
    ];

    return (
      <React.Fragment>
        <Responsive
          getWidth={getWidth}
          minWidth={Responsive.onlyTablet.minWidth}
        >
          <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
          ></Visibility>
          <Image size="massive" className="background-yellow" src={bgyel} />
          <Image size="massive" className="bottom-left" src={bannerbot} />
          <Container>
            <Image className="logo" src={logo} />
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column width={6}>
                  {/* <Image className="" src={circle} /> */}
                  <p className="head-index" as="huge" textalign="center">
                    WELCOME TO
                    <br />
                    FSci Student Information Management System
                  </p>
                  <Button primary href="/login">
                    จัดการข้อมูล
                  </Button>
                </Grid.Column>
                <Grid.Column width={10}>
                  <Image
                    size="massive"
                    src={banner3}
                    className="header-chart"
                    floated="right"
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Tab
              menu={{ fluid: true, vertical: true, tabular: true }}
              panes={panes}
            />
          </Container>
        </Responsive>
      </React.Fragment>
    );
  }
}

export default Index;
