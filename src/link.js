import React, {PropTypes, Component} from 'react';
import classnames from 'classnames';
import {saveSelection, restoreSelection, pasteHtmlAtCaret} from './utils'

export default class Link extends Component {
  static propTypes = {
    tool          : PropTypes.object.isRequired,
    onFocus       : PropTypes.func.isRequired,
    onExecCommand : PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      coverVisible : false,
      view         : 'link',
      selection    : [],
      targetBlank  : false
    }
  }

  handleCoverVisibility = () => {
    let temp = this.state.selection;
    let selection = saveSelection();
    this.setState({
      selection    : selection
    },()=> {
      this.refs.inputFormDescription.value = this.state.selection;
    });

    this.setState({
      coverVisible : !this.state.coverVisible,
      view         : 'link'
    }, () => {
      this.refs.inputForm.focus();
    });
    this.refs.inputForm.value = '';
  };

  handleLinkSubmit = () => {
    this.setState({
      view : 'description'
    }, () => {
      this.refs.inputFormDescription.focus();
    });
  };


  handleDescSubmit = (command) => {
    let inputLink = this.refs.inputForm.value;
    let inputDesc = this.refs.inputFormDescription.value;
    console.log(inputLink, inputDesc);

    restoreSelection(this.state.selection);

    let html = this.state.targetBlank ? `<a href="${inputLink}" target="_blank">${inputDesc}</a>` :`<a href="${inputLink}">${inputDesc}</a>`;


    pasteHtmlAtCaret(html, this.state.selection);

    this.props.onFocus();

    this.handleCoverVisibility();

  };

  handleCancel = () => {
    this.setState({
      coverVisible : !this.state.coverVisible
    })
  };

  handleTarget = () => {
    this.setState({
      targetBlank : !this.state.targetBlank
    });
  };


  render() {
    let tool = this.props.tool;
    let classList = classnames('cover', {
      visible : this.state.coverVisible
    });
    let classListLink = classnames('link', {
      visible : this.state.view === 'link'
    });
    let classListDescription = classnames('description', {
      visible : this.state.view === 'description'
    });
    let classListTarget = classnames('target action tooltiped tooltiped--above', {
      blank : this.state.targetBlank
    });

    return (
      <li
        className="tool-list"
        key={tool.title}
      >
        <button
          className="tool tooltiped tooltiped--above"
          data-title={tool.name}
          onClick={this.handleCoverVisibility}
        >
          <i className={'fa fa-' + tool.fa}></i>
        </button>
        <div className={classList}>
          <div className={classListLink}>
          <input
            className="input-form input-form--link"
            ref="inputForm"
            type="text"
            placeholder="Paste or type your link here"
          />
          <div className="actions">
            <button
              className="submit action tooltiped tooltiped--above"
              data-title='Insert'
              onClick={this.handleCover}
              onClick={this.handleLinkSubmit}
            >
              <i className="fa fa-arrow-right"/>
            </button>
            <button
              className={classListTarget}
              data-title='Open in new tab'
              onClick={this.handleTarget}
            >
              <i className="fa fa-external-link"/>
            </button>
            <button
              className="cancel action tooltiped tooltiped--above"
              data-title='Cancel'
              onClick={this.handleCancel}
            >
              <i className="fa fa-times"/>
            </button>
          </div>
            </div>
          <div className={classListDescription}>
          <input
            className="input-form input-form--description"
            ref="inputFormDescription"
            type="text"
            placeholder="Text for link"
          />
          <div className="actions">
            <button
              className="submit action tooltiped tooltiped--above"
              data-title='Insert'
              onClick={this.handleDescSubmit.bind(this, tool.command)}
            >
              <i className="fa fa-check"/>
            </button>
            <button
              className="cancel action tooltiped tooltiped--above"
              data-title='Cancel'
              onClick={this.handleCancel}
            >
              <i className="fa fa-times"/>
            </button>
          </div>
            </div>
        </div>
      </li>
    );
  }
}
