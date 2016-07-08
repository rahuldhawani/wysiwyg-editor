import React, {PropTypes, Component} from 'react';
import DisplayAction from './media-actions/display-action';
import AltTextAction from './media-actions/alt-text-action';
import AlignAction from './media-actions/align-action';
import SizeAction from './media-actions/size-action';
import ReplaceImageAction from './media-actions/replace-image-action';
import InsertLinkAction from './media-actions/insert-link-action';



export default class MediaToolbox extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.mouseIsDownOnDiv = false;
    this.state = {
      actionSelected        : 'display',
      displayActionSelected : 'block',
      alignActionSelected   : 'center'
    }

  }

  componentDidMount() {
    window.addEventListener('mousedown', this.pageClick, false);
  };

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.pageClick, false);
  }

  pageClick = () => {
    if (this.mouseIsDownOnDiv) {
      return;
    }

    this.props.onChangeVisibility();
  };

  handleMouseDown = () => {
    this.mouseIsDownOnDiv = true;
  };

  handleMouseUp = () => {
    this.mouseIsDownOnDiv = false;
  };

  handleChangeActionSelection(selected) {
    this.setState({
      actionSelected : selected
    });

  };


  handleDisplayChange = (selected) => {
    this.setState({
      displayActionSelected : selected
    }, () => {
      this.props.onStyleChange(this.state.displayActionSelected, this.state.alignActionSelected);
    });

  };

  handleAlignChange = (selected) => {
    this.setState({
      alignActionSelected : selected
    }, () => {
      this.props.onStyleChange(this.state.displayActionSelected, this.state.alignActionSelected);
    });
  };

  handleAltChange = (newAlt) => {
    this.props.onAltChange(newAlt);
    this.setState({
      actionSelected : 'display'
    });

  };
  handleMediaReplace = (newImage, newAlt) => {
    this.props.onMediaReplace(newImage, newAlt);
    this.setState({
      actionSelected : 'display'
    });

  };

  handleLinkInsertion = (link) => {
    this.props.onLinkInserted(link);
    this.setState({
      actionSelected : 'display'
    });

  };


  handleLinkRemoval = () => {
    this.props.onLinkRemove();
    this.setState({
      actionSelected : 'display'
    });

  };

  renderActions = () => {
    switch (this.state.actionSelected) {
      case 'display' :
        return (
          <DisplayAction
            onDisplayChange={this.handleDisplayChange}
            selected={this.state.displayActionSelected}
          />
        );

      case 'altText' :
        return (
          <AltTextAction
            onAltChange={this.handleAltChange}
            altText={this.props.altText}
          />
        );

      case 'replaceImage' :
        return (
          <ReplaceImageAction
            toolType={this.props.toolType}
            onMediaReplace={this.handleMediaReplace}
          />
        );

      case 'insertLink' :
        return (
          <InsertLinkAction
            onLinkInsert={this.handleLinkInsertion}
          />
        );

      case 'align' :
        return(
          <AlignAction
            onAlignChange={this.handleAlignChange}
            selected={this.state.alignActionSelected}
          />
        );

      case 'size' :
        return (
          <SizeAction
            width={this.props.width}
            height={this.props.height}
            onSizeChange={this.props.onSizeChange}
          />
        );
    }
  };

  renderButtons() {
    let buttons = [
      <li className="media-toolbox__items">
        <button
          className='tool tooltiped tooltiped--above'
          data-title="Change Display"
          onClick={this.handleChangeActionSelection.bind(this, 'display')}>
          <i className="fa fa-cogs"></i>
        </button>
      </li>,

      <li className="media-toolbox__items">
        <button
          className='tool tooltiped tooltiped--above'
          data-title="Replace Image"
          onClick={this.handleChangeActionSelection.bind(this, 'replaceImage')}>
          <i className="fa fa-exchange"></i>
        </button>
      </li>,
      <li className="media-toolbox__items">
        <button
          className='tool tooltiped tooltiped--above'
          data-title="Align"
          onClick={this.handleChangeActionSelection.bind(this, 'align' )}>
          <i className="fa fa-align-left"></i>
        </button>
      </li>,
      <li className="media-toolbox__items">
        <button
          onClick=""
          data-title="Change Size"
          className='tool tooltiped tooltiped--above'
          onClick={this.handleChangeActionSelection.bind(this,  'size')}>
          <i className="fa fa-arrows-alt"></i>
        </button>
      </li>,
      <li className="media-toolbox__items">
        <button
          data-title="Change Alt Text"
          className='tool tooltiped tooltiped--above'
          onClick={this.handleChangeActionSelection.bind(this, 'altText')}>
          <i className="fa fa-info"></i>
        </button>
      </li>

    ];

    if (this.props.toolType === 'video') buttons.splice(buttons.length - 1, 1);
    else {
      if (this.props.linkInsert) {
        buttons.push(<li className="media-toolbox__items">
          <button
            className='tool tooltiped tooltiped--above'
            data-title="Remove Link"
            onClick={this.handleLinkRemoval.bind()}>
            <i className="fa fa-minus"></i>
          </button>
        </li>);
      } else {
        buttons.push(<li className="media-toolbox__items">
          <button
            className='tool tooltiped tooltiped--above'
            data-title="Add Link"
            onClick={this.handleChangeActionSelection.bind(this, 'insertLink')}>
            <i className="fa fa-plus"></i>
          </button>
        </li>);
      }
    }

    buttons.push( <li className="media-toolbox__items">
      <button
        className='tool tooltiped tooltiped--above delete'
        data-title="Delete"
        onClick={this.props.onDelete}>
        <i className="fa fa-trash"></i>
      </button>
    </li>);

    return buttons;
  }

  render() {
    return (
      <div
        className={'media-toolbox ' + this.props.className}
        style={{top : this.props.top, left : this.props.left}}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
      >
        <ul className="media-toolbox__menu">
          {this.renderButtons()}
        </ul>
        <div className="actions">
          {this.renderActions()}
        </div>
      </div>
    );
  }
}

