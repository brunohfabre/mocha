import { Link } from 'react-router-dom';

import LogoBlackImage from '../assets/images/logo_black.svg';

export function Sidebar(): JSX.Element {
  return (
    <div className="bg-white border-r">
      <Link to="/notes" className="w-14 h-14 flex justify-center items-center">
        <img src={LogoBlackImage} alt="Mocha" className="w-10" />
      </Link>

      <nav>
        <ul>
          <li>
            <Link to="/notes">N</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
