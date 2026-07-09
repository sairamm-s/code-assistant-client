import { Link } from 'react-router-dom';
import { STRINGS } from '../../../constants/strings.constant';
import './nav-bar.component.scss';

const NavBarComponent = () => (
  <header className="nav-bar">
    <Link to="/" className="nav-bar__brand">
      {STRINGS.brand.name}
    </Link>
  </header>
);

export default NavBarComponent;
