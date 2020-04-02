import React, { Component } from "react";

import { Pie } from 'react-chartjs-2';


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

	render() {
		let { data } = this.state
		console.log(data)
		return (
			<React.Fragment>
				<Pie data={this.state} />
			</React.Fragment>
		);
	}
}

export default Piechart;
