import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider, createGlobalStyle, keyframes } from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// 1. Theme Configuration
const darkTheme = {
  body: '#0a0a0a',
  text: '#ffffff',
  navBg: 'rgba(15, 15, 15, 0.8)',
  accent: '#00d4ff',
  secondaryText: '#adadad',
  border: 'rgba(255, 255, 255, 0.08)',
};

const lightTheme = {
  body: '#f8f9fa',
  text: '#1a1a1a',
  navBg: 'rgba(255, 255, 255, 0.95)',
  accent: '#007bff',
  secondaryText: '#555555',
  border: 'rgba(0, 0, 0, 0.1)',
};

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(0, 212, 255, 0.2); }
  50% { box-shadow: 0 0 20px rgba(0, 212, 255, 0.4); }
  100% { box-shadow: 0 0 5px rgba(0, 212, 255, 0.2); }
`;

const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background-color: ${props => props.theme.body};
    color: ${props => props.theme.text};
    font-family: 'Inter', sans-serif;
    transition: all 0.3s ease;
  }
`;

// 2. Styled Components
const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-image: ${props => props.theme.body === '#0a0a0a' 
    ? 'radial-gradient(circle at 50% -10%, #00d4ff15 0%, transparent 40%)' 
    : 'none'};
`;

const HeaderSection = styled.header`
  padding: 6rem 2rem 4rem;
  text-align: center;
`;

const NotificationText = styled.p`
  color: ${props => props.theme.accent};
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const Badge = styled.span`
  background: ${props => props.theme.accent}15;
  color: ${props => props.theme.accent};
  padding: 0.5rem 1.2rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  border: 1px solid ${props => props.theme.accent}33;
  margin-bottom: 1.5rem;
  display: inline-block;
`;

const CareerContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 6rem;
  flex: 1;
  width: 100%;
`;

const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 250px;
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
  }
`;

const CareerCard = styled.div`
  background: ${props => props.theme.body === '#0a0a0a' ? 'rgba(255, 255, 255, 0.03)' : '#ffffff'};
  backdrop-filter: blur(12px);
  border: 1px solid ${props => props.theme.border};
  border-radius: 24px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  grid-column: ${props => props.size || 'span 1'};
  position: relative;
  overflow: hidden;
  box-shadow: ${props => props.theme.body === '#0a0a0a' ? 'none' : '0 10px 20px rgba(0,0,0,0.05)'};

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, ${props => props.theme.accent}, transparent);
    opacity: 0;
    transition: 0.3s;
  }

  &:hover {
    transform: translateY(-10px);
    background: ${props => props.theme.body === '#0a0a0a' ? 'rgba(255, 255, 255, 0.06)' : '#ffffff'};
    border-color: ${props => props.theme.accent}88;
    animation: ${glow} 2s infinite ease-in-out;
    box-shadow: 0 15px 30px rgba(0,0,0,0.1);
    
    &::before { opacity: 1; }
  }
`;

const ProgressInfo = styled.div`
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.85rem;
  color: ${props => props.theme.accent};
  font-weight: 600;
`;

const ProgressBar = styled.div`
  height: 4px;
  background: ${props => props.theme.body === '#0a0a0a' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0,0,0,0.1)'};
  border-radius: 10px;
  flex: 1;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: ${props => props.progress || '0%'};
    background: ${props => props.theme.accent};
    border-radius: 10px;
    box-shadow: 0 0 10px ${props => props.theme.accent};
  }
`;

// 3. Page Component
const Career = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const saved = localStorage.getItem('app-theme') || 'dark';
    setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('app-theme', newTheme);
  };

  const tracks = [
    { id: 1, title: 'Frontend Mastery', desc: 'From HTML/CSS to Advanced React and Performance.', icon: '🎨', progress: '85%', size: 'span 2' },
    { id: 2, title: 'Backend Systems', desc: 'Scalable APIs and SQL/NoSQL Databases.', icon: '⚙️', progress: '40%', size: 'span 1' },
    { id: 3, title: 'DevOps & Cloud', desc: 'Kubernetes, AWS, and CI/CD pipelines.', icon: '☁️', progress: '20%', size: 'span 1' },
    { id: 4, title: 'AI Implementation', desc: 'Integrating LLMs into modern web apps.', icon: '🧠', progress: '65%', size: 'span 2' },
    { id: 5, title: 'System Design', desc: 'Architecting large scale distributed systems.', icon: '🏗️', progress: '50%', size: 'span 3' },
  ];

  return (
    /* FIXED: Swapping themes based on state */
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyle />
      <PageWrapper>
        <Navbar currentTheme={theme} toggleTheme={toggleTheme} />
        
        <HeaderSection>
          <NotificationText>Sorry, we are no longer accepting applications - but let's keep in touch!</NotificationText>
          <p style={{ marginBottom: '2rem', color: theme === 'dark' ? '#adadad' : '#555' }}>Join our Newsletter for Future Updates !!</p>
          <Badge>Level Up Your Skills</Badge>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '1rem' }}>
            Career <span style={{ color: theme === 'dark' ? '#00d4ff' : '#007bff' }}>Pathways</span>
          </h1>
          <p style={{ color: theme === 'dark' ? '#adadad' : '#555', maxWidth: '600px', margin: '0 auto' }}>
            Follow curated developer roadmaps designed to take you from beginner to staff engineer.
          </p>
        </HeaderSection>

        <CareerContainer>
          <BentoGrid>
            {tracks.map((track) => (
              <CareerCard key={track.id} size={track.size}>
                <div>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{track.icon}</div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: '700' }}>{track.title}</h3>
                  <p style={{ color: theme === 'dark' ? '#adadad' : '#555', fontSize: '0.95rem', lineSize: '1.5' }}>{track.desc}</p>
                </div>
                <div>
                  <ProgressInfo>
                    <span>{track.progress} Complete</span>
                    <ProgressBar progress={track.progress} />
                  </ProgressInfo>
                </div>
              </CareerCard>
            ))}
          </BentoGrid>
        </CareerContainer>

        <Footer />
      </PageWrapper>
    </ThemeProvider>
  );
};

export default Career;