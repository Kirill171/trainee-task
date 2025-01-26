import { useState } from 'react';
import logoIcon from '@/assets/logo.png';
import bookMarkIcon from '@/assets/bookmark.png';
import homeIcon from '@/assets/home.png';
import barsIcon from '@/assets/bars.svg';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex justify-center bg-custom-gradient py-8 w-full h-[127px]">
      <nav className="flex justify-between items-center px-4 lg:px-0 w-[375px] md:w-[768px] lg:w-[80rem]">
        <div className="flex items-end font-inter">
          <Link to="/">
            <img
              src={logoIcon}
              alt="logo"
              className="m-2 w-auto h-[32px] md:h-[53px]"
            />
          </Link>
          <Link to="/">
            <p className="m-0 font-[300] text-white text-xl leading-8">
              Museum of <span className="font-medium text-[#E0A449]">Art</span>
            </p>
          </Link>
        </div>

        <div className="relative md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <img src={barsIcon} alt="burger menu icon" className="h-6" />
          </button>
          {isOpen && (
            <div className="absolute top-full right-0 bg-gray-800 text-white rounded-lg shadow-lg z-50 w-[200px]">
              <div className="flex flex-col items-start p-4 space-y-4">
                {location.pathname !== '/' && (
                  <Link
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded-md w-full"
                  >
                    <img src={homeIcon} alt="home icon" className="w-5 h-5" />
                    <span>Home</span>
                  </Link>
                )}
                <Link
                  to="/favorites"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded-md w-full"
                >
                  <img
                    src={bookMarkIcon}
                    alt="bookmark icon"
                    className="w-5 h-5"
                  />
                  <span>Your favorites</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="hidden md:flex gap-6 h-6 text-lg font-inter">
          {location.pathname !== '/' && (
            <Link to="/" className="flex items-center gap-1">
              <img src={homeIcon} alt="home icon" />
              <div className="font-[300] text-white">Home</div>
            </Link>
          )}
          <Link to="/favorites" className="flex items-center gap-1">
            <img src={bookMarkIcon} alt="book mark icon" />
            <div className="font-[300] text-white">Your favorites</div>
          </Link>
        </div>
      </nav>
    </header>
  );
}
