import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminBlogs from './AdminBlogs';

/* ================= THEME ================= */
const adminTheme = {
  body: '#050505',
  card: 'rgba(255, 255, 255, 0.03)',
  accent: '#00d4ff',
  sidebar: '#0a0a0a',
  border: 'rgba(255, 255, 255, 0.08)',
  text: '#ffffff',
  secondary: '#adadad'
};

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.body};
    color: ${props => props.theme.text};
    font-family: 'Inter', sans-serif;
    margin: 0;
  }
`;

/* ================= LAYOUT ================= */
const DashboardLayout = styled.div`display:flex;min-height:100vh;`;
const Sidebar = styled.aside`
  width:260px;background:${p=>p.theme.sidebar};
  border-right:1px solid ${p=>p.theme.border};
  padding:2rem;position:fixed;height:100vh;
`;
const MainContent = styled.main`flex:1;margin-left:260px;padding:3rem;`;
const Logo = styled.div`
  font-size:1.5rem;font-weight:800;margin-bottom:3rem;
  span{color:${p=>p.theme.accent}}
`;
const NavItem = styled.div`
  padding:1rem;border-radius:12px;cursor:pointer;
  color:${p=>p.active?p.theme.accent:p.theme.secondary};
  background:${p=>p.active?'rgba(0,212,255,.1)':'transparent'};
  &:hover{background:rgba(255,255,255,.05);color:white;}
`;

/* ================= UI ================= */
const StatsGrid = styled.div`display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-bottom:3rem;`;
const StatCard = styled.div`
  background:${p=>p.theme.card};
  border:1px solid ${p=>p.theme.border};
  padding:1.5rem;border-radius:20px;
  h4{color:${p=>p.theme.secondary};font-size:.8rem;}
  h2{color:${p=>p.theme.accent};font-size:2rem;}
`;
const ContentBox = styled.div`
  background:${p=>p.theme.card};
  border:1px solid ${p=>p.theme.border};
  border-radius:24px;padding:2rem;
`;
const Table = styled.table`
  width:100%;border-collapse:collapse;margin-top:1rem;
  th,td{padding:1rem;border-bottom:1px solid ${p=>p.theme.border};}
`;
const DeleteBtn = styled.button`
  background:rgba(255,71,71,.1);
  color:#ff4747;border:1px solid #ff474733;
  padding:.4rem .8rem;border-radius:8px;cursor:pointer;
  &:hover{background:#ff4747;color:white;}
`;

const EditBtn = styled.button`
  background:rgba(0,212,255,.1);
  color:#00d4ff;border:1px solid #00d4ff33;
  padding:.4rem .8rem;border-radius:8px;
  margin-right:.5rem;cursor:pointer;
  &:hover{background:#00d4ff;color:black;}
`;

const AddBtn = styled.button`
  background: rgba(0, 212, 255, 0.1);
  color: #00d4ff;
  border: 1px solid rgba(0, 212, 255, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background: #00d4ff;
    color: black;
  }
`;

const PageTitle = styled.h1`
  margin-bottom: 1.5rem;
`;


/* ================= COMPONENT ================= */
const Admin = () => {
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({ totalJobs: 0 });
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("jobs");

  const ADMIN_KEY = "DEVHUB_ADMIN_123";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const jobsRes = await axios.get("http://localhost:8080/api/jobs");
    const statsRes = await axios.get(
      "http://localhost:8080/api/admin/jobs/stats",
      { headers: { "x-admin-key": ADMIN_KEY } }
    );
    setJobs(jobsRes.data);
    setStats(statsRes.data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    await axios.delete(
      `http://localhost:8080/api/admin/jobs/${id}`,
      { headers: { "x-admin-key": ADMIN_KEY } }
    );
    fetchData();
  };

  return (
    <ThemeProvider theme={adminTheme}>
      <GlobalStyle />
      <DashboardLayout>
        <Sidebar>
          <Logo>DEVS<span>UNITE</span></Logo>
          <NavItem active={activeTab === "jobs"} onClick={() => setActiveTab("jobs")}> 💼 Manage Jobs </NavItem>
          <NavItem active={activeTab === "blogs"} onClick={() => setActiveTab("blogs")}> 📝 Manage Blogs </NavItem>
          <NavItem onClick={()=>navigate('/')}>🚪 Logout</NavItem>
        </Sidebar>

        <MainContent>
          <h1>Admin Dashboard</h1>

          <StatsGrid>
            <StatCard>
              <h4>Total Jobs</h4>
              <h2>{stats.totalJobs}</h2>
            </StatCard>
          </StatsGrid>
          

          {activeTab === "jobs" && (
            <>
                <PageTitle>Jobs</PageTitle>
  <ContentBox>
    <div style={{display:'flex',justifyContent:'space-between'}}>
      <h3>Jobs</h3>
      <AddBtn onClick={() => navigate('/admin/add-job')}>
        + Post Job
      </AddBtn>
    </div>

    <Table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Category</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
  {jobs.length === 0 ? (
    <tr>
      <td colSpan="4" style={{ textAlign: "center", color: "#888" }}>
        No jobs found
      </td>
    </tr>
  ) : (
    jobs.map(job => (
      <tr key={job.id}>
        <td>{job.title}</td>
        <td>{job.category}</td>
        <td>{new Date(job.createdAt).toLocaleDateString()}</td>
        <td>
          <EditBtn onClick={() => navigate(`/admin/edit-job/${job.id}`)}>
            Edit
          </EditBtn>
          <DeleteBtn onClick={() => handleDelete(job.id)}>
            Delete
          </DeleteBtn>
        </td>
      </tr>
    ))
  )}
</tbody>

    </Table>
  </ContentBox>
  </>
)}

{activeTab === "blogs" && <AdminBlogs />}

        </MainContent>
      </DashboardLayout>
    </ThemeProvider>
  );
};

export default Admin;
