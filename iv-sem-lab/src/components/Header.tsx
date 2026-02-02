import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderLink {
  to: string;
  label: string;
}

interface HeaderProps {
  links?: HeaderLink[];
}

const Header: React.FC<HeaderProps> = ({ links = [] }) => {
  return (
    <header className="site-header">
      <div className="nav-wrap">
        <nav className="primary-nav nav-container">
          {links.map((link) => (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="nav-center">
          <Link to="/" className="logo">
            IVth Sem Lab Programs
          </Link>
        </div>
        <div className="nav-container" />
      </div>
    </header>
  );
};

export default Header;

