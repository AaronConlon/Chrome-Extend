import { ev } from '@chrome-extend/utils';
import { Link } from '@tanstack/react-router';
import { PiNotebookThin, PiPasswordThin } from 'react-icons/pi';

export default function Header() {
  return (
    <div className="sticky top-0 flex gap-2 p-2 md:p-4">
      <Link to="/" className="[&.active]:font-bold">
        Admin
      </Link>
      <div className="flex gap-2 ml-auto">
        <Link
          to="/about"
          className={ev(
            '[&.active]:(font-bold,bg-sky-400,text-white,p-1) flex gap-1 items-center rounded-sm'
          )}
        >
          <PiPasswordThin />
          About
        </Link>
        <Link
          to="/book"
          className={ev(
            '[&.active]:(font-bold,bg-sky-400,text-white,p-1)  flex gap-1 items-center rounded-sm'
          )}
        >
          <PiNotebookThin size={24} />
          Book
        </Link>
      </div>
    </div>
  );
}
