import React, {PropTypes, Component} from 'react';
import classnames from 'classnames';
import HorizontalButtons from './horizontal-buttons';
import DropDownButtons from './dropdown-buttons';
import Link from './link';
import Media from './media';
import {_serialize} from './utils';
import tools from './tools';

export default class Editor extends Component {

  static propTypes = {
    id                              : PropTypes.string,
    className                       : PropTypes.string,
    html                            : PropTypes.string.isRequired,
    tools                           : PropTypes.array,
    closeOtherEditors               : PropTypes.bool,
    onClickEditableContentContainer : PropTypes.func
  };

  static defaultProps = {
    id        : '',
    className : '',
    html      : ''
  };

  constructor(props) {
    super(props);
    this.tools = this.getTools();


    this.state = {
      html               : this.props.html,
      active             : false,
      beaconSent         : false,
      activeDropDown     : -1,
      closeOtherDropDown : false
    };
  }

  componentWillReceiveProps() {
    if (!this.state.beaconSent) {
      this.setState({
        active : this.props.closeOtherEditors
      });
    }
  }

  getTools() {
    let propTool = this.props.tools;
    let customToolSet = [];

    if (propTool) {
      propTool.map(key => customToolSet.push(tools[key]));
      return customToolSet;
    }

    Object.keys(tools).map(key => customToolSet.push(tools[key]));
    return customToolSet;
  }

  handleExecCommand = (command, arg) => {
    let execCommand = document.execCommand(command, false, arg);
    this.refs.editor.focus();
    if (!execCommand) { // if there is no focus on the contentEditable element, this will return false, so setting focus manually
      this.refs.editor.focus();
      document.execCommand(command, false, arg);
    }
  };

  serialize = () => {
    return _serialize(this.refs.editor.innerHTML);
  };

  makeActive = () => {
    this.setState({
      active     : true,
      beaconSent : false
    }, () => {
      this.refs.editor.value = '';
      this.refs.editor.focus();
    });
  };

  handleOneDropDownActive = (cb) => {
    this.setState({
      closeOtherDropDown : false
    }, () => {
      cb();
    });
  };

  handleClickOnEditor = () => {
    if (!this.props.onClickEditableContentContainer) {
      this.makeActive();
    }
    this.setState({
      beaconSent : true
    }, () => {
      this.props.onClickEditableContentContainer(this.makeActive);
    });
    this.mouseDown = true;
  };

  handleClose = () => {
    this.setState({
      active : false
    });
  };

  handleFocus = () => {
    this.refs.editor.focus();
  };


  renderToolBar = () => {
    return this.tools.map((tool, index)=> {
      switch (tool.type) {
      case 'dropdown' :
        return (
          <DropDownButtons
            closeAll={this.onCloseAll}
            onFocus={this.handleFocus}
            tool={tool}
            onCloseOtherDropdowns={this.handleOneDropDownActive}
            closeOtherDropDown={this.state.closeOtherDropDown}
            onExecCommand={this.handleExecCommand}
          />
        );
      case 'link' :
        return (
          <Link
            onFocus={this.handleFocus}
            tool={tool}
            onExecCommand={this.handleExecCommand}
          />
        );
      case 'image':
      case 'video':
        return (
          <Media
            tool={tool}
            onClose={this.handleClose}
            onExecCommand={this.handleExecCommand}
          />);
      default :
        return (
          <HorizontalButtons
            tool={tool}
            onExecCommand={this.handleExecCommand}
          />
        );
      }
    });
  };


  render() {
    let classList = classnames('tool-bar-container', {
      active : this.state.active
    });
    return (
      <div
        className="editor-wrapper"
        ref='wrapper'
      >
        <div className={classList}>
          <ul
            className="tool-bar clearfix"
            style={{width : this.tools.length * 60}}
          >
            {this.renderToolBar()}
          </ul>
          <span className="caret-down"></span>
          <button
            className="close"
            onClick={this.handleClose}
          >
            <i className="fa fa-times"/>
          </button>
        </div>
        <div
          style={{overflow : 'auto'}}
          className={this.props.className}
          id={this.props.id}
          contentEditable="true"
          ref='editor'
          onFocus={this.handleClickOnEditor}
          onClick={this.handleClickOnEditor}
          dangerouslySetInnerHTML={{__html : this.state.html}}
        />
      </div>
    );
  }
}
