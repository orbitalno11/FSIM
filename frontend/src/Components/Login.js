import React, { Component } from "react";
import {
  Form,
  Container,
  Button,
  Icon,
  Input,
  Grid,
  Image,
  Responsive,
  Header,
  Divider
} from "semantic-ui-react";
import bgyel from "../Components/Image/bg-head.png";
import bannerbot from "../Components/Image/bottom-left.png";
import logo from "../Components/Image/60year-fsci.png";
import axios from "axios";

class Login extends Component {

  constructor(props){
    super(props);

    this.state = {
      username: "",
      password: "",
      loginErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event){
    const{ username, password } = this.state; 

    axios
      .post(
        "http://...",
        {
          user: {
            username: username,
            password: password
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if(response.data.login) {
          this.props.handleSuccessAuth(response.data);
        }
      })
      .catch(error => {
        console.log("login error",error);
      });
      event.preventDefault();
  }


  render() {
    return (
      <React.Fragment>
        <Responsive>
          <Image size="massive" className="background-yellow" src={bgyel} />
          <Image size="massive" className="bottom-left" src={bannerbot} />
          <Container>
            <Image
              className="logo"
              src={logo}
              
            />
            <Grid
              textAlign="center"
              style={{ height: "90vh" }}
              verticalAlign="middle"
            >
              <Grid.Row>
                <Grid.Column
                  textAlign="center"
                  style={{ maxWidth: 450 }}
                  className="card-login"
                >
                  <Header as="h3">เข้าสู่ระบบ</Header>
                  <Divider />
                  <Form>
                    <Form.Field>
                      <Input
                        type="text"
                        placeholder="ชื่อผู้ใช้"
                        value={this.state.username}
                        onChange={this.handleChange}
                        label={{ icon: "user" }}
                        labelPosition="left corner"
                        required
                      />
                    </Form.Field>
                    <Form.Field>
                      <Input
                        type="password"
                        placeholder="รหัสผ่าน"
                        value={this.state.password}
                        onChange={this.handleChange}
                        label={{ icon: "lock" }}
                        labelPosition="left corner"
                        required
                      />
                    </Form.Field>
                    <Divider />
                    <div className="text-center">
                      <Button
                        type="submit"
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
