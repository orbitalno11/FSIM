import React, { Component, Fragment } from "react";

import {
    Dropdown,
    Divider,
    Image,
    Container,
    Grid,
    Header,
    Card
} from "semantic-ui-react";



// import GraphBar from "../../../components/Graph/Bar";
import Piechart from "../../../components/Graph/Pie";
import Barchart from "../../../components/Graph/Bar";
import Horizontal from "../../../components/Graph/BarHorizontal";

import { setupPieChart, setupStackBarChart } from '../../../components/Graph/GraphController'


//  wait other
import 'chartjs-plugin-datalabels'

import axios from 'axios'

// import color set
import { colorSet } from '../../../Constant'

class StudentData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            department: "",
            loadTime: 0,
            departmentName: "",
            branch: [],
            byYear: [],
            byBranch: [],
            studentByBranch: [],
            studentByYear: [],
            branchByStatus: []
        }
    }


    fetchData = async (dept_id) => {
        await axios.get(`/student/department?dept_id=${dept_id}`)
            .then(res => {
                let received = res.data

                if (received.response === true) {
                    let data = received.data
                    console.log(data)

                    this.setState({
                        department: data.dept_name,
                        branch: data.branch[0],
                        byYear: data.status_by_year[0],
                        byBranch: data.df_status_by_branch[0],
                        loadTime: 1
                    })

                }
            })
            .catch(error => {
                console.log("error")
                this.setState({
                    loadTime: 1
                })
            })
    }

    setupGraph = () => {
        let { branch, byYear, byBranch } = this.state

        this.setState({
            studentByBranch: setupPieChart(branch),
            studentByYear: setupStackBarChart(byYear),
            branchByStatus: setupStackBarChart(byBranch)
        })
    }

    async componentDidMount() {
        let id=this.props.match.params.id
        await this.fetchData(id)
        this.setupGraph()
    }


    setBranch = () => {
        let { branch } = this.state
        let data = branch
        let labels = Object.keys(data)
        let dataset = []
        let background = []
        let hoverColor = []

        for (let i in data) {
            dataset.push(data[i])
        }


        for (let i in labels) {
            background.push(colorSet[i])
            hoverColor.push(colorSet[i] + "75")
        }

        this.setState({
            pieData: {
                labels: labels,
                datasets: [
                    {
                        data: dataset,
                        backgroundColor: background,
                        hoverBackgroundColor: hoverColor
                    }
                ]
            }
        })
    }

    setStudentYear = () => {
        let { byYear } = this.state
        let data = byYear
        let label = []
        let dataset = []

        // get sub label for check data
        let sub_label = []
        let cur_size = 0
        for (let key in data) {
            let temp = data[key]

            let year = 'ชั้นปีที่ ' + key
            label.push(year)

            let key_per = Object.keys(temp)

            if (key_per.length > cur_size) {
                cur_size = key_per.length
                sub_label = key_per
            }
        }

        for (let i in sub_label) {
            let inner = {
                label: sub_label[i],
                data: []
            }
            dataset.push(inner)
        }

        for (let i in byYear) {
            let data = byYear[i]
            let key = Object.keys(data)
            // key.pop()


            for (let j in sub_label) {
                if (key[j] === undefined) {
                    // console.log(`Status: ${sub_label[j]}: null`)
                    dataset[j].data.push(0)
                    continue
                }
                // console.log(`Status: ${sub_label[j]}: ${data[key[j]]}`)
                dataset[j].data.push(parseInt(data[key[j]]))
            }
        }

        for (let i in dataset) {
            dataset[i].backgroundColor = colorSet[i]
        }

        this.setState({
            barData: {
                labels: label,
                datasets: dataset
            }
        })

    }

    
   


    render() {
        
        let { department, studentByBranch, studentByYear, branchByStatus} = this.state
       
        return (
            <Fragment>
                
                <Container style={{backgroundColor:"#FFFFFF",padding:"2%"}}>
                    <Header as="h3" align = 'center'>
                            ค้นหาข้อมูลการรับเข้าของปีการศึกษา{" "}
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
                    <Header textAlign="center" as="h2" style={{marginBottom:"5%"}}>
                        จำนวนนักศึกษาทุกชั้นปี {department}
                    </Header>
                    
                    <Grid textAlign={"center"}>
                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <Card fluid>
                                        <Card.Header textAlign={"center"}>
                                            <h3>จำนวนนักศึกษาต่อสาขา</h3>
                                        </Card.Header>
                                        <Card.Content>
                                            <Piechart data={studentByBranch} />
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                                <Grid.Column>
                                    <Card fluid>
                                        <Card.Header textAlign={"center"}>
                                            <h3>สถานะของนักศึกษาแต่ละชั้นปี</h3>
                                        </Card.Header>
                                        <Card.Content>
                                        <Barchart data={studentByYear} />
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Card fluid>
                                        <Card.Header textAlign={"center"}>
                                            <h3>สถานะของนักศึกษาแต่ละสาขา</h3>
                                        </Card.Header>
                                        <Card.Content>
                                            <Horizontal data={branchByStatus} />
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                            </Grid.Row>
{/*                            
                            <Grid.Row>
                                <Grid.Column width={8}>
                                    <Card className="card-default">
                                        <Card.Header as="h5">
                                            กราฟแสดงผลการเรียน
                                        </Card.Header>
                                        <Card.Content>
                                            <GraphBar/>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <Card className="card-default">
                                        <Card.Header as="h5">
                                            กราฟแสดงผลการเรียน 
                                        </Card.Header>
                                        <Card.Content>
                                            <GraphBar/>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={8}>
                                    <Card className="card-default">
                                        <Card.Header as="h5">
                                            กราฟแสดงผลการเรียน
                                        </Card.Header>
                                        <Card.Content>
                                            <GraphBar/>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <Card className="card-default">
                                        <Card.Header as="h5">
                                            กราฟแสดงผลการเรียน 
                                        </Card.Header>
                                        <Card.Content>
                                            <GraphBar/>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                            </Grid.Row> */}
                        </Grid>
                </Container>
            </Fragment>
        )
    }
}
export default StudentData

