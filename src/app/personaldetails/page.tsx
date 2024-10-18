"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';  // Import useRouter
import Link from 'next/link';

// PersonalDetails Component
const PersonalDetails: React.FC = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');
  const router = useRouter(); // Initialize the router

  const handleNextClick = () => {
    // Validate required fields
    if (!name || !gender || (!dob && !age)) {
      alert('Please fill in all required fields.'); // Alert user if fields are missing
      return; // Prevent navigation if validation fails
    }

    // Prepare data for sending to the database
    const personalDetails = {
      name,
      gender,
      dob,
      age,
    };

    // Mock function to represent sending data to a database
    console.log('Sending data to the database:', personalDetails);
    
    // Here you would typically send the data to your backend
    // For example: fetch('/api/personal-details', { method: 'POST', body: JSON.stringify(personalDetails) });

    // Navigate to the exit 1 page
    router.push('/exit1'); // Adjust the path according to your routing setup
  };

  // Check if the form is valid for enabling the Next button
  const isFormValid = name && gender && (dob || age);

  return (
    <main className="flex overflow-hidden flex-col justify-center bg-[#4f285e] max-w-[360px] rounded-[32px] mx-auto">
      <header className="flex flex-col p-8 w-full bg-[#4f285e] relative z-10">
        <div className="flex gap-10 justify-between items-center w-full max-w-[296px]">
        <Link href="/verification">
            <button className="flex gap-2 items-start self-stretch px-4 py-2 my-auto w-14 bg-white shadow-lg rounded-[64px]">
              <img loading="lazy" src="/pics/Arrow.png" className="object-contain w-6 aspect-square" alt="" />
            </button>
            </Link>
        </div>
        <h1 className="mt-8 max-w-full text-3xl font-medium text-white w-[296px]">
          Personal Details
        </h1>
      </header>
      <section className="flex overflow-hidden flex-col flex-1 items-center pt-8 w-full bg-stone-100 rounded-[32px_32px_32px_32px]">
        <div className="flex flex-col max-w-full w-[296px]">
          {/* Name Input */}
          <div className="flex flex-col w-full text-base">
            <label htmlFor="name" className="font-medium text-gray-800">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="px-4 py-6 mt-4 w-full rounded-3xl border border-solid bg-stone-200 border-stone-300 text-neutral-600"
              placeholder="Enter your Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <hr className="w-full mt-6 border-t border-stone-200" />
          
          {/* Gender Selection */}
          <div className="flex flex-col mt-6 w-full max-w-[296px]">
            <fieldset>
              <legend className="text-base font-medium text-gray-800">Gender</legend>
              <div className="flex gap-9 items-start mt-4">
                {['Male', 'Female', 'Other'].map((option) => (
                  <div key={option} className="flex gap-2 items-center rounded">
                    <input
                      type="radio"
                      id={option.toLowerCase()}
                      name="gender"
                      className="w-6 h-6 rounded-full border border-solid bg-stone-200 border-stone-300"
                      checked={gender === option}
                      onChange={() => setGender(option)}
                    />
                    <label htmlFor={option.toLowerCase()} className="self-stretch my-auto text-sm leading-none text-neutral-600">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
          <hr className="w-full mt-6 border-t border-stone-200" />

          {/* Date of Birth / Age Input */}
          <div className="flex flex-col mt-6 w-full text-base">
            <label htmlFor="dob" className="font-medium text-gray-800">DOB/Age</label>
            <div className="flex gap-2.5 items-center mt-4 w-full text-neutral-600">
              <input
                type="text"
                id="dob"
                className="self-stretch px-4 py-6 my-auto rounded-3xl border border-solid bg-stone-200 border-stone-300 w-[190px]"
                placeholder="Enter your Birthday"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
              <span className="self-stretch my-auto text-sm leading-none">OR</span>
              <input
                type="text"
                id="age"
                className="self-stretch px-4 py-6 my-auto whitespace-nowrap rounded-3xl border border-solid bg-stone-200 border-stone-300 w-[66px]"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
          </div>

          <p className="mt-6 text-sm leading-5 text-stone-500">
            This information helps us suggest schemes that are right for you.
          </p>

          {/* Next Button */}
          <button 
            className={`gap-2 self-stretch px-3 py-5 w-full bg-[#4f285e] min-h-[64px] rounded-[32px] mt-6 ${isFormValid ? '' : 'opacity-50 cursor-not-allowed'}`} 
            onClick={handleNextClick}
            disabled={!isFormValid} // Disable button if the form is not valid
          >
            Next
          </button>
          <div>
            <p className="text-xs leading-4 underline text-stone-500 text-center mt-4">
              By creating an account, I agree to Haqdarshak’s Terms of Service & Privacy Policy
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PersonalDetails;