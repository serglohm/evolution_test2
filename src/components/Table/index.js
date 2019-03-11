import React, { Component } from "react";
import TableForm from "./TableForm";
import TableBlock from "./TableBlock";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
    };
    this.startEdit = this.startEdit.bind(this);

    this.stopEdit = this.stopEdit.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  startEdit() {
    this.setState({ isEdit: true });
  }

  stopEdit() {
    this.setState({ isEdit: false });
  }

  onSave({ name, participants }) {
    const { id } = this.props;
    this.props.update({ id, name, participants });
    this.setState({ isEdit: false });
  }

  onRemove() {
    const { id } = this.props;
    this.props.remove({ id });
    this.setState({ isEdit: false });
  }

  render() {
    const { isEdit } = this.state;
    const { name, participants } = this.props;
    if (isEdit) {
      return (
        <TableForm
          {...this.props}
          onClose={this.stopEdit}
          onSave={this.onSave}
          onRemove={this.onRemove}
        />
      );
    }
    return (
      <TableBlock
        onClick={this.startEdit}
        name={name}
        participants={participants}
      />
    );
  }
}

export default Table;
