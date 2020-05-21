import React, { Fragment } from 'react'

import { Header } from 'semantic-ui-react'

import { Col, Form, FormControl } from 'react-bootstrap'

import MediaQuery from 'react-responsive'

import { minDeviceWidth } from '../Constant'

export default ({ yearList, selectedYear, title, onSelectYear }) => (
    <Fragment>
        <Header as="h3" align='center'>
            <MediaQuery minWidth={minDeviceWidth}>
                <Form.Row>
                    <Col className="text-right">
                        <Form.Label>{title}</Form.Label>
                    </Col>
                    <Col className="text-left">
                        <FormControl as="select" custom defaultValue={selectedYear} onChange={onSelectYear} className="w-50">
                            {
                                yearList !== null && (
                                    yearList.map(item => (
                                        <option key={item} value={item}>{item}</option>
                                    ))
                                )
                            }
                        </FormControl>
                    </Col>
                </Form.Row>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={minDeviceWidth - 1}>
                <Form.Row>
                    <Col xs={12} className="text-center">
                        <Form.Label>{title}</Form.Label>
                    </Col>
                    <Col xs={12} className="text-left">
                        <FormControl as="select" custom defaultValue={selectedYear} onChange={onSelectYear} className="w-100">
                            {
                                yearList !== null && (
                                    yearList.map(item => (
                                        <option key={item} value={item}>{item}</option>
                                    ))
                                )
                            }
                        </FormControl>
                    </Col>
                </Form.Row>
            </MediaQuery>
        </Header>
        <hr />
    </Fragment>
)