import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// 1. Theme Configuration
const darkTheme = {
  body: '#0f0f0f',
  text: '#ffffff',
  navBg: 'rgba(15, 15, 15, 0.95)',
  accent: '#00d4ff',
  secondaryText: '#adadad',
  border: 'rgba(255, 255, 255, 0.1)',
};

const lightTheme = {
  body: '#f8f9fa',
  text: '#1a1a1a',
  navBg: 'rgba(255, 255, 255, 0.95)',
  accent: '#007bff',
  secondaryText: '#555555',
  border: 'rgba(0, 0, 0, 0.1)',
};

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
`;

const BlogHeader = styled.header`
  padding: 5rem 2rem 3rem;
  text-align: center;
  background: radial-gradient(circle at top, ${(props) => props.theme.accent}15 0%, transparent 60%);
`;

const BlogContainer = styled.main`
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 2rem 5rem;
  flex: 1;
  width: 100%;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PostCard = styled.article`
  /* Logic Fix: Cards need a solid background in light mode to stand out */
  background: ${props => props.theme.body === '#0f0f0f' ? 'rgba(255, 255, 255, 0.02)' : '#ffffff'};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  /* Shadow for light mode visibility */
  box-shadow: ${props => props.theme.body === '#0f0f0f' ? 'none' : '0 10px 20px rgba(0,0,0,0.05)'};

  &:hover {
    transform: translateY(-8px);
    border-color: ${(props) => props.theme.accent};
    background: ${props => props.theme.body === '#0f0f0f' ? 'rgba(255, 255, 255, 0.04)' : '#ffffff'};
    box-shadow: 0 15px 30px rgba(0,0,0,0.1);
  }
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 200px;
  background: ${props => props.theme.body === '#0f0f0f' 
    ? `linear-gradient(45deg, #1a1a1a, ${props.theme.accent}33)` 
    : `linear-gradient(45deg, #e9ecef, ${props.theme.accent}22)`};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
`;

const PostContent = styled.div`
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CategoryBadge = styled.span`
  color: ${(props) => props.theme.accent};
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.8rem;
`;

const PostTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  line-height: 1.3;
  font-weight: 700;
  color: ${(props) => props.theme.text};
`;

const PostExcerpt = styled.p`
  color: ${(props) => props.theme.secondaryText};
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PostMeta = styled.div`
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid ${(props) => props.theme.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: ${(props) => props.theme.secondaryText};
`;

const ReadLink = styled.button`
  background: transparent;
  border: none;
  color: ${(props) => props.theme.accent};
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

// 3. Main Component
const Blog = () => {
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

  const posts = [
    { id: 1, category: 'Engineering', title: 'Mastering React Server Components', excerpt: 'RSCs are changing the way we build web apps. Learn how to optimize your data fetching.', date: 'Jan 15, 2026', readTime: '8 min read', emoji: '⚛️' },
    { id: 2, category: 'Architecture', title: 'The Rise of Local-First Development', excerpt: 'Why the future of software might not live entirely in the cloud.', date: 'Jan 12, 2026', readTime: '12 min read', emoji: '💾' },
    { id: 3, category: 'Career', title: 'How to Ace Your Staff Engineer Interview', excerpt: 'Moving beyond LeetCode: focusing on system design and leadership.', date: 'Jan 10, 2026', readTime: '6 min read', emoji: '🚀' },
  ];

  return (
    /* FIXED: Theme now dynamically switches based on state */
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyle />
      <PageWrapper>
        {/* Pass state and toggle to Navbar */}
        <Navbar currentTheme={theme} toggleTheme={toggleTheme} />
        
        <BlogHeader>
          <h1>Dev <span style={{ color: theme === 'dark' ? '#00d4ff' : '#007bff' }}>Insights</span></h1>
          <p>Deep dives into modern engineering and developer culture.</p>
        </BlogHeader>

        <BlogContainer>
          <BlogGrid>
            {posts.map((post) => (
              <PostCard key={post.id}>
                <ImagePlaceholder>{post.emoji}</ImagePlaceholder>
                <PostContent>
                  <CategoryBadge>{post.category}</CategoryBadge>
                  <PostTitle>{post.title}</PostTitle>
                  <PostExcerpt>{post.excerpt}</PostExcerpt>
                  <PostMeta>
                    <span>{post.date} • {post.readTime}</span>
                    <ReadLink>Read More →</ReadLink>
                  </PostMeta>
                </PostContent>
              </PostCard>
            ))}
          </BlogGrid>
        </BlogContainer>

        <Footer />
      </PageWrapper>
    </ThemeProvider>
  );
};

export default Blog;