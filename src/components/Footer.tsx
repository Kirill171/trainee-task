import logoIcon from '@/assets/logo.png';
import logoModsenIcon from '@/assets/logo modsen.png';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="flex justify-center py-8 w-full h-[127px]">
      <nav className="flex justify-between items-center w-[80rem]">
        <div className="flex items-end font-inter">
          <Link to="/">
            <img src={logoIcon} alt="logo" className="m-2 w-auto h-[53px]" />
          </Link>
          <Link to="/">
            <p className="m-0 font-[300] text-black text-xl leading-8">
              Museum of <span className="font-medium text-[#E0A449]">Art</span>
            </p>
          </Link>
        </div>
        <div className="flex h-6 text-lg">
          <a
            href="https://www.modsen-software.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <img src={logoModsenIcon} alt="book mark icon" />
          </a>
        </div>
      </nav>
    </footer>
  );
}
