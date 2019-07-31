import React from "react";
import PropTypes from "prop-types";
import Utility from "global/components/utility";

export default class NestedLink extends React.PureComponent {
  static propTypes = {};

  get nestedLinkArrowClassNames() {
    return "table__nested-link-arrow";
  }

  get nestedLinkClassNames() {
    return "table__nested-link";
  }

  get nestedLink() {
    return this.props.link;
  }

  render() {
    return (
      <a className={this.nestedLinkClassNames} href={this.nestedLink}>
        <span>{this.props.children}</span>
        <Utility.IconComposer
          icon="arrowRight16"
          size={14}
          iconClass={this.nestedLinkArrowClassNames}
        />
      </a>
    );
  }
}