import React, { Component } from "react";
import PropTypes from "prop-types";
import { Carousel } from "react-bootstrap";
import Logo from "../img/60year-fsci.png";
import banner from "../img/banner2.png";
import {
  Input,
  Advertisement,
  Image,
  Button,
  Icon,
  Form,
  Menu,
  Container,
  Segment,
  Header
} from "semantic-ui-react";

const colors = ["yellow"];

class Navbars extends Component {
  static propTypes = {
    color: PropTypes.string
  };

  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { color } = this.props;
    const { activeItem } = this.state;

    return (
      <div>
        <Menu inverted borderless color={colors} size="tiny">
          <Container>
            <Menu.Item
              header
              name="หน้าหลัก"
              active={activeItem === "logo"}
              onClick={this.handleItemClick}
            >
              <Image size="small" src={Logo} />
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item
                position="right"
                name="หน้าหลัก"
                active={activeItem === "home"}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                position="right"
                name="ข้อมูลนักศึกษา"
                active={activeItem === "messages"}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                position="right"
                name="กิจกรรมประชาสัมพันธ์นักศึกษา"
                active={activeItem === "friends"}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                position="right"
                name="ข้อมูลศิษย์เก่า"
                active={activeItem === "friends"}
                onClick={this.handleItemClick}
              />
            </Menu.Menu>
          </Container>
        </Menu>
        <div className="carousel-inner">
          <Image src={banner} className="d-block w-100">
            {/* <div className="bannerOpacity">
              <Header size='large'>WELCOME TO <br/>FSci Student Information Management System</Header>
            </div> */}
          </Image>
        </div>
      </div>
    );
  }
}

export default Navbars;
