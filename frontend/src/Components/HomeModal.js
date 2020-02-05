import React, { Component } from 'react'
import {Modal} from 'semantic-ui-react'

class HomeModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dept : 0,
            open: false,
            dimmer: ""
        }
    }

    close = () => this.setState({ open: false });

    render() {
        let {dept, open, dimmer} = this.state

        return (
            <React.Fragment>
                <Modal open ={open} onClose={this.close} dimmer={dimmer}>
                    <Modal.Header className="modal-center">
                        Department : {dept}
                    </Modal.Header>
                    <Modal.Content>
                        <h1>Hello</h1>
                    </Modal.Content>
                </Modal>
            </React.Fragment>
        )
    }
}

export default HomeModal