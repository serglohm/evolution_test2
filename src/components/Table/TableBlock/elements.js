import styled from "@emotion/styled";
import emptySeatImage from "../../../images/empty.png";
import busySeatImage from "../../../images/busy.png";

export const TableName = styled("div")`
  font-size: 16;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: #085c6f;
  height: 60px;
  overflow: hidden;
`;

export const ParticipantsBlock = styled("div")`
  width: 120px;
  background-color: #37a0b9;
  box-shadow: inset 1px 1px 5px;
  display: inline-table;
  padding: 5px;
`;

const Seat = styled("div")`
  width: 16px;
  height: 16px;
  margin: 2px;
  display: inline-block;
`;

export const EmptySeat = styled(Seat)`
  background-image: url(${emptySeatImage});
`;

export const BusySeat = styled(Seat)`
  background-image: url(${busySeatImage});
`;
