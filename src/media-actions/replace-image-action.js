import React, {PropTypes, Component} from 'react';
import Dropzone from 'react-dropzone';
import {getDataUri} from '../utils'

export default class ReplaceImageAction extends Component {
  static propTypes = {
    onMediaReplace : PropTypes.func.isRequired,
    toolType       : PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {}
  }

  handleReplaceSubmit = () => {
    this.props.onMediaReplace(this.refs.replaceMediaForm.value, 'editor image');
  };

  onDrop = (files) => {
    let file = files[files.length - 1];

    if (file.type.indexOf('image') >= 0) {
      let uri = getDataUri(file, this.props.onMediaReplace);
    }

    console.log(files);
    //insertMedia();
  };


  render() {
    if (this.props.toolType === 'image') {
      return (
        <div className="actions__replace-image">
          <input ref="replaceMediaForm" type="text" placeholder="type your link here.."/>
          <button
            className="actions__button"
            onClick={this.handleReplaceSubmit}>Replace
          </button>
          <p className="separator">OR</p>
          <Dropzone
            className='image-upload'
            onDrop={this.onDrop}
            accept="image/*">
            <div>Drop images here, or click to select files to upload.</div>
          </Dropzone>
        </div>
      );
    }
    return (
      <div>
        <input ref="replaceMediaForm" type="text" placeholder="type your link here.."/>
        <button
          className="actions__button"
          onClick={this.handleReplaceSubmit}>Replace
        </button>
      </div>
    );

  }
}




