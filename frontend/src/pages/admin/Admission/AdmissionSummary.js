import React, {Component, Fragment} from "react";

import {
    Dropdown,
    Divider,
    Grid,
    Header,
    Container,
    Table
} from "semantic-ui-react";

// redux
import {connect} from 'react-redux'
import { getAdmissionList, selectYear } from '../../../redux/action/adminAdmissionAction1'

class AdmissionSummary extends Component {


    constructor(props) {
        super(props)

        this.state = {
            admissionList: null
        }
    }

    componentDidMount() {
        this.props.getAdmissionList()
    }
    handleSeclectYear = async event => {
        let value = event.target.value
        await this.props.setYear(value)
        this.getData()
    }
  
    render() {
        let { admissionList, selectedYear,yearList } = this.props.admission
        return (
            <Fragment>
                 <Container>
                 <Header as="h5" textAlign="center">
                        ข้อมูลการรับเข้าของปีการศึกษา
                        {
                            <select id="selectYear" defaultValue={selectedYear} onChange={this.handleSeclectYear}>
                                {
                                    yearList !== null && yearList.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))
                                }
                            </select>
                        }

                    </Header>
                        <Divider/>
                     <Grid>     
                         <Grid.Row> 
                            <Header  as = "h3">
                                จำนวนประเภทการเข้าศึกษาแต่ละสาขาวิชา ของนักศึกษาคณะวิทยาศาสตร์ มจธ.
                                </Header>
                            <Divider/>
                            <Table celled structured>
                                <Table.Header>
                                    <Table.Row active>
                                        <Table.HeaderCell width={2} textAlign="center">
                                            ประเภทการเข้าศึกษา
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            เคมี
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            คณิตศาสตร์
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            สถิติ
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            วิทยาการคอมพิวเตอร์ประยุกต์
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            ฟิสิกส์ประยุกต์
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            จุลชีววิทยา
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            วิทยาศาสตร์และเทคโนโลยีการอาหาร
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                {/* {
                                    admissionList !== null && (
                                        admissionList.map((item, index) => (
                                            <Table.Row textAlign="center" key={index}>
                                                <Table.Cell>{item['count_by_branch']}</Table.Cell>
                                                
                                                
                                            </Table.Row>
                                        ))
                                    )
                                } */}
                                </Table.Body>
                            </Table>
                        </Grid.Row>
                    </Grid>
                    <Grid>     
                         <Grid.Row> 
                            <Header  as = "h3">
                                ค่าเฉลี่ยประเภทการเข้าศึกษาแต่ละสาขาวิชาของนักศึกษาคณะวิทยาศาสตร์ มจธ.
                                </Header>
                            <Divider/>
                            <Table celled structured>
                                <Table.Header>
                                    <Table.Row active>
                                        <Table.HeaderCell width={3} textAlign="center">
                                            ประเภทการเข้าศึกษา
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={3} textAlign="center">
                                            จำนวนคน
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={3} textAlign="center">
                                            Max
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={3} textAlign="center">
                                            Min
                                        </Table.HeaderCell>
                                    
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            คัดเลือกตรง
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                    
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Grid.Row>
                    </Grid>   
                    <Grid>     
                         <Grid.Row> 
                            <Header  as = "h3">
                                ประเภทการรับเข้าศึกษาของคณะวิทยาศาสตร์ มจธ.
                                </Header>
                            <Divider/>
                            <Table celled structured>
                                <Table.Header>
                                    <Table.Row active>
                                        <Table.HeaderCell width={2} textAlign="center">
                                            ประเภทการเข้าศึกษา
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            รวมจำนวนนักศึกษา (คน)
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            ร้อยละ
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            จำนวนนักศึกษาตกออก(คน)​
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            ร้อยละนักศึกษาตกออก(จากนักศึกษาแต่ละประเภท)​
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            ร้อยละนักศึกษาตกออก(จากนักศึกษาทั้งหมด)​
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            จำนวนนักศึกษาติดวิทยาทัณฑ์(คน)​
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            ร้อยละของนักศึกษาวิทยาทัณฑ์(จากแต่ละประเภท)​
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            ร้อยละนักศึกษาวิทยาทัณฑ์จากนักศึกษาทั้งหมด​
                                        </Table.HeaderCell>

                                     
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            คัดเลือกตรง
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                    
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Grid.Row>
                    </Grid>         
                </Container>

            </Fragment>
        )
    }
}
const mapStateToProps = state => (
    {
        admission: state.admin_admission
    }
)

const mapDispatchToProps = dispatch => (
    {
        getAdmissionList: () => dispatch(getAdmissionList()),
        setYear: (year) => dispatch(selectYear(year))
    }
)


export default connect(mapStateToProps, mapDispatchToProps)(AdmissionSummary)