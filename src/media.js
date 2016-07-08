import React, {PropTypes, Component} from 'react';
import classnames from 'classnames';
import {saveSelection, restoreSelection, pasteHtmlAtCaret, isSelectionFromThisEditor} from './utils';
import Dropzone from 'react-dropzone';
import ReactDOM from 'react-dom';
import Image from './image';
import Video from './video';
import {getDataUri, videoUrl} from './utils';

export default class Media extends Component {
  static propTypes = {
    tool          : PropTypes.object.isRequired,
    onClose       : PropTypes.func.isRequired,
    onExecCommand : PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.counter = 1;
    this.parentEditorWrapper = {};
    this.state = {
      coverVisible : false,
      view         : this.props.tool.type === 'image' ? 'dropzone' : 'link',
      selection    : []
    };
  }

  handleCoverVisibility = () => {
    let temp = this.state.selection;
    let selection = saveSelection();
    this.setState({
      selection    : selection,
      coverVisible : !this.state.coverVisible,
      view         : this.props.tool.type === 'image' ? 'dropzone' : 'link'
    }, () => {
      console.log('final selection');
      console.log(this.state.selection);
      this.refs.inputFormLinkImage.focus();
    });

    this.getParentEditorElement();

    if (!isSelectionFromThisEditor(selection, this.parentEditorWrapper)) {
      this.setState({
        selection : temp
      }, () => {
        console.log('final selection');
        console.log(this.state.selection);
      });
    }
  };

  getParentEditorElement() {
    if (!this.parentEditorWrapper.length) {
      let el = ReactDOM.findDOMNode(this);
      let flag = true;

      while (flag) {
        console.log(el.classList);
        if (!el.classList.contains('editor-wrapper')) {
          el = el.parentElement;
          continue;
        }
        flag = false;
      }
      this.parentEditorWrapper = el;
      console.log(this.parentEditorWrapper);
    }
  }


  handleLinkChange = () => {
    this.setState({
      view : 'link'
    }, () => {
      this.refs.inputFormLinkImage.focus();
    });
  };

  handleLinkSubmit = () => {
    let inputLink = this.refs.inputFormLinkImage.value;
    if (this.props.tool.type === 'video') {
      inputLink = videoUrl(inputLink);
    }
    this.insertMedia(inputLink, 'editor media');
  };
  handleDelete = (id) => {
    console.log('deleting');
    let elem = document.querySelector(`[data-${this.props.tool.type}id='${id}']`);
    ReactDOM.unmountComponentAtNode(elem);
    elem.parentNode.removeChild(elem);
  };

  insertMedia = (url, name) => {
    console.log('before:' + this.counter);
    console.log(this.state.selection);
    restoreSelection(this.state.selection);
    let html;
    if (this.props.tool.type === 'video') {
      html = `<span class="media-video" style="display: block; text-align: center; float: none;" id="${this.props.tool.type}${this.counter}" data-${this.props.tool.type}id="${this.counter}"></span>`;
    } else {
      html = `<span class="media-image" id="${this.props.tool.type}${this.counter}" data-${this.props.tool.type}id="${this.counter}"></span>`;
    }

    if (this.state.selection && !this.state.selection.length) {
      console.log(this.parentEditorWrapper);
      this.parentEditorWrapper.innerHTML += html;
    }

    pasteHtmlAtCaret(html, this.state.selection);

    if (this.props.tool.type === 'image') {
      ReactDOM.render(
        <Image
          src={url}
          alt={name}
          imageId={this.counter}
          onClickClose={this.props.onClose}
          onDelete={this.handleDelete}
        />, document.getElementById(`${this.props.tool.type}${this.counter++}`));
      console.log('after:' + this.counter);
    } else {
      ReactDOM.render(
        <Video
          src={url}
          videoId={this.counter}
          onClickClose={this.props.onClose}
          onDelete={this.handleDelete}
        />, document.getElementById(`${this.props.tool.type}${this.counter++}`));
    }

    this.handleCoverVisibility();
    this.props.onClose();
  };

  handleCancel = () => {
    this.setState({
      coverVisible : !this.state.coverVisible
    });
  };

  handleDrop = (files) => {
    let file = files[files.length - 1];

    if (file.type.indexOf('image') >= 0) {
      getDataUri(file, this.insertMedia);
    }
  };


  render() {
    let tool = this.props.tool;
    let classList = classnames('cover', {
      visible : this.state.coverVisible
    });
    let classListDropzone = classnames('drop-zone-container', {
      visible : this.state.view === 'dropzone'
    });
    let classListLink = classnames('link', {
      visible : this.state.view === 'link'
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
          <div className={classListDropzone}>
            <Dropzone
              className='drop-zone'
              onDrop={this.handleDrop}
              accept="image/*"
            >
              <div>Drop images here, or click to select files to upload.</div>
            </Dropzone>
            <div className="actions">

              <button
                className="link-form action tooltiped tooltiped--above"
                data-title='Insert Link'
                onClick={this.handleLinkChange}
              >
                <i className="fa fa-link"/>
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
          <div className={classListLink}>
            <input
              className="input-form input-form--link-image"
              ref="inputFormLinkImage"
              type="text"
              placeholder="Type your link"
            />
            <div className="actions">
              <button
                className="submit action tooltiped tooltiped--above"
                data-title='Submit'
                onClick={this.handleLinkSubmit}
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
