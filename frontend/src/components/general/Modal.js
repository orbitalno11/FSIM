import React, { Component, Fragment } from "react";
import { Modal, Card, Grid, Header, ModalContent, ModalDescription, ModalHeader } from "semantic-ui-react";

// redux
import { connect } from 'react-redux'
import { closeModal } from "../../redux/action/modalAction";
import Piechart from "../Graph/Pie";
import Barchart from "../Graph/Bar";
import Linechart from "../Graph/Line";

import axios from 'axios'

class SummaryModal extends Component {
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
            pieData: []
        }
    }

    closeModal = () => {
        this.props.closeModal()
        this.setState({
            loadTime: 0
        })
    }

    

    fetchData = async (dept_id) => {
        await axios.get(`/department/student?dept_id=${dept_id}`)
            .then(res => {
                let received = res.data

                if (received.response === true) {
                    let data = received.data

                    console.log(data)

                    this.setState({
                        department: data.dept_name,
                        branch: data.branch,
                        byYear: data.by_year,
                        byBranch: data.by_branch,
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

    setBranch = () => {
        let { branch } = this.state
        let labels = []
        let datas = []

        for(let i in branch){
            labels.push(branch[i].branch_id)
            datas.push(branch[i].branch_student)
        }

        let graphData = {
            labels: labels,
            datasets: [
                {
                    data: datas,
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ]
                }
            ]
        }

        this.setState({
            pieData: graphData
        })
    }

    setStudentYear = () => {
        let { byYear } = this.state
        let label = []
        let dataset = []

        let sub_label = []
        
        for(let i in byYear){
            let year = 'ชั้นปีที่ ' + byYear[i].education_year
            label.push(year)
            let data = byYear[i]
            let key = Object.keys(data)
            
            for(let j in key){
                console.log(key[j])
            }
        }

    }

    async componentDidUpdate() {
        let { modal } = this.props

        if (modal.modalID != null && this.state.loadTime === 0) {
            await this.fetchData(modal.modalID)
            this.setBranch()
            this.setStudentYear()
        }
    }

    render() {
        let { modal } = this.props
        let { department, pieData, loadTime } = this.state

        return (
            <Fragment>
                <Modal className="modal-center" open={modal.modalOpen} onClose={this.closeModal}>
                    <ModalHeader className="tex-center">
                        <Header textAlign="center" as="h3">
                            จำนวนนักศึกษาทุกชั้นปี {department}
                        </Header>
                    </ModalHeader>
                    <ModalContent>
                        <ModalDescription>
                            <Grid columns={3}>
                                <Grid.Row columns={2}>
                                    <Grid.Column>
                                        <Card className="card-circle-modal">
                                            <Card.Content>
                                                <Piechart data={pieData} />
                                            </Card.Content>
                                        </Card>
                                    </Grid.Column>
                                    <Grid.Row columns={2}>
                                        <Grid.Column>
                                            <Card className="card-twin-modal">
                                                <Card.Content>
                                                    <Barchart />
                                                </Card.Content>
                                            </Card>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Card className="card-twin-modal">
                                                <Card.Content>
                                                    <Linechart />
                                                </Card.Content>
                                            </Card>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid.Row>
                            </Grid>
                        </ModalDescription>
                    </ModalContent>
                </Modal>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    modal: state.modal
})

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch(closeModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(SummaryModal)