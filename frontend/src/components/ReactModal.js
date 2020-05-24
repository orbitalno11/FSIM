import React, { Component, Fragment } from "react";
import { Modal, ModalContent } from "semantic-ui-react";
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// redux
import { connect } from 'react-redux'
import { closeModal } from "../redux/action/modalAction";


//  wait other
import 'chartjs-plugin-datalabels'


class ReactModal extends Component {

    closeModal = () => {
        this.props.closeModal()
    }

    render() {
        let { modal } = this.props
        return (
            <Fragment>

                {modal.modalProps != null ?
                    modal.modalProps.map(value =>
                        <Modal className="modal-center" size="mini" open={modal.modalOpen} onClose={this.closeModal} key={value.type}>

                            <ModalContent >
                                <div style={{ color: value.color, textAlign: 'center', marginTop: '2%' }}>
                                    {

                                        !value.type ?
                                            <FaTimesCircle size={70} />
                                            :
                                            <FaCheckCircle size={70} />
                                    }


                                </div>
                                <div style={{ marginTop: '5%', textAlign: 'center' }}>
                                    <p style={{ marginBottom: '5%', fontWeight: 'bold' }}>{value.text}</p>
                                    <button className="ui button" style={{ backgroundColor: '#9ADFF5', color: 'white' }} onClick={this.closeModal}>OK</button>
                                </div>

                            </ModalContent>
                        </Modal>
                    )
                    : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(ReactModal)