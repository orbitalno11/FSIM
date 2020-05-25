import React, { Component } from "react";
import { Row, Col } from 'react-bootstrap';

import { Bar } from 'react-chartjs-2';


import MediaQuery from 'react-responsive'
import { minDeviceWidth } from '../../Constant'

const option = {

  plugins: {
    // Change options for ALL labels of THIS CHART
    datalabels: {
      color: '#000000',
      anchor: 'end'
    }
  },
	legend: {
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
      anchor: 'end'
    }
  },
	legend: {
		labels: {
			fontSize: 8
		}
  },
  scales: {
    yAxes: [{
      ticks: {
        fontSize: 8
      }
    }],
    xAxes: [{
      ticks: {
        fontSize: 8
      }
    }]
  },
  layout: {
    fontSize: 8
  }
}

class Barchart extends Component {

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
    let { data, legend } = this.props
    return (
      <React.Fragment>
        <MediaQuery minDeviceWidth={minDeviceWidth}>
          <Row>
            <Col>
              {data !== undefined && <Bar data={data.length === 0 ? this.state : data} options={option} legend={legend} />}
            </Col>
          </Row>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={minDeviceWidth - 1}>
          <Row>
            <Col  xs={12} lg={4} md={4} sm={12}>
              {data !== undefined && <Bar data={data.length === 0 ? this.state : data} options={option_res} legend={legend} />}
            </Col>
          </Row>
        </MediaQuery>
      </React.Fragment>
    );
  }
}

export default Barchart;
