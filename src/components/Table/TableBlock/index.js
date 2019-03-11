import React, { Component } from "react";
import { generateSeats, SEATS_COUNT } from "../utils";
import { TableName, ParticipantsBlock, EmptySeat, BusySeat } from "./elements";
import TableContainer from "../TableContainer";

const SEATS = [...generateSeats(SEATS_COUNT)];

class Table extends Component {
  render() {
    const { onClick, name, participants } = this.props;
    return (
      <TableContainer onClick={onClick}>
        <TableName>{name}</TableName>
        <ParticipantsBlock>
          {SEATS.map((_, i) => {
            const Seat = i < participants ? BusySeat : EmptySeat;
            return <Seat key={i} />;
          })}
        </ParticipantsBlock>
      </TableContainer>
    );
  }
}

export default Table;
