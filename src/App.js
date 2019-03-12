import React, { Component } from "react";
import styled from "@emotion/styled";
import Table from "./components/Table";
import { getSocket } from "./socket";

const USERNAME = "user1234";
const PASSWORD = "password1234";

const Container = styled("div")`
  display: flex;
  overflow-x: auto;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tables: {},
      tableIds: [],
    };
    this.initTableList = this.initTableList.bind(this);
    
    this.updateTable = this.updateTable.bind(this);
    this.removeTable = this.removeTable.bind(this);
    
    this.onTableAdded = this.onTableAdded.bind(this);
    this.onTableUpdated = this.onTableUpdated.bind(this);
    this.onTableRemoved = this.onTableRemoved.bind(this);

    this.onUpdateFailed = this.onUpdateFailed.bind(this);
    this.onRemovalFailed = this.onRemovalFailed.bind(this);
  }

  initTableList({ tables }) {
    this.setState({
      tables: tables.reduce((result, obj) => {
        result[obj.id] = obj;
        return result;
      }, {}),
      tableIds: tables.map((item) => item.id),
    });
  }

  onTableAdded({ after_id, table }) {
    console.log("onTableAdded");
    let position = this.state.tableIds.findIndex((e) => e === +after_id) + 1;
    let newTableIds = this.state.tableIds;
    newTableIds.splice(position, 0, +table.id);
    
    this.setState({
      tables: {
        ...this.state.tables,
        [table.id]: { ...table }
      },
      tableIds: newTableIds
    });
  }

  onTableUpdated({ table }) {
    console.log("onTableUpdated");
    this.setState({
      tables: {
        ...this.state.tables,
        [table.id]: { ...table },
      }
    });
  }

  onUpdateFailed({ id }) {
    console.log("onUpdateFailed");
    this.setState({
      tables: {
        ...this.state.tables,
        [id]: { ...this.state.tables[id].prev_version },
      }
    });
  }

  onTableRemoved({ id }) {
    console.log("onTableRemoved");
    this.setState({
      tables: {
        ...this.state.tables,
        [id]: { ...this.state.tables[id], deleted: true },
      }
    });
  }
  
  onRemovalFailed({ id }) {
    console.log("onRemovalFailed");
    this.setState({
      tables: {
        ...this.state.tables,
        [id]: { ...this.state.tables[id], deleted: false },
      }
    });
  }
  
  updateTable({ id, name, participants }) {
    this.setState({
      tables: {
        ...this.state.tables,
        [id]: { id, name, participants, prev_version: this.state.tables[id] },
      }
    });

    const socket = getSocket();
    socket.send({
      $type: "update_table",
      table: {
        id,
        name,
        participants,
      }
    });
  }

  removeTable({ id }) {
    this.setState({
      tables: {
        ...this.state.tables,
        [id]: { ...this.state.tables[id], deleted: true },
      }
    });

    const socket = getSocket();
    socket.send({
      $type: "remove_table",
      id: id,
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

      socket.onMessageType("table_list", this.initTableList);
      socket.onMessageType("table_added", this.onTableAdded);

      socket.onMessageType("table_updated", this.onTableUpdated);
      socket.onMessageType("update_failed", this.onUpdateFailed);
      
      socket.onMessageType("removal_failed", this.onRemovalFailed);

      socket.send({
        $type: "login",
        username: USERNAME,
        password: PASSWORD
      });
    });
  }

  render() {
    const { tableIds, tables } = this.state;
    const activeTables = tableIds.filter(
      (id) => tables[id] && !tables[id].deleted
    );
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
