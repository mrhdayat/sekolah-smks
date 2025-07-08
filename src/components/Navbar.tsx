import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, GraduationCap, ChevronDown } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useViewTransition } from '../hooks/useViewTransition';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { startTransition } = useViewTransition();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { 
      name: 'Profil', 
      href: '/profil',
      dropdown: [
        { name: 'Sejarah Sekolah', href: '/profil' },
        { name: 'Visi & Misi', href: '/profil#visi-misi' },
        { name: 'Sambutan Kepala Sekolah', href: '/sambutan-kepsek' },
        { name: 'Struktur Organisasi', href: '/struktur-organisasi' }
      ]
    },
    { 
      name: 'Akademik', 
      href: '/akademik',
      dropdown: [
        { name: 'Program Keahlian', href: '/program-keahlian' },
        { name: 'Staf Pengajar', href: '/staf-pengajar' },
        { name: 'Staf Kependidikan', href: '/staf-kependidikan' },
        { name: 'Ekstrakurikuler', href: '/ekstrakurikuler' }
      ]
    },
    { 
      name: 'Informasi', 
      href: '/informasi',
      dropdown: [
        { name: 'Berita & Artikel', href: '/berita' },
        { name: 'Agenda Kegiatan', href: '/agenda' },
        { name: 'Testimoni', href: '/testimoni' },
        { name: 'Panduan PPDB', href: '/ppdb' },
        { name: 'Pusat Dokumen', href: '/downloads' },
      ]
    },
    { name: 'Galeri', href: '/galeri' },
    { name: 'Kontak', href: '/kontak' },
  ];

  const handleNavigation = (href: string) => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    startTransition(href);
  };

  const handleDropdownToggle = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/" className="flex items-center space-x-2" onClick={(e) => { e.preventDefault(); handleNavigation('/'); }}>
              {/* Menggunakan text-primary */}
              <GraduationCap className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">SMKS Muhammadiyah</span>
            </Link>
          </motion.div>

          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative">
                {link.dropdown ? (
                  <div className="relative" onMouseEnter={() => setActiveDropdown(link.name)} onMouseLeave={() => setActiveDropdown(null)}>
                    <motion.button
                      whileHover={{ y: -2 }}
                      className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary dark:hover:text-primary-light ${
                        location.pathname.startsWith(link.href) ? 'text-primary dark:text-primary-light' : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </motion.button>
                    <AnimatePresence>
                      {activeDropdown === link.name && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2">
                          {link.dropdown.map((item) => (
                            <Link key={item.name} to={item.href} onClick={(e) => { e.preventDefault(); handleNavigation(item.href); }}
                              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-primary-light transition-colors"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                    <Link to={link.href} onClick={(e) => { e.preventDefault(); handleNavigation(link.href); }}
                      className={`text-sm font-medium transition-colors hover:text-primary dark:hover:text-primary-light relative ${
                        location.pathname === link.href ? 'text-primary dark:text-primary-light' : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {link.name}
                      {location.pathname === link.href && (
                        <motion.div layoutId="activeNav" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary dark:bg-primary-light"
                          initial={false} transition={{ type: "spring", stiffness: 380, damping: 30 }}/>
                      )}
                    </Link>
                  </motion.div>
                )}
              </div>
            ))}
            <ThemeToggle />
          </div>

          <div className="lg:hidden flex items-center space-x-4">
            <ThemeToggle />
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700 dark:text-gray-300">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700">
            <div className="px-4 py-4 space-y-4 max-h-96 overflow-y-auto">
              {navLinks.map((link, index) => (
                <motion.div key={link.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                  {link.dropdown ? (
                    <div>
                      <button onClick={() => handleDropdownToggle(link.name)}
                        className={`flex items-center justify-between w-full text-base font-medium transition-colors hover:text-primary dark:hover:text-primary-light ${
                          location.pathname.startsWith(link.href) ? 'text-primary dark:text-primary-light' : 'text-gray-700 dark:text-gray-300'
                        }`}>
                        <span>{link.name}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === link.name && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-2 ml-4 space-y-2">
                            {link.dropdown.map((item) => (
                              <Link key={item.name} to={item.href} onClick={(e) => { e.preventDefault(); handleNavigation(item.href); }}
                                className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors">
                                {item.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link to={link.href} onClick={(e) => { e.preventDefault(); handleNavigation(link.href); }}
                      className={`block text-base font-medium transition-colors hover:text-primary dark:hover:text-primary-light ${
                        location.pathname === link.href ? 'text-primary dark:text-primary-light' : 'text-gray-700 dark:text-gray-300'
                      }`}>
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};