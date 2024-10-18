"use client"; // This marks the component as a Client Component

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

// Header Component
interface HeaderProps {
  logoSrc: string;
  welcomeText: string;
}

const Header: React.FC<HeaderProps> = ({ logoSrc, welcomeText }) => {
  return (
    <header className="flex flex-col items-center px-20 pt-72 w-full text-xl font-medium leading-tight bg-[#4f285e]">
      <h1>{welcomeText}</h1>
      <img 
        loading="lazy" 
        src={logoSrc} 
        alt="Company logo" 
        className="object-contain z-10 mt-3.5 mb-0 aspect-[1.9] w-[209px] bg-[#4f285e]" 
      />
    </header>
  );
};

// Content Component
interface ContentProps {
  successMessage: string;
}

const Content: React.FC<ContentProps> = ({ successMessage }) => {
  return (
    <section className="flex flex-col px-16 pt-16 pb-72 w-full text-base font-semibold leading-6 text-center bg-[#4f285e]">
      <p className="-mb-14 opacity-60">{successMessage}</p>
    </section>
  );
};

// Welcome Screen Component
interface WelcomeScreenProps {
  logoSrc: string;
  welcomeText: string;
  successMessage: string;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ logoSrc, welcomeText, successMessage }) => {
  return (
    <main className="flex overflow-hidden flex-col text-white bg-white max-w-[360px] rounded-[32px] mx-auto">
      <Header logoSrc={logoSrc} welcomeText={welcomeText} />
      <Content successMessage={successMessage} />
    </main>
  );
};

// Page Component
const Page: React.FC = () => {
  const logoSrc = "/pics/1.png"; // Update with your actual logo path
  const welcomeText = "Welcome to Our Service!";
  const successMessage = "Your profile has been created successfully!";
  
  const router = useRouter(); // Initialize the router

  // useEffect to handle redirection
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/exit2'); // Redirect to the exit page
    }, 3000); // 3000 milliseconds = 3 seconds

    // Cleanup function to clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <WelcomeScreen logoSrc={logoSrc} welcomeText={welcomeText} successMessage={successMessage} />
  );
};

export default Page;