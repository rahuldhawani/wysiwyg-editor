import React, {PropTypes, Component} from 'react';

export default class InsertLinkAction extends Component {
  static propTypes = {
    onLinkInsert : PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {}
  }

  handleInsertLink = () => {
    this.props.onLinkInsert(this.refs.insertLinkForm.value);
  };


  render() {
    return (
      <div className="actions__insert-link">
        <input ref="insertLinkForm" type="text" placeholder="type your link here.."/>
        <button
          className="actions__button"
          onClick={this.handleInsertLink}>Insert
        </button>
      </div>
    );
  }
}
