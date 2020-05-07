import React from 'react'
import { Message } from 'semantic-ui-react'

export const MessageError = (props) => {
    return (
        <Message negative>
            <Message.Header>{props.header}</Message.Header>
            <p>{props.body}</p>
        </Message>
    )
}

export const MessageSuccess = (props) => {
    return (
        <Message success>
            <Message.Header>{props.header}</Message.Header>
            <p>{props.body}</p>
        </Message>
    )
}

