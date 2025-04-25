import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: #1e1e1e;
  padding: 4rem 2rem 3rem;
  margin-top: auto;
  border-top: 1px solid #333;
  color: #ccc;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem 2rem;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  
  .paal {
    background: linear-gradient(135deg, #5a32a3 0%, #8265ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-right: 0.3rem;
  }
  
  .ai {
    color: #9bf0e1;
    margin-right: 1rem;
  }
  
  .x {
    color: #666;
    margin: 0 0.8rem;
  }
  
  .daogenius {
    background: linear-gradient(135deg, #5a32a3 0%, #8265ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;
    
    .x {
      margin: 0 0.5rem;
    }
  }
`;

const FooterColumns = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 2rem;
  }
`;

const Column = styled.div`
  flex: 1;
  min-width: 200px;
  
  @media (max-width: 768px) {
    text-align: center;
    min-width: 100%;
  }
`;

const ColumnTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  color: white;
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const ColumnLink = styled.a`
  display: block;
  color: #999;
  margin-bottom: 0.8rem;
  transition: color 0.2s;
  text-decoration: none;
  
  &:hover {
    color: #fff;
    text-decoration: none;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 0.5rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const TechItem = styled.span`
  background: rgba(130, 101, 255, 0.15);
  color: #9bf0e1;
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  font-size: 0.8rem;
  border: 1px solid rgba(130, 101, 255, 0.3);
`;

const Copyright = styled.div`
  color: #666;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #262626;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: #999;
  font-size: 1.2rem;
  text-decoration: none;
  
  &:hover {
    background: #8265ff;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 4px 10px rgba(130, 101, 255, 0.4);
  }
  
  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    font-size: 1.3rem;
  }
`;

const BackgroundDecoration = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(130, 101, 255, 0.05) 0%, rgba(90, 50, 163, 0) 70%);
  z-index: 1;
  
  &.top-left {
    top: -300px;
    left: -300px;
  }
  
  &.bottom-right {
    bottom: -300px;
    right: -300px;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <BackgroundDecoration className="top-left" />
      <BackgroundDecoration className="bottom-right" />
      
      <FooterContent>
        <LogoContainer>
          <Logo>
            <span className="paal">PAAL</span>
            <span className="ai">AI</span>
            <span className="x">×</span>
            <span className="daogenius">DAOGenius</span>
          </Logo>
        </LogoContainer>
        
        <FooterColumns>
          <Column>
            <ColumnTitle>Product</ColumnTitle>
            <ColumnLink href="https://app.paal.ai/cs?bid=85d11189" target="_blank">Try DAOGenius</ColumnLink>
            <ColumnLink href="https://github.com/Blockchain-Oracle/DaoGenius_PaalAI" target="_blank">GitHub</ColumnLink>
            <ColumnLink href="https://paal.ai" target="_blank">PAAL AI Platform</ColumnLink>
          </Column>
          
          <Column>
            <ColumnTitle>Connect</ColumnTitle>
            <ColumnLink href="https://discord.com/users/blockchainoracle_33249" target="_blank">Discord</ColumnLink>
            <ColumnLink href="https://t.me/BlockchainOracle_dev" target="_blank">Telegram</ColumnLink>
            <ColumnLink href="https://github.com/Blockchain-Oracle" target="_blank">GitHub</ColumnLink>
          </Column>
          
          <Column>
            <ColumnTitle>Resources</ColumnTitle>
            <ColumnLink href="https://docs.paal.ai" target="_blank">Documentation</ColumnLink>
            <ColumnLink href="https://github.com/Blockchain-Oracle/DaoGenius_PaalAI/issues" target="_blank">Report Issues</ColumnLink>
            <ColumnLink href="https://paal.ai/privacy" target="_blank">Privacy Policy</ColumnLink>
          </Column>
          
          <Column>
            <ColumnTitle>Technology</ColumnTitle>
            <TechStack>
              <TechItem>React</TechItem>
              <TechItem>TypeScript</TechItem>
              <TechItem>Express</TechItem>
              <TechItem>Node.js</TechItem>
              <TechItem>PAAL AI</TechItem>
              <TechItem>GPT-4o</TechItem>
            </TechStack>
          </Column>
        </FooterColumns>
        
        <SocialLinks>
          <SocialLink href="https://github.com/Blockchain-Oracle/DaoGenius_PaalAI" target="_blank" aria-label="GitHub">
            👾
          </SocialLink>
          <SocialLink href="https://discord.com/users/blockchainoracle_33249" target="_blank" aria-label="Discord">
            💬
          </SocialLink>
          <SocialLink href="https://t.me/BlockchainOracle_dev" target="_blank" aria-label="Telegram">
            📱
          </SocialLink>
        </SocialLinks>
        
        <Copyright>
          <div>Made with 💜 by Blockchain Oracle & PAAL AI</div>
          <div>&copy; {new Date().getFullYear()} | DAOGenius - Revolutionizing DAO Governance with AI</div>
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 