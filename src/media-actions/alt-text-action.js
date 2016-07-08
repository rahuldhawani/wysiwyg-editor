import React, {PropTypes, Component} from 'react';

export default class AltTextAction extends Component {
  static propTypes = {
    onAltChange : PropTypes.func.isRequired,
    altText     : PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      alt : this.props.altText
    }
  }

  handleAltSubmit = () => {
    this.props.onAltChange(this.refs.altForm.value);
  };
  handleAltChange = (e) => {
    this.setState({
      alt : e.currentTarget.value
    });

  };

  render() {

    return (
      <div className="actions__alttext">
        <input ref="altForm" type="text" onChange={this.handleAltChange} value={this.state.alt}/>
        <button
          className="actions__button"
          onClick={this.handleAltSubmit}>Update
        </button>
      </div>
    );
  }
}

