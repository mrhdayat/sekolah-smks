import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { Gallery } from './pages/Gallery'
import { Contact } from './pages/Contact'
import { News } from './pages/News'
import { NewsDetail } from './pages/NewsDetail'
import { Agenda } from './pages/Agenda'
import { Programs } from './pages/Programs'
import { StaffTeachers } from './pages/StaffTeachers'
import { StaffEducation } from './pages/StaffEducation'
import { Extracurricular } from './pages/Extracurricular'
import { Testimonials } from './pages/Testimonials'
import { HeadmasterMessage } from './pages/HeadmasterMessage'
import { OrganizationStructure } from './pages/OrganizationStructure'
import { Login } from './pages/admin/Login'
import { Dashboard } from './pages/admin/Dashboard'
import { ProtectedRoute } from './components/ProtectedRoute'
import { useTheme } from './hooks/useTheme'

function App() {
  const { theme } = useTheme()

  return (
    <div className={theme}>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Public Routes with Layout */}
            <Route path="/*" element={
              <>
                <Navbar />
                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profil" element={<Profile />} />
                    <Route path="/galeri" element={<Gallery />} />
                    <Route path="/kontak" element={<Contact />} />
                    <Route path="/berita" element={<News />} />
                    <Route path="/berita/:id" element={<NewsDetail />} />
                    <Route path="/agenda" element={<Agenda />} />
                    <Route path="/program-keahlian" element={<Programs />} />
                    <Route path="/staf-pengajar" element={<StaffTeachers />} />
                    <Route path="/staf-kependidikan" element={<StaffEducation />} />
                    <Route path="/ekstrakurikuler" element={<Extracurricular />} />
                    <Route path="/testimoni" element={<Testimonials />} />
                    <Route path="/sambutan-kepsek" element={<HeadmasterMessage />} />
                    <Route path="/struktur-organisasi" element={<OrganizationStructure />} />
                  </Routes>
                </main>
                <Footer />
              </>
            } />
          </Routes>
          
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={theme}
            className="mt-16"
          />
        </div>
      </Router>
    </div>
  )
}

export default App