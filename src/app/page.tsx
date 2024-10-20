"use client"; // To ensure this is treated as a client component
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HomePage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/home2'); // Redirect to '/home2' after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer if component unmounts
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

export default HomePage;