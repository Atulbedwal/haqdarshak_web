"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import Link from 'next/link';

const loginOptions = [
  { value: 'new-user', text: "Register me as a new user" },
  { value: 'phone-number', text: "Use my Phone Number" },
  { value: 'yojana-card', text: "Use my Yojana Card" },
];

const LoginFlow: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('new-user'); // Default selected option
  const router = useRouter(); // Initialize the router

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleNextClick = () => {
    // Redirect based on selected option
    switch (selectedOption) {
      case 'new-user':
        router.push('/location'); // Redirect to location page
        break;
      case 'phone-number':
        router.push('/mobileinput'); // Redirect to mobile input page
        break;
      case 'yojana-card':
        router.push('/qr'); // Redirect to QR page
        break;
      default:
        break;
    }
  };

  // The LoginOption component is defined here within the LoginFlow file
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
    <div className="flex flex-col items-center mx-auto justify-center w-[357px] h-[800px] rounded-[32px_32px_32px_32px] bg-[#4f285e] ">
     <header className="flex flex-col p-8 w-full bg-[#4f285e] relative z-10 rounded-[32px]">
        <div className="flex gap-10 justify-between items-center w-full max-w-[296px]">
        <Link href="/languagepreference">
            <button className="flex gap-2 items-start self-stretch px-4 py-2 my-auto w-14 bg-white shadow-lg rounded-[64px]">
              <img loading="lazy" src="/pics/Arrow.png" className="object-contain w-6 aspect-square" alt="" />
            </button>
            </Link>
        </div>
        <h1 className="mt-8 max-w-full text-3xl font-medium text-white w-[296px]">
          How do you want to login?
        </h1>
      </header>

      <main className="flex overflow-hidden flex-col flex-1 justify-between items-center pt-8 w-full text-base bg-stone-100 rounded-[32px] max-sm:mb-1">
        <section className="flex flex-col max-w-full text-neutral-600 w-[296px]">
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
            onClick={handleNextClick} // Call the navigation function on button click
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default LoginFlow;