import React, { Component } from "react";

import {Line} from 'react-chartjs-2';

class Linechart extends Component {
  
    render() {
        return (
            <React.Fragment>
              {
                this.props.data !== undefined ?<Line data={this.props.data} legend={ this.props.legend  } />:null
              }
            

            </React.Fragment>
        );
    }
}

export default Linechart;
