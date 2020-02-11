import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { FaCloudUploadAlt } from "react-icons/fa";
import Year from '../../option/year';
// import Around from '../option/admission_channel'
// import Project from '../option/project'
import ProductRow from '../../addrow/AddRow'


class Addannouncement extends Component {

    constructor() {
        super();
        this.state = {};
        this.state.school = [
            {
                id: 0,
                project: ''
            }
        ]


        this.handleSubmit = this.handleSubmit.bind(this)

    }



    // handleChangeAround = (search) => {
    //     // console.log(search.target.value);
    //     this.setState({ channel: search.target.value });
    // }

    // handleChangeProject = (search) => {
    //     // console.log(search.target.value);
    //     this.setState({ project: search.target.value });
    //     this.setState({ channel: 0 });
    // }

    // handleChangeYear = (search) => {
    //     this.setState({ year: search.target.value });
    // }



    handleRowDel(product) {
        let index = this.state.school.indexOf(product);
        this.state.school.splice(index, 1);
        this.setState(this.state.school);
    };

    handleAddEvent = () => {
        let id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
        let products = {
            id: id,
            project: ""
        }
        this.state.school.push(products);
        this.setState(this.state.school);

        console.log(this.state.school)


    }

    handleReset=()=>{
        let schoolNew = [
            {
                id: 0,
                project: ""
            }
        ]
        this.state.school=schoolNew
        // console.log(this.state.product)
        this.setState(this.state.school);
        // this.state.product.splice(3, 1);
        // this.setState(this.state.product);
    }

    handleProductTable(evt) {
        let item = {
            id: evt.target.id,
            name: evt.target.name,
            value: evt.target.value
        };
        let products = this.state.school.slice();
        let newProducts = products.map(function (product) {
            // console.log(item)
            for (var key in product) {
                if (key == item.name && product.id == item.id) {
                    product[key] = item.value;

                }
            }
            return product;
        });
        this.setState({ school: newProducts });

    }


   
    handleSubmit(event) {
        alert("OK")
        let data = this.state
        // alert(data)

        fetch("https://...", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(data)
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data)
            });
    }









    render() {

        const SchoolName=[
            {
                id:1,
                name:'รร.กิจติ'
            },
            {
                id:2,
                name:'รร. อิอิ'
            }
        ]

        const Activity=[
            {
                id:1,
                name:'Open House'
            }
        ]

        const year=[
            {
                id:1,
                name:'2012'
            },
            {
                id:2,
                name:'2013'
            }
        ]

     



        return (
            <React.Fragment>

                <Form style={{ padding: '5%' }} onSubmit={this.handleSubmit}>


                    <Row className="style-addData" >
                        <Col sm='3' >
                            <label>กิจกรรมประชาสัมพันธ์</label>
                        </Col>
                        <Col sm='6'>
                            <Year option={this.handleChangeYear} year={year} value={this.state.year}/>

                        </Col>
                    </Row>
                    <Row className="style-addData interval-top"  >
                        <Col sm='3'>
                            <label>ปีที่ประชาสัมพันธ์</label>
                        </Col>
                        <Col sm='6'>
                            <Year option={this.handleChangeYear} year={year} value={this.state.year}/>

                        </Col>
                    </Row>
                    <Row className="style-addData interval-top"  >
                        <Col sm='3'>
                            <label>โรงเรียนที่เข้าร่วม</label>
                        </Col>
                        <Col sm='6'>

                          
                        {
                            this.state.school.map((product)=>
                                <ProductRow 
                                onProductTableUpdate={this.handleProductTable.bind(this)} 
                                row={product} 
                                onDelEvent={this.handleRowDel.bind(this)} 
                                onAddEve={this.handleAddEvent.bind(this)}
                                style={{ marginTop: '5%' }}
                                />
                                
                            )
                        }
                        </Col>
                    </Row>
                    

                  
                    <div className="style-addData " style={{ marginTop: '5%' }} >
                        <Button
                            className='btn-EditData interval-1'
                            onClick={this.handleReset}
                        >RESET</Button>

                        <Button
                            type="submit"
                            className='btn-info interval-1'
                            onClick={this.onSubmit}
                        >SUBMIT</Button>

                    </div>

                </Form>
            </React.Fragment>


        )
    }
}

export default Addannouncement