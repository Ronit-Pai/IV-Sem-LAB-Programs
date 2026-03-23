import React from 'react';

const Footer: React.FC = () => {
  const handleRonitClick = () => {
    window.open('https://ronitpai.in', '_blank');
  };

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p onClick={handleRonitClick} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Built by Ronit Pai</p>
        <p>Copyright &copy; 2026 Ronit. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;