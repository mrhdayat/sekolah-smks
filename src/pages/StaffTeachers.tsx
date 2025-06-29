import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ScrollReveal } from '../components/ScrollReveal'
import { GraduationCap, Mail, Phone, BookOpen, Award } from 'lucide-react'
import { staffTeachersService, type StaffTeacher } from '../lib/database'
import { toast } from 'react-toastify'

export const StaffTeachers: React.FC = () => {
  const [teachers, setTeachers] = useState<StaffTeacher[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('Semua')

  const subjects = ['Semua', 'Rekayasa Perangkat Lunak', 'Teknik Komputer Jaringan', 'Multimedia', 'Akuntansi', 'Administrasi Perkantoran', 'Umum']

  useEffect(() => {
    loadTeachers()
  }, [])

  const loadTeachers = async () => {
    try {
      const data = await staffTeachersService.getAll()
      setTeachers(data)
    } catch (error) {
      console.error('Error loading teachers:', error)
      toast.error('Gagal memuat data guru')
      // Fallback data
      setTeachers([
        {
          id: '1',
          name: 'Drs. Ahmad Fauzi, M.Pd.',
          position: 'Kepala Sekolah',
          education: 'S2 Manajemen Pendidikan - Universitas Lambung Mangkurat',
          subjects: ['Manajemen Pendidikan'],
          phone: '081234567890',
          email: 'ahmad.fauzi@smksmuhsatui.sch.id',
          image_url: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400',
          bio: 'Berpengalaman lebih dari 20 tahun dalam bidang pendidikan. Memiliki visi untuk menjadikan SMKS Muhammadiyah Satui sebagai sekolah kejuruan terdepan.',
          experience_years: 20,
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Ir. Siti Nurhaliza, M.T.',
          position: 'Guru Produktif RPL',
          education: 'S2 Teknik Informatika - Institut Teknologi Sepuluh Nopember',
          subjects: ['Pemrograman Web', 'Basis Data', 'Rekayasa Perangkat Lunak'],
          phone: '081234567891',
          email: 'siti.nurhaliza@smksmuhsatui.sch.id',
          image_url: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400',
          bio: 'Praktisi IT dengan pengalaman 15 tahun di industri software development. Ahli dalam pengembangan aplikasi web dan mobile.',
          experience_years: 15,
          created_at: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Muhammad Rizki, S.Kom.',
          position: 'Guru Produktif TKJ',
          education: 'S1 Teknik Informatika - Universitas Lambung Mangkurat',
          subjects: ['Jaringan Komputer', 'Sistem Operasi', 'Keamanan Jaringan'],
          phone: '081234567892',
          email: 'muhammad.rizki@smksmuhsatui.sch.id',
          image_url: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400',
          bio: 'Bersertifikat CCNA dan memiliki pengalaman sebagai Network Administrator di berbagai perusahaan.',
          experience_years: 8,
          created_at: new Date().toISOString()
        },
        {
          id: '4',
          name: 'Fatimah Azzahra, S.Sn.',
          position: 'Guru Produktif Multimedia',
          education: 'S1 Desain Komunikasi Visual - Institut Seni Budaya Indonesia',
          subjects: ['Desain Grafis', 'Video Editing', 'Animasi'],
          phone: '081234567893',
          email: 'fatimah.azzahra@smksmuhsatui.sch.id',
          image_url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
          bio: 'Desainer grafis profesional dengan portofolio yang telah diakui secara nasional. Aktif dalam berbagai kompetisi desain.',
          experience_years: 10,
          created_at: new Date().toISOString()
        },
        {
          id: '5',
          name: 'Dra. Sari Indah, M.Ak.',
          position: 'Guru Produktif Akuntansi',
          education: 'S2 Akuntansi - Universitas Gadjah Mada',
          subjects: ['Akuntansi Dasar', 'Akuntansi Syariah', 'Perpajakan'],
          phone: '081234567894',
          email: 'sari.indah@smksmuhsatui.sch.id',
          image_url: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400',
          bio: 'Akuntan publik bersertifikat dengan pengalaman audit di berbagai perusahaan. Ahli dalam akuntansi syariah.',
          experience_years: 18,
          created_at: new Date().toISOString()
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const filteredTeachers = filter === 'Semua' 
    ? teachers 
    : teachers.filter(teacher => 
        teacher.subjects.some(subject => 
          subject.toLowerCase().includes(filter.toLowerCase()) ||
          (filter === 'Rekayasa Perangkat Lunak' && subject.includes('RPL')) ||
          (filter === 'Teknik Komputer Jaringan' && subject.includes('TKJ'))
        )
      )

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-2xl text-gray-600 dark:text-gray-300">Memuat data guru...</div>
      </div>
    )
  }

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Staf Pengajar
              </h1>
              <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto">
                Tenaga pengajar profesional dan berpengalaman di bidangnya
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Filter */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-4">
              {subjects.map((subject) => (
                <motion.button
                  key={subject}
                  onClick={() => setFilter(subject)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    filter === subject
                      ? 'bg-emerald-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {subject}
                </motion.button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Teachers Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTeachers.map((teacher, index) => (
              <ScrollReveal key={teacher.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={teacher.image_url}
                      alt={teacher.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {teacher.name}
                      </h3>
                      <p className="text-emerald-200 font-medium">
                        {teacher.position}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <GraduationCap className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {teacher.education}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Mata Pelajaran:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {teacher.subjects.map((subject, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-sm rounded-full"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {teacher.bio && (
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                        {teacher.bio}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center space-x-1">
                        <Award className="w-4 h-4" />
                        <span>{teacher.experience_years} tahun pengalaman</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {teacher.email && (
                        <div className="flex items-center space-x-2 text-sm">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <a
                            href={`mailto:${teacher.email}`}
                            className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300"
                          >
                            {teacher.email}
                          </a>
                        </div>
                      )}
                      
                      {teacher.phone && (
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <a
                            href={`tel:${teacher.phone}`}
                            className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300"
                          >
                            {teacher.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {filteredTeachers.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Tidak ada guru untuk kategori "{filter}"
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}