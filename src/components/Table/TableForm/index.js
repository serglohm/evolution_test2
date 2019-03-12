import React, { Component } from "react";
import { generateSeats, SEATS_COUNT } from "../utils";
import { FormLabel, FormSelect, FormInput, FormButton } from "./elements";
import TableContainer from "../TableContainer";

const SEATS = [...generateSeats(SEATS_COUNT)];

class TableForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      participants: this.props.participants,
    };
    this.onNameChange = this.onNameChange.bind(this);
    this.onParticipantsChange = this.onParticipantsChange.bind(this);
  }

  onNameChange(e) {
    this.setState({ name: e.target.value });
  }

  onParticipantsChange(e) {
    this.setState({ participants: e.target.value });
  }

  render() {
    return (
      <TableContainer>
        <FormInput value={this.state.name} onChange={this.onNameChange} />

        <FormLabel>
          Participants:
          <FormSelect
            onChange={this.onParticipantsChange}
            defaultValue={this.props.participants}
          >
            {SEATS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </FormSelect>
        </FormLabel>

        <FormButton onClick={this.props.onClose}>Close</FormButton>
        <FormButton
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            const { name, participants } = this.state;
            this.props.onSave({ name, participants });
          }}
        >
          Save
        </FormButton>
        <FormButton
          onClick={(e) => {
            e.preventDefault();
            const { id } = this.state;
            this.props.onRemove({ id });
          }}
        >
          Remove
        </FormButton>
      </TableContainer>
    );
  }
}

export default TableForm;
