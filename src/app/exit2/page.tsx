"use client"; // This marks the component as a Client Component

import React, { useState, useEffect } from 'react';

interface BenefitItemProps {
  text: string;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ text }) => {
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading for 3 seconds, then show the tick mark
    const timer = setTimeout(() => {
      setLoading(false);
      setLoaded(true);
    }, 3000); // 3 seconds loading

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex gap-3 items-center mt-7 w-full">
      {/* Conditionally show either the loading spinner or tick mark */}
      <div className="w-8 h-8 flex items-center justify-center">
        {loading ? (
          // Loading spinner
          <div className="animate-spin w-6 h-6 border-4 border-t-transparent border-gray-500 rounded-full"></div>
        ) : loaded ? (
          // Tick mark after loading
          <span><img src="/pics/Tick.png" alt="Tick mark" /></span>
        ) : null}
      </div>
      {/* Benefit text */}
      <p className="flex-1 shrink self-stretch my-auto basis-0">
        {text}
      </p>
    </div>
  );
};

const BenefitsComponent: React.FC = () => {
  const handleClick = () => {
    console.log("Get Started button clicked!");
  };

  const benefitsData = [
    {
      text: "Find the benefits that are right for you or your business"
    },
    {
      text: "Learn everything you need to apply"
    },
    {
      text: "Save schemes and track your bookings"
    }
  ];

  return (
    <section className="flex overflow-hidden flex-col text-base bg-white max-w-[357px] rounded-[32px] mx-auto">
      <header className="flex flex-col px-8 pt-20 w-full leading-6 text-white bg-[#4f285e]">
        <img 
          loading="lazy" 
          src="/pics/1.png" 
          alt="Benefits illustration" 
          className="object-contain self-center max-w-full aspect-[1.9] w-[152px]" 
        />
        <div className="flex z-10 flex-col mt-16 mb-0 w-full">
          {benefitsData.map((benefit, index) => (
            <BenefitItem 
              key={index} 
              text={benefit.text} // Pass only the text prop
            />
          ))}
        </div>
      </header>
      <footer className="flex flex-col pt-72 w-full font-semibold bg-[#4f285e] text-[#4f285e]">
        <div className="flex flex-col justify-center p-8 w-full rounded-[32px]">
          <button 
            className="gap-2 self-stretch px-3 py-5 w-full bg-white min-h-[64px] rounded-[32px]"
            onClick={handleClick} // Attach the click handler
          >
            Get Started!
          </button>
        </div>
      </footer>
    </section>
  );
};

export default BenefitsComponent;