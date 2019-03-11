import React, { Component } from 'react';
import styled from '@emotion/styled';
import empty_seat_image from '../images/empty.png';
import busy_seat_image from '../images/busy.png';

const TableBlock = styled('div')`
  width: 200px;
  height: 110px;
  background-color: #39d6ff;
  margin: 5px;
  display: inline-block;
  border-radius: 20px;
  -moz-border-radius: 20px;
  -webkit-border-radius: 20px;
  box-shadow: 0px 2px 5px;
  padding: 15px;
`;

const TableName = styled('div')`
  font-size: 16;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: #085C6F;
  height: 60px;
  overflow: hidden;
`
const ParticipantsBlock = styled('div')`
  width: 120px;
  background-color: #649eb7;
  box-shadow: inset 1px 1px 5px;
  display: inline-table;
  padding: 5px;
`
const Seat = styled('div')`
  width: 20px;
  height: 20px;
  margin: 0px;
  display: inline-block;
`

const EmptySeat = styled(Seat)`
  background-image: url(${empty_seat_image});
`

const BusySeat = styled(Seat)`
  background-image: url(${busy_seat_image});
`
const FormLabel = styled('div')`
font-size: 14px;
font-family: Verdana, Geneva, Tahoma, sans-serif;
color: #085C6F;
padding: 0px 3px;
`

const FormInput = styled('input')`
  font-size: 14px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  padding: 3px;
  margin: 3px;    
`;

const FormSelect = styled('select')`
  font-size: 14px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  padding: 3px;
  margin: 3px;    
`;

class TableForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: this.props.name,
      participants: this.props.participants
    }
    this.onNameChange = this.onNameChange.bind(this)
    this.onParticipantsChange = this.onParticipantsChange.bind(this)
  }

  onNameChange(e) {
    this.setState({name: e.target.value});
  }
  
  onParticipantsChange(e) {
    this.setState({participants: e.target.value})
  }

  render(){        
    return (
      <TableBlock>
        <FormInput type="text" value={this.state.name} onChange={this.onNameChange} />
        
        <FormLabel>Participants:
          <FormSelect onChange={this.onParticipantsChange} defaultValue={this.props.participants}>
          {[...generateSeats(SEATS_COUNT)].map((item) => <option key={item} value={item}>{item}</option>)}
          </FormSelect>
        </FormLabel>

        <FormInput type="button" value="Close" onClick={this.props.editOnClose} />
        <FormInput type="button" value="Save" onClick={(e) => {
          e.preventDefault();
            const { name, participants } = this.state;
            this.props.editOnSave({name, participants});
          }} />
        <FormInput type="button" value="Remove" onClick={(e) => {
          e.preventDefault();
            const { id } = this.state;
            this.props.editOnRemove({id});
          }} />
      </TableBlock>
    )
  }
}
 

const SEATS_COUNT = 12;

function* generateSeats(count) {
  for (let i = 1; i <= count; i++) yield i;
}

class Table extends Component {
  constructor(props){
    super(props);
    this.state = {
      isEdit: false
    }
    this.onTableClick = this.onTableClick.bind(this);
    
    this.editOnClose = this.editOnClose.bind(this);
    this.editOnSave = this.editOnSave.bind(this);
    this.editOnRemove = this.editOnRemove.bind(this);
  }

  onTableClick(){
    this.setState({isEdit: true});
  }

  editOnClose(){
    this.setState({isEdit: false});
  }
  
  editOnSave({name, participants}) {
    const { id } = this.props;
    this.props.update({id, name, participants});
    this.setState({isEdit: false});
  }

  editOnRemove(){
    const { id } = this.props;
    this.props.remove({id});
    this.setState({isEdit: false});
  }

  render(){        
      return (
        this.state.isEdit ? <TableForm {...this.props} editOnClose={this.editOnClose} editOnSave={this.editOnSave} editOnRemove={this.editOnRemove} /> : 
        <TableBlock onClick={this.onTableClick}>
          <TableName>{this.props.name}</TableName>
          <ParticipantsBlock>
            {[...generateSeats(SEATS_COUNT)].map((item, i) => i < this.props.participants ? <BusySeat key={i} /> : <EmptySeat key={i} />)}
          </ParticipantsBlock>
        </TableBlock>
      )
  }
}

export default Table;