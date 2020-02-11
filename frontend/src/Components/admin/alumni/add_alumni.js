import React from 'react'
import ReactDOM from 'react-dom';
import SearchAlumni from './SearchAlumni'
import AddAlumni from './AddAlumni'

import { Container, Nav, Row, Col, Tab, Button } from 'react-bootstrap';

class add_alumni extends React.Component {

	state = {
		key: 'SearchAlumni'
	}
	handleSelect = (selectedtab) => {
		this.setState({ key: selectedtab });
	}

	render() {
		return (
			<React.Fragment>
				<Container className='contrain_css'>
					<h3 style={{ marginBottom: '5%' }}>จัดการข้อมูลศิษย์เก่า</h3>
					<Tab.Container defaultActiveKey="SearchAlumni">
						<Nav fill variant="tabs" activeKey={this.state.activeKey}
							onSelect={this.handleSelect} >
							<Nav.Item >
								<Nav.Link
									eventKey="SearchAlumni">ดูข้อมูลศิษย์เก่า</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="AddAlumni" >เพิ่มข้อมูลศิษย์เก่า</Nav.Link>
							</Nav.Item>
						</Nav>

						<Tab.Content >
							<Tab.Pane eventKey="SearchAlumni">
								<SearchAlumni />
							</Tab.Pane>
							<Tab.Pane eventKey="AddAlumni">
								<AddAlumni />
							</Tab.Pane>
						</Tab.Content>
					</Tab.Container>


				
				</Container>

			</React.Fragment>

		)
	}
}

export default add_alumni