import React, { Component } from "react";
import styled from "@emotion/styled";
import Table from "./components/Table";
import { getSocket } from "./socket";
import _ from "lodash";

const Container = styled("div")`
  display: inline-flex;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tables: {},
      tableIds: [],
    };
    this.setTablesList = this.setTablesList.bind(this);
    this.updateTable = this.updateTable.bind(this);
    this.removeTable = this.removeTable.bind(this);
  }

  setTablesList({ tables }) {
    this.setState({
      tables: _.mapKeys(tables, (v, k) => v.id),
      tableIds: tables.map((item) => item.id),
    });
  }

  updateTable({ id, name, participants }) {
    this.setState({
      tables: {
        ...this.state.tables,
        [id]: { id, name, participants },
      },
    });
  }

  removeTable({ id }) {
    this.setState({
      tables: {
        ...this.state.tables,
        [id]: { deleted: true },
      },
    });
  }

  componentDidMount() {
    const socket = getSocket();
    socket.onConnect(() => {
      socket.onMessageType("login_successful", () => {
        socket.send({
          $type: "subscribe_tables",
        });
      });
      socket.onMessageType("table_list", this.setTablesList);
      socket.send({
        $type: "login",
        username: "user1234",
        password: "password1234",
      });
    });
  }

  render() {
    const { tableIds, tables } = this.state;
    const activeTables = tableIds.filter((id) => !tables[id].deleted);
    return (
      <Container>
        {activeTables.map((id) => (
          <Table
            key={id}
            update={this.updateTable}
            remove={this.removeTable}
            {...tables[id]}
          />
        ))}
      </Container>
    );
  }
}

export default App;
