import React, { Component } from 'react'
// import ReactDOM from 'react-dom';
import SearchNewStudent from './SearchNewStudent'
import AddNewStudent from './AddNewStudent'
// import { Container, Menu } from 'semantic-ui-react'

// import axios from 'axios'

// import ApiManage from "../../Class/ApiManage";

import { Container, Nav,Tab} from 'react-bootstrap';

class Add_student extends Component {

	state = {
		key: 'SearchNewStudent',
		branch: []
	}

	handleSelect = (selectedtab) => {
		this.setState({ key: selectedtab });
	}

	render() {
	
		return (

			<React.Fragment>
				<Container className='contrain_css'>
					<h3 style={{ marginBottom: '5%' }}>จัดการข้อมูลนักศึกษารับเข้า</h3>

    

					<Tab.Container
						defaultActiveKey="SearchNewStudent">
						<Nav fill variant="tabs" activeKey={this.state.activeKey}
							onSelect={this.handleSelect} >
							<Nav.Item className={this.state.key==='SearchNewStudent' ? null: "Tab2"} >
								<Nav.Link
									eventKey="SearchNewStudent"
									className={this.state.key==='SearchNewStudent' ?  null: "Tab2-text"}
									>ดูข้อมูลนักศึกษารับเข้า</Nav.Link>
							</Nav.Item>
							<Nav.Item className={this.state.key==='SearchNewStudent' ? "Tab2" : null} >
								<Nav.Link
									eventKey="AddNewStudent" className={this.state.key==='SearchNewStudent' ? "Tab2-text" :null}>เพิ่มข้อมูลนักศึกษารับเข้า</Nav.Link>
							</Nav.Item>
						</Nav>
						<Tab.Content >
							<Tab.Pane
								eventKey="SearchNewStudent">
								<SearchNewStudent  />
							</Tab.Pane>
							<Tab.Pane
								eventKey="AddNewStudent">
								<AddNewStudent  />
							</Tab.Pane>
						</Tab.Content>
					</Tab.Container>


				</Container>
			</React.Fragment>
		)
	}
}
export default Add_student