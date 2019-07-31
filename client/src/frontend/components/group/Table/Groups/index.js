import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Table from "global/components/table/index";
import GroupRow from "./Row";

export default class GroupsTable extends PureComponent {
  static propTypes = {
    groups: PropTypes.array.isRequired
  };

  get groups() {
    return this.props.groups;
  }

  get pagination() {
    return this.props.pagination;
  }

  get onPageClick() {
    return this.props.onPageClick;
  }

  render() {
    return (
      <Table
        models={this.groups}
        pagination={this.pagination}
        rowComponent={GroupRow}
        onPageClick={this.onPageClick}
        countLabel={"Groups"}
      />
    );
  }
}