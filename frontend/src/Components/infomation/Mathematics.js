import React, { Component } from "react";
import { Divider, Grid, Header, Container } from "semantic-ui-react";
import Tableinfomation from "./TableinfomationStudent";
import ApiManage from "../../Class/ApiManage";

class Math extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
      isLoaded: false
    };
  }
  componentDidMount() {
    ApiManage.get("admission/2560/1/1")
      .then(res => {
        let receive_data = res.data;
        if (receive_data.response === true) {
          this.setState({
            data: receive_data.data,
            isLoaded: true
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    let { isLoaded, data } = this.state;

    let show_data;

    if (isLoaded) {
      show_data = data.map(data => {
        const { firstname, lastname } = data;
        return (
          <p>
            {firstname} -- {lastname}
          </p>
        );
      });
    }

    return (
      <React.Fragment>
        <Container className="my-5">
          <Header as="h4">ข้อมูลนักศึกษาภาควิชา</Header>
          <Divider />
          <Grid columns={3} centered>
            <Grid.Row>
              <Grid.Column>
                <div className="rectangle-30">
                  <Header as="h4"></Header>
                  <div className="rectangle-40"> คน</div>
                </div>
              </Grid.Column>
              <Grid.Column>
                <div className="rectangle-30">
                  <Header as="h4"></Header>
                  <div className="rectangle-40"> คน</div>
                </div>
              </Grid.Column>
              <Grid.Column>
                <div className="rectangle-30">
                  <Header as="h4"></Header>
                  <div className="rectangle-40"> คน</div>
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              {show_data}
              {/* <Tableinfomation /> */}
            </Grid.Row>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default Math;
