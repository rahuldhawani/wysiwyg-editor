import React, { Component } from 'react';
import Editor from './editor';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      closeOtherEditors : false
    }
  }

  handleOneEditorActive = (cb) => {
    this.setState({
      closeOtherEditors : false
    }, () => {
      cb();
    });
  };
  //use editor component method `serialize` to get serialized content
  serialize = () => {
    console.log(this.refs.editor2.serialize());
  };

  render() {
    return (
      <div>
        <button
          onClick={this.serialize}
        >Serialize
        </button>
        <div className="modal-container">
          <Editor
            id="title-edit"
            className="some-class"
            ref="editor1"
            html="Click here to edit text...."
            closeOtherEditors={this.state.closeOtherEditors}
            onClickEditableContentContainer={this.handleOneEditorActive}
          />
          <Editor
            id="content-edit"
            ref="editor2"
            className="content-class"
            html="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam amet assumenda commodi cum ex excepturi iste maiores nobis odio sunt."
            tools={['bold', 'italics', 'strikeTrough', 'formatBlock', 'fonts', 'align', 'orderedList', 'unorderedList', 'underline', 'anchor', 'image', 'video']}
            closeOtherEditors={this.state.closeOtherEditors}
            onClickEditableContentContainer={this.handleOneEditorActive}
          />
        </div>
      </div>
    );
  }
}
