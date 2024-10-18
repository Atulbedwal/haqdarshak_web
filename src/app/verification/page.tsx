"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // For navigation

const loginOptions = [
  { value: 'Yes', text: "Yes" },
  { value: 'No', text: "No, I want to complete OTP verification." },
];

const VerificationFlow: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('Yes'); // Default to 'Yes'
  const router = useRouter(); // To navigate to another page after selecting language

  const handleOptionChange = (value: string) => {
    setSelectedOption(value); // Update the selected option
  };

  const handleNextClick = () => {
    // Navigate to different pages based on the selected option
    if (selectedOption === 'Yes') {
      router.push('/personaldetails'); // Redirect to the Personal Details page
    } else {
      router.push('/otpverify'); // Redirect to the OTP Verification page
    }
  };

  return (
    <main className="flex overflow-hidden flex-col mx-auto w-[360px] h-[800px] bg-[#4f285e] rounded-[32px_32px] relative">
      {/* Header section */}
      <header className="flex flex-col p-8 w-full bg-[#4f285e] relative z-10">
        <div className="flex gap-10 justify-between items-center w-full max-w-[296px]">
          <div className="flex gap-2 items-start self-stretch px-4 py-2 my-auto w-14 bg-white shadow-lg rounded-[64px]">
            <img loading="lazy" src="/pics/Arrow.png" alt="" />
          </div>
        </div>
        <h1 className="mt-8 max-w-full text-3xl font-medium text-white w-[296px]">
          Do you want to proceed without OTP?
        </h1>
      </header>

      {/* Main content section */}
      <section className="flex flex-col flex-1 items-center pt-8 w-full bg-stone-100 rounded-t-[32px]">
        <div className="flex flex-col flex-1 items-center">
          {loginOptions.map((option, index) => (
            <div key={index} className={`flex flex-col justify-center px-4 py-6 w-full rounded-3xl border border-solid bg-stone-200 border-stone-300 max-w-[296px] ${index > 0 ? "mt-6" : ""}`}>
              <div className="flex gap-2 items-center w-full">
                <input 
                  type="radio" 
                  value={option.value} 
                  checked={selectedOption === option.value} 
                  onChange={() => handleOptionChange(option.value)} 
                  className="w-5 h-5 text-purple-600 border-gray-300 focus:ring-purple-500"
                />
                <div className="flex-1 text-lg font-medium text-neutral-600">{option.text}</div>
              </div>
            </div>
          ))}
          <p className="mt-3 text-sm leading-5 text-stone-500">
             Proceed without OTP if you live in an area with low network connectivity.
          </p>
        </div>

        {/* Next button section */}
        <div className="flex justify-center p-8 mt-auto w-full font-semibold text-white whitespace-nowrap">
          <button 
            className="gap-2 self-stretch px-3 py-5 w-full bg-[#4f285e] min-h-[64px] rounded-[32px]" 
            onClick={handleNextClick} 
          >
            Next
          </button>
        </div>
      </section>
    </main>
  );
};

export default VerificationFlow;