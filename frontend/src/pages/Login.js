import React, { Component, Fragment } from "react";
import {
  Responsive,
  Visibility,
  Container,
  Button,
  Form,
  Grid,
  Header,
  Image
} from "semantic-ui-react";

// redux
import { connect } from "react-redux";

// redux action
import { login } from "../redux/action/authAction";

import bgyel from "../img/bg-head.png";
import bannerbot from "../img/bottom-left.png";

import ReactModal from "../components/ReactModal"

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class Login extends Component {
  handleLogin = (event) => {
    event.preventDefault();
    const element = event.target.elements;

    const userData = {
      username: element.username.value,
      password: element.password.value,
    };
    this.props.login(userData, this.props.history);
  };

  render() {
    const { children } = this.props;
   
    return (
      <Fragment>
         <ReactModal/>
        <Responsive
          getWidth={getWidth}
          minWidth={Responsive.onlyTablet.minWidth}
        >
          <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
          >
            <Image size="massive" className="background-yellow" src={bgyel} />
            <Image size="massive" className="bottom-left" src={bannerbot} />
            <Container>
              <Grid
                textAlign="center"
                style={{ height: "100vh" }}
                verticalAlign="middle"
                className="card-login my-4"
                centered
              >
                <Grid.Column style={{ maxWidth: 350 }}>
                  <Header as="h2" color="teal" textAlign="center">
                    เข้าสู่ระบบ
                  </Header>
                  <Form size="large" onSubmit={this.handleLogin}>
                    <Form.Input
                      fluid
                      icon="user"
                      iconPosition="left"
                      id="username"
                      name="username"
                      type="text"
                      required
                      placeholder="อีเมล"
                    />
                    <Form.Input
                      fluid
                      icon="lock"
                      iconPosition="left"
                      id="password"
                      name="password"
                      type="password"
                      required
                      placeholder="รหัสผ่าน"
                    />
                    <Button color="grey" fluid size="large">
                      Login
                    </Button>
                  </Form>
                </Grid.Column>
              </Grid>
              {/* <div>
                <div className="card-login">
                  <form onSubmit={this.handleLogin}>
                    <h2>เข้าสู่ระบบ</h2>
                    <div>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        required
                        placeholder="อีเมล"
                      />
                    </div>
                    <div>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        placeholder="รหัสผ่าน"
                      />
                    </div>
                    <button type="submit">
                      <i className="fas fa-sign-in-alt mr-1"></i>เข้าสู่ระบบ
                    </button>
                  </form>
                </div>
              </div> */}
            </Container>
          </Visibility>
          {children}
        </Responsive>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(login(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
