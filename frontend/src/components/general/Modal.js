import React, {Component, Fragment} from "react";
import {Modal, Card, Grid, Header, ModalContent, ModalDescription, ModalHeader} from "semantic-ui-react";

// redux
import {connect} from 'react-redux'
import {closeModal} from "../../redux/action/modalAction";
import Piechart from "../Graph/Pie";
import Barchart from "../Graph/Bar";
import Linechart from "../Graph/Line";

class SummaryModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            department: "",
            loadTime: 0
        }
    }

    closeModal = () => {
        this.props.closeModal()
    }

    render() {
        let {modal} = this.props
        return (
            <Fragment>
                <Modal className="modal-center" open={modal.modalOpen} onClose={this.closeModal}>
                    <ModalHeader className="tex-center">
                        <Header textAlign="center" as="h3">
                            จำนวนนักศึกษาทุกชั้นปี {modal.modalID}
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