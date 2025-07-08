import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { News } from './pages/News';
import { NewsDetail } from './pages/NewsDetail';
import { Agenda } from './pages/Agenda';
import { Programs } from './pages/Programs';
import { ProgramDetail } from './pages/ProgramDetail';
import { StaffTeachers } from './pages/StaffTeachers';
import { StaffEducation } from './pages/StaffEducation';
import { Extracurricular } from './pages/Extracurricular';
import { Testimonials } from './pages/Testimonials';
import { HeadmasterMessage } from './pages/HeadmasterMessage';
import { OrganizationStructure } from './pages/OrganizationStructure';
import { Login } from './pages/admin/Login';
import { Dashboard } from './pages/admin/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useTheme } from './hooks/useTheme';
import { schoolProfileService } from './lib/database';
import { SubmitTestimonial } from './pages/SubmitTestimonial';
import { SecondDashboard } from './pages/admin/SecondDashboard';
import { PpdbInfo } from './pages/PpdbInfo';
import { Downloads } from './pages/Downloads';

const themes: any = {
  blue: { light: '#60a5fa', DEFAULT: '#3b82f6', dark: '#2563eb' },
  green: { light: '#4ade80', DEFAULT: '#22c55e', dark: '#16a34a' },
  purple: { light: '#a78bfa', DEFAULT: '#8b5cf6', dark: '#7c3aed' },
  red: { light: '#f87171', DEFAULT: '#ef4444', dark: '#dc2626' },
};

function App() {
  const { theme: colorMode } = useTheme();
  
  useEffect(() => {
    const applyThemeColor = async () => {
      try {
        const profile = await schoolProfileService.getBySection('contact_info');
        const colorName = profile?.content?.theme_color || 'blue';
        const selectedTheme = themes[colorName];
        
        if (selectedTheme) {
          const root = document.documentElement;
          root.style.setProperty('--color-primary-light', selectedTheme.light);
          root.style.setProperty('--color-primary-default', selectedTheme.DEFAULT);
          root.style.setProperty('--color-primary-dark', selectedTheme.dark);
        }
      } catch (error) {
        console.error("Gagal menerapkan warna tema, menggunakan warna default.");
        // Fallback ke biru jika gagal
        const root = document.documentElement;
        root.style.setProperty('--color-primary-light', themes.blue.light);
        root.style.setProperty('--color-primary-default', themes.blue.DEFAULT);
        root.style.setProperty('--color-primary-dark', themes.blue.dark);
      }
    };

    applyThemeColor();
  }, []);

  return (
    <div className={colorMode}>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Routes>
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/manajemen-konten" element={<ProtectedRoute><SecondDashboard /></ProtectedRoute>} />

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
                    <Route path="/program-keahlian/:code" element={<ProgramDetail />} />
                    <Route path="/staf-pengajar" element={<StaffTeachers />} />
                    <Route path="/staf-kependidikan" element={<StaffEducation />} />
                    <Route path="/ekstrakurikuler" element={<Extracurricular />} />
                    <Route path="/testimoni" element={<Testimonials />} />
                    <Route path="/kirim-testimoni" element={<SubmitTestimonial />} />
                    <Route path="/sambutan-kepsek" element={<HeadmasterMessage />} />
                    <Route path="/struktur-organisasi" element={<OrganizationStructure />} />
                    <Route path="/ppdb" element={<PpdbInfo />} />
                    <Route path="/downloads" element={<Downloads />} />
                  </Routes>
                </main>
                <Footer />
              </>
            } />
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} theme={colorMode} />
        </div>
      </Router>
    </div>
  );
}

export default App;