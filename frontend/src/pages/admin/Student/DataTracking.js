// import React, { Component, Fragment } from "react";

// import {
//   Dropdown,
//   Divider,
//   Header,
//   Container,
//   Table,
//   Button
// } from "semantic-ui-react";

// import { connect } from 'react-redux'
// import { getStudentList, selectYear } from '../../../redux/action/adminStudentAction'

// // redux
// // import {connect} from 'react-redux'

// // import bgyel from "../img/bg-head3.png";
// // import GraphPie from "../../../components/Graph/Pie";
// import DataTable from "../../../components/DataTable";
// // import AlumniTypePanel from "../../../components/AlumniTypePanel";


// class SummarySurvey extends Component {

//   constructor(props) {
//     super(props)

//     this.state = {
//       dept_id: props.id || null,
//       data : props.data || null,
//     }
//   }

//   render() {
//     let  {data}  = this.state
   
//     return (
//       <Fragment>
      
//         <Table>
//           <Table.Header>
//             <Table.Row textAlign="center">
//               <Table.HeaderCell> ลำดับ </Table.HeaderCell>
//               <Table.HeaderCell> รหัสนักศึกษา </Table.HeaderCell>
//               <Table.HeaderCell>ชื่อ-นามสกุล</Table.HeaderCell>
//               <Table.HeaderCell> สาขา </Table.HeaderCell>
//               <Table.HeaderCell>GPA</Table.HeaderCell>
//               {/* <Table.HeaderCell>กราฟผลการเรียน</Table.HeaderCell>  */}
//                {/* <Table.HeaderCell>ดำเนินการ</Table.HeaderCell> */}
//             </Table.Row>
//           </Table.Header>
//           <Table.Body>
//             {
//               data !== null ? (
//                 data.map((item, index) => (
//                   <Table.Row textAlign="center" key={index}>
//                     <Table.Cell>{index + 1}</Table.Cell>
//                     <Table.Cell>{item['student_id']}</Table.Cell>
//                     <Table.Cell>{item['firstname']}</Table.Cell>
//                     <Table.Cell>{item['branch_name']}</Table.Cell>
//                     <Table.Cell>{item['current_gpax']}</Table.Cell> 
//                     {/* <Table.Cell>{item['current_gpax']}</Table.Cell> */}
//                     {/* <Table.Cell>
//                                             <Button onClick={() => this.handleDeleteActivity(item['activity_id'])}>ลบ</Button>
//                                         </Table.Cell> */}
//                    </Table.Row>
//                 ))
//               ) : (
//                   <Table.Row>
//                     <Table.Cell colSpan={3}>
//                       <h2 className="text-center">ไม่พบข้อมูล</h2>
//                     </Table.Cell>
//                   </Table.Row>
//                 )
//             }
//           </Table.Body> 
//         </Table>
//       </Fragment>

//     );
//   }
// }

// const mapstateTpProps = state => (
//   {
//     student: state.admin_student
//   }
// )

// const mapDispatchProps = dispatch => (
//   {
//     getStudentList: () => dispatch(getStudentList()),

//   }
// )

// export default connect(mapstateTpProps, mapDispatchProps)(SummarySurvey)