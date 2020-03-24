import React, { Component } from "react";
import { Form, Input } from 'semantic-ui-react-form-validator';
import { Label } from 'semantic-ui-react';
import { Button, Col, Row } from 'react-bootstrap';
import { FaCloundUpdateAlt } from 'react-icons/fa';
import Year from '../Options/Year';
import Admission_channel from '../Options/Admission_channel';
import Project from '../Options/Project';

import ApiManage from '../../../Class/ApiManage';

class AddNewStudent extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      
    }
  }
}