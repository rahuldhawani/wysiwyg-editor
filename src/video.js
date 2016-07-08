import React, {PropTypes, Component} from 'react';
import MediaToolBox from './media-toolbox';
import ReactDOM from 'react-dom';
import {videoUrl} from './utils';


export default class Video extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.mediaToolBox = {};
    this.positionToolBox = {
      top : 0,
        left : 0
    };
    this.state = {
      toolBoxRendered : false,
      toolBoxVisible : false,
        _display : 'block',
        _float : 'none',
      _textAlign : 'center',
      src : this.props.src,
      _width : 'auto',
      _height : 'auto'
    }
  }
  componentDidMount() {
    this.renderToolBox();
   this.refs.video.parentNode.addEventListener('click', this.handleClick, false); // synthethic events have a weird thing with stopPropagation.
    this.setState({
      _height : parseInt(window.getComputedStyle(this.refs.video).getPropertyValue('height').split('px')[0], 10),
    _width : parseInt(window.getComputedStyle(this.refs.video).getPropertyValue('width').split('px')[0], 10)
    });

  }






  handleStyleChange = (displayType, alignType) => {

    switch (displayType) {
      case  'block' :
        switch (alignType) {
          case 'left' :
            this.setState({
              _textAlign : 'left',
              _float: 'none',
              _display :'block'
            });

            break;
          case 'center' :
            console.log('inline center');
            this.setState({
              _textAlign : 'center',
              _float: 'none',
              _display :'block'
            });
            break;
          case 'right' :
            this.setState({
              _textAlign : 'right',
              _float: 'none',
              _display :'block'
            });
            console.log('inline right');
            break;
        }
        break;
      case  'inline' :
        switch (alignType) {
          case 'left' :
            this.setState({
              _float : 'left',
              _display :'inline-block'
            });
            console.log('block left');
            break;
          case 'center' :
            this.setState({
              _float : 'none',
              _display :'inline-block'
            });
            console.log('block center');
            break;
          case 'right' :
            this.setState({
              _float : 'right',
              _display :'inline-block'
            });
            console.log('block right');
            break;
        }
        break;
    }
  };

  handleVisibility = () => {
    this.setState({
      toolBoxVisible : false
    });
  };

  handleMediaReplace = (newMedia) => {
    this.setState({
      src : videoUrl(newMedia)
    });
  };

  handleSizeChange = (newWidth, newHeight) => {
    this.setState({
      _width : newWidth,
      _height : newHeight
    });
  };

  handleDelete = () => {
    console.log('deleting toolbox: '+ReactDOM.unmountComponentAtNode(this.mediaToolBox));
    this.mediaToolBox.parentNode.removeChild(this.mediaToolBox);
    this.props.onDelete(this.props.videoId);
  };

  updateParentNodeStates = () => {
    let el = document.getElementById('video' + this.props.videoId);
    el.style.display = this.state._display;
    el.style.textAlign = this.state._textAlign;
    el.style.float = this.state._float;
  };

  componentDidUpdate(prevProps, prevState) {
    this.updateParentNodeStates();
    this.getPositionToolBox();
    ReactDOM.render(
      <MediaToolBox
        top={this.positionToolBox.top}
        left={this.positionToolBox.left}
        className={this.state.toolBoxVisible ? 'visible' : ''}
        onStyleChange={this.handleStyleChange}
        onDelete={this.handleDelete}
        onChangeVisibility={this.handleVisibility}
        onMediaReplace={this.handleMediaReplace}
        onSizeChange={this.handleSizeChange}
        width={this.state._width}
        height={this.state._height}
        toolType="video"
      />
      , this.mediaToolBox);
  };

  getWidth(of) {
    return parseInt(window.getComputedStyle(of).getPropertyValue('width').split('px')[0], 10);
  }
  getPositionToolBox = () => {
    let thisDOMNode = this.refs.video.parentNode;
    let height = parseInt(window.getComputedStyle(thisDOMNode).getPropertyValue('height').split('px')[0], 10);

    let top = thisDOMNode.offsetTop + height;
    let left = thisDOMNode.offsetLeft + (this.getWidth(thisDOMNode) / 2) - (255 / 2);

      this.positionToolBox = {
        top : top,
        left : left
      }

  };



  renderToolBox  = () => {
    if(!this.state.toolBoxRendered) {
      let thisDOMNode = this.refs.video.parentNode;
      this.mediaToolBox = document.createElement('div');
      this.mediaToolBox.id = 'media-toolbox-container';
      let elem = thisDOMNode;
      while (!elem.getAttribute('contenteditable')) {
        console.log(elem.getAttribute('contenteditable'));
        elem = elem.parentElement;
      }
      elem.parentElement.appendChild(this.mediaToolBox);

      this.getPositionToolBox();
      console.log(this.mediaToolBox);
      this.setState({
        toolBoxRendered : true
      });
    }
  };

  handleClick = (e) => {
    this.props.onClickClose();
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      toolBoxVisible :true
    });

  };



  render() {
      return (
        <iframe
          title="Video Player"
          src={this.state.src}
          allowFullScreen="true"
          frameBorder="0"
          ref="video"
          style={{
            width : this.state._width,
            height : this.state._height
          }}
        />

      );

  }
}
