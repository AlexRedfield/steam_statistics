import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './App.css';
import CalendarApp from './calendar';
import HomePage from './gameBar';
import ReHomePage from './reGameBar';

const session=()=>{
  return(
    <div></div>
  )
}

const TopImage = () => {
  return (
    <div className="top-image-container">
      <img
        src="https://cdn.wallpapersafari.com/11/19/tEpMmK.jpg"  // Replace with your top image URL
        alt="Top Image"
        className="top-image"
      />
      <div className="image-intro">
        <p>Image Introduction Text</p> {/* Replace with your image introduction */}
      </div>
    </div>
  );
};

const ImageSlider = () => {
  return (
    <Carousel showArrows={true} showThumbs={false}>
      <div>
        <img src="https://cdn.wallpapersafari.com/53/6/msw5Nj.png" alt="Slide 1" />
      </div>
      <div>
        <img src="https://wallpaperaccess.com/full/1641654.jpg" alt="Slide 2" />
      </div>
      <div>
        <img src="https://lh4.googleusercontent.com/proxy/Irw5m57AFMIkeXFDwmU1VAHiR1IMaZwH7gZ3tqZG7eNmh7GfuAZLJzDGOmRNbqJFONAujg-hLMncqkx4ejL5rxFQvk8c__b4sU3tYIhGfk5rVxC2Ey4ecpRpgv_a6iIt=w1200-h630-p-k-no-nu" alt="Slide 3" />
      </div>
      {/* Add more slides here */}
    </Carousel>
  );
};

function App() {
  return (
    <div className="App">
      <h1>Image Slider</h1>
        <ReHomePage/>
        <CalendarApp/>
        <HomePage/>
    </div>
  );
}

export default App;
