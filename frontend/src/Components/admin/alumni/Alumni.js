import React from 'react'
// import ReactDOM from 'react-dom';
import SearchAlumni from './SearchAlumni'
import AddAlumni from './AddAlumni'

import { Container, Nav, Tab } from 'react-bootstrap';

class Alumni extends React.Component {

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
							<Nav.Item className={this.state.key==='SearchAlumni' ? null: "Tab2"} >
								<Nav.Link
									eventKey="SearchAlumni" className={this.state.key==='SearchAlumni' ?  null: "Tab2-text"} >ดูข้อมูลศิษย์เก่า</Nav.Link>
							</Nav.Item>
							<Nav.Item className={this.state.key==='SearchAlumni' ? "Tab2" : null} >
								<Nav.Link eventKey="AddAlumni" className={this.state.key==='SearchAlumni' ? "Tab2-text" : null}  >เพิ่มข้อมูลศิษย์เก่า</Nav.Link>
							</Nav.Item>
						</Nav>

						<Tab.Content className='TabContent' >
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

export default Alumni