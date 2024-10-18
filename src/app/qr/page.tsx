"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import Link from 'next/link';

const QRLoginComponent: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const router = useRouter(); // Initialize the router

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      console.log('Selected file:', file);
    }
  };

  const handleUploadClick = () => {
    if (selectedImage) {
      console.log('Uploading file:', selectedImage);
    } else {
      console.log('No file selected');
    }
  };

  const handleUsePhoneNumberClick = () => {
    router.push('/mobileinput'); // Navigate to the mobile input page
  };

  return (
    <main className="flex overflow-hidden flex-col justify-center bg-rose-100 max-w-[360px] rounded-[32px] mx-auto">
      <div className="flex flex-col w-full min-h-[696px]">
        <header className="flex gap-10 justify-between items-center px-8 py-9 w-full bg-rose-100 min-h-[93px]">
        <Link href="/login">
            <button className="flex gap-2 items-start self-stretch px-4 py-2 my-auto w-14 bg-white shadow-lg rounded-[64px]">
              <img loading="lazy" src="/pics/Arrow.png" className="object-contain w-6 aspect-square" alt="" />
            </button>
            </Link>
          <img loading="lazy" src="/pics/Torch.png" alt="" className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square" />
        </header>

        <section className="flex flex-col items-center p-2.5 w-full bg-rose-100 min-h-[550px] max-sm:mr-9">
          <h2 className="text-base font-semibold leading-6 text-center text-zinc-700">
            Scan QR from Yojana Card to login
          </h2>
          <div className="flex gap-2.5 justify-center items-center mt-2.5 bg-white rounded-xl border-4 border-pink-500 border-solid h-[194px] min-h-[194px] w-[194px]">
            <img loading="lazy" src="/pics/QR.png" alt="QR Code" className="object-contain self-stretch my-auto rounded-lg aspect-square w-[164px]" />
          </div>
          <input
            type="file"
            accept="image/png, image/jpeg" // Accept only PNG and JPG files
            className="hidden" // Hide the default file input
            id="file-upload"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload" className="gap-2 px-3.5 py-2 mt-2.5 text-xs font-medium text-center bg-white shadow-lg rounded-[32px] text-zinc-700 cursor-pointer">
            Upload Image from Gallery
          </label>
        </section>

        <section className="flex relative flex-col px-8 py-5 -mt-px w-full text-base font-semibold bg-stone-100 min-h-[140px] rounded-[32px] z-[1]">
          <div className="flex gap-8 justify-center items-center w-full text-center whitespace-nowrap text-zinc-700">
            <div className="flex-1 shrink self-stretch my-auto h-px border border-solid basis-0 bg-neutral-200 border-neutral-200 w-[105px]" />
            <div className="self-stretch my-auto">{'OR'}</div>
            <div className="flex-1 shrink self-stretch my-auto h-px border border-solid basis-0 bg-neutral-200 border-neutral-200 w-[104px]" />
          </div>

          <button className="gap-2 self-center px-3 py-5 mt-2.5 max-w-full text-white bg-[#4f285e] min-h-[64px] rounded-[32px] w-[296px]" onClick={handleUsePhoneNumberClick}>
            {'Use Phone Number'}
          </button>
        </section>
      </div>
    </main>
  );
};

export default QRLoginComponent;