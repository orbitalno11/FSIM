import React, { Component } from "react";
import {
  Form,
  Container,
  Button,
  Icon,
  Input,
  Grid,
  Modal,
  Loader,
  Responsive,
  Header,
  Divider
} from "semantic-ui-react";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";

class Login extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     username: "",
  //     password: "",
  //     loginErrors: {}
  //   };

  //   this.handleSubmit = this.onSubmit.bind(this);
  //   // this.handleChange = this.onInputChange.bind(this);
  //   this.validator = new SimpleReactValidator({
  //     validators: {
  //       error: {
  //         message: "ชื่อผู้ใช้หรือรหัสผ่านผิด",
  //         rule: val => val == null
  //       }
  //     },
  //     element: message => (
  //       <div>
  //         <Transition animation="shake" duration={250} transitionOnMount={true}>
  //           <Label basic color="red" pointing>
  //             {message}
  //           </Label>
  //         </Transition>
  //         <br />
  //       </div>
  //     ),
  //     message: {
  //       required: "โปรดระบุ:attribute"
  //     }
  //   });
  // }

  // componentDidMount() {
  //   // document.title = "FSIM - Login";
  //   // document.body.classList.add('Background-Brown');
  //   if (this.props.location.state) {
  //     // this.handleRegistModal();
  //     this.props.history.replace({ state: false });
  //   }
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push("/");
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.auth.isAuthenticated) {
  //     this.props.history.push("/");
  //     // document.body.classList.remove('Background-Brown');
  //   }
  //   if (nextProps.errors) {
  //     this.setState({ errors: nextProps.errors });
  //   }
  // }

  // handleChange = input => e => {
  //   this.setState({ [input]: e.target.value });
  // };

  // onSubmit(e) {
  //   if (
  //     this.validator.fieldValid("รหัสผ่าน") &&
  //     this.validator.fieldValid("ชื่อผู้ใช้")
  //   ) {
  //     e.preventDefault();
  //     // this.handleLoaderModal();
  //     const userData = {
  //       username: this.state.username,
  //       password: this.state.password
  //     };
  //     this.props.loginUser(userData);
  //     this.validator.showMessages();
  //   } else {
  //     this.validator.showMessages();
  //     // rerender to show messages for the first time
  //     // you can use the autoForceUpdate option to do this automatically`
  //     this.forceUpdate();
  //   }
  // }

  // onInputChange = event => {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   });
  //   console.log(this.state);
  // };

  // onLoginSubmit = event => {
  //   const { username, password } = this.state;

  //   axios
  //     .post(
  //       "http://localhost:3000",
  //       {
  //         user: {
  //           username: username,
  //           password: password
  //         }
  //       },
  //       {
  //         withCredentials: true
  //       }
  //     )
  //     .then(response => {
  //       if (response.data.logged_in) {
  //         this.props.handleSuccessfulAuth(response.data);
  //       }
  //     })
  //     .catch(error => {
  //       console.log("login error", error);
  //     });
  //   event.preventDefault();
  // };

  render() {
    return (
      <React.Fragment>
        <Responsive>
          <Container>
            <Grid
              centered
              columns={2}
              style={{ "margin-top": "5vh", "margin-bottom": "5vh" }}
            >
              <Grid.Row>
                <Grid.Column textAlign="center" fluid className="card-login">
                  <Header as="h3">เข้าสู่ระบบ</Header>
                  <Divider />
                  <Form>
                    <Form.Field>
                      <Input
                        type="text"
                        placeholder="ชื่อผู้ใช้"
                        label={{ icon: "user" }}
                        labelPosition="left corner"
                      />
                    </Form.Field>
                    <Form.Field>
                      <Input
                        type="password"
                        placeholder="รหัสผ่าน"
                        label={{ icon: "lock" }}
                        labelPosition="left corner"
                      />
                    </Form.Field>
                    <Divider />
                    <div className="text-center">
                      <Button
                        onClick={this.onSubmit}
                        className="btn-paku"
                        color="yellow"
                        animated
                      >
                        <Button.Content visible>เข้าสู่ระบบ</Button.Content>
                        <Button.Content hidden>
                          <Icon name="arrow right" />
                        </Button.Content>
                      </Button>
                    </div>
                  </Form>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Responsive>
      </React.Fragment>
    );
  }
}

export default Login;
