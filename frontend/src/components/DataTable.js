import React, { Component, Fragment } from "react";
import { Modal, Grid, Header, ModalContent, Card } from "semantic-ui-react";

import LineChart from '../components/Graph/Line'


//  wait other
import 'chartjs-plugin-datalabels'


class DataTable extends Component {


   render() {
    return (
        <Fragment>
                 <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                   
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel" >กราฟแสดงผลการเรียนของนายสมชาย</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>

                                <Grid textAlign={"center"}>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Card fluid>
                                                    <Card.Content>
                                                        <LineChart />
                                                    </Card.Content>
                                                </Card>
                                            </Grid.Column>
                                        </Grid.Row>
                                </Grid>    
                            </div>
                        </div>
                 </div>    
           
        </Fragment>
    );
}
}



export default DataTable

