(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', 'react'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.React);
    global.SwipeViews = mod.exports;
  }
})(this, function (exports, module, _react) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var _React = _interopRequireDefault(_react);

  var SwipeViews = (function (_React$Component) {
    function SwipeViews(props) {
      _classCallCheck(this, SwipeViews);

      _get(Object.getPrototypeOf(SwipeViews.prototype), 'constructor', this).call(this, props);
      var selectedIndex = this.props.selectedIndex || 0;
      //the width percent value of each SwipeTab
      var pageWidthPerCent = 100 / this.props.children.length;
      //the margin-left percent value of each SwipeTab
      var translation = selectedIndex * pageWidthPerCent;
      this.state = {
        selectedIndex: selectedIndex,
        pageWidthPerCent: pageWidthPerCent,
        translation: translation,
        clientX: null,
        clientY: null,
        animate: true,
        pageWidth: window.innerWidth,
        scrollTop: true
      };
    }

    _inherits(SwipeViews, _React$Component);

    _createClass(SwipeViews, [{
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        this.props.componentDidUpdate(this);
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this._selectIndex();
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        this._selectIndex(parseInt(nextProps.selectedIndex));
      }
    }, {
      key: 'render',
      value: function render() {
        var _this = this;

        var swipeViewsInkStyle = {
          width: this.state.pageWidthPerCent + '%',
          marginLeft: this.state.translation + '%',
          transitionProperty: this.state.animate ? 'margin' : 'none'
        };
        return _React['default'].createElement(
          'div',
          null,
          _React['default'].createElement(
            'section',
            { className: 'SwipeViewsHeaderContainer' },
            _React['default'].createElement(
              'div',
              { className: 'SwipeViewsHeader' },
              _React['default'].createElement(
                'ul',
                { className: 'SwipeViewsTabs' },
                this.props.children.map(function (child, index) {
                  var className = index === _this.state.selectedIndex ? 'active' : '';
                  return _React['default'].createElement(
                    'li',
                    { key: index,
                      className: 'SwipeViewsTab ' + className,
                      style: { width: _this.state.pageWidthPerCent + '%' },
                      onTouchEnd: _this._handleClick.bind(_this, index) },
                    child.props.title
                  );
                })
              )
            ),
            _React['default'].createElement('div', { className: 'SwipeViewsInk', style: swipeViewsInkStyle })
          ),
          this.props.children.map(function (child, index) {
            var className = index === _this.state.selectedIndex ? 'SwipeViewPage-active SwipeViewPage-in' : 'SwipeViewPage-next SwipeViewPage-out';
            return _React['default'].createElement(
              'section',
              { className: 'SwipeViewPage ' + className,
                key: index,
                onScroll: _this._handleScroll.bind(_this),
                onTouchStart: _this._handleTouchStart.bind(_this),
                onTouchMove: _this._handleTouchMove.bind(_this)
              },
              child.props.children
            );
          })
        );
      }
    }, {
      key: '_selectIndex',
      value: function _selectIndex(selectedIndex) {
        var _this2 = this;

        if (Number.isInteger(selectedIndex)) {
          var translation = selectedIndex * this.state.pageWidthPerCent;
          return this.setState({
            selectedIndex: selectedIndex,
            translation: translation,
            clientX: null,
            animate: true
          });
        }
        if (!this.context.router) {
          return null;
        }
        this.props.children.map(function (child, selectedIndex) {
          var to = child.props.title.props.to;
          var isActive = _this2.context.router.isActive(to);
          if (isActive) {
            var translation = selectedIndex * _this2.state.pageWidthPerCent;
            return _this2.setState({
              selectedIndex: selectedIndex,
              translation: translation,
              clientX: null,
              animate: true
            });
          }
        });
      }
    }, {
      key: '_transitionTo',
      value: function _transitionTo(selectedIndex) {
        if (this.props.onIndexChange) {
          this.props.onIndexChange(selectedIndex);
        }
        if (!this.context.router) {
          return null;
        }
        var child = this.props.children[selectedIndex];
        var to = child.props.title.props.to;
        if (!this.context.router.isActive(to)) {
          this.context.router.transitionTo(to);
        }
      }
    }, {
      key: '_handleTouchStart',
      value: function _handleTouchStart(event) {
        var clientX = event.changedTouches[0].clientX;
        var clientY = event.changedTouches[0].clientY;
        this.state.clientX = clientX;
        this.state.clientY = clientY;
      }
    }, {
      key: '_handleTouchMove',
      value: function _handleTouchMove(event) {
        var clientX = event.changedTouches[0].clientX;
        var clientY = event.changedTouches[0].clientY;
        if (!this.state.clientX || !this.state.clientY) {
          return;
        }
        var dx = clientX - this.state.clientX;
        var dy = clientY - this.state.clientY;
        if (Math.abs(dx) > Math.abs(dy)) {
          var dxPerCent = dx / this.state.pageWidth * 100;
          var tippingPoint = 30;
          var selectedIndex = this.state.selectedIndex;
          if (Math.abs(dx) > tippingPoint) {
            if (dxPerCent < 0 && selectedIndex >= 0) {
              selectedIndex += 1;
              selectedIndex = selectedIndex > this.props.children.length - 1 ? 0 : selectedIndex;
            } else if (dxPerCent > 0 && selectedIndex < this.props.children.length) {
              selectedIndex -= 1;
              selectedIndex = selectedIndex < 0 ? this.props.children.length - 1 : selectedIndex;
            }
            var translation = selectedIndex * this.state.pageWidthPerCent;
            if (selectedIndex !== this.state.selectedIndex) {
              return this.setState({
                selectedIndex: selectedIndex,
                translation: translation,
                clientX: null,
                clientY: null,
                animate: true
              });
            }
          } else {
            //less than tippingPoint ignored
            return;
          }
        } else {
          //swipe to up or down ignored
          return;
        }
      }
    }, {
      key: '_handleClick',
      value: function _handleClick(selectedIndex, event) {
        var translation = selectedIndex * this.state.pageWidthPerCent;
        this.setState({
          selectedIndex: selectedIndex,
          translation: translation,
          clientX: null,
          animate: true
        });
        if (event.target.localName === 'li') {
          this._transitionTo(selectedIndex);
        }
      }
    }, {
      key: '_handleTouchEnd',
      value: function _handleTouchEnd() {
        var selectedIndex = this.state.selectedIndex;
        var translation = selectedIndex * this.state.pageWidthPerCent;
        this.setState({
          selectedIndex: selectedIndex,
          translation: translation,
          clientX: null,
          animate: true
        }, this._transitionTo(selectedIndex));
      }
    }, {
      key: '_handleScroll',
      value: function _handleScroll(event) {
        this.props.viewsOnScroll(event, this);
      }
    }]);

    return SwipeViews;
  })(_React['default'].Component);

  module.exports = SwipeViews;

  SwipeViews.contextTypes = {
    router: _React['default'].PropTypes.func
  };
});
