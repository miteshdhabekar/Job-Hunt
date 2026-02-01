import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Jobs from './pages/Jobs';
import Blog from './pages/Blog';
import Career from './pages/Career';
import Admin from './pages/Admin';
import Login from './pages/Login';
import AddJob from './pages/AddJob';
import EditJob from './pages/EditJob';
import AdminBlogs from './pages/AdminBlogs';
import AddBlog from './pages/AddBlog';
import EditBlog from './pages/EditBlog';
// hii this is me


function App() {
  return (
    <BrowserRouter>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/career" element={<Career />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/edit-job/:id" element={<EditJob />} />
        <Route path="/admin/add-job" element={<AddJob />} />
        <Route path="/admin-access-portal-2026" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/blogs" element={<AdminBlogs />} />
        <Route path="/admin/add-blog" element={<AddBlog />} />
        <Route path="/admin/edit-blog/:id" element={<EditBlog />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
