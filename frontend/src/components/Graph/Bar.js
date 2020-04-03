import React, { Component } from "react";

import { Bar } from 'react-chartjs-2';

// color
import * as color from '../Constant'

const stacked = {
  scales: {
    xAxes: [{
      stacked: true
    }],
    yAxes: [{
      stacked: true
    }]
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
          borderWidth: 1,
          hoverBackgroundColor: color.yellow,
          data: [65, 59, 80, 81]
        },
        {
          label: 'วิทยาฑัณฑ์',
          backgroundColor: color.grey + '75',
          borderWidth: 1,
          hoverBackgroundColor: color.grey,
          data: [6, 5, 8, 8]
        },
        {
          label: 'วิทยาฑัณฑ์2',
          backgroundColor: color.red + '75',
          borderWidth: 1,
          hoverBackgroundColor: color.red,
          data: [5, 9, 7, 1]
        }
      ]
    }
  }

  render() {
    let isStack = true
    return (
      <React.Fragment>
        <Bar data={this.state} options={isStack ? stacked : null} />
      </React.Fragment>
    );
  }
}

export default Barchart;
