export function TrustBadges() {
  return (
    <section className="bg-gray-50 py-16 border-y border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 text-center">
         <p className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-8">Trusted by global leaders in agriculture and sourcing</p>
         <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale">
            {/* Replace with actual SVGs or images later, using text placeholders for now */}
            <span className="text-2xl font-black font-serif">Cargill</span>
            <span className="text-2xl font-black">Olam</span>
            <span className="text-2xl font-black font-serif italic">Unilever</span>
            <span className="text-2xl font-black tracking-tighter">Nestlé</span>
            <span className="text-2xl font-black">Bunge</span>
         </div>
      </div>
    </section>
  );
}
