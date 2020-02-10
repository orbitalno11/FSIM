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

    onClose = () => {
        if(this.props.show){
            this.props.state(false)
        }
    }

    // close = () => this.setState({ open: false });

    render() {

        console.log(this.props.show)
        // let {dept, open, dimmer} = this.state

        return (
            <React.Fragment>
                <Modal open ={this.props.show} onClose={this.onClose} dimmer={this.props.dimmer}>
                    <Modal.Header className="modal-center">
                        Department : {this.props.dept}
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