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
            pieData: [],
            barData: []
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

        for (let i in branch) {
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

        // get sub label for check data
        let sub_label = []
        let cur_size = 0
        for (let i in byYear) {
            let data = byYear[i]
            let key = Object.keys(data)

            let year = 'ชั้นปีที่ ' + data.education_year
            label.push(year)

            if (key.length > cur_size) {
                cur_size = key.length
                sub_label = key
            }
        }

        sub_label.pop()

        for (let i in sub_label){
            let inner = {
                label: sub_label[i],
                data: []
            }
            dataset.push(inner)
        }

        for(let i in byYear){
            let data = byYear[i]
            let key = Object.keys(data)
            key.pop()


            for(let j in sub_label){
                if (key[j] === undefined){
                    // console.log(`Status: ${sub_label[j]}: null`)
                    dataset[j].data.push(0)
                    continue
                }
                // console.log(`Status: ${sub_label[j]}: ${data[key[j]]}`)
                dataset[j].data.push(parseInt(data[key[j]]))
            }
        }

        dataset[0].backgroundColor = '#ffd11075'
        dataset[1].backgroundColor = '#FF461275'
        dataset[2].backgroundColor = '#91919175'

        // console.log(dataset)

        this.setState({
            barData: {
                labels: label,
                datasets: dataset
            }
        })

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
        let { department, pieData, barData } = this.state

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
                                                    <Barchart data={barData} isStack={true} />
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