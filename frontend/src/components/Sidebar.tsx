import { Link, useLocation } from 'react-router-dom';

import LogoBlackImage from '../assets/images/logo_black.svg';

export function Sidebar(): JSX.Element {
  const location = useLocation();

  const routeName = location.pathname.split('/')[1];

  return (
    <div className="bg-white border-r">
      <Link to="/notes" className="w-14 h-14 flex justify-center items-center">
        <img src={LogoBlackImage} alt="Mocha" className="w-9" />
      </Link>

      <nav className="mt-4">
        <ul className="flex flex-col gap-2">
          <li className="flex justify-center">
            <Link
              to="/notes"
              className={`w-9 h-9 flex justify-center items-center rounded-lg text-gray-500 transition-all hover:bg-purple-100 ${
                routeName === 'notes' &&
                'bg-purple-100 fill-current text-purple-500'
              }`}
            >
              {routeName === 'notes' ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
