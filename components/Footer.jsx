import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-10">
      <div className="max-w-screen-2xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Brand */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-2xl font-bold">TechMart</h2>
          <p className="text-sm mt-1">&copy; 2025 TechMart. All rights reserved.</p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 text-white text-lg">
          <a
            href="#"
            className="p-2 rounded-full bg-white text-blue-600 hover:bg-blue-500 hover:text-white transition"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            className="p-2 rounded-full bg-white text-blue-600 hover:bg-blue-500 hover:text-white transition"
          >
            <FaTwitter />
          </a>
          <a
            href="#"
            className="p-2 rounded-full bg-white text-blue-600 hover:bg-blue-500 hover:text-white transition"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            className="p-2 rounded-full bg-white text-blue-600 hover:bg-blue-500 hover:text-white transition"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-sm mt-6 text-white/80">
        Designed with by TechMart
      </div>
    </footer>
  );
}
