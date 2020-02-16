import React,{Component} from 'react'
import { Form, Col, Row, Button, Container } from 'react-bootstrap';

import ProductRow from '../../addrow/AddRow'



class AddActivity extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.project = [
            {
                id: 0,
                name: ''
            }
        ]


    }

    handleRowDel(product) {
        let index = this.state.project.indexOf(product);
        this.state.project.splice(index, 1);
        this.setState(this.state.project);
    };

    handleAddEvent = () => {
        let id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
        let products = {
            id: id,
            name: ""
        }
        this.state.project.push(products);
        this.setState(this.state.project);

        console.log(this.state.project)


    }

    handleReset=()=>{
        let products = [
            {
                id: 0,
                name: ''
            }
        ]
        this.state.project=products
        this.setState(this.state.project);
    }

    handleProductTable(evt) {
        let item = {
            id: evt.target.id,
            name: evt.target.name,
            value: evt.target.value
        };
        let projects = this.state.project.slice();
        let newprojects = projects.map(function (project) {
            // console.log(item)
            for (var key in project) {
                if (key == item.name && project.id == item.id) {
                    project[key] = item.value;

                }
            }
            return project;
        });
        this.setState({ project: newprojects });

    }


    render() {

        return (
            <React.Fragment>
                <Container className="contrain_css" >
                    <h3 >เพิ่มโครงการรับเข้า</h3>

                    <Form style={{ padding: '5%' }}>

                        {
                            this.state.project.map((product)=>
                                <ProductRow 
                                onProductTableUpdate={this.handleProductTable.bind(this)} 
                                row={product} 
                                onDelEvent={this.handleRowDel.bind(this)} 
                                onAddEve={this.handleAddEvent.bind(this)}
                                name={"name"}
                                style={{ marginTop: '5%' }}
                                />
                                
                            )
                        }

                     
                        <div style={{ marginTop: '5%' }}>

                            <Button
                                className='btn-EditData interval-1'
                                onClick={this.handleReset}
                            >RESET</Button>

                            <Button
                                className='btn-info interval-1'
                                onClick={this.handleSearch}
                            >SUBMIT</Button>
                        </div>


                    </Form>
                </Container>
            </React.Fragment>
        )
    }
}

export default AddActivity