'use client';

import { useEffect } from 'react';
import { AnimatedText } from '@/components/ui/animated-text';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen pt-32 px-4 sm:px-8 bg-gray-50 flex items-center justify-center">
      <div className="max-w-xl text-center">
        <span className="text-red-600 font-bold tracking-widest uppercase mb-4 block">System Error</span>
        <AnimatedText el="h1" text="Something went wrong" className="text-5xl sm:text-7xl font-extrabold mb-6 text-[#0B3D2E]" />
        <p className="text-xl text-gray-600 mb-10">
          We encountered an unexpected issue processing your request. Our technical team has been notified.
        </p>
        <Button onClick={() => reset()} className="h-14 px-8 text-lg rounded-full bg-[#0B3D2E] hover:bg-[#1F7A53]">
          Try again
        </Button>
      </div>
    </main>
  );
}
