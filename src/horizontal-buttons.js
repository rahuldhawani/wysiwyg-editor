import React, {PropTypes, Component} from 'react';

export default class HorizontalButtons extends Component {
  static propTypes = {
    tool          : PropTypes.object.isRequired,
    onExecCommand : PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      toolsDOM : {}
    };
  }

  handleClick = (tool) => {
    this.props.onExecCommand(tool.command, tool.args);
  };

  render() {
    let tool = this.props.tool;
    return (
      <li
        className="tool-list"
        key={tool.title}
      >
        <button
          className="tool tooltiped tooltiped--above "
          data-title={tool.name}
          onClick={this.handleClick.bind(this, tool)}
        >
          <i className={'fa fa-' + tool.fa}></i>
        </button>
      </li>
    );
  }
}
