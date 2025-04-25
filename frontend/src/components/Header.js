import React, { useState } from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: #1e1e1e;
  color: white;
  padding: 1.2rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid #333;
  position: sticky;
  top: 0;
  z-index: 100;
  
  @media (max-width: 768px) {
    padding: 1rem 1rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  
  .paal {
    background: linear-gradient(135deg, #5a32a3 0%, #8265ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-right: 0.5rem;
  }
  
  .ai {
    color: #9bf0e1;
  }
  
  .separator {
    width: 1px;
    height: 24px;
    background: #444;
    margin: 0 1rem;
  }
  
  .daogenius {
    background: linear-gradient(135deg, #5a32a3 0%, #8265ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    
    .separator {
      height: 20px;
      margin: 0 0.5rem;
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: #ccc;
  font-weight: 500;
  transition: color 0.2s;
  text-decoration: none;
  position: relative;
  padding: 0.5rem 0;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, #5a32a3 0%, #8265ff 100%);
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: #fff;
    text-decoration: none;
    
    &:after {
      width: 100%;
    }
  }
`;

const GithubButton = styled.a`
  display: flex;
  align-items: center;
  background: #262626;
  border-radius: 50px;
  padding: 0.6rem 1.2rem;
  color: white;
  font-weight: 500;
  transition: all 0.3s ease;
  text-decoration: none;
  border: 1px solid #333;
  
  .icon {
    margin-right: 0.5rem;
    font-size: 1.2rem;
  }
  
  &:hover {
    background: #333;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    text-decoration: none;
  }
`;

const MobileMenuIcon = styled.div`
  display: none;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 21px;
  }
  
  span {
    height: 3px;
    width: 100%;
    background: #ccc;
    border-radius: 3px;
    transition: all 0.3s ease;
    
    &:nth-child(1) {
      transform: ${({ open }) => open ? 'rotate(45deg) translate(5px, 6px)' : 'rotate(0)'};
    }
    
    &:nth-child(2) {
      opacity: ${({ open }) => open ? '0' : '1'};
    }
    
    &:nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg) translate(5px, -6px)' : 'rotate(0)'};
    }
  }
`;

const MobileMenu = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  z-index: 99;
  padding-top: 5rem;
  transform: translateY(${({ open }) => open ? '0' : '-100%'});
  transition: transform 0.3s ease;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const MobileNavLink = styled.a`
  color: #fff;
  font-weight: 500;
  font-size: 1.4rem;
  margin: 1rem 0;
  text-decoration: none;
  position: relative;
  padding: 0.5rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, #5a32a3 0%, #8265ff 100%);
    transition: width 0.3s ease;
  }
  
  &:hover {
    &:after {
      width: 100%;
    }
  }
`;

const MobileGithubButton = styled.a`
  display: flex;
  align-items: center;
  background: #262626;
  border-radius: 50px;
  padding: 0.8rem 1.5rem;
  color: white;
  font-weight: 500;
  margin-top: 2rem;
  font-size: 1.2rem;
  text-decoration: none;
  border: 1px solid #333;
  
  .icon {
    margin-right: 0.5rem;
    font-size: 1.4rem;
  }
`;

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <HeaderContainer>
      <Nav>
        <Logo onClick={scrollToTop}>
          <span className="paal">PAAL</span>
          <span className="ai">AI</span>
          <span className="separator"></span>
          <span className="daogenius">DAOGenius</span>
        </Logo>
        <NavLinks>
          <NavLink href="https://app.paal.ai/cs?bid=85d11189" target="_blank">Try DAOGenius</NavLink>
          <NavLink href="https://paal.ai" target="_blank">PAAL AI</NavLink>
          <NavLink href="https://docs.paal.ai" target="_blank">Docs</NavLink>
          <GithubButton href="https://github.com/Blockchain-Oracle/DaoGenius_PaalAI" target="_blank">
            <span className="icon">👾</span> GitHub
          </GithubButton>
        </NavLinks>
        
        <MobileMenuIcon open={menuOpen} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </MobileMenuIcon>
      </Nav>
      
      <MobileMenu open={menuOpen}>
        <MobileNavLink href="https://app.paal.ai/cs?bid=85d11189" target="_blank" onClick={toggleMenu}>Try DAOGenius</MobileNavLink>
        <MobileNavLink href="https://paal.ai" target="_blank" onClick={toggleMenu}>PAAL AI</MobileNavLink>
        <MobileNavLink href="https://docs.paal.ai" target="_blank" onClick={toggleMenu}>Docs</MobileNavLink>
        <MobileGithubButton href="https://github.com/Blockchain-Oracle/DaoGenius_PaalAI" target="_blank" onClick={toggleMenu}>
          <span className="icon">👾</span> GitHub
        </MobileGithubButton>
      </MobileMenu>
    </HeaderContainer>
  );
};

export default Header; 