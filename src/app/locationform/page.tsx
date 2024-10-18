"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import stateDistrictData from '../data/states-and-districts.json'; // Adjust the path according to your project structure
import Link from 'next/link';

const LocationForm: React.FC = () => {
  const router = useRouter(); // Initialize useRouter
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [pincode, setPincode] = useState<string>('');
  const [isStateSearchActive, setIsStateSearchActive] = useState<boolean>(false);
  const [isDistrictSearchActive, setIsDistrictSearchActive] = useState<boolean>(false);
  const [stateSearchQuery, setStateSearchQuery] = useState<string>('');
  const [districtSearchQuery, setDistrictSearchQuery] = useState<string>('');

  // Get the selected state from query parameters
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const state = query.get('state');
    if (state) {
      setSelectedState(state);
    }
  }, []);

  // Filter districts based on selected state
  const availableDistricts = selectedState
    ? stateDistrictData.states.find(state => state.state === selectedState)?.districts || []
    : [];

  // Filter states based on search query
  const filteredStates = stateDistrictData.states.filter(state =>
    state.state.toLowerCase().includes(stateSearchQuery.toLowerCase())
  );

  // Filter districts based on search query
  const filteredDistricts = availableDistricts.filter(district =>
    district.toLowerCase().includes(districtSearchQuery.toLowerCase())
  );

  // Handle state selection
  const handleStateSelect = (state: string) => {
    setSelectedState(state);
    setIsStateSearchActive(false);
    setDistrictSearchQuery(''); // Reset district search when state changes
    setSelectedDistrict('');
  };

  // Handle district selection
  const handleDistrictSelect = (district: string) => {
    setSelectedDistrict(district);
    setIsDistrictSearchActive(false);
  };

  // Handle pincode change
  const handlePincodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPincode(event.target.value);
  };

  // Check if all required information is entered
  const isFormValid = selectedState && selectedDistrict && pincode.length === 6;

  const handleNext = async () => {
    if (isFormValid) {
      console.log({ selectedState, selectedDistrict, pincode });

      try {
        // Make a POST request to your Express server to save location details
        const response = await fetch('http://localhost:3001/save-location', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            state: selectedState,
            district: selectedDistrict,
            pincode: pincode,
          }),
        });

        if (response.ok) {
          console.log('Location details saved successfully!');
          router.push('/mobileinput'); // Navigate to next page
        } else {
          console.error('Failed to save location details');
        }
      } catch (error) {
        console.error('Error while saving location details:', error);
      }
    }
  };


  return (
    <main className="flex overflow-hidden flex-col justify-center max-w-[360px] rounded-[32px] bg-[#4f285e] mx-auto">
      <div className="flex flex-col w-full min-h-[800px] relative">
        <header className="flex flex-col p-8 w-full bg-[#4f285e] rounded-[32px_32px_0_0]">
          <div className="flex gap-10 justify-between items-center w-full max-w-[296px]">
            <Link href={'/location'}>
              <button className="flex gap-2 items-start self-stretch px-4 py-2 my-auto w-14 bg-white shadow-lg rounded-[64px]">
                <img loading="lazy" src="/pics/Arrow.png" className="object-contain w-6 aspect-square" alt="" />
              </button>
            </Link>
          </div>
          <h1 className="mt-8 max-w-full text-3xl font-medium text-white w-[296px]">
            Enter your location
          </h1>
        </header>
        <section className="flex flex-col flex-1 gap-4 p-4 w-full h-full bg-stone-100 rounded-[32px_32px_32px_32px]">
          <div className="relative">
            <button
              className="flex justify-between items-center w-full px-4 py-6 rounded-3xl border border-solid bg-stone-200 border-stone-300 text-neutral-600"
              onClick={() => {
                setIsStateSearchActive(true);
                setStateSearchQuery('');
              }}
            >
              <span className="text-neutral-500">{selectedState || 'Select State'}</span>
              <img loading="lazy" src="/pics/Down.png" alt="Dropdown icon" className="object-contain shrink-0 w-6 aspect-square" />
            </button>

            {isStateSearchActive && (
              <div className="absolute z-10 mt-2 w-full bg-white border border-stone-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                {filteredStates.map((state, index) => (
                  <div
                    key={index}
                    onClick={() => handleStateSelect(state.state)}
                    className="px-4 py-2 hover:bg-stone-100 cursor-pointer text-neutral-600"
                  >
                    {state.state}
                  </div>
                ))}
                {filteredStates.length === 0 && (
                  <div className="px-4 py-2 text-neutral-500">No results found</div>
                )}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              className="flex justify-between items-center w-full px-4 py-6 rounded-3xl border border-solid bg-stone-200 border-stone-300 text-neutral-600"
              onClick={() => {
                setIsDistrictSearchActive(true);
                setDistrictSearchQuery('');
              }}
              disabled={!selectedState} // Disable if no state is selected
            >
              <span className="text-neutral-500">{selectedDistrict || 'Select District'}</span>
              <img loading="lazy" src="/pics/Down.png" alt="Dropdown icon" className="object-contain shrink-0 w-6 aspect-square" />
            </button>

            {isDistrictSearchActive && (
              <div className="absolute z-10 mt-2 w-full bg-white border border-stone-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                {filteredDistricts.map((district, index) => (
                  <div
                    key={index}
                    onClick={() => handleDistrictSelect(district)}
                    className="px-4 py-2 hover:bg-stone-100 cursor-pointer text-neutral-600"
                  >
                    {district}
                  </div>
                ))}
                {filteredDistricts.length === 0 && (
                  <div className="px-4 py-2 text-neutral-500">No results found</div>
                )}
              </div>
            )}
          </div>

          <input
            type="text"
            value={pincode}
            onChange={handlePincodeChange}
            maxLength={6}
            className="px-4 py-6 mt-4 rounded-3xl border border-solid bg-stone-200 border-stone-300 text-neutral-600 focus:outline-none"
            placeholder="Enter Pincode"
          />

          {/* Add a div with flex-grow to push the button to the bottom */}
          <div className="flex-grow" />

          <button
            onClick={handleNext}
            className={`px-3 py-5 w-full text-center rounded-3xl bg-[#4f285e] text-white font-semibold ${isFormValid ? '' : 'opacity-50 cursor-not-allowed'}`}
            disabled={!isFormValid}
          >
            Next
          </button>
        </section>
      </div>
    </main>
  );
};

export default LocationForm;