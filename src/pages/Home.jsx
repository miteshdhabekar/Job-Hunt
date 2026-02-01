import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider, createGlobalStyle, keyframes } from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

// 1. Themes (Keep these consistent with your Navbar)
const darkTheme = {
  body: '#0f0f0f',
  text: '#ffffff',
  accent: '#00d4ff',
  secondaryText: '#adadad',
  border: 'rgba(255, 255, 255, 0.1)',
};

const lightTheme = {
  body: '#f8f9fa',
  text: '#1a1a1a',
  accent: '#007bff',
  secondaryText: '#555555',
  border: 'rgba(0, 0, 0, 0.1)',
};

// 2. Animations & Global Styles
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    font-family: 'Inter', sans-serif;
    transition: all 0.3s ease;
  }
`;

// 3. Styled Components
const HeroSection = styled.section`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 1rem;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const MainTitle = styled.h1`
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 900;
  letter-spacing: -2px;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  background: linear-gradient(to right, ${(props) => props.theme.text}, ${(props) => props.theme.accent});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${(props) => props.theme.secondaryText};
  max-width: 600px;
  margin-bottom: 2.5rem;
`;

const HeroBadge = styled.span`
  background: ${(props) => props.theme.accent}22;
  color: ${(props) => props.theme.accent};
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: bold;
  border: 1px solid ${(props) => props.theme.accent}44;
  margin-bottom: 1rem;
`;

const SectionContainer = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 220px;
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
  }
`;

const BentoCard = styled.div`
  background: ${(props) => (props.theme.body === '#0f0f0f' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)')};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 24px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease;
  grid-column: ${(props) => props.size || 'span 1'};

  &:hover {
    border-color: ${(props) => props.theme.accent};
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  }

  h3 { font-size: 1.5rem; margin-bottom: 0.5rem; color: ${(props) => props.theme.text}; }
  p { color: ${(props) => props.theme.secondaryText}; font-size: 0.95rem; }
`;

const CTAButton = styled.button`
  background: ${(props) => props.theme.accent};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
  transition: 0.2s;
  &:hover { opacity: 0.9; transform: scale(1.05); }
`;

const SecondaryButton = styled(CTAButton)`
  background: transparent;
  border: 1px solid ${(props) => props.theme.border};
  color: ${(props) => props.theme.text};
  &:hover { background: ${(props) => props.theme.border}; }
`;

// 4. Main Home Component
const Home = () => {
  const [theme, setTheme] = useState('dark');
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('app-theme') || 'dark';
    setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('app-theme', newTheme);
  };

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyle />
      {/* Pass theme props to Navbar so it stays in sync */}
      <Navbar themeMode={theme} toggleTheme={toggleTheme} />
      
      <HeroSection>
        <HeroBadge>NEW: 2026 Developer Roadmap is live</HeroBadge>
        <MainTitle>Build the future of <br /> development.</MainTitle>
        <Subtitle>
          The ecosystem for modern developers to find jobs, share insights, 
          and grow their careers in the age of AI.
        </Subtitle>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <CTAButton onClick={() => navigate('/jobs')}>Explore Jobs</CTAButton>
          <SecondaryButton onClick={() => navigate('/blogs')}>Read Blog</SecondaryButton>
        </div>
      </HeroSection>

      <SectionContainer>
        <BentoGrid>
          <BentoCard onClick={() => navigate('/jobs')} size="span 2">
            <div >
              <h3>Latest Jobs</h3>
              <p>Find your next high-impact role at top-tier tech companies.</p>
            </div>
            <span onClick={() => navigate('/jobs')} style={{ color: theme === 'dark' ? '#00d4ff' : '#007bff', fontWeight: 'bold', cursor: 'pointer' }}>
              Browse Latest Roles →
            </span>
          </BentoCard>
          
          <BentoCard onClick={() => navigate('/blogs')}>
            <div>
              <h3>Blog</h3>
              <p>Deep dives into React, Node, and System Design.</p>
            </div>
          </BentoCard>

          <BentoCard onClick={() => navigate('/career')}>
            <div>
              <h3>Career Path</h3>
              <p>Guidance for Junior to Staff Engineers.</p>
            </div>
          </BentoCard>

          <BentoCard size="span 2">
            <div>
              <h3>Developer Community</h3>
              <p>Connect with 50k+ developers worldwide.</p>
            </div>
          </BentoCard>
        </BentoGrid>
      </SectionContainer>
      <Footer/>
    </ThemeProvider>
  );
};

export default Home;