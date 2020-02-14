import React, { Component } from 'react'
// import ReactDOM from 'react-dom';
import { Button, Form, Col, Row } from 'react-bootstrap';
import Year from '../../option/year';
import Announcement from '../../option/announcement';

import ProductRow from '../../addrow/AddRow'


class Addannouncement extends Component {

    constructor() {
        super();
        this.state = {};
        this.state.school = [
            {
                id: 0,
                name: ''
            }
        ]
        this.state.year='0'
        this.state.anno='0'


        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleChangeAnno = (search) => {
        this.setState({ anno: search.target.value });
    }

    handleChangeYear = (search) => {
        this.setState({ year:  search.target.value });

    }

    handleRowDel(product) {
        let index = this.state.school.indexOf(product);
        this.state.school.splice(index, 1);
        this.setState(this.state.school);
    };

    handleAddEvent = () => {
        let id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
        let products = {
            id: id,
            name: ""
        }
        this.state.school.push(products);
        this.setState(this.state.school);
        console.log(this.state.school)

    }

    handleReset=()=>{
        let schoolNew = [
            {
                id: 0,
                name: ""
            }
        ]
        this.state.school=schoolNew
        this.state.year='0'
        this.state.anno='0'
        this.setState(this.state.school);
    }





    handleProductTable(evt) {
        let item = {
            id: evt.target.id,
            name: evt.target.name,
            value: evt.target.value
        };
        let schools = this.state.school.slice();
        let newSchools = schools.map(function (sc) {
            for (var key in sc) {
                if (key == item.name && sc.id == item.id) {
                    sc[key] = item.value;
                }
            }
            return sc;
        });
        this.setState({ school: newSchools });

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
                            <Announcement option={this.handleChangeAnno} announcement={Activity} value={this.state.anno}/>

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
                                name={"name"}
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