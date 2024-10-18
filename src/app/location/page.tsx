"use client";
import React, { useState } from 'react';
import stateDistrictData from '../data/states-and-districts.json'; // Import your state data
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import Link from 'next/link';

const StateSelector: React.FC<{ onStateSelect?: (selectedState: string) => void }> = ({ onStateSelect }) => {
  const [isStateSearchActive, setIsStateSearchActive] = useState<boolean>(false);
  const [stateSearchQuery, setStateSearchQuery] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const router = useRouter();

  const filteredStates = stateDistrictData.states.filter((state) =>
    state.state.toLowerCase().includes(stateSearchQuery.toLowerCase())
  );

  const handleStateSelect = (state: string) => {
    setSelectedState(state);
    setIsStateSearchActive(false);
    if (onStateSelect) {
      onStateSelect(state);
    }
    // Navigate to the location form page after selecting a state with query parameters
    router.push(`/locationform?state=${encodeURIComponent(state)}`); // Pass selected state as a query parameter
  };

  return (
    <div className="relative w-full mb-6">
      {!isStateSearchActive ? (
        <button
          onClick={() => {
            setIsStateSearchActive(true);
            setStateSearchQuery('');
          }}
          className="flex gap-5 justify-between px-4 py-6 w-full rounded-3xl border border-solid bg-stone-200 border-stone-300 text-neutral-600"
        >
          <span className="text-neutral-500">{selectedState || 'Select State'}</span>
          <img
            loading="lazy"
            src="/pics/Down.png"
            alt="Dropdown icon"
            className="object-contain shrink-0 w-6 aspect-square"
          />
        </button>
      ) : (
        <input
          type="text"
          value={stateSearchQuery}
          onChange={(e) => setStateSearchQuery(e.target.value)}
          autoFocus
          className="w-full px-4 py-6 rounded-3xl border border-solid bg-stone-200 border-stone-300 text-neutral-600 focus:outline-none"
          placeholder="Search State..."
        />
      )}

      {isStateSearchActive && (
        <div className="absolute mt-2 w-full bg-white border border-stone-300 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">
          {filteredStates.map((state, index) => (
            <div
              key={index}
              onClick={() => handleStateSelect(state.state)} // Remove Link and use div
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
  );
};

const LocationSelector: React.FC = () => {
  return (
    <div className="flex flex-col max-w-[360px] bg-[#4f285e] rounded-[32px] mx-auto">
      <header className="flex flex-col p-8 w-full bg-[#4f285e] relative z-10 rounded-[32px]">
        <div className="flex gap-10 justify-between items-center w-full max-w-[296px]">
          <Link href={'/login'}>
          <button className="flex gap-2 items-start self-stretch px-4 py-2 my-auto w-14 bg-white shadow-lg rounded-[64px]">
            <img loading="lazy" src="/pics/Arrow.png" className="object-contain w-6 aspect-square" alt="" />
          </button>
          </Link>
        </div>
        <h1 className="mt-8 max-w-full text-3xl font-medium text-white w-[296px]">
          Choose location
        </h1>
      </header>
      <main className="flex overflow-hidden flex-col flex-1 justify-between items-center pt-8 w-full text-base bg-stone-100 rounded-[32px_32px_32px_32px] ">
        <div className="flex flex-col max-w-full w-[300px] h-[616px]">
          <StateSelector />
          <div className="flex gap-6 items-center mt-8 w-full font-semibold whitespace-nowrap">
            <img loading="lazy" src="/pics/Line.png" alt="" className="object-contain flex-1 shrink self-stretch my-auto aspect-[111.11] basis-0 stroke-[1px] stroke-neutral-200 w-[113px]" />
            <span className="self-stretch my-auto">OR</span>
            <img loading="lazy" src="/pics/Line.png" alt="" className="object-contain flex-1 shrink self-stretch my-auto w-28 aspect-[111.11] basis-0 stroke-[1px] stroke-neutral-200" />
          </div>
          <button className="flex gap-2 items-start px-6 py-4 mt-8 w-full font-semibold text-center bg-white rounded-3xl shadow-lg">
            <img loading="lazy" src="/pics/Location.png" alt="" className="object-contain shrink-0 w-6 aspect-square" />
            <span>Use current location</span>
          </button>
          <p className="mt-8 text-sm leading-5 text-stone-500">
            This is used to give you information more accurate to your area.
          </p>
        </div>
      </main>
    </div>
  );
};

// Main page component
const Page: React.FC = () => {
  return <LocationSelector />;
};

export default Page;