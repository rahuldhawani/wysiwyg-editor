import React, {PropTypes, Component} from 'react';

export default class AlignAction extends Component {
  static propTypes = {
    onAlignChange : PropTypes.func.isRequired,
    selected        : PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
  }

  onAlignChange = (e) => {
    this.props.onAlignChange(e.currentTarget.value);
  };

  render() {
    return (
      <div className="actions__align">

        <input type="radio" name="left"
               value='left'
               checked={this.props.selected === 'left'}
               onChange={this.onAlignChange}
               id="left"
        />
        <label
          htmlFor="left"
        >
          Left
        </label>


        <input type="radio" name="center"
               value='center'
               checked={this.props.selected === 'center'}
               onChange={this.onAlignChange}
               id="center"
        />
        <label
          htmlFor="center"
        >
          Middle
        </label>

        <input type="radio" name="right"
               value='right'
               checked={this.props.selected === 'right'}
               onChange={this.onAlignChange}
               id="right"
        />

        <label
          htmlFor="right"
        >
          Right
        </label>
      </div>
    );
  }
}

