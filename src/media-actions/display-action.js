import React, {PropTypes, Component} from 'react';

export default class DisplayAction extends Component {
  static propTypes = {
    onDisplayChange : PropTypes.func.isRequired,
    selected        : PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
  }

  onDisplayChange = (e) => {
    this.props.onDisplayChange(e.currentTarget.value);
  };

  render() {
    return (
      <div className="actions__display">

        <input type="radio" name="inline"
               value='inline'
               checked={this.props.selected === 'inline'}
               onChange={this.onDisplayChange}
               id="inline"
        />
        <label
          htmlFor="inline"
        >
          Inline
        </label>

        <input type="radio" name="block"
               value='block'
               checked={this.props.selected === 'block'}
               onChange={this.onDisplayChange}
               id="block"
        />
        <label
          htmlFor="block"
        >
          Block
        </label>
      </div>
    );
  }
}
