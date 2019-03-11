import styled from "@emotion/styled";
import empty_seat_image from "../../../images/empty.png";
import busy_seat_image from "../../../images/busy.png";

export const TableName = styled("div")`
  font-size: 16;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: #085c6f;
  height: 60px;
  overflow: hidden;
`;
export const ParticipantsBlock = styled("div")`
  width: 120px;
  background-color: #649eb7;
  box-shadow: inset 1px 1px 5px;
  display: inline-table;
  padding: 5px;
`;

const Seat = styled("div")`
  width: 20px;
  height: 20px;
  margin: 0px;
  display: inline-block;
`;

export const EmptySeat = styled(Seat)`
  background-image: url(${empty_seat_image});
`;

export const BusySeat = styled(Seat)`
  background-image: url(${busy_seat_image});
`;
