import React, { Component } from 'react'
import {
    Button,
    Icon,
    Grid,
    Divider,
    Segment,
    
} from "semantic-ui-react";



class setButton extends Component {


    render() {
        return (
            <React.Fragment >
              
                <Grid columns={2} relaxed='very' style={{ marginTop: '5%' }} divided>
                    <Grid.Column  width={6}  verticalAlign='middle' textAlign='right' >
                        <Button size='huge' className="Tab2-text btn-EditData"   style={{fontSize:'18px',width:'200px'}}>
                      <Icon name="add user" ></Icon>   {this.props.item.name}
                    </Button>

                    </Grid.Column>

                    <Grid.Column  verticalAlign='middle' width={10} textAlign='left'>
                        {this.props.item.detail}
                    </Grid.Column>
                   
                  
                </Grid>
               
               
            </React.Fragment >
        );
    }
}

export default setButton;