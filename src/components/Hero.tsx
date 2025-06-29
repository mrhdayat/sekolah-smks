import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Award, Users, BookOpen } from 'lucide-react'
import { useViewTransition } from '../hooks/useViewTransition'
import { schoolStatsService } from '../lib/database'

export const Hero: React.FC = () => {
  const { startTransition } = useViewTransition()
  const [stats, setStats] = useState({
    students: '800+',
    programs: '5',
    achievements: '30+'
  })

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const data = await schoolStatsService.getAll()
      if (data && data.content) {
        setStats(data.content)
      }
    } catch (error) {
      console.error('Error loading stats:', error)
      // Keep default values if error
    }
  }

  const handleExploreClick = () => {
    // Scroll to the main navigation sections or go to profile page
    const profileSection = document.querySelector('#profile-section')
    if (profileSection) {
      profileSection.scrollIntoView({ behavior: 'smooth' })
    } else {
      startTransition('/profil')
    }
  }

  const handleVideoClick = () => {
    // Scroll to gallery section or open video modal
    const gallerySection = document.querySelector('#gallery-section')
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' })
    } else {
      startTransition('/galeri')
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC40Ij48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] bg-repeat"></div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [-20, 20, -20] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-20 w-16 h-16 bg-blue-500/20 rounded-full backdrop-blur-sm"
      />
      <motion.div
        animate={{ y: [20, -20, 20] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 right-20 w-24 h-24 bg-indigo-500/20 rounded-full backdrop-blur-sm"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="block"
            >
              SMKS
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="block bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent"
            >
              Muhammadiyah Satui
            </motion.span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
          >
            Membentuk generasi unggul dengan pendidikan berkualitas tinggi, teknologi terdepan, dan nilai-nilai Islami
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExploreClick}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Jelajahi Sekolah
            <ArrowRight className="ml-2 w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleVideoClick}
            className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-semibold rounded-full transition-all duration-300 border border-white/20 hover:border-white/30"
          >
            Lihat Galeri
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            { icon: Users, label: 'Siswa Aktif', value: stats.students },
            { icon: BookOpen, label: 'Program Keahlian', value: stats.programs },
            { icon: Award, label: 'Prestasi', value: stats.achievements },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
            >
              <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-blue-100">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </div>
  )
}