import { Link } from '@tanstack/react-router';
import { PiNotebookThin, PiPasswordThin } from 'react-icons/pi';

export default function Header() {
  return (
    <div className="sticky top-0 flex items-center gap-2 p-2 bg-white border-b border-gray-100 md:p-4">
      <Link to="/" className="[&.active]:font-bold">
        Admin
      </Link>
      <div className="flex gap-2 p-1 px-4 ml-auto border border-gray-200 rounded-full">
        <Link
          to="/about"
          className="active-menu-bar [&.active]:multi-[text-blue-600] flex gap-1 items-center rounded-sm transform transition-transform duration-300 ease-in-out hover:scale-110"
        >
          <PiPasswordThin />
          About
        </Link>
        <Link
          to="/book"
          className="active-menu-bar [&.active]:multi-[text-blue-600] flex gap-1 items-center rounded-sm transform hover:scale-110 transition-transform duration-300 ease-in-out"
        >
          <PiNotebookThin size={24} />
          Book
        </Link>
      </div>
    </div>
  );
}
