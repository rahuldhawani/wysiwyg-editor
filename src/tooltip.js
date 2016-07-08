import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';

export default class ToolTip extends Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      visible : false
    }
  }

  handleMouseEnter = () => {
      console.log("hover");
    this.setState({
      visible : true
    });

  };
  handleMouseLeave = () => {
      console.log("leave");
    this.setState({
      visible : false
    });

  };
  getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
      _x += el.offsetLeft - el.scrollLeft;
      _y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return { top: _y, left: _x };
  }

  componentWillReceiveProps(nextProps) {
   console.log(nextProps.thisTool);
    console.log(this.getOffset(nextProps.thisTool).left);
   console.log(nextProps.thisTool.getBoundingClientRect());
    console.log(window.getComputedStyle(nextProps.thisTool));
    console.log(parseInt(window.getComputedStyle(nextProps.thisTool).getPropertyValue('width').split('px')[0], 10))
  }





  render() {
    return (
      <span
      onMouseEnter={this.handleMouseEnter}
      onMouseLeave={this.handleMouseLeave}

      >
        <span
          style={{
            display : this.state.visible ? 'inline' : 'none'
          }}
        >
          {this.props.title}
        </span>
        {this.props.children}
      </span>
    );
  }
}
