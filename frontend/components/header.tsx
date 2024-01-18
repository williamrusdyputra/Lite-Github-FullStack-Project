import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession, getSession, signIn, signOut } from 'next-auth/react';
import axios from 'axios';

const Header = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [menuState, setMenuState] = useState(false);
  const [profilePic, setProfilePic] = useState(
    '/pixel8labs/images/profile-pic.png',
  );
  const [fullname, setFullname] = useState('Rice Rice');
  const [email, setEmail] = useState('rys@pixel8Labs.com');

  // update user data if session exists
  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        const response = await axios.get(
          'http://156.67.216.35/pixel8labs/api/v1/github/profile',
          {
            params: {
              username: session.git_username,
              access_token: session.access_token,
            },
          },
        );

        window.history.pushState(
          null,
          'username',
          '/pixel8labs/' + session.git_username,
        );
        setProfilePic(response.data.data.avatar_url);
        setFullname(response.data.data.name);
        setEmail(response.data.data.email);
      }
    };

    checkSession();
  }, []);

  const handleNavMenu = () => {
    setMenuState(!menuState);
    document.body.classList.toggle('overflow-hidden');
  };

  const toggleDropdown = () => {
    const dropdown = document.getElementById('dropdown');
    if (dropdown) {
      dropdown.classList.toggle('hidden');
    }
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
              {!session ? (
                <li>
                  <button
                    onClick={() => signIn('github')}
                    className="w-full py-2.5 px-4 text-center rounded-lg duration-150 block font-medium text-white bg-primary hover:bg-button-hover md:inline"
                  >
                    Login with Github
                  </button>
                </li>
              ) : (
                <div>
                  <div className="relative hidden md:block">
                    <button
                      className="flex border rounded-lg p-2 items-center"
                      onClick={toggleDropdown}
                    >
                      <Image
                        className="mr-2 rounded-full"
                        src={profilePic}
                        alt="logo"
                        width={40}
                        height={40}
                      />
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
                    </button>

                    <div
                      id="dropdown"
                      className="origin-top-right w-64 right-0 z-10 absolute hidden bg-white divide-gray-100 rounded-lg shadow dark:bg-gray-700"
                    >
                      <ul className="text-sm text-gray-700 dark:text-gray-200">
                        <li className="p-2">
                          <div className="flex">
                            <Image
                              className="mr-2 rounded-full"
                              src={profilePic}
                              alt="logo"
                              width={40}
                              height={40}
                            />
                            <div className="flex flex-col">
                              <span>{fullname}</span>
                              <span className="text-gray-500">{email}</span>
                            </div>
                          </div>
                        </li>
                        <li className="border-t">
                          <button
                            onClick={toggleDropdown}
                            className="w-full text-start block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            View profile
                          </button>
                        </li>
                        <li className="border-t">
                          <button
                            onClick={() =>
                              signOut({
                                callbackUrl: 'http://156.67.216.35/pixel8labs',
                              })
                            }
                            className="w-full text-start block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Log out
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="md:hidden">
                    <ul>
                      <li className="border-t p-8">
                        <div className="flex">
                          <Image
                            className="mr-2 rounded-full"
                            src={profilePic}
                            alt="logo"
                            width={50}
                            height={40}
                          />
                          <div className="flex flex-col">
                            <span>{fullname}</span>
                            <span className="text-gray-500">{email}</span>
                          </div>
                        </div>
                      </li>
                      <li className="border-t">
                        <button
                          onClick={toggleDropdown}
                          className="p-8 w-full text-start block hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          View profile
                        </button>
                      </li>
                      <li className="border-t">
                        <button
                          onClick={() => signOut()}
                          className="p-8 w-full text-start block hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Log out
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
