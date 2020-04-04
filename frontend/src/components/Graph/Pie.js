import React, { Component } from "react";

import { Pie } from 'react-chartjs-2';

const option = {
	plugins: {
		// Change options for ALL labels of THIS CHART
		datalabels: {
			color: '#000000',
			anchor: 'center'
		}
	}
}

class Piechart extends Component {

	constructor(props) {
		super(props)
		this.state = {
			labels: ['Red', 'Blue'],
			datasets: [
				{
					data: [300, 50],
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
	}

	componentDidMount() {
		let { data } = this.props

		if (data.length !== 0) {
			this.setState(data)
		}
	}

	render() {
		let { data } = this.props

		return (
			<React.Fragment>
				<Pie data={data.length === 0 ? this.state : data} options={option} />
			</React.Fragment>
		);
	}
}

export default Piechart;
