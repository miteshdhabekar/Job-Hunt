import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FooterContainer = styled.footer`
  background: ${(props) => props.theme.navBg};
  border-top: 1px solid ${(props) => props.theme.border};
  padding: 4rem 2rem 2rem;
  margin-top: 4rem;
  transition: all 0.3s ease;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const BrandColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterLogo = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: ${(props) => props.theme.text};
  span { color: ${(props) => props.theme.accent}; }
`;

const Description = styled.p`
  color: ${(props) => props.theme.secondaryText};
  font-size: 0.9rem;
  line-height: 1.6;
`;

const LinkColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h4 {
    color: ${(props) => props.theme.text};
    font-size: 1rem;
    font-weight: 600;
  }
`;

const FooterLink = styled.a`
  color: ${(props) => props.theme.secondaryText};
  text-decoration: none;
  font-size: 0.9rem;
  transition: 0.2s;

  &:hover {
    color: ${(props) => props.theme.accent};
  }
`;

const NewsletterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Input = styled.input`
  background: ${(props) => props.theme.body};
  border: 1px solid ${(props) => props.theme.border};
  color: ${(props) => props.theme.text};
  padding: 0.6rem 1rem;
  border-radius: 8px;
  outline: none;
  flex: 1;

  &:focus {
    border-color: ${(props) => props.theme.accent};
  }
`;

const SubscribeBtn = styled.button`
  background: ${(props) => props.theme.accent};
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;

  &:hover { opacity: 0.9; }
`;

const BottomBar = styled.div`
  max-width: 1200px;
  margin: 3rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid ${(props) => props.theme.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.secondaryText};
  font-size: 0.8rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Footer = () => {
   const navigate = useNavigate();

  return (
    <FooterContainer>
      <FooterContent>
        <BrandColumn>
          <FooterLogo onClick={() => navigate('/')}>DEV<span>HUB</span></FooterLogo>
          <Description>
            Empowering the next generation of developers with the best jobs, 
            technical insights, and career growth resources.
          </Description>
        </BrandColumn>

        <LinkColumn>
          <h4>Platform</h4>
          <FooterLink href="/jobs">Jobs</FooterLink>
          <FooterLink href="/blogs">Blog</FooterLink>
          <FooterLink href="/career">Career Path</FooterLink>
        </LinkColumn>

        <LinkColumn>
          <h4>Company</h4>
          <FooterLink href="#">About Us</FooterLink>
          <FooterLink href="#">Contact</FooterLink>
          <FooterLink href="#">Privacy Policy</FooterLink>
        </LinkColumn>

        <NewsletterColumn>
          <h4>Join the Newsletter</h4>
          <Description>Get weekly dev tips and job alerts.</Description>
          <InputGroup>
            <Input type="email" placeholder="email@example.com" />
            <SubscribeBtn>Join</SubscribeBtn>
          </InputGroup>
        </NewsletterColumn>
      </FooterContent>

      <BottomBar>
        <p>&copy; 2026 DevHub Inc. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <FooterLink href="#">Twitter</FooterLink>
          <FooterLink href="#">GitHub</FooterLink>
          <FooterLink href="#">LinkedIn</FooterLink>
        </div>
      </BottomBar>
    </FooterContainer>
  );
};

export default Footer;