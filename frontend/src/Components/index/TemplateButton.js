import React, { Component } from "react";

import {Button} from "semantic-ui-react";

class TemplateButton extends Component {

    render() {
        return (
            <React.Fragment>
                <Button color={this.props.item.color}>{this.props.item.name}</Button>
            </React.Fragment>
        );
    }
}

export default TemplateButton;