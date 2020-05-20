import React, {Component, Fragment} from "react";

import {
    Dropdown,
    Divider,
    Header,
    Container,
    Table,
    Button
} from "semantic-ui-react";

import { connect } from 'react-redux'
import { getStudentList } from '../../../redux/action/adminStudentAction'

// redux
// import {connect} from 'react-redux'

// import bgyel from "../img/bg-head3.png";
// import GraphPie from "../../../components/Graph/Pie";
import DataTable from "../../../components/DataTable";
// import AlumniTypePanel from "../../../components/AlumniTypePanel";


class SummarySurvey extends Component {
    constructor(props) {
        super(props);
    
        // this.replaceModalItem = this.replaceModalItem.bind(this);
       
        this.state = {
          studentList: null
          // requiredItem: 0,
          // brochure: [
          //   {
          //     no: "1",
          //     ID: "60090500403",
          //     name: "Gold",
          //     barnch: "สถิติ",
          //     GPA: "1.7"
              
          //   }, 
          // ]
        }
      }

      componentDidMount() {
        this.props.getStudentList()
      }

      // handleDeleteStudent = (student_id) => {
      //   this.props.deleteStudent(student_id)
      // }
    
      // replaceModalItem(index) {
      //   this.setState({
      //     requiredItem: index
      //   });
      // }
    
    //   saveModalDetails(item) {
    //     const requiredItem = this.state.requiredItem;
    //     let tempbrochure = this.state.brochure;
    //     tempbrochure[requiredItem] = item;
    //     this.setState({ brochure: tempbrochure });
    //   }
    
    //   deleteItem(index) {
    //     let tempBrochure = this.state.brochure;
    //     tempBrochure.splice(index, 1);
    //     this.setState({ brochure: tempBrochure });
    //   }
   
        render() {    
          let { studentList } = this.props.student
            return(
              <Fragment>
                <Table>
                    <Table.Header>
                        <Table.Row textAlign="center">
                            <Table.HeaderCell> ลำดับ </Table.HeaderCell>
                            <Table.HeaderCell> รหัสนักศึกษา </Table.HeaderCell>
                            <Table.HeaderCell>ชื่อ-นามสกุล</Table.HeaderCell>
                            <Table.HeaderCell> สาขา </Table.HeaderCell>
                            <Table.HeaderCell>GPA</Table.HeaderCell>
                            {/* <Table.HeaderCell>กราฟผลการเรียน</Table.HeaderCell> */}
                            {/* <Table.HeaderCell>ดำเนินการ</Table.HeaderCell> */}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            studentList !== null && (
                              studentList.map((item, index) => (
                                    <Table.Row textAlign="center" key={index}>
                                        <Table.Cell>{index + 1}</Table.Cell>
                                        <Table.Cell>{item['student_id']}</Table.Cell>
                                        <Table.Cell>{item['firstname']}</Table.Cell>
                                        <Table.Cell>{item['branch_name']}</Table.Cell>
                                        <Table.Cell>{item['current_gpax']}</Table.Cell>
                                        {/* <Table.Cell>{item['current_gpax']}</Table.Cell> */}
                                        {/* <Table.Cell>
                                            <Button onClick={() => this.handleDeleteActivity(item['activity_id'])}>ลบ</Button>
                                        </Table.Cell> */}
                                    </Table.Row>
                                ))
                            )
                        }
                    </Table.Body>
                </Table>
            </Fragment>

        );
    }
  }

  const mapstateTpProps = state => (
    {
      student: state.admin_student
    }
  )

  const mapDispatchProps = dispatch => (
    {
      getStudentList: () => dispatch(getStudentList()),
      // deleteStudent: (student_id) => dispatch(deleteStudent(student_id))
    }
  )

export default connect(mapstateTpProps,mapDispatchProps)(SummarySurvey)