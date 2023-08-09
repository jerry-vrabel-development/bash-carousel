import React from 'react';
import Carousel from './components/Carousel';

// Create a dynamic context for the assets directory and match all .jpg files
const imageContext = require.context('./assets', false, /\.jpg$/);

// Map the matched images to their URLs
const images = imageContext.keys().map(imageContext);

function App() {
  return (
    <div className="App">
      <Carousel images={images} />
    </div>
  );
}

export default App;