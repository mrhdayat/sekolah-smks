import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ScrollReveal } from '../components/ScrollReveal'
import { Trophy, Clock, User, Star } from 'lucide-react'
import { extracurricularService, type Extracurricular } from '../lib/database'
import { toast } from 'react-toastify'

export const Extracurricular: React.FC = () => {
  const [extracurriculars, setExtracurriculars] = useState<Extracurricular[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('Semua')

  const categories = ['Semua', 'Olahraga', 'Seni', 'Akademik', 'Keagamaan', 'Teknologi']

  useEffect(() => {
    loadExtracurriculars()
  }, [])

  const loadExtracurriculars = async () => {
    try {
      const data = await extracurricularService.getActive()
      setExtracurriculars(data)
    } catch (error) {
      console.error('Error loading extracurriculars:', error)
      toast.error('Gagal memuat data ekstrakurikuler')
      // Fallback data
      setExtracurriculars([
        {
          id: '1',
          name: 'Futsal',
          description: 'Ekstrakurikuler futsal untuk mengembangkan bakat olahraga siswa dan membangun kerja sama tim.',
          category: 'Olahraga',
          schedule: 'Selasa & Kamis, 15:30-17:00',
          coach: 'Bapak Usman, S.Pd.',
          image_url: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=800',
          achievements: [
            'Juara 2 Turnamen Futsal Antar SMK Se-Kabupaten 2024',
            'Juara 3 Liga Futsal Pelajar Kalimantan Selatan 2023'
          ],
          is_active: true,
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Robotika',
          description: 'Klub robotika untuk siswa yang tertarik dengan teknologi dan inovasi dalam bidang robotika.',
          category: 'Teknologi',
          schedule: 'Rabu & Jumat, 14:00-16:00',
          coach: 'Bapak Muhammad Rizki, S.Kom.',
          image_url: 'https://images.pexels.com/photos/2085831/pexels-photo-2085831.jpeg?auto=compress&cs=tinysrgb&w=800',
          achievements: [
            'Juara 1 Kontes Robot Indonesia Tingkat Provinsi 2024',
            'Best Innovation Award Robot Competition 2023'
          ],
          is_active: true,
          created_at: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Paduan Suara',
          description: 'Ekstrakurikuler paduan suara untuk mengembangkan bakat seni musik dan vokal siswa.',
          category: 'Seni',
          schedule: 'Senin & Rabu, 15:00-17:00',
          coach: 'Ibu Fatimah Azzahra, S.Sn.',
          image_url: 'https://images.pexels.com/photos/7095/people-woman-music-dancing.jpg?auto=compress&cs=tinysrgb&w=800',
          achievements: [
            'Juara 1 Festival Paduan Suara Tingkat Kabupaten 2024',
            'Penampilan Terbaik di Hari Kemerdekaan 2023'
          ],
          is_active: true,
          created_at: new Date().toISOString()
        },
        {
          id: '4',
          name: 'English Club',
          description: 'Klub bahasa Inggris untuk meningkatkan kemampuan berbahasa Inggris siswa melalui berbagai aktivitas.',
          category: 'Akademik',
          schedule: 'Selasa & Kamis, 14:00-15:30',
          coach: 'Ibu Sarah Johnson, S.Pd.',
          image_url: 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=800',
          achievements: [
            'Juara 2 English Speech Contest Tingkat Provinsi 2024',
            'Best Presentation Award di English Competition 2023'
          ],
          is_active: true,
          created_at: new Date().toISOString()
        },
        {
          id: '5',
          name: 'Rohani Islam (ROHIS)',
          description: 'Organisasi keagamaan untuk memperdalam pemahaman agama Islam dan mengembangkan karakter Islami.',
          category: 'Keagamaan',
          schedule: 'Jumat, 13:00-15:00',
          coach: 'Ustadz Ahmad Fauzi, M.Pd.I.',
          image_url: 'https://images.pexels.com/photos/8923569/pexels-photo-8923569.jpeg?auto=compress&cs=tinysrgb&w=800',
          achievements: [
            'Juara 1 Lomba Tahfidz Tingkat Kabupaten 2024',
            'Best Islamic Character Award 2023'
          ],
          is_active: true,
          created_at: new Date().toISOString()
        },
        {
          id: '6',
          name: 'Basket',
          description: 'Ekstrakurikuler basket untuk mengembangkan kemampuan olahraga dan sportivitas siswa.',
          category: 'Olahraga',
          schedule: 'Senin & Kamis, 15:30-17:30',
          coach: 'Bapak Andi Pratama, S.Pd.',
          image_url: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800',
          achievements: [
            'Juara 3 Turnamen Basket Antar SMK 2024',
            'Fair Play Award Championship 2023'
          ],
          is_active: true,
          created_at: new Date().toISOString()
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const filteredExtracurriculars = filter === 'Semua' 
    ? extracurriculars 
    : extracurriculars.filter(item => item.category === filter)

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-2xl text-gray-600 dark:text-gray-300">Memuat data ekstrakurikuler...</div>
      </div>
    )
  }

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-orange-600 to-red-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Ekstrakurikuler
              </h1>
              <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto">
                Beragam kegiatan untuk mengembangkan bakat dan minat siswa
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
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setFilter(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    filter === category
                      ? 'bg-orange-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Extracurricular Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExtracurriculars.map((item, index) => (
              <ScrollReveal key={item.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.category === 'Olahraga' ? 'bg-green-500 text-white' :
                        item.category === 'Seni' ? 'bg-purple-500 text-white' :
                        item.category === 'Akademik' ? 'bg-blue-500 text-white' :
                        item.category === 'Keagamaan' ? 'bg-emerald-500 text-white' :
                        'bg-orange-500 text-white'
                      }`}>
                        {item.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-xl font-bold text-white">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {item.description}
                    </p>
                    
                    <div className="space-y-3 mb-4">
                      {item.schedule && (
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock className="w-4 h-4 text-orange-500" />
                          <span className="text-gray-600 dark:text-gray-300">
                            {item.schedule}
                          </span>
                        </div>
                      )}
                      
                      {item.coach && (
                        <div className="flex items-center space-x-2 text-sm">
                          <User className="w-4 h-4 text-orange-500" />
                          <span className="text-gray-600 dark:text-gray-300">
                            {item.coach}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {item.achievements.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                          <Trophy className="w-4 h-4 text-yellow-500 mr-2" />
                          Prestasi
                        </h4>
                        <ul className="space-y-1">
                          {item.achievements.slice(0, 2).map((achievement, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <Star className="w-3 h-3 text-yellow-500 mt-1 flex-shrink-0" />
                              <span className="text-sm text-gray-600 dark:text-gray-300">
                                {achievement}
                              </span>
                            </li>
                          ))}
                          {item.achievements.length > 2 && (
                            <li className="text-orange-600 dark:text-orange-400 text-sm font-medium">
                              +{item.achievements.length - 2} prestasi lainnya
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {filteredExtracurriculars.length === 0 && (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Tidak ada ekstrakurikuler untuk kategori "{filter}"
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-600 to-red-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Tertarik Bergabung?
              </h2>
              <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
                Kembangkan bakat dan minatmu bersama ekstrakurikuler SMKS Muhammadiyah Satui
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-orange-600 font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
              >
                Daftar Sekarang
              </motion.button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}