'use strict';

import React from 'react';

export default class SwipeViews extends React.Component {

  constructor(props) {
    super(props);
    const selectedIndex = this.props.selectedIndex || 0;
    //the width percent value of each SwipeTab
    const pageWidthPerCent = 100 / this.props.children.length;
    //the margin-left percent value of each SwipeTab
    const translation = selectedIndex * pageWidthPerCent;
    this.state = {
      selectedIndex,
      pageWidthPerCent,
      translation,
      clientX: null,
      clientY: null,
      animate: true,
      pageWidth: window.innerWidth,
      scrollTop: true
    };
  }

  componentDidUpdate() {
    this.props.componentDidUpdate(this);
  }

  componentDidMount() {
    this._selectIndex();
  }

  componentWillReceiveProps(nextProps) {
    this._selectIndex(parseInt(nextProps.selectedIndex));
  }

  render() {
    const swipeViewsInkStyle = {
      width: this.state.pageWidthPerCent + '%',
      marginLeft: this.state.translation + '%',
      transitionProperty: this.state.animate ? 'margin' : 'none'
    };
    return (
      <div>
      <section className="SwipeViewsHeaderContainer">
        <div className="SwipeViewsHeader">
          <ul className="SwipeViewsTabs">
            {this.props.children.map((child,index) => {
              let className = (index === this.state.selectedIndex ? 'active' : '');
              return (
                <li key={index} 
                className={'SwipeViewsTab '+className}
                style={{width: this.state.pageWidthPerCent + '%'}}
                onTouchEnd={this._handleClick.bind(this, index)}>
                {child.props.title}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="SwipeViewsInk" style={swipeViewsInkStyle}></div>
      </section>
      {this.props.children.map((child, index) => {
          let className = (index === this.state.selectedIndex ? 'SwipeViewPage-active SwipeViewPage-in' : 'SwipeViewPage-next SwipeViewPage-out');
          return (
            <section className={'SwipeViewPage ' + className}
            key={index}
            onScroll={this._handleScroll.bind(this)}
            onTouchStart={this._handleTouchStart.bind(this)}
            onTouchMove={this._handleTouchMove.bind(this)}
            >
              {child.props.children}
            </section> 
          ); 
      })}
      </div>
    );
  }

  _selectIndex(selectedIndex) {
    if (Number.isInteger(selectedIndex)) {
      const translation = selectedIndex * this.state.pageWidthPerCent;
      return this.setState({
        selectedIndex,
        translation,
        clientX: null,
        animate: true
      });
    }
    if (!this.context.router) {
      return null;
    }
    this.props.children.map((child, selectedIndex) => {
      const to = child.props.title.props.to;
      const isActive = this.context.router.isActive(to);
      if (isActive) {
        const translation = selectedIndex * this.state.pageWidthPerCent;
        return this.setState({
          selectedIndex,
          translation,
          clientX: null,
          animate: true
        });
      }
    });
  }

  _transitionTo(selectedIndex) {
    if (this.props.onIndexChange) {
      this.props.onIndexChange(selectedIndex);
    }
    if (!this.context.router) {
      return null;
    }
    const child = this.props.children[selectedIndex];
    const to = child.props.title.props.to;
    if (!this.context.router.isActive(to)) {
      this.context.router.transitionTo(to);
    }
  }
  
  _handleTouchStart(event) {
    const clientX = event.changedTouches[0].clientX;
    const clientY = event.changedTouches[0].clientY;
    this.state.clientX = clientX;
    this.state.clientY = clientY;
  }

  _handleTouchMove(event) {
    const clientX = event.changedTouches[0].clientX;
    const clientY = event.changedTouches[0].clientY;
    if (!this.state.clientX || !this.state.clientY){
      return;
    }
    const dx = (clientX - this.state.clientX);
    const dy = (clientY - this.state.clientY);
    if (Math.abs(dx) > Math.abs(dy)){
      const dxPerCent = dx / (this.state.pageWidth) * 100;
      const tippingPoint = 30;
      let selectedIndex = this.state.selectedIndex;
      if (Math.abs(dx) > tippingPoint){
        if (dxPerCent < 0 && selectedIndex >= 0){
          selectedIndex += 1;
          selectedIndex = selectedIndex > this.props.children.length-1 ? 0 : selectedIndex;
        }else if (dxPerCent > 0 && selectedIndex < this.props.children.length){
          selectedIndex -= 1;
          selectedIndex = selectedIndex < 0 ? this.props.children.length-1 : selectedIndex;
        }
        const translation = selectedIndex * this.state.pageWidthPerCent;
        if (selectedIndex !== this.state.selectedIndex){
          return this.setState({
            selectedIndex,
            translation,
            clientX:null,
            clientY:null,
            animate: true
          });
        }
      }
      else{
        //less than tippingPoint ignored
        return;
      }
    }
    else{
      //swipe to up or down ignored
      return;
    }
  }

  _handleClick(selectedIndex, event) {
    const translation = selectedIndex * this.state.pageWidthPerCent;
    this.setState({
      selectedIndex,
      translation,
      clientX: null,
      animate: true
    });
    if (event.target.localName === 'li') {
      this._transitionTo(selectedIndex);
    }
  }

  _handleTouchEnd() {
    const selectedIndex = this.state.selectedIndex;
    const translation = selectedIndex * this.state.pageWidthPerCent;
    this.setState({
      selectedIndex,
      translation,
      clientX: null,
      animate: true
    }, this._transitionTo(selectedIndex));
  }

  _handleScroll(event) {
    this.props.viewsOnScroll(event,this);
  }

}

SwipeViews.contextTypes = {
  router: React.PropTypes.func
};
