import React,{Component} from 'react'
import { Form, Col, Row, Button, Container } from 'react-bootstrap';

import ProjectTable from './ProjectTable'



class AddActivity extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.product = [
            {
                id: 0,
                project: ''
            }
        ]


    }



    handleRowDel(product) {
        let index = this.state.product.indexOf(product);
        this.state.product.splice(index, 1);
        this.setState(this.state.product);
    };

    handleAddEvent = () => {
        let id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
        let products = {
            id: id,
            project: ""
        }
        this.state.product.push(products);
        this.setState(this.state.product);

        console.log(this.state.product)


    }

    handleReset=()=>{
        let products = [
            {
                id: 0,
                project: ''
            }
        ]
        this.state.product=products
        // console.log(this.state.product)
        this.setState(this.state.product);
        // this.state.product.splice(3, 1);
        // this.setState(this.state.product);
    }

    handleProductTable(evt) {
        let item = {
            id: evt.target.id,
            name: evt.target.name,
            value: evt.target.value
        };
        let products = this.state.product.slice();
        let newProducts = products.map(function (product) {
            console.log(item)
            for (var key in product) {
                if (key == item.name && product.id == item.id) {
                    product[key] = item.value;

                }
            }
            return product;
        });
        this.setState({ product: newProducts });

    }


    render() {

        return (
            <React.Fragment>
                <Container className="contrain_css" >
                    <h3 >เพิ่มโครงการรับเข้า</h3>

                    <Form style={{ padding: '5%' }}>

                        <ProjectTable
                            count={this.state.count}
                            onProductTableUpdate={this.handleProductTable.bind(this)}
                            onRowAdd={this.handleAddEvent.bind(this)}
                            onRowDel={this.handleRowDel.bind(this)}
                            products={this.state.product}
                            style={{ marginTop: '5%' }}
                        />
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