import React, {Component, Fragment} from "react";

import {
    Dropdown,
    Divider,
    Grid,
    Header,
    Container,
    Card,
    Table,
    Image
} from "semantic-ui-react";

// redux
import {connect} from 'react-redux'
import {getAllBranch} from "../../redux/action/BranchAction";

// import bgyel from "../img/bg-head3.png";
import GraphPie from "../../components/Graph/Pie";
import GraphBar from "../../components/Graph/Bar";
import AlumniTypePanel from "../../components/AlumniTypePanel";


class SummaryAlumni extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            branch: props.branch_list
        }
    }

    componentDidMount() {
        this.fetchBranch()
    }

    fetchBranch = () => {
        this.props.allBranch()
        let {branch_list} = this.props
        this.setState({
            branch: branch_list
        })
    }

    setUpDropDown = branch => {
        let options = []
        for (const item in branch) {
            let b = {
                key: branch[item].branch_id,
                value: branch[item].branch_id,
                text: branch[item].branch_name
            }
            options.push(b)
        }
        return options.sort()
    }
    render() {
        let {branch_list} = this.props
        return (
            <Fragment>
                {/* <Image size="big" className="head-right" src={bgyel}/> */}
                <Container>
                    <Header as="h5" align = 'center'>
                        ค้นหาข้อมูลศิษย์เก่าของปีการศึกษา{" "}
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
                    <Grid>
                        <Grid.Row>
                            <Card fluid={true}>
                                <AlumniTypePanel/>
                            </Card>
                        </Grid.Row>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Card className="card-circle-modal">
                                        <Card.Header as="h3">
                                            กราฟแสดงจำนวนศิษย์เก่าแยกตามสาขา
                                        </Card.Header>
                                    <Card.Content>
                                        <GraphPie/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Row columns={2} >
                                <Grid.Column>
                                    <Card className="card-twin-modal">
                                        <Card.Header as="h3">
                                            กราฟแสดงจำนวนภาวะการทำงานของศิษย์เก่า
                                        </Card.Header>
                                        <Card.Content>
                                            <GraphPie/>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                                <br/>
                                <Grid.Column>
                                    <Card className="card-twin-modal">
                                        <Card.Header as="h3">
                                            กราฟแสดงจำนวนนักศึกษที่เข้าร่วมฝึกงาน
                                        </Card.Header>
                                        <Card.Content>
                                            <GraphPie/>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid.Row>
                        <Grid.Row >
                            <Grid.Column width={16}>
                                <Card className="card-default">
                                    <Card.Header as="h3">
                                        กราฟแสดงเกรดเฉลี่ยตลอดหลักสูตร
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
                                    </Card.Content>
                                   
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row >
                            <Grid.Column width={16}>
                                <Card className="card-default">
                                    <Card.Header as="h3">
                                       กราฟแสดงช่วงเงินเดือนของศิษย์เก่า
                                       
                                    </Card.Header>
                                    <Card.Header as="h6" align = 'right' className='branch' >
                                        <Dropdown
                                            options={this.setUpDropDown(branch_list)}
                                            placeholder="สาขาวิชา"
                                            selection
                                        />
                                    </Card.Header>

                                    <Card.Content>
                                        <GraphBar/>
                                    </Card.Content>
                            
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row >
                            <Grid.Column width={16}>
                                <Card className="card-default">
                                    <Card.Header as="h3">
                                       กราฟแสดงลักษณะงานต่างๆที่นักศึกษาเข้าทำงาน
                                       
                                    </Card.Header>
                                    <Card.Header as="h6" align = 'right' className='branch' >
                                        <Dropdown
                                            options={this.setUpDropDown(branch_list)}
                                            placeholder="สาขาวิชา"
                                            selection
                                        />
                                    </Card.Header>

                                    <Card.Content>
                                        <GraphPie/>
                                    </Card.Content>
                            
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row >
                            <Grid.Column width={16}>
                                <Card className="card-default">
                                    <Card.Header as="h3">
                                       กราฟแสดงมหาลัยที่นักศึกษาเลือกศึกษาต่อ
                                       
                                    </Card.Header>
                                    <Card.Header as="h6" align = 'right' className='branch' >
                                        <Dropdown
                                            options={this.setUpDropDown(branch_list)}
                                            placeholder="สาขาวิชา"
                                            selection
                                        />
                                    </Card.Header>

                                    <Card.Content>
                                        <GraphPie/>
                                    </Card.Content>
                            
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    branch_list: state.branch.branch_list
})

const mapDispatchToProps = dispatch => ({
    allBranch: () => dispatch(getAllBranch())
})
export default  connect(mapStateToProps, mapDispatchToProps)(SummaryAlumni)