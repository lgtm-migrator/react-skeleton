import React from "react";
import ReactDOM from "react-dom";

import {Tooltip, Button} from "react-bootstrap";
import {Overlay} from "react-overlays";

import * as colors from "../utils/colors.js";

//Styles Mostly from Bootstrap
const TooltipStyle = {
  position: 'absolute',
  padding: '0 5px'
};

const TooltipInnerStyle = {
  padding: '3px 8px',
  color: '#fff',
  textAlign: 'center',
  borderRadius: 3,
  backgroundColor: '#000',
  opacity: .75
};

const TooltipArrowStyle = {
  position: 'absolute',
  width: 0, height: 0,
  borderRightColor: 'transparent',
  borderLeftColor: 'transparent',
  borderTopColor: 'transparent',
  borderBottomColor: 'transparent',
  borderStyle: 'solid',
  opacity: .75
};

const PlacementStyles = {
  left: {
    tooltip: { marginLeft: -3, padding: '0 5px' },
    arrow: { right: 0, marginTop: -5, borderWidth: '5px 0 5px 5px', borderLeftColor: '#000' },
//    bgColor: { color: '#fff', backgroundColor: '#000' }
  },
  right: {
    tooltip: { marginRight: 3, padding: '0 5px' },
    arrow: { left: 0, marginTop: -5, borderWidth: '5px 5px 5px 0', borderRightColor: '#000' },
//    bgColor: { color: '#fff', backgroundColor: '#000' }
  },
  top: {
    tooltip: { marginTop: -3, padding: '5px 0' },
    arrow: { bottom: 0, marginLeft: -5, borderWidth: '5px 5px 0', borderTopColor: '#000' },
//    bgColor: { color: '#fff', backgroundColor: '#000' }
  },
  bottom: {
    tooltip: { marginBottom: 3, padding: '5px 0' },
    arrow: { top: 0, marginLeft: -5, borderWidth: '0 5px 5px', borderBottomColor: '#000' },
//    bgColor: { color: '#fff', backgroundColor: '#000' }
  }
};

const ToolTip = props => {
  
//  console.log (props);
//  console.log(PlacementStyles);
  
  let placementStyle = PlacementStyles[props.placement];

  let {
    style,
    arrowOffsetLeft: left = placementStyle.arrow.left,
    arrowOffsetTop: top = placementStyle.arrow.top,
    children,
    colorType
  } = props;
  
  console.log (props);
//  PlacementStyles[props.placement].bgColor = {backgroundColor: colorType};
  if (colorType !== undefined && colorType !== null){
      TooltipInnerStyle.backgroundColor = colorType;
  }
//  console.log(PlacementStyles);
  
  return (
    <div style={{...TooltipStyle, ...placementStyle.tooltip, ...style}}>
      <div style={{...TooltipArrowStyle, ...placementStyle.arrow, left, top }}/>
      <div style={TooltipInnerStyle}>
        {children}
      </div>
    </div>
  );
};

const PopupInButtonClick = React.createClass({

  getInitialState(){
    return { show: false };
  },

  toggle(){
    let show = this.state.show;
    let placements = ['left', 'top', 'right', 'bottom'];
    let placement = this.state.placement;

    placement = placements[placements.indexOf(placement) + 1];

    if (!show) {
      show = true;
      placement = placements[0];
    }
    else if (!placement) {
      show = false;
    }

    return this.setState({ show, placement });
  },

  render(){

      console.log (this.props)
      
    return (
      <div style={{ height: 100, paddingLeft: 150, position: 'relative' }}>
        <Button bsStyle='primary' ref='target' onClick={this.toggle}>
          I am an Overlay target
        </Button>
        <p>
          keep clicking to see the overlay placement change
        </p>

        <Overlay
          show={this.state.show}
          onHide={() => this.setState({ show: false })}
          placement={this.state.placement}
          container={this}
          target={ props => ReactDOM.findDOMNode(this.refs.target)}
        >
          <ToolTip colorType={this.props.colorType}>
            I'm placed to the: <strong>{this.state.placement}</strong>
          </ToolTip>
        </Overlay>
      </div>
    );
  }
});

export default PopupInButtonClick;