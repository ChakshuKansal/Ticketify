import React, { useState, useEffect } from 'react';

const Carousel = () => {
  const slides = [
    {
      text: "Step into the Spotlight - Experience unforgettable performances at live theater shows.",
    },
    {
      text: "Laugh Out Loud - Join us for an evening of comedy with top comedians.",
    },
    {
      text: "Feel the Beat - Get lost in the rhythm at electrifying music concerts.",
    },
    {
      text: "Dance the Night Away - Let loose at vibrant dance events and parties.",
    },
    {
      text: "Celebrate Life - Immerse yourself in lively festivals with music, food, and fun.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[40vh] overflow-hidden bg-gray-800">
      <div
        className="flex transition-transform duration-700"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full h-[40vh] flex-shrink-0 bg-cover bg-center"
          >
            <div className="h-full flex items-center justify-center bg-black bg-opacity-50">
              <h2 className="text-white text-xl font-bold">{slide.text}</h2>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-100 text-black px-4 py-2 rounded-full"
      >
        &#8592;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-100 text-black px-4 py-2 rounded-full"
      >
        &#8594;
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-white" : "bg-gray-500"
              } cursor-pointer`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
