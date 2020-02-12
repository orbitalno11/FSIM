import React from 'react'
import ReactDOM from 'react-dom';
import { FormControl } from 'react-bootstrap';
import Option_channel from './option'


class announcement extends React.Component {
    onSelected = (search) => {
        this.props.option(search)
       
    }
    render() {

        let announcement_s = this.props.announcement.map(function (item) {
            return (<Option_channel items={item}/>)
        });


        return (
            <React.Fragment>
                <FormControl as="select"
                    onChange={this.onSelected}
                    value={this.props.value}>
                    >
                    <option value='0'>กิจกรรมประชาสัมพันธ์</option>
                    {announcement_s}
                </FormControl>
            </React.Fragment>
        )
    }
}

export default announcement