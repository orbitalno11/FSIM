
import React, { Component } from 'react'
import { Button, InputGroup, FormControl } from 'react-bootstrap';

class ProjectRow extends Component {
    onDelEvent() {
        this.props.onDelEvent(this.props.product);
    }


    render() {

        return (
            <React.Fragment>
                <InputGroup className="mb-3" >
                    <FormControl
                        type="text"
                        name="project"
                        id={this.props.product.id}
                        onChange={this.props.onProductTableUpdate}
                        // inputRef={(ref) => { this.input = ref }}
                        value={this.props.product.project}
                        placeholder="ชื่อโครงการ"
                    />
                    <InputGroup.Append >
                        <Button
                            onClick={this.props.onAddEve}
                            className="btn-EditData interval-1">+</Button>
                        <Button
                            className='btn-DeleteData interval-1'
                            onClick={this.onDelEvent.bind(this)}
                        > - </Button>
                    </InputGroup.Append>
                </InputGroup>
            </React.Fragment>
        );

    }

}

export default ProjectRow