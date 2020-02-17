import React, { Component } from "react";
import { Form, Container, Transition, Label,Input } from "semantic-ui-react";
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
  //   document.title = "FSIM - Login";
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
    // const { values } = this.props;
    return (
      <React.Fragment>
        <Container>
          <form>
            <section className="card-login my-5">
              <br />
              <h3>เข้าสู่ระบบ</h3>
              <hr />
              <Form.Group controlId="formGroupEmail">
                <Input
                  type="text"
                  placeholder="Username"
                  name="username"
                  // value={this.state.username}
                  // onChange={this.handleChange('username')}
                  // defaultValue={this.state.username}
                />
                {/* {this.validator.message(
                  "ชื่อผู้ใช้",
                  this.state.username,
                  "required"
                )} */}
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  // value={this.state.password}
                  // onChange={this.handleChange('password')}
                  // defaultValue={this.state.password}
                />
                {/* {this.validator.message(
                  "รหัสผ่าน",
                  this.state.password,
                  "required"
                )}
                {this.validator.message(
                  "errors",
                  this.state.errors.username,
                  "error"
                )}
                {this.validator.message(
                  "errors",
                  this.state.errors.password,
                  "error"
                )}
                {console.log(
                  this.state.errors.username + " " + this.state.errors.password
                )} */}
              </Form.Group>
              <hr />
              {["checkbox"].map(type => (
                <div key={`default-${type}`} className="mb-3">
                  <Form.Checkbox
                    type="checkbox"
                    label="Confirm"
                    name="Confirm"
                    id="Confirm"
                    onChange={this.onInputChange}
                  />
                </div>
              ))}

              <button type="submit" onClick={this.onSubmit} className="btn btn-success center-block">
                เข้าสู่ระบบ
              </button>
              <button type="button" className="btn btn-danger center-block">
                ย้อนกลับ
              </button>

              <br />
            </section>
          </form>
        </Container>
      </React.Fragment>
    );
  }
}

export default Login;
