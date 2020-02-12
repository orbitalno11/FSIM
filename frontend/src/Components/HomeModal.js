import React, { Component } from "react";
import { Modal, Card, Grid } from "semantic-ui-react";

class HomeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dept: 0,
      open: false
    };
  }

  onClose = () => {
    if (this.props.show) {
      this.props.state(false);
    }
  };

  render() {
    let { dept, open } = this.state;
    // open = this.props.open
    console.log(this.props.show);
    return (
      <React.Fragment>
        <Modal
          className="modal-center"
          open={this.props.show}
          onClose={this.onClose}
        >
          <Modal.Header className="text-center">
            จำนวนนักศึกษาทุกชั้นปีของภาควิชาคณิตศาสตร์
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Grid columns={3} centered>
                <Grid.Row>
                  <Grid.Column centered>
                    <Card className="card-hd" color="blue">
                      <Card.Content>คณิตศาสตร์</Card.Content>
                    </Card>
                  </Grid.Column>
                  <Grid.Column centered>
                    <Card className="card-hd" color="blue">
                      <Card.Content>คณิตศาสตร์</Card.Content>
                    </Card>
                  </Grid.Column>
                  <Grid.Column centered>
                    <Card className="card-hd" color="blue">
                      <Card.Content>คณิตศาสตร์</Card.Content>
                    </Card>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Card className="card-circle-modal">
                      <Card.Content>MTH</Card.Content>
                    </Card>
                  </Grid.Column>
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <Card className="card-twin-modal">
                        <Card.Content>MTH</Card.Content>
                      </Card>
                    </Grid.Column>
                    <Grid.Column>
                      <Card className="card-twin-modal">
                        <Card.Content>MTH</Card.Content>
                      </Card>
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Row>
              </Grid>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </React.Fragment>
    );
  }
}

export default HomeModal;
