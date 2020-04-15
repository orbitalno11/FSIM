import React, { Component } from "react";

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
				{data !== undefined && <Pie data={data.length === 0 ? this.state : data} options={option} height={height !== null && height} width={width !== null && width} />}
			</React.Fragment>
		);
	}
}

export default Piechart;
