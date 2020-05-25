import React, { Component } from "react";
import { Row, Col } from 'react-bootstrap';

import MediaQuery from 'react-responsive'
import { minDeviceWidth } from '../../Constant'
import { Pie } from 'react-chartjs-2';

const option = {
	plugins: {
		// Change options for ALL labels of THIS CHART
		datalabels: {
			color: '#000000',
			anchor: 'center'
		}
	},
	legend: {
		position: 'right',
		labels: {
			fontSize: 12
		}
	}
}

const option_res = {
	plugins: {
		// Change options for ALL labels of THIS CHART
		datalabels: {
			color: '#000000',
			anchor: 'center'
		}
	},
	legend: {
		position: 'right',
		labels: {
			fontSize: 8
		}
	},
	scales: {
		yAxes: [{
		  display: false,
		}],
		xAxes: [{
		  ticks: {
			display: false //this will remove only the label
		  }
		}]
	  }
}

class Piechart extends Component {

	constructor(props) {
		super(props)
		this.state = {
			labels: [],
			datasets: []
		}
	}

	componentDidMount() {
		let { data } = this.props

		if (data !== undefined) {
			if (data.length !== 0) {
				this.setState(data)
			}
		}

	}

	render() {
		let { data, height, width } = this.props

		return (
			<React.Fragment>
				<MediaQuery minDeviceWidth={minDeviceWidth}>
					<Row>
						<Col>
							{data !== undefined && <Pie data={data.length === 0 ? this.state : data} options={option} height={height !== null && height} width={width !== null && width} />}
						</Col>
					</Row>
				</MediaQuery>
				<MediaQuery maxDeviceWidth={minDeviceWidth - 1}>
					<Row>
						<Col xs={12} lg={4} md={4} sm={12}>
							{data !== undefined && <Pie data={data.length === 0 ? this.state : data} options={option_res} height={height !== null && height} width={width !== null && width} />}
						</Col>
					</Row>
				</MediaQuery>
			</React.Fragment>
		);
	}
}

export default Piechart;
