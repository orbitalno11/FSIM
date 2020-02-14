import React, { Component } from "react";
import { Divider, Grid, Header, Container } from "semantic-ui-react";
// import TemplateBranchModal from "../index/TemplateBranchModal";
import Tableinfomation from "./TableinfomationStudent";
class Phys extends Component {
  render() {
    // let branch = this.props.body.map(item => (
    //   <TemplateBranchModal item={item} />
    // ));
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
              <Tableinfomation/>
            </Grid.Row>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default Phys;
