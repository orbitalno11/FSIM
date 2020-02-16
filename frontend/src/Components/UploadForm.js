import React, {Component} from 'react'

import ApiManage from "../Class/ApiManage";



class UploadForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fileURL: '',
            file: null,
            data: "",
            isLoaded: false
        }
    }

    handleUploadFile(ev) {
        ev.preventDefault()

        const data = new FormData()
        // data.append('file', thi)
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

    render() {
        let {isLoaded, data} = this.state;

        let show_data;

        if (isLoaded){
            show_data = data.map(data => {
                const {firstname, lastname} = data;
                return (
                    <p>{firstname} -- {lastname}</p>
                )
            })
        }

        return (
            <React.Fragment>
                {show_data}
                <form>
                    <input type="file" name="file" id="file" />
                    <input type="text" name="year" id="year" />
                </form>
            </React.Fragment>
        )
    }
}

export default UploadForm