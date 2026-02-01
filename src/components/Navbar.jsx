import React, { useState } from 'react';
import styled from 'styled-components';

// --- Styled Components ---
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 80px;
  background: ${(props) => props.theme.navBg};
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${(props) => props.theme.border};
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: 2px;
  color: ${(props) => props.theme.text};
  cursor: pointer;
  span { color: ${(props) => props.theme.accent}; }
`;

const NavMenu = styled.ul`
  display: flex;
  list-style: none;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    background: ${(props) => props.theme.body};
    position: fixed;
    top: 80px;
    right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    width: 100%;
    height: calc(100vh - 80px);
    justify-content: flex-start;
    padding-top: 2rem;
    transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
`;

const NavLink = styled.a`
  color: ${(props) => props.theme.secondaryText};
  text-decoration: none;
  padding: 0 1.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  transition: 0.3s;
  position: relative;

  &:hover { color: ${(props) => props.theme.text}; }

  /* Desktop underline effect */
  @media (min-width: 769px) {
    &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -5px;
      left: 1.5rem;
      background: ${(props) => props.theme.accent};
      transition: width 0.3s ease;
    }
    &:hover::after { width: calc(100% - 3rem); }
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
    padding: 1.5rem;
    display: block;
    width: 100%;
    text-align: center;
  }
`;

const ToggleBtn = styled.button`
  background: ${(props) => props.theme.border};
  border: 1px solid ${(props) => props.theme.border};
  color: ${(props) => props.theme.text};
  padding: 8px 16px;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 1rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${(props) => props.theme.accent};
    background: transparent;
  }

  @media (max-width: 768px) {
    margin: 2rem 0 0 0;
    font-size: 1.2rem;
    padding: 12px 24px;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 5px;

  span {
    height: 2px;
    width: 25px;
    background: ${(props) => props.theme.text};
    border-radius: 5px;
    transition: 0.3s;
  }

  @media (max-width: 768px) {
    display: flex;
  }

  ${({ isOpen }) => isOpen && `
    span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
    span:nth-child(2) { opacity: 0; }
    span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
  `}
`;

// --- Main Component ---
// Note: theme and toggleTheme come from the parent (Home.js or App.js)
const Navbar = ({ currentTheme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Nav>
      <a href='/' style={{ textDecoration: 'none' }}>
      <Logo>DEV<span>HUB</span></Logo>
      </a>

      <Hamburger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <span />
        <span />
        <span />
      </Hamburger>

      <NavMenu isOpen={isOpen}>
        <li><NavLink href="/jobs" onClick={() => setIsOpen(false)}>Jobs</NavLink></li>
        <li><NavLink href="/blogs" onClick={() => setIsOpen(false)}>Blog</NavLink></li>
        <li><NavLink href="/career" onClick={() => setIsOpen(false)}>Career</NavLink></li>
        <li>
          <ToggleBtn onClick={toggleTheme}>
            {currentTheme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </ToggleBtn>
        </li>
      </NavMenu>
    </Nav>
  );
};

export default Navbar;