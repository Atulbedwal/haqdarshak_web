"use client"; // Mark this component as a client-side component

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // For Next.js 13 app directory

const SecondHome: React.FC = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Check if the component is mounted on the client
    setIsMounted(true);

    if (isMounted) {
      // Set a timeout to redirect to the LanguagePreference page after 3 seconds
      const timeout = setTimeout(() => {
        router.push('/languagepreference'); // Replace with the actual route of your LanguagePreference page
      }, 3000);

      // Clear the timeout if the component unmounts
      return () => clearTimeout(timeout);
    }
  }, [isMounted, router]);

  return (
    <main className="flex overflow-hidden flex-col pt-44 mx-auto w-full bg-fuchsia-100 max-w-[357px] rounded-[32px]">
      <header className="ml-8 w-80">
        <h1 className="text-4xl font-medium leading-10 text-zinc-700">
          Getting benefits is <br /> now easy!
        </h1>
      </header>

      <section className="flex relative flex-col items-center px-16 pt-12 pb-96 mt-10 w-full aspect-[0.802]">
        <img 
          loading="lazy" 
          src="/pics/2.png" 
          alt="Benefits illustration" 
          className="object-cover absolute inset-0 size-full"
        />
        <div 
          className="relative shrink-0 mb-0 h-3 bg-pink-500 border-pink-500 border-solid border-[12px] w-[113px]"
          role="presentation"
        />
      </section>
    </main>
  );
};

export default SecondHome;