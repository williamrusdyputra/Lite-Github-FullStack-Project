import Image from 'next/image';
import Link from 'next/link';
import NavLink from './navlink';
import { useState } from 'react';

const Header = () => {
  const [menuState, setMenuState] = useState(false);

  const handleNavMenu = () => {
    setMenuState(!menuState);
    document.body.classList.toggle('overflow-hidden');
  };

  return (
    <header className="border-b-2">
      <nav>
        <div className="custom-screen items-center mx-auto md:flex">
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/pixel8labs/images/logo.svg"
                alt="logo"
                width={160}
                height={100}
              />
            </Link>
            <div className="md:hidden">
              <button
                aria-label="Open the menu"
                className="text-black"
                onClick={handleNavMenu}
              >
                {menuState ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div
            className={`flex-1 pb-3 mt-8 md:pb-0 md:mt-0 md:block ${
              menuState ? 'h-screen' : 'hidden'
            }`}
          >
            <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0 md:font-medium">
              <li>
                <NavLink
                  href="/start"
                  className="block font-medium text-white bg-primary hover:bg-button-hover md:inline"
                >
                  Login with Github
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
