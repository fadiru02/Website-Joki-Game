export default function GridPage() {
  return (
      <div className="w-full p-8 lg:p-16 text-center shadow-sm">
        <div className="inline-block bg-white border border-black shadow-sm rounded-full px-4 py-1.5 mb-6">
          <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">
            Dijamin Aman & Terpercaya
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-12 tracking-tight">
          Kenapa Memilih JOCKY?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white rounded-3xl p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-black hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 text-gray-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">5000+</h3>
            <p className="text-sm font-semibold text-gray-900 mb-3">
              Terpercaya oleh Lebih dari 1000 Pelanggan
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              Memberikan layanan joki game terbaik dengan ulasan positif dari pelanggan setia kami.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-black hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5   h-5 text-gray-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">200+</h3>
            <p className="text-sm font-semibold text-gray-900 mb-3">
              Layanan Joki Beragam & Lengkap
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              Menyediakan berbagai jenis layanan joki untuk berbagai game populer sesuai kebutuhan Anda.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-black hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 text-gray-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                />
              </svg>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <h3 className="text-3xl font-bold text-gray-900">Joki Cepat</h3>
            </div>
            <p className="text-sm font-semibold text-gray-900 mb-3">
              Proses Joki yang Cepat & Efisien
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              Tim joki profesional kami bekerja cepat untuk menyelesaikan pesanan Anda tanpa mengorbankan kualitas.
            </p>
          </div>
        </div>
      </div>
  );
}
