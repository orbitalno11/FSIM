import React, { Component } from 'react'
import {
    Header,
    Grid,
} from "semantic-ui-react";

class IndexButtonStudent extends Component {
    onClick(){
        this.props.onClick(this.props.item)
    }

    render() {
        return (
            <React.Fragment>
                <Grid.Column>
                    <button
                        type="button"
                        class="btn btn-light btn-circle btn-xl"
                        id={this.props.item.id}
                        onClick={this.onClick.bind(this)}                    >
                        <img className="logo-branch" src={this.props.item.img}></img>
                    </button>
                    <Header size="small">{this.props.item.id}</Header>
                </Grid.Column>
            </React.Fragment>
        )
    }
}

export default IndexButtonStudent