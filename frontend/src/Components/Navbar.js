import React, { Component } from "react";
import PropTypes from "prop-types";
import { Carousel } from "react-bootstrap";
import Logo from "../img/60year-fsci.png";
import banner from "../img/banner2.png";
import { Image, Menu, Container, Dropdown } from "semantic-ui-react";

const colors = ["yellow"];

class Navbars extends Component {


Redirect(event){
    // alert(event.name)
    
    this.props.history.push(event.url);

}

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
        <Menu
          inverted
          borderless
          className="bg-yellow"
          style={{ fontSize: "16px" }}
          size="tiny"
        >
          <Container>
            <Menu.Item
              header
              name="หน้าหลัก"
              active={activeItem === "logo"}
              onClick={this.handleItemClick}
              href="/"
            >
              <Image size="small" src={Logo} />
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item
                position="right"
                name="หน้าหลัก"
                active={activeItem === "home"}
                onClick={this.handleItemClick}
                href="/"
              />
              <Dropdown
                item
                text="ข้อมูลนักศึกษา"
                active={activeItem === "friends"}
                onClick={this.handleItemClick}
              >
                <Dropdown.Menu>
                  <Dropdown.Item href="/mathematics" >ภาควิชาคณิตศาสตร์</Dropdown.Item>
                  <Dropdown.Item href="/physics">ภาควิชาฟิสิกส์</Dropdown.Item>
                  <Dropdown.Item href="/microbiology">
                  ภาควิชาจุลชีววิทยา
                  </Dropdown.Item>
                  <Dropdown.Item href="/chemical">ภาควิชาเคมี</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown
                item
                text="กิจกรรมประชาสัมพันธ์นักศึกษา"
                active={activeItem === "friends"}
                onClick={this.handleItemClick}
              >
                <Dropdown.Menu>
                  <Dropdown.Item href="#" >สรุปข้อมูลประชาสัมพันธ์</Dropdown.Item>
                  <Dropdown.Item href="#">สรุปข้อมูลรับเข้า</Dropdown.Item>
                  <Dropdown.Item href="#">สรุปข้อมูลโครงการรับเข้า</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Menu.Item
                position="right"
                name="ข้อมูลศิษย์เก่า"
                active={activeItem === "friends"}
                onClick={this.handleItemClick}
                href="#"
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
