import React, { Component }  from 'react'
import { FaSistrix,FaDatabase,FaEdit,FaTrash } from "react-icons/fa";
import { InputGroup, Button, Table } from 'react-bootstrap';
import Year from '../../option/year';
import School from '../../option/school'

class searchAnnouncement extends Component {


    state = {
        schoolName: '',
        year: 0,
    }
    handleChangeSchoolName = (search) => {
        this.setState({ schoolName: search.target.value });
    }

    handleChangeYear = (search) => {
        this.setState({ year: search.target.value });
    }

    handleSearch = () => {
        alert(this.state.schoolName + " , " + this.state.year)

    }

    render() {

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
    

        return (

            <React.Fragment>
                <InputGroup className="mb-3" style={{ padding: '5%' }}>
                    <School option={this.handleChangeSchoolName} school={SchoolName}/>
                    <Year option={this.handleChangeYear} year={year}/>
    
                    <InputGroup.Append >
                        <Button
                            className="btn-info"
                            onClick={this.handleSearch}
                        >
                            <FaSistrix/>
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
                <hr></hr>

                <Table striped bordered hover style={{ marginTop: '5%' }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ภาควิชา</th>
                            <th>ปีการศึกษา</th>
                            <th>จำนวนนักศึกษา</th>
                            <th>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>คณิตศาสตร์</td>
                            <td>2560</td>
                            <td>25</td>
                            <td>
                            <Button 
                                    className="btn-info interval"
                                    onClick={this.handleSearch}
                                ><FaDatabase /> ดู</Button>
                               
                                <Button
                                    className="btn-EditData interval"
                                    onClick={this.handleSearch}
                                ><FaEdit  /> แก้ไข</Button>
                               
                                <Button
                                    className="btn-DeleteData interval"
                                    onClick={this.handleSearch}
                                ><FaTrash/> ลบ</Button>
                               
                            </td>

                        </tr>

                    </tbody>
                </Table>

            </React.Fragment>


        )
    }
}

export default searchAnnouncement