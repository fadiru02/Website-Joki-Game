import Link from "next/link";

interface ProjectProps {
  title: string;

  image: string;
  buttonText: string;
  slug: string; // Tambahkan slug ke interface
}

const ProjectCard = ({ title, image, buttonText, slug }: ProjectProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full border border-gray-100 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {/* Container Gambar */}
      <div className="h-40 w-full bg-gray-200">
        <img
          className="h-full w-full object-cover"
          src={image || "https://placehold.co/600x400?text=No+Image"}
          alt={title}
        />
      </div>

      {/* Konten */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-indigo-700 font-bold text-lg mb-2 truncate">
          {title}
        </h3>
        {/* Tombol Action dengan Link Dinamis */}
        <Link href={`/user/katalog/${slug}`} className="block mt-4">
          <button className="w-full bg-indigo-600 text-white py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-colors">
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;