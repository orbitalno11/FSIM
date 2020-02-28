import React, {Component} from 'react'

import ApiManage from "../Class/ApiManage";
import {icons} from "react-icons";


class UploadForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: "",
            isLoaded: false,
            selectedFile: null,
            year: 2560
        };

        this.fileInput = React.createRef();
    }

    componentDidMount() {
        ApiManage.get('admission/2560/1/1')
            .then(res => {
                let receive_data = res.data;
                if (receive_data.response === true) {
                    this.setState({
                        data: receive_data.data,
                        isLoaded: true
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleSubmit = event =>{
        event.preventDefault();
        const data = new FormData();
        const target = event.target;
        let year = target[0].value
        let type = target[1].value
        let channael = target[2].value

        data.append("year", year);
        data.append("admission_type", type);
        data.append("admission_channel", channael);

        ApiManage.post("admission", data)
            .then(res => {
                console.log(res)
            })
            .then(error => {
                console.log(error)
            })
            .catch(error => {
                console.log(error.response.data.message);
                console.log(error.response.data.value);
            })
    };

    render() {
        let {isLoaded, data, year} = this.state;

        let show_data;

        if (isLoaded) {
            show_data = data.map(data => {
                const {firstname, lastname} = data;
                return (
                    <p>{firstname} -- {lastname}</p>
                )
            })
        }

        return (
            <React.Fragment>
                {year}
                {show_data}
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="year" id="year"/>
                    <input type="text" name="type" id="type"/>
                    <input type="text" name="channel" id="channel"/>
                    <button type="submit">Submit</button>
                </form>
            </React.Fragment>
        )
    }
}

export default UploadForm