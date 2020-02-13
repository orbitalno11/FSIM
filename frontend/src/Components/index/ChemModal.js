import React, { Component } from "react";
import { Card, Grid } from "semantic-ui-react";

class ChemModal extends Component {
 

  render() {
   
    return (
      <React.Fragment>
              <Grid columns={3} centered>
                <Grid.Row>
                  <Grid.Column centered>
                    <Card className="card-hd" color="blue">
                      <Card.Content>เคมี</Card.Content>
                    </Card>
                  </Grid.Column>
                  <Grid.Column centered>
                    <Card className="card-hd" color="blue">
                      <Card.Content>เคมี</Card.Content>
                    </Card>
                  </Grid.Column>
                  <Grid.Column centered>
                    <Card className="card-hd" color="blue">
                      <Card.Content>เคมี</Card.Content>
                    </Card>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Card className="card-circle-modal">
                      <Card.Content>CHE</Card.Content>
                    </Card>
                  </Grid.Column>
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <Card className="card-twin-modal">
                        <Card.Content>CHE</Card.Content>
                      </Card>
                    </Grid.Column>
                    <Grid.Column>
                      <Card className="card-twin-modal">
                        <Card.Content>CHE</Card.Content>
                      </Card>
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Row>
              </Grid>
      </React.Fragment>
    );
  }
}

export default ChemModal;
