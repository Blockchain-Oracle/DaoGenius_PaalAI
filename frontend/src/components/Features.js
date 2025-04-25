import React from 'react';
import styled from 'styled-components';

const CommunityContainer = styled.section`
  margin: 5rem 0;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, rgba(90, 50, 163, 0.2) 0%, rgba(130, 101, 255, 0.1) 100%);
  border-top: 1px solid rgba(130, 101, 255, 0.3);
  border-bottom: 1px solid rgba(130, 101, 255, 0.3);
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    margin: 3rem 0;
    padding: 3rem 1rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 5;
`;

const SectionTitle = styled.h2`
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #5a32a3 0%, #8265ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
`;

const Subtitle = styled.p`
  color: #aaa;
  text-align: center;
  font-size: 1.1rem;
  margin-bottom: 3rem;
  max-width: 700px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
    padding: 0 0.5rem;
  }
`;

const ContactSections = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  width: 100%;
  
  @media (max-width: 768px) {
    gap: 3rem;
  }
`;

const SectionHeader = styled.h3`
  font-size: 1.6rem;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 600;
  color: #e0e0e0;
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1rem;
  width: 100%;
  
  @media (max-width: 768px) {
    gap: 1.5rem;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
`;

const LinkCard = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: #1e1e1e;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  border: 1px solid #333;
  transition: all 0.3s ease;
  text-decoration: none;
  width: 220px;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 30px rgba(130, 101, 255, 0.3);
    border-color: rgba(130, 101, 255, 0.5);
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    width: 180px;
  }
  
  @media (max-width: 480px) {
    width: 90%;
    max-width: 280px;
    padding: 1.5rem 1rem;
  }
`;

const LinkIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: ${props => props.developer ? 
    'linear-gradient(135deg, #5a32a3 0%, #8265ff 100%)' : 
    'linear-gradient(135deg, #2d6cdf 0%, #4d94ff 100%)'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: white;
  box-shadow: ${props => props.developer ? 
    '0 4px 15px rgba(130, 101, 255, 0.4)' : 
    '0 4px 15px rgba(45, 108, 223, 0.4)'};
    
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
`;

const LinkTitle = styled.h3`
  font-size: 1.25rem;
  color: white;
  margin-bottom: 0.5rem;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const LinkDescription = styled.p`
  font-size: 0.9rem;
  color: #aaa;
  text-align: center;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const ProjectStats = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    gap: 1.5rem 1rem;
    margin-top: 2rem;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1.5rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #5a32a3 0%, #8265ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #aaa;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Divider = styled.div`
  width: 100%;
  max-width: 200px;
  height: 2px;
  background: linear-gradient(90deg, rgba(130, 101, 255, 0), rgba(130, 101, 255, 0.5), rgba(130, 101, 255, 0));
  margin: 2rem 0 3rem;
  
  @media (max-width: 768px) {
    max-width: 150px;
    margin: 1.5rem 0 2rem;
  }
`;

const BackgroundCircle = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  
  &.top-right {
    top: -300px;
    right: -300px;
    background: radial-gradient(circle, rgba(130, 101, 255, 0.05) 0%, rgba(90, 50, 163, 0) 70%);
  }
  
  &.bottom-left {
    bottom: -300px;
    left: -300px;
    background: radial-gradient(circle, rgba(77, 148, 255, 0.05) 0%, rgba(45, 108, 223, 0) 70%);
  }
  
  @media (max-width: 768px) {
    width: 400px;
    height: 400px;
    
    &.top-right {
      top: -200px;
      right: -200px;
    }
    
    &.bottom-left {
      bottom: -200px;
      left: -200px;
    }
  }
`;

const Community = () => {
  const developerContacts = [
    {
      icon: "👾",
      title: "GitHub",
      description: "Explore the DAOGenius codebase and contribute to its development.",
      url: "https://github.com/Blockchain-Oracle/DaoGenius_PaalAI"
    },
    {
      icon: "💬",
      title: "Discord",
      description: "Connect with the developer directly on Discord.",
      url: "https://discord.com/users/blockchainoracle_33249"
    },
    {
      icon: "📱",
      title: "Telegram",
      description: "Reach out to the developer team on Telegram.",
      url: "https://t.me/BlockchainOracle_dev"
    }
  ];
  
  const paalCommunity = [
    {
      icon: "🐦",
      title: "Twitter",
      description: "Follow PAAL AI for the latest updates and announcements.",
      url: "https://x.com/PaalMind"
    },
    {
      icon: "💬",
      title: "Discord",
      description: "Join the PAAL AI Discord community for discussions and support.",
      url: "https://discord.com/invite/paalai"
    },
    {
      icon: "📱",
      title: "Telegram",
      description: "Connect with the PAAL AI community on Telegram.",
      url: "https://t.me/paal_ai"
    }
  ];

  return (
    <CommunityContainer>
      <BackgroundCircle className="top-right" />
      <BackgroundCircle className="bottom-left" />
      
      <ContentWrapper>
        <SectionTitle>Connect With Us</SectionTitle>
        <Subtitle>
          Engage with both the creators of DAOGenius and the broader PAAL AI community
          to stay updated and get support.
        </Subtitle>
        
        <ContactSections>
          <div>
            <SectionHeader>Developer Contact</SectionHeader>
            <LinksContainer>
              {developerContacts.map((link, index) => (
                <LinkCard href={link.url} target="_blank" rel="noopener noreferrer" key={index}>
                  <LinkIcon developer>{link.icon}</LinkIcon>
                  <LinkTitle>{link.title}</LinkTitle>
                  <LinkDescription>{link.description}</LinkDescription>
                </LinkCard>
              ))}
            </LinksContainer>
          </div>
          
          <Divider />
          
          <div>
            <SectionHeader>PAAL AI Community</SectionHeader>
            <LinksContainer>
              {paalCommunity.map((link, index) => (
                <LinkCard href={link.url} target="_blank" rel="noopener noreferrer" key={index}>
                  <LinkIcon>{link.icon}</LinkIcon>
                  <LinkTitle>{link.title}</LinkTitle>
                  <LinkDescription>{link.description}</LinkDescription>
                </LinkCard>
              ))}
            </LinksContainer>
          </div>
        </ContactSections>
        
        <ProjectStats>
          <StatItem>
            <StatValue>10+</StatValue>
            <StatLabel>DAOs Analyzed</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>1000+</StatValue>
            <StatLabel>Governance Proposals</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>95%</StatValue>
            <StatLabel>Accuracy Rate</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>24/7</StatValue>
            <StatLabel>AI Assistance</StatLabel>
          </StatItem>
        </ProjectStats>
      </ContentWrapper>
    </CommunityContainer>
  );
};

export default Community; 