import logoIcon from '@/assets/logo.png';
import bookMarkIcon from '@/assets/bookmark.png';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="flex justify-center bg-custom-gradient py-8 w-full h-[127px]">
      <nav className="flex justify-between items-center w-[80rem]">
        <div className="flex items-end font-inter">
          <Link to="/">
            <img src={logoIcon} alt="logo" className="m-2 w-auto h-[53px]" />
          </Link>
          <Link to="/">
            <p className="m-0 font-[300] text-white text-xl leading-8">
              Museum of <span className="font-medium text-[#E0A449]">Art</span>
            </p>
          </Link>
        </div>
        <div className="flex h-6 text-lg font-inter">
          <Link to="/favorites" className="flex items-center gap-2">
            <img src={bookMarkIcon} alt="book mark icon" />
            <div className="font-[300] text-white">Your favorites</div>
          </Link>
        </div>
      </nav>
    </header>
  );
}
