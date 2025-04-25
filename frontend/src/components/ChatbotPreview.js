import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
  margin: 1rem 0 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeadingContainer = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  background: linear-gradient(135deg, #5a32a3 0%, #8265ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subheading = styled.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto;
  color: #aaa;
`;

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
  
  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const IframeContainer = styled.div`
  flex: 1;
  height: 600px;
  background: #121212;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  position: relative;
  border: 1px solid #333;
  
  @media (min-width: 1024px) {
    flex: 2;
  }
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const FeaturesSidebar = styled.div`
  flex: 1;
  padding: 0 1rem 1rem;
  margin-top: 2rem;
  
  @media (min-width: 1024px) {
    margin-top: 0;
    margin-left: 2rem;
  }
`;

const FeatureCard = styled.div`
  background: #1e1e1e;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  border: 1px solid #333;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
    border-color: #444;
  }
`;

const FeatureHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const FeatureIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #5a32a3 0%, #8265ff 100%);
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-right: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #e0e0e0;
  margin: 0;
`;

const FeatureDescription = styled.p`
  color: #aaa;
  line-height: 1.6;
  margin: 0;
`;

const ExampleQueries = styled.div`
  margin-top: 1.5rem;
`;

const QueryButton = styled.button`
  background: #2d2d2d;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #3a3a3a;
  }
`;

const ChatbotPreview = () => {
  return (
    <Container>
      <HeadingContainer>
        <Heading>DAO Governance Analytics</Heading>
        <Subheading>
          Interact directly with DAOGenius, your AI-powered governance assistant for DAOs
        </Subheading>
      </HeadingContainer>
      
      <MainLayout>
        <IframeContainer>
          <Iframe 
            src="https://app.paal.ai/cs?bid=85d11189" 
            title="DAOGenius on PAAL AI"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </IframeContainer>
        
        <FeaturesSidebar>
          <FeatureCard>
            <FeatureHeader>
              <FeatureIcon>📊</FeatureIcon>
              <FeatureTitle>Governance Analytics</FeatureTitle>
            </FeatureHeader>
            <FeatureDescription>
              Get comprehensive insights into your DAO's governance metrics, voting patterns, and participation trends.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureHeader>
              <FeatureIcon>🔍</FeatureIcon>
              <FeatureTitle>Voter Analysis</FeatureTitle>
            </FeatureHeader>
            <FeatureDescription>
              Understand voting power distribution and identify key stakeholders in your DAO's ecosystem.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureHeader>
              <FeatureIcon>🧠</FeatureIcon>
              <FeatureTitle>AI Recommendations</FeatureTitle>
            </FeatureHeader>
            <FeatureDescription>
              Receive actionable recommendations to improve your DAO's governance processes.
            </FeatureDescription>
            
            <ExampleQueries>
              <QueryButton>Analyze Uniswap governance</QueryButton>
              <QueryButton>Voting participation rates</QueryButton>
              <QueryButton>Governance improvement tips</QueryButton>
            </ExampleQueries>
          </FeatureCard>
        </FeaturesSidebar>
      </MainLayout>
    </Container>
  );
};

export default ChatbotPreview; 