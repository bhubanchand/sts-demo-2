"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function FloatingContact() {
  return (
    <div className="fixed right-0 top-[72%] -translate-y-1/2 z-50">
      <Link href="/contact">
        <div className="group bg-[#53D769] hover:bg-[#0B3D2E] border-l-2 md:border-l-4 border-white transition-all duration-300 shadow-2xl rounded-l-xl md:rounded-l-2xl flex flex-col items-center justify-center py-3 px-2.5 md:py-6 md:px-3 cursor-pointer">
          <MessageCircle className="w-4.5 h-4.5 md:w-6 md:h-6 text-[#0B3D2E] group-hover:text-white mb-2 md:mb-4 transition-colors" />
          <span 
            className="text-[#0B3D2E] group-hover:text-white font-black text-[10px] md:text-sm tracking-[0.15em] md:tracking-[0.2em] uppercase transition-colors" 
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            Contact Us
          </span>
        </div>
      </Link>
    </div>
  );
}
