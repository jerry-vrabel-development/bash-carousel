import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../styles/Carousel.css';

const Carousel = ({ images }) => {
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const shuffledImages = shuffleArray(images);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);
  const starRef = useRef(null);

  const animateStarWipe = (delay = 0) => {
    gsap.fromTo(starRef.current, { scale: 0, opacity: 1 }, { scale: 100, opacity: 0, duration: 1, ease: "power2.out", delay: delay });
  };

  useEffect(() => {
    if (initialLoad) {
      animateStarWipe(1);
      setInitialLoad(false);
    }

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledImages.length);
      animateStarWipe();
    }, 3000);

    return () => clearInterval(timer);
  }, [shuffledImages, initialLoad]);

  return (
    <div className="carousel">
      <img src={shuffledImages[currentIndex]} alt={`dog ${currentIndex}`} />
      <div className="star" ref={starRef}>
        {/* SVG star shape */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="50px" height="50px"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z"/></svg>
      </div>
    </div>
  );
};

export default Carousel;