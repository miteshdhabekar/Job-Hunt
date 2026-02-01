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
  inputBg: 'rgba(255, 255, 255, 0.03)',
};

const lightTheme = {
  body: '#f8f9fa',
  text: '#1a1a1a',
  accent: '#007bff',
  secondaryText: '#555555',
  border: 'rgba(0, 0, 0, 0.1)',
  inputBg: '#ffffff',
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
const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContactSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 8rem 2rem 6rem;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 4rem;
  flex: 1;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    padding-top: 6rem;
  }
`;

const InfoSide = styled.div`
  h1 {
    font-size: 3.5rem;
    font-weight: 900;
    margin-bottom: 1.5rem;
    span { color: ${(props) => props.theme.accent}; }
  }
  p {
    color: ${(props) => props.theme.secondaryText};
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 3rem;
  }
`;

const ContactCard = styled.div`
  background: ${(props) => props.theme.inputBg};
  border: 1px solid ${(props) => props.theme.border};
  padding: 2rem;
  border-radius: 24px;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  transition: 0.3s;

  &:hover {
    border-color: ${(props) => props.theme.accent};
    transform: translateX(10px);
  }
`;

const FormSide = styled.div`
  background: ${(props) => props.theme.inputBg};
  border: 1px solid ${(props) => props.theme.border};
  padding: 3rem;
  border-radius: 32px;
  backdrop-filter: blur(10px);
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.9rem;
    font-weight: 600;
    color: ${(props) => props.theme.secondaryText};
  }

  input, textarea {
    background: ${(props) => props.theme.body};
    border: 1px solid ${(props) => props.theme.border};
    color: ${(props) => props.theme.text};
    padding: 1rem;
    border-radius: 12px;
    outline: none;
    font-family: inherit;
    transition: 0.3s;

    &:focus {
      border-color: ${(props) => props.theme.accent};
      box-shadow: 0 0 10px ${(props) => props.theme.accent}33;
    }
  }
`;

const SubmitButton = styled.button`
  background: ${(props) => props.theme.accent};
  color: #000;
  border: none;
  padding: 1.2rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 1rem;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

// 3. Main Component
const Contact = () => {
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
      <PageWrapper>
        <Navbar currentTheme={theme} toggleTheme={toggleTheme} />

        <ContactSection>
          {/* LEFT SIDE: Info */}
          <InfoSide>
            <h1>Get in <span>Touch</span></h1>
            <p>
              Have a question about the platform, need help with your job posting, 
              or just want to talk tech? We're here to help.
            </p>

            <ContactCard>
              <div style={{ fontSize: '2rem' }}>💬</div>
              <div>
                <h4 style={{ marginBottom: '0.2rem' }}>Discord Community</h4>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>Join our dev server for instant help.</p>
              </div>
            </ContactCard>

            <ContactCard>
              <div style={{ fontSize: '2rem' }}>📧</div>
              <div>
                <h4 style={{ marginBottom: '0.2rem' }}>Email Support</h4>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>support@devsunite.com</p>
              </div>
            </ContactCard>

            <ContactCard>
              <div style={{ fontSize: '2rem' }}>🐙</div>
              <div>
                <h4 style={{ marginBottom: '0.2rem' }}>GitHub</h4>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>Report bugs or request features.</p>
              </div>
            </ContactCard>
          </InfoSide>

          {/* RIGHT SIDE: Form */}
          <FormSide>
            <StyledForm onSubmit={(e) => e.preventDefault()}>
              <InputGroup>
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" required />
              </InputGroup>

              <InputGroup>
                <label>Email Address</label>
                <input type="email" placeholder="john@example.com" required />
              </InputGroup>

              <InputGroup>
                <label>Subject</label>
                <select style={{
                    background: theme === 'dark' ? '#0f0f0f' : '#fff',
                    color: theme === 'dark' ? '#fff' : '#000',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
                }}>
                  <option>General Inquiry</option>
                  <option>Job Posting Support</option>
                  <option>Career Guidance</option>
                  <option>Technical Issue</option>
                </select>
              </InputGroup>

              <InputGroup>
                <label>Message</label>
                <textarea rows="5" placeholder="Tell us how we can help..." required />
              </InputGroup>

              <SubmitButton type="submit">Send Message</SubmitButton>
            </StyledForm>
          </FormSide>
        </ContactSection>

        <Footer />
      </PageWrapper>
    </ThemeProvider>
  );
};

export default Contact;