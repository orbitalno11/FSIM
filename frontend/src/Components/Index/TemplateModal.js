import React, { Component } from "react";
import { Modal, Card, Grid, Header } from "semantic-ui-react";
import ApiManage from "../../Class/ApiManage";

import TemplateBranchModal from "./TemplateBranchModal";
import GraphPie from "../Graph/Pie";
import GraphLine from "../Graph/Line";
import GraphBar from "../Graph/Bar";

class TemplateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dept: 0,
      open: false,
      body: [] ,
      isLoaded:false
    };
  }

  onClose = () => {
    if (this.props.show) {
      this.props.state(false);
    }
  };

  componentDidMount(){
    ApiManage.get(`admin/department/analyze/student?dept_id=${this.props.id}`)
    .then(res => {
      // console.log(res.data.data)
      let recive_data = res.data;
      if (recive_data.response === true) {
        this.setState({
          body: recive_data.data,
          isLoaded: true
        });
        // console.log(this.state.data);
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    // let branch = this.props.body.map(item => (
    //   <TemplateBranchModal item={item} />
    // ));
    return (
      <React.Fragment>
        <Modal
          className="modal-center"
          open={this.props.show}
          onClose={this.onClose}
        >
          <Modal.Header className="text-center">
            <Header textAlign="center" as="h3">
              จำนวนนักศึกษาทุกชั้นปี{this.props.header}
            </Header>
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Grid columns={3}>
                {/* <Grid.Row centered>{branch}</Grid.Row> */}

                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Card className="card-circle-modal">
                      <Card.Content>
                        <GraphPie />
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <Card className="card-twin-modal">
                        <Card.Content>
                          <GraphBar />
                        </Card.Content>
                      </Card>
                    </Grid.Column>
                    <Grid.Column>
                      <Card className="card-twin-modal">
                        <Card.Content>
                          <GraphLine />
                        </Card.Content>
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

export default TemplateModal;
