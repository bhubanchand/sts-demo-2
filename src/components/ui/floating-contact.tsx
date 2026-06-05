"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function FloatingContact() {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
      <Link href="/contact">
        <div className="group bg-[#53D769] hover:bg-[#0B3D2E] border-l-4 border-white transition-all duration-300 shadow-2xl rounded-l-2xl flex flex-col items-center justify-center py-6 px-3 cursor-pointer">
          <MessageCircle className="w-6 h-6 text-[#0B3D2E] group-hover:text-white mb-4 transition-colors" />
          <span 
            className="text-[#0B3D2E] group-hover:text-white font-black text-sm tracking-[0.2em] uppercase transition-colors" 
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            Contact Us
          </span>
        </div>
      </Link>
    </div>
  );
}
