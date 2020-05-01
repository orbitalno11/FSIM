import React, {Component, Fragment} from "react";

import {
    Dropdown,
    Divider,
    Grid,
    Header,
    Container,
    Card,
    Table,
    Button,
    Icon, Modal,
    Image
} from "semantic-ui-react";

// redux
import {connect} from 'react-redux'
import {getAllBranch} from "../../redux/action/BranchAction";

// import bgyel from "../img/bg-head3.png";
import GraphPie from "../../components/Graph/Pie";
import DataTable from "../../components/DataTable";
import AlumniTypePanel from "../../components/AlumniTypePanel";


class SummarySurvey extends Component {
    constructor(props) {
        super(props);
    
        this.replaceModalItem = this.replaceModalItem.bind(this);
       
        this.state = {
          requiredItem: 0,
          brochure: [
            {
              no: "1",
              ID: "60090500403",
              name: "Gold",
              barnch: "สถิติ",
              GPA: "1.7"
              
            }, 
          ]
        }
      }
    
      replaceModalItem(index) {
        this.setState({
          requiredItem: index
        });
      }
    
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
            const brochure = this.state.brochure.map((item, index) => {
            return (
                <tr key={index}>
                <td>{item.no}</td>
                <td>{item.ID}</td>
                <td>{item.name}</td>
                <td>{item.barnch}</td>
                <td>{item.GPA}</td>
                <td>
                    <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
                    onClick={() => this.replaceModalItem(index)}>show</button> {" "}
                   
                </td>
                </tr>
            )
            });
            
            const requiredItem = this.state.requiredItem;
            let modalData = this.state.brochure[requiredItem];
            return (
            <Fragment>
                <Container>
                    <Header as="h5" align = 'center'>
                        ค้นหาข้อมูลแบบสอบถามของปีการศึกษา{" "}
                        <Dropdown
                            options={[
                                {key: "2560", value: "2560", text: "2560"},
                                {key: "2561", value: "2561", text: "2561"}
                            ]}
                            placeholder="Select"
                            selection
                        />
                    </Header>
                    <Divider/>
                    <Table responsive>
                            <thead>
                                <tr >
                                <th>ลำดับ</th>
                                <th>รหัสนักศึกษา</th>
                                <th>ชื่อ-นามสกุล</th>
                                <th>สาขา</th>
                                <th>GPA</th>
                                <th>กราฟผลการเรียน</th>
                                </tr>
                            </thead>
                            <tbody>
                            {brochure}
                            </tbody>
                            <DataTable/>
                    </Table>
                 </Container>  
            </Fragment>  


        );
    }
  }


export default SummarySurvey