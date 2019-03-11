import React, { Component } from 'react';
import styled from '@emotion/styled';
import Table from './components/Table';
import { getSocket } from './socket';

const Container = styled('div')`
  display: inline-flex;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tables: {},
      tableIds: []
    };
    this.setTablesList = this.setTablesList.bind(this);
    this.updateTable = this.updateTable.bind(this);
    this.removeTable = this.removeTable.bind(this);
    this.onTableUpdated = this.onTableUpdated.bind(this);
  }

  setTablesList({ tables }) {
    this.setState({
      tables: tables.reduce(function(result, obj) {
        result[obj.id] = obj;
        return result;
      }, {}),
      tableIds: tables.map((item) => item.id)
    });
  }

  onTableUpdated({ table }) {
    this.setState({
      tables: {
        ...this.state.tables,
        [table.id]: {...table}
      }
    });
  }

  updateTable({ id, name, participants }) {
    this.setState({
      tables: {
        ...this.state.tables,
        [id]: {id, name, participants}
      }
    });
    const socket = getSocket();
    socket.send({
      $type: "update_table",
      table: {
        id,
        name,
        participants
      }
    });
  }

  removeTable({ id }) {
    this.setState({
      tables: {
        ...this.state.tables,
        [id]: {deleted: true}
      }
    });
    const socket = getSocket();
    socket.send({
      $type: "remove_table",
      id: id
    });
  }

  componentDidMount() {
    const socket = getSocket();
    socket.onConnect(() => {
      socket.onMessageType("login_successful", () => {
        socket.send({
          $type: "subscribe_tables"
        });
      });
      socket.onMessageType("table_list", this.setTablesList);
      socket.onMessageType("table_updated", this.onTableUpdated);
      socket.send({
        $type: "login",
        username: "user1234",
        password: "password1234"
      });
    });
  }

  render() {
    return (
      <Container>
        {this.state.tableIds.filter((id) => this.state.tables[id] && !this.state.tables[id].deleted).map(
            (id) => (<Table 
                  key={id}
                  {...this.state.tables[id]}
                  update={this.updateTable}
                  remove={this.removeTable}
                />
            )
          )}
      </Container>
    );
  }
}

export default App;
