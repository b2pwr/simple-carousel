import Carousel from './components/Carousel';
import './App.css';

function App() {
  return (
    <div className="App">
      <div style={{ height: 500 }}>
        <Carousel showIndicator autoPlay swipeable>
          <img src='https://placekitten.com/200/300' alt="cat1" />
          <img src='https://placekitten.com/400/300' alt="cat2" />
          <img src='https://placekitten.com/600/200' alt="cat3" />
          <img src='https://placekitten.com/1000/400' alt="cat4" />
        </Carousel>
      </div>
    </div>
  );
}

export default App;
