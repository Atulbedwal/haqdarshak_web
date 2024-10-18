"use client"; // Ensure this component is treated as a client component
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for the new App Router

const Home: React.FC = () => {
  const router = useRouter(); // Get the router instance

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/home2'); // Navigate to the home2 page after 3 seconds
    }, 3000); // 3000 milliseconds = 3 seconds

    // Cleanup the timeout if the component unmounts before the timer completes
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex overflow-hidden flex-col pt-44 mx-auto w-full bg-[#4F285E] max-w-[357px] rounded-[32px] h-[810px]">
      <section className="flex relative flex-col items-center px-16 pt-12 pb-96 mt-10 w-full aspect-[0.802]">
        <img
          src='/pics/1.png'
          alt="Center Image"
          className="object-contain"
          loading="lazy"
        />
      </section>
    </main>
  );
};

export default Home;