import Link from 'next/link';
import { AnimatedText } from '@/components/ui/animated-text';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="min-h-screen pt-32 px-4 sm:px-8 bg-gray-50 flex items-center justify-center">
      <div className="max-w-xl text-center">
        <span className="text-[#1F7A53] font-bold tracking-widest uppercase mb-4 block">Error 404</span>
        <AnimatedText el="h1" text="Page Not Found" className="text-5xl sm:text-7xl font-extrabold mb-6 text-[#0B3D2E]" />
        <p className="text-xl text-gray-600 mb-10">
          The supply chain link you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link href="/">
          <Button className="h-14 px-8 text-lg rounded-full">Return Home</Button>
        </Link>
      </div>
    </main>
  );
}
