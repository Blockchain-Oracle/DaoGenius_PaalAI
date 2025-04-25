import React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import ChatbotPreview from './components/ChatbotPreview';
import Community from './components/Features';
import Footer from './components/Footer';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #121212;
  color: #e0e0e0;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

function App() {
  return (
    <AppContainer>
      <Header />
      <MainContent>
        <ChatbotPreview />
        <Community />
      </MainContent>
      <Footer />
    </AppContainer>
  );
}

export default App; 