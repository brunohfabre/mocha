import LogoBlackImage from '../assets/images/logo_black.svg';
import { Dropdown } from './Dropdown';

export function Header(): JSX.Element {
  return (
    <header className="sticky top-0 h-12 bg-white shadow flex px-4 items-center justify-between">
      <img src={LogoBlackImage} alt="Mocha" className="w-10" />

      <Dropdown>
        <p className="bg-red-400 h-full">avatar component</p>
      </Dropdown>
    </header>
  );
}
