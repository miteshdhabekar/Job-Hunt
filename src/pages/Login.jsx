import React, { useState } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';

// --- Animations ---
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    overflow: hidden;
    background: #050505;
    font-family: 'Inter', sans-serif;
  }
`;

// --- Styled Components ---
const LoginWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: radial-gradient(circle at center, #1a1a1a 0%, #050505 100%);
`;

// Floral Elements
const Flower = styled.div`
  position: absolute;
  font-size: ${props => props.size || '3rem'};
  opacity: 0.2;
  animation: ${float} ${props => props.duration || '6s'} infinite ease-in-out;
  top: ${props => props.top};
  left: ${props => props.left};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  filter: blur(1px);
`;

const GlassForm = styled.form`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 4rem 3rem;
  border-radius: 30px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 1s ease-out;
  z-index: 10;
`;

const Title = styled.h2`
  color: white;
  font-size: 2rem;
  margin-bottom: 0.5rem;
  font-weight: 800;
  span { color: #00d4ff; }
`;

const Input = styled.input`
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 12px;
  color: white;
  margin-top: 1.5rem;
  outline: none;
  transition: 0.3s;

  &:focus {
    border-color: #00d4ff;
    box-shadow: 0 0 15px rgba(0, 212, 255, 0.2);
  }
`;

const LoginButton = styled.button`
  width: 100%;
  background: linear-gradient(45deg, #00d4ff, #007bff);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  margin-top: 2rem;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 212, 255, 0.3);
  }
`;

// --- Main Component ---
const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // For now, hardcoded. Later we link to Spring Boot JWT.
    if (password === "admin123") {
      localStorage.setItem("adminToken", "secret-key");
      navigate("/admin-dashboard-secret-link");
    } else {
      alert("Unauthorized Access Attempt");
    }
  };

  return (
    <LoginWrapper>
      <GlobalStyle />
      
      {/* Floating Flowers */}
      <Flower top="10%" left="10%" size="5rem">🌸</Flower>
      <Flower top="20%" right="15%" size="4rem" duration="8s">🌺</Flower>
      <Flower bottom="15%" left="20%" size="6rem" duration="7s">🌷</Flower>
      <Flower bottom="10%" right="10%" size="3.5rem">🌼</Flower>
      <Flower top="50%" left="5%" size="2.5rem" duration="10s">🌻</Flower>

      <GlassForm onSubmit={handleLogin}>
        <Title>Devs<span>Unite</span></Title>
        <p style={{color: '#adadad', fontSize: '0.9rem'}}>Secure Admin Access Only</p>
        
        <Input 
          type="password" 
          placeholder="Enter Secret Key" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        
        <LoginButton type="submit">Unlock Dashboard</LoginButton>
      </GlassForm>
    </LoginWrapper>
  );
};

export default AdminLogin;