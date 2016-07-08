import React, {PropTypes, Component} from 'react';
import classnames from 'classnames';

export default class SizeAction extends Component {
  static propTypes = {
    onSizeChange : PropTypes.func.isRequired,
    width        : PropTypes.number.isRequired,
    height        : PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.ratio = 1;
    this.state = {
      locked : false,
      width  : this.props.width,
      height : this.props.height
    }
  }

  handleLock = () => {
    this.setState({
      locked : !this.state.locked
    });

    this.ratio = this.refs.width.value / this.refs.height.value
    console.log(this.ratio);

  };
  handleWidthChange = () => {
    if (this.state.locked) {
      let _height = Number(this.refs.height.value);
      let _width = Number(this.refs.width.value);
      _height = parseInt(_width * (1 / this.ratio), 10);
      this.setState({
        width  : _width,
        height : _height
      }, () => {
        this.props.onSizeChange(this.state.width, this.state.height);
      });
    } else {
      this.setState({
        width : Number(this.refs.width.value)
      }, () => {
        this.props.onSizeChange(this.state.width, this.state.height);
      });
    }


  };
  handleHeightChange = () => {
    if (this.state.locked) {
      let _height = Number(this.refs.height.value);
      let _width = Number(this.refs.width.value);
      _width = parseInt(_height * this.ratio, 10);
      this.setState({
        width  : _width,
        height : _height
      }, () => {
        this.props.onSizeChange(this.state.width, this.state.height);
      });
    } else {
      this.setState({
        height : Number(this.refs.height.value)
      }, ()=> {
        this.props.onSizeChange(this.state.width, this.state.height);
      });
    }


  };

  handleUp(type) {
    let d = Number(this.refs[type].value);
    this.setState({
      [type] : ++d
    }, () => {
      if (type === 'width') this.handleWidthChange();
      else {
        this.handleHeightChange()
      }
    });


  }

  handleDown(type) {
    let d = Number(this.refs[type].value);
    this.setState({
      [type] : --d
    }, () => {
      if (type === 'width') this.handleWidthChange();
      else {
        this.handleHeightChange()
      }
    });
  }


  render() {
    let lockClassList = classnames('fa', {
      'fa-lock'   : this.state.locked,
      'fa-unlock' : !this.state.locked
    });

    return (
      <div className="actions__size">

        <div className="size-input-container">
          <input
            className="size-input"
            ref="width"
            type="text"
            onChange={this.handleWidthChange}
            value={this.state.width}
          />
          <div className="change-buttons">
            <button
              className="change-buttons__up"
              onClick={this.handleUp.bind(this, 'width')}>
              <i className='fa fa-caret-up'/>
            </button>
            <button
              className="change-buttons__down"
              onClick={this.handleDown.bind(this, 'width')}>
              <i className='fa fa-caret-down'/>
            </button>
          </div>
        </div>

        <button
          className="change-buttons__lock"
          onClick={this.handleLock}>
          <i className={lockClassList}/>
        </button>
        <div className="size-input-container">
          <input
            className="size-input"
            ref="height"
            type="text"
            onChange={this.handleHeightChange}
            value={this.state.height}
          />
          <div className="change-buttons">
            <button
              className="change-buttons__up"
              onClick={this.handleUp.bind(this, 'height')}>
              <i className='fa fa-caret-up'/>
            </button>
            <button
              className="change-buttons__down"
              onClick={this.handleDown.bind(this, 'height')}>
              <i className='fa fa-caret-down'/>
            </button>
          </div>
        </div>
      </div>
    );
  }
}