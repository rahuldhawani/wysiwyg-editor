import React, {PropTypes, Component} from 'react';
import MediaToolBox from './media-toolbox';
import ReactDOM from 'react-dom';


export default class Image extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.mediaToolBox = {};
    this.positionToolBox = {
      top  : 0,
      left : 0
    };
    this.state = {
      toolBoxRendered : false,
      toolBoxVisible  : false,
      _display        : 'block',
      _float          : 'none',
      _margin         : '0 auto',
      alt             : this.props.alt,
      src             : this.props.src,
      _width          : 'auto',
      _height         : 'auto',
      linkInsert      : ''
    }
  }

  componentDidMount() {
    this.renderToolBox();
    this.refs.image.addEventListener('click', this.handleClick, false); // synthethic events have a weird thing with stopPropagation.


  }

  handleImageLoad = () => {
    console.log('image loaded');
    this.setState({
      _height : parseInt(window.getComputedStyle(this.refs.image).getPropertyValue('height').split('px')[0], 10),
      _width  : parseInt(window.getComputedStyle(this.refs.image).getPropertyValue('width').split('px')[0], 10)
    });
  };


  handleStyleChange = (displayType, alignType) => {

    switch (displayType) {
      case  'block' :
        switch (alignType) {
          case 'left' :
            this.setState({
              _margin  : '0 auto 0 0',
              _float   : 'none',
              _display : 'block'
            });

            break;
          case 'center' :
            console.log('inline center');
            this.setState({
              _margin  : '0 auto',
              _float   : 'none',
              _display : 'block'
            });
            break;
          case 'right' :
            this.setState({
              _margin  : '0 0 0 auto',
              _float   : 'none',
              _display : 'block'
            });
            console.log('inline right');
            break;
        }
        break;
      case  'inline' :
        switch (alignType) {
          case 'left' :
            this.setState({
              _float   : 'left',
              _display : 'inline-block'
            });
            console.log('block left');
            break;
          case 'center' :
            this.setState({
              _float   : 'none',
              _display : 'inline-block'
            });
            console.log('block center');
            break;
          case 'right' :
            this.setState({
              _float   : 'right',
              _display : 'inline-block'
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


  handleAltChange = (newAlt) => {
    this.setState({
      alt : newAlt
    });
  };


  handleMediaReplace = (newMedia, newAlt) => {
    this.setState({
      src : newMedia,
      alt : newAlt
    });
  };

  handleSizeChange = (newWidth, newHeight) => {
    this.setState({
      _width  : newWidth,
      _height : newHeight
    });
  };

  handleDelete = () => {
    console.log('deleting toolbox: ' + ReactDOM.unmountComponentAtNode(this.mediaToolBox));
    this.mediaToolBox.parentNode.removeChild(this.mediaToolBox);
    this.props.onDelete(this.props.imageId);
  };
  onLinkInsertion = (link) => {
    this.setState({
      linkInsert : link
    });

  };
  handleLinkRemoval = () => {
    this.setState({
      linkInsert : ''
    });

  };


  componentDidUpdate(prevProps, prevState) {
    this.getPositionToolBox();
    ReactDOM.render(
      <MediaToolBox
        top={this.positionToolBox.top}
        left={this.positionToolBox.left}
        className={this.state.toolBoxVisible ? 'visible' : ''}
        onStyleChange={this.handleStyleChange}
        onDelete={this.handleDelete}
        onAltChange={this.handleAltChange}
        altText={this.state.alt}
        onChangeVisibility={this.handleVisibility}
        onMediaReplace={this.handleMediaReplace}
        onLinkInserted={this.onLinkInsertion}
        onSizeChange={this.handleSizeChange}
        width={this.state._width}
        linkInsert={this.state.linkInsert}
        onLinkRemove={this.handleLinkRemoval}
        height={this.state._height}
        toolType="image"
      />
      , this.mediaToolBox);
  };

  getWidth(of) {
    return parseInt(window.getComputedStyle(of).getPropertyValue('width').split('px')[0], 10);
  }

  getPositionToolBox = () => {
    let thisDOMNode = this.refs.image;
    let height = parseInt(window.getComputedStyle(thisDOMNode).getPropertyValue('height').split('px')[0], 10);

    let top = thisDOMNode.offsetTop + height;
    let left = thisDOMNode.offsetLeft + (this.getWidth(thisDOMNode) / 2) - (255 / 2);

    this.positionToolBox = {
      top  : top,
      left : left
    }

  };


  renderToolBox = () => {
    if (!this.state.toolBoxRendered) {
      let thisDOMNode = this.refs.image;
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
      toolBoxVisible : true
    });

  };


  render() {
    if (this.state.linkInsert) {
      return (
        <a href={this.state.linkInsert}>
          <img
            class='image'
            ref='image'
            src={this.state.src}
            alt={this.state.alt}
            style={{
          display : this.state._display,
          margin : this.state._margin,
          float : this.state._float,
          width : this.state._width,
          height : this.state._height,
          maxWidth : '100%'
         }}
          />
        </a>

      );

    }
    return (
      <img
        class='image'
        ref='image'
        onLoad={this.handleImageLoad}
        src={this.state.src}
        alt={this.state.alt}
        style={{
          display : this.state._display,
          margin : this.state._margin,
          float : this.state._float,
          width : this.state._width,
          height : this.state._height,
          maxWidth : '100%',
          border : this.state.toolBoxVisible ? '1px dashed blue' : 'none'
         }}
      />

    );
  }
}
