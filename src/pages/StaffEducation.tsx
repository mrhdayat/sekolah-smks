import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ScrollReveal } from '../components/ScrollReveal'
import { Users, Mail, Phone, Building, GraduationCap } from 'lucide-react'
import { staffEducationService, type StaffEducation } from '../lib/database'
import { toast } from 'react-toastify'

export const StaffEducation: React.FC = () => {
  const [staff, setStaff] = useState<StaffEducation[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('Semua')

  const departments = ['Semua', 'Administrasi', 'Keuangan', 'Perpustakaan', 'Laboratorium', 'Keamanan', 'Kebersihan']

  useEffect(() => {
    loadStaff()
  }, [])

  const loadStaff = async () => {
    try {
      const data = await staffEducationService.getAll()
      setStaff(data)
    } catch (error) {
      console.error('Error loading staff:', error)
      toast.error('Gagal memuat data staf')
      // Fallback data
      setStaff([
        {
          id: '1',
          name: 'Hj. Aminah, S.Pd.',
          position: 'Wakil Kepala Sekolah Bidang Kurikulum',
          department: 'Administrasi',
          education: 'S1 Pendidikan - Universitas Lambung Mangkurat',
          phone: '081234567895',
          email: 'aminah@smksmuhsatui.sch.id',
          image_url: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400',
          bio: 'Berpengalaman dalam pengembangan kurikulum dan manajemen akademik selama 15 tahun.',
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Budi Santoso, S.E.',
          position: 'Kepala Tata Usaha',
          department: 'Administrasi',
          education: 'S1 Ekonomi - Universitas Lambung Mangkurat',
          phone: '081234567896',
          email: 'budi.santoso@smksmuhsatui.sch.id',
          image_url: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400',
          bio: 'Mengelola administrasi sekolah dengan sistem yang terorganisir dan efisien.',
          created_at: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Siti Khadijah, A.Md.',
          position: 'Staff Keuangan',
          department: 'Keuangan',
          education: 'D3 Akuntansi - Politeknik Negeri Banjarmasin',
          phone: '081234567897',
          email: 'siti.khadijah@smksmuhsatui.sch.id',
          image_url: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400',
          bio: 'Bertanggung jawab dalam pengelolaan keuangan sekolah dengan transparansi dan akuntabilitas.',
          created_at: new Date().toISOString()
        },
        {
          id: '4',
          name: 'Ahmad Yusuf, S.IP.',
          position: 'Kepala Perpustakaan',
          department: 'Perpustakaan',
          education: 'S1 Ilmu Perpustakaan - Universitas Indonesia',
          phone: '081234567898',
          email: 'ahmad.yusuf@smksmuhsatui.sch.id',
          image_url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
          bio: 'Mengelola perpustakaan digital dan konvensional untuk mendukung proses pembelajaran.',
          created_at: new Date().toISOString()
        },
        {
          id: '5',
          name: 'Rahmat Hidayat, S.T.',
          position: 'Teknisi Laboratorium',
          department: 'Laboratorium',
          education: 'S1 Teknik Elektro - Universitas Lambung Mangkurat',
          phone: '081234567899',
          email: 'rahmat.hidayat@smksmuhsatui.sch.id',
          image_url: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400',
          bio: 'Bertanggung jawab dalam pemeliharaan dan pengoperasian peralatan laboratorium.',
          created_at: new Date().toISOString()
        },
        {
          id: '6',
          name: 'Usman, S.Pd.',
          position: 'Koordinator Keamanan',
          department: 'Keamanan',
          education: 'S1 Pendidikan Jasmani - STKIP PGRI Banjarmasin',
          phone: '081234567800',
          email: 'usman@smksmuhsatui.sch.id',
          image_url: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400',
          bio: 'Menjaga keamanan dan ketertiban lingkungan sekolah dengan profesional.',
          created_at: new Date().toISOString()
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const filteredStaff = filter === 'Semua' 
    ? staff 
    : staff.filter(person => person.department === filter)

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-2xl text-gray-600 dark:text-gray-300">Memuat data staf...</div>
      </div>
    )
  }

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-pink-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Staf Tenaga Kependidikan
              </h1>
              <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto">
                Tim profesional yang mendukung kelancaran operasional sekolah
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
              {departments.map((department) => (
                <motion.button
                  key={department}
                  onClick={() => setFilter(department)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    filter === department
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {department}
                </motion.button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Staff Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStaff.map((person, index) => (
              <ScrollReveal key={person.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={person.image_url}
                      alt={person.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {person.name}
                      </h3>
                      <p className="text-purple-200 font-medium">
                        {person.position}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Building className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                        {person.department}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <GraduationCap className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {person.education}
                      </span>
                    </div>
                    
                    {person.bio && (
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                        {person.bio}
                      </p>
                    )}
                    
                    <div className="space-y-2">
                      {person.email && (
                        <div className="flex items-center space-x-2 text-sm">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <a
                            href={`mailto:${person.email}`}
                            className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
                          >
                            {person.email}
                          </a>
                        </div>
                      )}
                      
                      {person.phone && (
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <a
                            href={`tel:${person.phone}`}
                            className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
                          >
                            {person.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {filteredStaff.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Tidak ada staf untuk departemen "{filter}"
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}