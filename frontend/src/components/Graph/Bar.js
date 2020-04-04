import React, { Component } from "react";

import { Bar } from 'react-chartjs-2';

// color
import * as color from '../Constant'

const option = {
  //////// Don't delete this
  // scales: {
  //   xAxes: [{
  //     stacked: true
  //   }],
  //   yAxes: [{
  //     stacked: true
  //   }]
  // },


  plugins: {
    // Change options for ALL labels of THIS CHART
    datalabels: {
      color: '#000000',
      anchor: 'end'
    }
  }
}

class Barchart extends Component {

  constructor(props) {
    super(props)
    this.state = {
      labels: ['ปี 1', 'ปี 2', 'ปี 3', 'ปี 4'],
      datasets: [
        {
          label: 'ปกติ',
          backgroundColor: color.yellow + '75',
          // borderWidth: 1,
          // hoverBackgroundColor: color.yellow,
          data: [65, 59, 80, 81]
        },
        {
          label: 'วิทยาฑัณฑ์',
          backgroundColor: color.grey + '75',
          // borderWidth: 1,
          // hoverBackgroundColor: color.grey,
          data: [6, 5, 8, 8]
        },
        {
          label: 'วิทยาฑัณฑ์2',
          backgroundColor: color.red + '75',
          // borderWidth: 1,
          // hoverBackgroundColor: color.red,
          data: [5, 9, 7, 1]
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
    let { data, isStack } = this.props
    return (
      <React.Fragment>
        <Bar data={data.length === 0 ? this.state : data} options={option} />
      </React.Fragment>
    );
  }
}

export default Barchart;
