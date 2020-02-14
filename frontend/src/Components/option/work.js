import React from 'react'
// import ReactDOM from 'react-dom';
import { FormControl } from 'react-bootstrap';


class work extends React.Component {
    onSelected = (search) => {
        this.props.option(search)
    }
    render() {

        return (
            <React.Fragment>
                <FormControl as="select"
                    onChange={this.onSelected} >
                    <option value='0'></option>
                    <option value='ราชการ'>ราชการ</option>
                    <option value='เอกชน'>เอกชน</option>
                    <option value='รัฐวิสาหกิจ'>รัฐวิสาหกิจ</option>
                   
                </FormControl>
            </React.Fragment>
        )
    }
}

export default work