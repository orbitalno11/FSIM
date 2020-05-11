import React, { Component, Fragment } from 'react'

import {
    Dropdown,
    Divider,
    Grid,
    Header,
    Container,
    Card,
    Table,
    Image
} from "semantic-ui-react";


class ActiveRecruitment extends Component {

    constructor(props){
        super(props)

        this.state = {
            project_id: props.data['project_id'] || null,
            project_name: props.data['project_name'] || null
        }
    }

    render(){

        let { project_id, project_name } = this.state

        return(
            <Fragment>
                <h1>ID {project_id}</h1>
                {project_name}
            </Fragment>
        )
    }
}

export default ActiveRecruitment