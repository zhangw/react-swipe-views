# React Swipe Views

Forked from [React-swipe-views](https://github.com/damusnet/react-swipe-views), the original project use 'display:flex' as the way of layout which not compatible with QQ-X5 browser engine used in MicroMessenger of Android mobile.So I created the 'withoutFlexLayout' branch in which a compatible way of implementing the React component for binded Tabs and Swipeable Views.

## Demo

[Live example]()


## Quick Example

```jsx
'use strict';

import React from 'react';
import SwipeViews from 'react-swipe-views';

export default class App extends React.Component {
  render() {
    return (
      <SwipeViews>
        <div title="Tab 1">
          Page 1
        </div>
        <div title="Tab 2">
          Page 2
        </div>
        <div title="Tab 3">
          Page 3
        </div>
      </SwipeViews>
    );
  }
}
```

## Install

This component is available as an npm module or a bower component:

```
npm install react-swipe-views --save
```

or

```
bower install react-swipe-views --save
```

For Safari compatibility, you need to include the Babel Polyfill for `Number.isInteger()`. See [Issue #4](https://github.com/damusnet/react-swipe-views/issues/4)

## Examples

There are two example projects in the [/examples](examples) folder. One is using the npm module and webpack as a build tool with react-router, the other uses bower and brunch as a pure component.

## TODO List
 - [ ] add onscroll event handler (当前的Tab页滚动到底部时，切换到下一个Tab页)
 - [x] add touchmove/start event handler (左右滑动时，切换Tab页)

## New Features
 - add onscroll event callback interface 
 - add componentDidUpdate callback interface
 - implement the basic layout compatible with QQ-X5 and the engine based webkit, such as safari or chrome.
 - add new example only with the static files (css/js/html), view simple-example for more details.

## Thanks

## License

MIT
