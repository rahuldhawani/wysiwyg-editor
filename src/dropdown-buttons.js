import React, {PropTypes, Component} from 'react';
import classnames from 'classnames';

export default class DropDownButtons extends Component {
  static propTypes = {
    tool                  : PropTypes.object.isRequired,
    onFocus               : PropTypes.func.isRequired,
    onExecCommand         : PropTypes.func.isRequired,
    onCloseOtherDropdowns : PropTypes.func.isRequired,
    closeOtherDropdowns   : PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      dropdownVisible : false,
      beaconSent      : false
    };
  }

  componentWillReceiveProps() {
    if (!this.state.beaconSent) {
      this.setState({
        dropdownVisible : this.props.closeOtherDropDown
      });
    }
  }

  makeActive = () => {
    this.setState({
      dropdownVisible : true,
      beaconSent      : false
    });
  };


  handleDropdownVisibility = () => {
    this.setState({
      beaconSent : true
    }, () => {
      this.props.onCloseOtherDropdowns(this.makeActive);
    });
    this.setState({
      dropdownVisible : !this.state.dropdownVisible
    });
  };

  handleClick = (command, o) => {
    this.props.onExecCommand(command, o);
    this.closeDropdown();
  };

  closeDropdown = () => {
    this.setState({
      dropdownVisible : false
    });

  };

  renderFaTitle = (o) => {
    return <i className={'fa fa-' + o}/>;
  };

  renderMoreOptions(options, tool) {
    return options.map((o, index)=> {
      let command = typeof tool.command === 'object' ? tool.command[index] : tool.command;
      let arg = tool.args ? tool.args[index] : tool.args;

      return (
        <li
          onClick={this.handleClick.bind(this, command, arg)}
          className="dropdown-tool-list"
        >
          <button
            className="dropdown-tool"
          >
            {tool.titleType === 'fa' ? this.renderFaTitle(o) : o}
          </button>
        </li>
      );
    });
  }

  render() {
    let tool = this.props.tool;
    let options = tool.titles;
    let classList = classnames('more-options-container', {
      visible : this.state.dropdownVisible
    });

    return (
      <li
        className="tool-list"
        key={tool.title}
      >
        <button
          className="tool tooltiped tooltiped--above "
          onClick={this.handleDropdownVisibility}
          data-title={tool.name}
        >
          <i className={'fa fa-' + tool.fa}></i>
        </button>
        <ul className={classList}>
          {this.renderMoreOptions(options, tool)}
        </ul>
      </li>
    );
  }
}
