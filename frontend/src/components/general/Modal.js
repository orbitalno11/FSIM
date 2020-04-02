import React, {Component, Fragment} from "react";
import {Modal, Card, Grid, Header, ModalContent, ModalDescription, ModalHeader} from "semantic-ui-react";

// redux
import {connect} from 'react-redux'
import {closeModal} from "../../redux/action/modalAction";
import Piechart from "../Graph/Pie";
import Barchart from "../Graph/Bar";
import Linechart from "../Graph/Line";

import axios from 'axios'

class SummaryModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            department: "",
            loadTime: 0,
            departmentName: ""
        }
    }

    closeModal = () => {
        this.props.closeModal()
        this.setState({
            loadTime: 0
        })
    }

    fetchData = dept_id => {
        axios.get(`/department/student?dept_id=${dept_id}`)
        .then(res => {
            let received = res.data

            if (received.response === true){
                let data = received.data

                this.setState({
                    department: data.dept_name
                })
            }
        })
        .catch(error => {
            console.log("error")
        })

        this.setState({
            loadTime: 1
        })
    }

    componentDidUpdate(){
        let {modal} = this.props
        
        if (modal.modalID != null && this.state.loadTime === 0){
            this.fetchData(modal.modalID)
        }
    }

    render() {
        let {modal} = this.props
        let {department} = this.state

        return (
            <Fragment>
                <Modal className="modal-center" open={modal.modalOpen} onClose={this.closeModal}>
                    <ModalHeader className="tex-center">
                        <Header textAlign="center" as="h3">
                            จำนวนนักศึกษาทุกชั้นปี {department}
                        </Header>
                    </ModalHeader>
                    <ModalContent>
                        <ModalDescription>
                            <Grid columns={3}>
                                <Grid.Row columns={2}>
                                    <Grid.Column>
                                        <Card className="card-circle-modal">
                                            <Card.Content>
                                                <Piechart />
                                            </Card.Content>
                                        </Card>
                                    </Grid.Column>
                                    <Grid.Row columns={2}>
                                        <Grid.Column>
                                            <Card className="card-twin-modal">
                                                <Card.Content>
                                                    <Barchart />
                                                </Card.Content>
                                            </Card>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Card className="card-twin-modal">
                                                <Card.Content>
                                                    <Linechart />
                                                </Card.Content>
                                            </Card>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid.Row>
                            </Grid>
                        </ModalDescription>
                    </ModalContent>
                </Modal>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    modal: state.modal
})

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch(closeModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(SummaryModal)