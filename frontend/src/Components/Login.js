import React, { Component } from "react";
import { Form, Container, Label } from "semantic-ui-react";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loginErrors: ""
    };

    this.handleSubmit = this.onLoginSubmit.bind(this);
    this.handleChange = this.onInputChange.bind(this);
  }
  // state = {
  //   // staff_id: "",
  //   // password: ""
  //   formElements:{
  //     staff_id :{
  //       type: 'text',
  //       value: '',
  //       validator: {
  //         required : true,
  //         minLength : 10,
  //         maxLength : 10
  //       },
  //       touched: false,
  //       error: {status: true, message:'คุณกรอก username ไม่ถูกต้อง'}
  //     },
  //     password :{
  //       type: 'text',
  //       value: '',
  //       validator: {
  //         required : true,
  //         minLength : 5,
  //         maxLength : 20
  //       },
  //       touched: false,
  //       error: {status: true, message:'คุณกรอก password ไม่ถูกต้อง'}
  //     }
  //   },
  //   formValid: false
  // }

  onInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state);
  };

  onLoginSubmit = event => {
    const {username, password} = this.state;

    axios
      .post(
        "http://localhost:3000",
        {
          user:{
            username: username,
            password: password
          }
        },
        {
          withCredentials:true
        }
      )
      .then(response => {
        if (response.data.logged_in){
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch(error => {
        console.log("login error",error)
      })
    event.preventDefault();

    // console.log(this.state);
  };

  // checkValidator = (value, rule) =>{
  //   let valid = true;
  //   let message = '';
  //   if(rule.required){
  //     if(value.trim().length === 0){
  //       valid = false;
  //       message = 'จำเป็นต้องกรอก';
  //     }
  //   }
  //   if(value.length < rule.minLength && valid){
  //     valid = false;
  //     message = 'น้อยกว่า $(rule.minLength) ตัวอักษร';
  //   }
  //   if(value.length > rule.minLength && valid){
  //     valid = false;
  //     message = 'มากกว่า $(rule.maxLength) ตัวอักษร';
  //   }
  //   return { status:!valid,message:message};
  // }

  // getErrorMessage = (name) => {
  //   return this.state.formElement[name].error.message;
  // }

  // getInputClass = (name) => {
  //   const elementErrorStatus = this.state.formElement[name].error.status;
  //   return elementErrorStatus && this.state.formElement[name].touched ?
  //     'form-control is-invalid':
  //     'form-control is-valid';
  // }

  render() {
    const { values } = this.props;
    return (
      <React.Fragment>
        <Container>
          <form onSubmit={this.onLoginSubmit}>
            <section className="card-login my-5">
              <br />
              <h3>เข้าสู่ระบบ</h3>
              <hr />
              <Form.Group controlId="formGroupEmail">
                <Form.Input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                />
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

              <button type="submit" className="btn btn-success center-block">
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
