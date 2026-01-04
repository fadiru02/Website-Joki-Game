import GridPage from "@/components/grid";

export default function Home() {
  return (
    <div>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden shadow-2xl">
        
        <div className="absolute inset-0 z-0">
          <img 
            src="/img/gambar.webp" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-4xl lg:text-6xl font-bold mb-6 text-white">
            Joki Games <span className="text-indigo-400">Berkualitas</span>
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-gray-200">
            JOCKY merupakan platform penyedia jasa untuk membantu anda
            menyelesaikan problem anda dalam game seperti leveling, rank up,
            dan lain-lain. Kami menyediakan joki-joki profesional yang siap
            membantu anda 24/7 dengan harga yang terjangkau.
          </p>
          <div className="flex justify-center">
            <div className="rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-10 py-4 border border-transparent text-base font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors md:text-lg"
              >
                Joki Sekarang
              </a>
            </div>
          </div>
        </div>
      </section>

      <GridPage />
    </div>
  );
}