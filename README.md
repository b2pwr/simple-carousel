### Usage

```
import Carousel from './components/Carousel';

<Carousel>
  // slider here
</Carousel>
```

### Props

| name          | type | default | desc                                              |
|---------------|------|---------|---------------------------------------------------|
| children      | node |         | elements to display.                              |
| showArrows    | bool | true    | Set to `false` to hide previous and next arrow.   |
| showIndicator | bool | false   | Set to `true` to render indicators.               |
| autoPlay      | bool | false   | Set to `true` to enable autoplay.                 |
| swipeable     | bool | false   | Set to `true` to enable swipeable.                |

### postscript

`yarn  install` for installing dependencies.
`yarn start` for running on localhost.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).