"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// IconButton Component
const IconButton: React.FC<{ icon: string; alt: string }> = ({ icon, alt }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()} // Back button functionality
      className="flex gap-2 items-start self-stretch px-4 py-2 my-auto w-14 bg-white shadow-lg rounded-[64px]"
    >
      <img loading="lazy" src={icon} alt={alt} className="object-contain w-6 aspect-square" />
    </button>
  );
};

// InputSection Component
const InputSection: React.FC<{
  phoneNumber: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNextClick: () => void;
  isButtonVisible: boolean;
}> = ({ phoneNumber, onInputChange, onNextClick, isButtonVisible }) => {
  return (
    <section className="flex overflow-hidden flex-col flex-1 items-center pt-8 w-full bg-stone-100 rounded-[32px_32px_0px_0px]">
      <div className="flex flex-col items-center max-w-full w-[296px]">
        <form>
          <label htmlFor="mobileNumber" className="sr-only">Enter mobile number</label>
          <input
            id="mobileNumber"
            type="tel"
            value={phoneNumber}
            className="px-4 py-6 w-full text-base rounded-3xl border border-solid bg-stone-200 border-stone-300 text-neutral-600"
            placeholder="Enter mobile number"
            aria-label="Enter mobile number"
            onChange={onInputChange}
          />
        </form>
        <p className="mt-3 text-sm leading-5 text-stone-500">
          This is used to create an account in your name on the Haqdarshak app.
        </p>
        {isButtonVisible && (
          <button
            className="gap-2 self-stretch px-3 py-5 w-full bg-[#4f285e] min-h-[64px] rounded-[32px] mt-4"
            onClick={onNextClick}
          >
            Next
          </button>
        )}
      </div>
    </section>
  );
};

// Main MobileNumberInput Component
const MobileNumberInput: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isButtonVisible, setButtonVisible] = useState(false);
  const router = useRouter();
  const [previousPage, setPreviousPage] = useState('login'); // Initialize default

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const fromParam = searchParams.get('from');
    if (fromParam) {
      setPreviousPage(fromParam);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setButtonVisible(value.length > 0);
  };

  const handleNextClick = async () => {
    try {
      const response = await axios.post('https://haqdarshak-web.onrender.com/send-otp', { phoneNumber });

      if (response.data.success) {
        toast.success('OTP sent successfully');
        router.push(`/otpverify?from=${previousPage}&phoneNumber=${phoneNumber}`);
      } else {
        toast.error('Failed to send OTP');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error sending OTP');
    }
  };

  return (
    <main className="flex overflow-hidden flex-col justify-center max-w-[360px] rounded-[32px] mx-auto">
      <div className="flex flex-col w-full min-h-[800px] bg-[#4f285e]">
        <header className="flex flex-col p-8 w-full bg-[#4f285e] max-sm:mr-0">
          <Link href="/login">
            <IconButton icon="/pics/Arrow.png" alt="Go back" />
          </Link>
          <h1 className="mt-8 text-3xl font-medium leading-10 text-white">
            Enter your Mobile Number
          </h1>
        </header>
        {/* Input section where user enters their mobile number */}
        <InputSection
          phoneNumber={phoneNumber}
          onInputChange={handleInputChange}
          onNextClick={handleNextClick}
          isButtonVisible={isButtonVisible}
        />
      </div>
      <ToastContainer />
    </main>
  );
};

export default MobileNumberInput;