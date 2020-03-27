import React, { Component } from "react";
import SetButton from "./SetButton";
import {
  Container,
  Responsive,
  Visibility,
  Divider,
  Header,
  Image
} from "semantic-ui-react";
import bgyel from "../../Image/bg-head2.png";
// import banner3 from "../Image/mockup2.png";
import bannerbot from "../../Image/bottom-left2.png";
// import bg from "../../Image/bg-yel.png"
import logo from "../../Image/60year-fsci.png";

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class Main extends Component {
  Redirect(event) {
    this.props.history.push(event.url);
  }

  render() {
    const url = [
      {
        id: 1,
        name: "ข้อมูลนักศึกษารับเข้า",
        detail: "ระบบตรวจสอบการรับเข้าในรอบต่างๆ",
        url: "/",
        icon: "add user"
      },
      {
        id: 2,
        name: "ข้อมูลกิจกรรม",
        detail:
          "ระบบตรวจสอบกิจกรรมการรับเข้า รวมไปถึงกิจกรรมประชาสัมพันธ์นักศึกษา",
        url: "/",
        icon: ""
      },
      {
        id: 3,
        name: "ข้อมูลโครงการรับเข้า",
        detail: "ระบบตรวจสอบข้อมูลโครงการรับเข้า",
        url: "/",
        icon: ""
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
          <Image size="massive" className="background-white" src={bgyel} />
          <Image size="massive" className="bottom-left2" src={bannerbot} />
          {/* <Image size="massive" className="bg-admin" src={bg} /> */}
          <Container>
            <Image className="logo" src={logo} />

            <div className="card-admission">
              <Header as="h2" style={{ color: "#3BB3A9" }}>
                จัดการข้อมูลการรับเข้า
              </Header>
              <Divider />
              {url.map(item => (
                <SetButton
                  item={item}
                  Redirect={this.Redirect.bind(this)}
                  key={item.id}
                />
              ))}
            </div>
          </Container>
        </Responsive>
      </React.Fragment>
    );
  }
}

export default Main;
