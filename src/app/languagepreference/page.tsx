"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // For navigation
import Link from 'next/link';

const loginOptions = [
  { value: 'English', text: "English" },
  { value: 'Hindi', text: "हिंदी" },
  { value: 'Kannada', text: "ಕನ್ನಡ" },
];

const LanguagePreference: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('English'); // Default to 'English'
  const router = useRouter(); // To navigate to another page after selecting language

  const handleOptionChange = (value: string) => {
    setSelectedOption(value); // Update the selected option
  };

  const handleNextClick = () => {
    // Navigate to the login page, you can also pass the selected language if needed
    router.push(`/login?lang=${selectedOption}`);
  };

  // The LoginOption component is defined here within the LanguagePreference component
  const LoginOption: React.FC<{ text: string; value: string; checked: boolean; onChange: (value: string) => void; className?: string }> = ({ text, value, checked, onChange, className }) => {
    return (
      <div className={`flex flex-col justify-center px-4 py-6 w-full rounded-3xl border border-solid bg-stone-200 border-stone-300 max-w-[296px] ${className}`}>
        <div className="flex gap-2 items-center w-full">
          <input 
            type="radio" 
            value={value} 
            checked={checked} 
            onChange={() => onChange(value)} 
            className="w-5 h-5 text-purple-600 border-gray-300 focus:ring-purple-500"
          />
          <div className="flex-1 text-lg font-medium text-neutral-600">{text}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col mx-auto items-center justify-center w-[357px]  rounded-[32px_32px_32px_32px] bg-[#4f285e] ">
      <header className="flex flex-col p-8 w-full bg-[#4f285e] relative z-10 rounded-[32px]">
        <div className="flex gap-10 justify-between items-center w-full max-w-[296px]">
        <Link href="/home2">
            <button className="flex gap-2 items-start self-stretch px-4 py-2 my-auto w-14 bg-white shadow-lg rounded-[64px]">
              <img loading="lazy" src="/pics/Arrow.png" className="object-contain w-6 aspect-square" alt="" />
            </button>
            </Link>
        </div>
        <h1 className="mt-8 max-w-full text-3xl font-medium text-white w-[296px]">
        Which language do you prefer?
        </h1>
      </header>

      <main className="flex overflow-hidden flex-col flex-1 justify-between items-center pt-8 w-full text-base bg-stone-100 rounded-[32px] max-sm:mb-1">
        <section className="flex flex-col max-w-full text-neutral-600 w-[296px] rounder-[32px]">
          {loginOptions.map((option, index) => (
            <LoginOption
              key={index}
              text={option.text}
              value={option.value}
              checked={selectedOption === option.value}
              onChange={handleOptionChange}
              className={index > 0 ? "mt-6" : ""}
            />
          ))}
        </section>

        <div className="flex flex-col justify-center p-8 mt-36 w-full font-semibold text-white whitespace-nowrap bg-stone-100 rounded-[32px]">
          <button 
            className="gap-2 self-stretch px-3 py-5 w-full bg-[#4f285e] min-h-[64px] rounded-[32px]" 
            onClick={handleNextClick} 
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default LanguagePreference;