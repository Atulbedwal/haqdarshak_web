'use client';
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

// OTPInput Component
const OTPInput: React.FC<{ otp: string[]; setOtp: React.Dispatch<React.SetStateAction<string[]>> }> = ({ otp, setOtp }) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (!newOtp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  return (
    <div className="flex gap-2 w-full min-h-[70px]">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          ref={(el) => {
            inputRefs.current[index] = el as HTMLInputElement;
          }}
          value={digit}
          className="flex shrink-0 rounded-3xl border border-solid bg-stone-200 border-stone-200 h-[69px] w-[68px] text-center text-2xl text-black"
          aria-label={`OTP digit ${index + 1}`}
          onChange={(e) => handleInputChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  );
};

// ResendCode Component
const ResendCode: React.FC<{ timer: string; resendOtp: () => void; disableResend: boolean }> = ({ timer, resendOtp, disableResend }) => {
  return (
    <div className="flex gap-3 justify-center items-start mt-4 w-full">
      <div className="flex flex-col min-w-[240px] w-[290px]">
        <p className="text-xs text-stone-500">We have sent an OTP to your mobile number</p>
        <p className="text-base text-zinc-700">
          {disableResend ? `Resend code in ${timer}` : (
            <button className="text-blue-500" onClick={resendOtp}>
              Resend OTP
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

// OTPVerification Component
const OTPVerification: React.FC<{ title: string }> = ({ title }) => {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [phoneNumber, setPhoneNumber] = useState<string>(""); // Phone number from query params
  const [phoneNumber2, setPhoneNumber2] = useState<string>(""); // Phone number to track changes
  const [timer, setTimer] = useState(180);
  const [disableResend, setDisableResend] = useState(true);

  const currentUrl = new URL(window.location.href);
  const queryPhoneNumber = '+' + currentUrl.searchParams.get('phoneNumber')?.replace(/\s+/g, '');
  // queryPhoneNumber.join(' ');
  // queryPhoneNumber = `+${queryPhoneNumber}`;
  console.log(queryPhoneNumber);



  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setDisableResend(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };
  const handleNextClick = async () => {
    const enteredOtp = otp.join(""); // Combine OTP digits
    console.log("Phone Number:", phoneNumber2, "OTP:", enteredOtp);

    try {
      const response = await axios.post('http://localhost:3001/verify-otp', { phoneNumber: queryPhoneNumber, userOTP: enteredOtp });
      console.log("Server Response:", response.data);
      if (response.data.success) {
        toast.success('OTP verified successfully');
        router.push('/personaldetails')
        // Handle successful OTP verification logic (e.g., redirect)
      } else {
        toast.error('Invalid OTP');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error:', error.response || error.message); // Handle error response
      } else {
        console.error('Error:', error); // Handle unknown error type
      }
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        toast.error('Unauthorized: OTP verification failed');
      } else {
        toast.error('Error verifying OTP');
      }
    }

    setOtp(["", "", "", ""]);
  };

  const resendOtp = async () => {
    setDisableResend(true);
    setTimer(180);
    console.log("Resending OTP to the same number...");

    try {
      const response = await axios.post('http://localhost:3001/resend-otp', { phoneNumber: queryPhoneNumber });
      console.log("Resend OTP Response:", response.data);
      toast.success('OTP resent successfully');
    } catch (error) {
      console.error('Error resending OTP:', error);
      toast.error('Failed to resend OTP');
    }
  };

  return (
    <section className="flex flex-col items-center w-full h-screen max-w-[360px] mx-auto rounded-[32px] bg-[#4f285e]">
      <header className="flex flex-col p-8 w-full bg-[#4f285e] rounded-t-[32px]">
        <div className="flex gap-10 justify-between items-center w-full max-w-[296px]">
          <Link href="/mobileinput">
            <button className="flex gap-2 items-start self-stretch px-4 py-2 my-auto w-14 bg-white shadow-lg rounded-[64px]">
              <img loading="lazy" src="/pics/Arrow.png" className="object-contain w-6 aspect-square" alt="" />
            </button>
          </Link>
        </div>
        <h1 className="mt-8 max-w-full text-3xl font-medium text-white w-[296px]">
          What is the OTP?
        </h1>
      </header>
      <main className="flex flex-col flex-1 items-center w-full bg-stone-100 px-6 py-8 rounded-[32px] h-full">
        <div className="flex flex-col max-w-full w-[296px]">

          <OTPInput otp={otp} setOtp={setOtp} />
          <ResendCode
            timer={formatTime(timer)}
            resendOtp={resendOtp}
            disableResend={disableResend}
          />
          <button
            className="gap-2 self-stretch px-3 py-5 w-full bg-[#4f285e] min-h-[64px] rounded-[32px] mt-6 text-white"
            onClick={handleNextClick}
          >
            Next
          </button>
        </div>
      </main>
      <ToastContainer />
    </section>
  );
};

// Main Page Component
const Page: React.FC = () => {
  return <OTPVerification title="OTP Verification" />;
};

export default Page;