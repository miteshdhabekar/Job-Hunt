import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// 1. Theme Configuration
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

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    font-family: 'Inter', sans-serif;
    margin: 0;
    transition: all 0.3s ease;
  }
`;

// 2. Styled Components
const Section = styled.section`
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroSection = styled(Section)`
  text-align: center;
  padding-top: 8rem;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  margin-bottom: 1rem;
  span { color: ${(props) => props.theme.accent}; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${(props) => props.theme.border};
  padding: 2.5rem;
  border-radius: 24px;
  transition: 0.3s;
  
  &:hover {
    border-color: ${(props) => props.theme.accent};
    background: rgba(0, 212, 255, 0.02);
  }

  h3 { margin-bottom: 1rem; font-size: 1.5rem; }
  p { color: ${(props) => props.theme.secondaryText}; line-height: 1.6; }
`;

const ContactBox = styled.div`
  background: linear-gradient(135deg, ${(props) => props.theme.accent}11, transparent);
  border: 1px solid ${(props) => props.theme.border};
  padding: 4rem;
  border-radius: 32px;
  text-align: center;
  margin-top: 4rem;
`;

const Button = styled.button`
  background: ${(props) => props.theme.accent};
  color: #000;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 2rem;
  transition: 0.3s;
  &:hover { transform: scale(1.05); box-shadow: 0 0 20px ${(props) => props.theme.accent}66; }
`;

// 3. Main Component
const About = () => {
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

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Navbar currentTheme={theme} toggleTheme={toggleTheme} />

      {/* --- HERO --- */}
      <HeroSection>
        <Title>United by <span>Code</span></Title>
        <p style={{ color: '#adadad', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
          DevsUnite is more than a platform; it's a digital home for the modern software engineer.
        </p>
      </HeroSection>

      {/* --- WHY WE EXIST --- */}
      <Section>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem' }}>Why DevHub Exists?</h2>
        <Grid>
          <Card>
            <h3>Bridge the Gap</h3>
            <p>Traditional job boards are noisy. We filter the noise to connect high-signal talent with high-impact missions.</p>
          </Card>
          <Card>
            <h3>Tech-First Culture</h3>
            <p>We believe engineering is an art. We exist to celebrate the craft, from clean code to complex system design.</p>
          </Card>
          <Card>
            <h3>Global Growth</h3>
            <p>Borders shouldn't limit talent. We exist to democratize access to the world's best tech opportunities.</p>
          </Card>
        </Grid>
      </Section>

      {/* --- WHAT YOU CAN DO --- */}
      <Section style={{ background: theme === 'dark' ? '#121212' : '#f0f0f0', borderRadius: '40px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem' }}>What You Can Do</h2>
        <Grid>
          <Card style={{ background: theme === 'dark' ? '#0a0a0a' : '#fff' }}>
            <span style={{ fontSize: '2rem' }}>🔍</span>
            <h3>Find Jobs</h3>
            <p>Access a curated board of roles at startups and tech giants that actually care about DX.</p>
          </Card>
          <Card style={{ background: theme === 'dark' ? '#0a0a0a' : '#fff' }}>
            <span style={{ fontSize: '2rem' }}>📖</span>
            <h3>Learn & Share</h3>
            <p>Read deep-dives on the latest stacks and contribute your own insights to the community.</p>
          </Card>
          <Card style={{ background: theme === 'dark' ? '#0a0a0a' : '#fff' }}>
            <span style={{ fontSize: '2rem' }}>📈</span>
            <h3>Scale Career</h3>
            <p>Follow structured roadmaps and career paths designed by industry veterans.</p>
          </Card>
        </Grid>
      </Section>

      {/* --- OUR APPROACH --- */}
      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Our Approach</h2>
            <p style={{ color: '#adadad', marginBottom: '1rem' }}>
              We don't use aggressive algorithms. Instead, we focus on **Human-Centric Curation**. 
            </p>
            <p style={{ color: '#adadad' }}>
              Every job posting, blog article, and career roadmap is vetted to ensure it provides real value to a developer's journey. Quality over quantity, always.
            </p>
          </div>
          <div style={{ height: '300px', background: 'rgba(0,212,255,0.1)', borderRadius: '24px', border: '1px dashed #00d4ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '4rem' }}>🛠️</span>
          </div>
        </div>
      </Section>

      {/* --- GET IN TOUCH --- */}
      <Section>
        <ContactBox>
          <h2 style={{ fontSize: '2.5rem' }}>Get in Touch</h2>
          <p style={{ color: '#adadad', marginTop: '1rem' }}>Have questions? We're always open to feedback and collaboration.</p>
          <Button onClick={() => window.location.href = 'mailto:hello@devsunite.com'}>
            Email the Team
          </Button>
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', color: '#00d4ff' }}>
            <span>Twitter</span>
            <span>LinkedIn</span>
            <span>Discord</span>
          </div>
        </ContactBox>
      </Section>

      <Footer />
    </ThemeProvider>
  );
};

export default About;