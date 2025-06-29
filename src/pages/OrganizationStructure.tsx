import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ScrollReveal } from '../components/ScrollReveal'
import { Users, Mail, Phone, Building } from 'lucide-react'
import { leadershipService, type Leadership } from '../lib/database'
import { toast } from 'react-toastify'

export const OrganizationStructure: React.FC = () => {
  const [leadership, setLeadership] = useState<Leadership[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLeadership()
  }, [])

  const loadLeadership = async () => {
    try {
      const data = await leadershipService.getAll()
      setLeadership(data)
    } catch (error) {
      console.error('Error loading leadership:', error)
      toast.error('Gagal memuat struktur organisasi')
      // Fallback data
      setLeadership([
        {
          id: '1',
          name: 'Drs. H. Abdullah, M.Pd.',
          position: 'Kepala Sekolah',
          education: 'S2 Manajemen Pendidikan',
          experience: '20+ tahun dalam bidang pendidikan',
          message: 'Memimpin dengan visi mengintegrasikan ilmu pengetahuan, teknologi, dan nilai-nilai keislaman.',
          image_url: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800',
          phone: '081234567890',
          email: 'abdullah@smksmuhsatui.sch.id',
          order_position: 1,
          is_active: true,
          created_at: '2025-01-15T10:00:00Z'
        },
        {
          id: '2',
          name: 'Hj. Fatimah, S.Pd.',
          position: 'Wakil Kepala Sekolah Kurikulum',
          education: 'S1 Pendidikan',
          experience: '15+ tahun dalam pengembangan kurikulum',
          message: 'Bertanggung jawab dalam pengembangan dan implementasi kurikulum yang inovatif.',
          image_url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
          phone: '081234567891',
          email: 'fatimah@smksmuhsatui.sch.id',
          order_position: 2,
          is_active: true,
          created_at: '2025-01-15T10:00:00Z'
        },
        {
          id: '3',
          name: 'Ahmad Fauzi, S.T.',
          position: 'Wakil Kepala Sekolah Sarana Prasarana',
          education: 'S1 Teknik',
          experience: '12+ tahun dalam manajemen fasilitas',
          message: 'Mengelola dan mengembangkan sarana prasarana untuk mendukung pembelajaran optimal.',
          image_url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
          phone: '081234567892',
          email: 'fauzi@smksmuhsatui.sch.id',
          order_position: 3,
          is_active: true,
          created_at: '2025-01-15T10:00:00Z'
        },
        {
          id: '4',
          name: 'Siti Aminah, S.Kom.',
          position: 'Wakil Kepala Sekolah Humas',
          education: 'S1 Komputer',
          experience: '10+ tahun dalam hubungan masyarakat',
          message: 'Membangun dan memelihara hubungan baik dengan masyarakat dan dunia industri.',
          image_url: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
          phone: '081234567893',
          email: 'aminah@smksmuhsatui.sch.id',
          order_position: 4,
          is_active: true,
          created_at: '2025-01-15T10:00:00Z'
        },
        {
          id: '5',
          name: 'Muhammad Ridwan, S.E.',
          position: 'Kepala Tata Usaha',
          education: 'S1 Ekonomi',
          experience: '8+ tahun dalam administrasi sekolah',
          message: 'Mengelola administrasi dan keuangan sekolah dengan sistem yang transparan dan akuntabel.',
          image_url: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
          phone: '081234567894',
          email: 'ridwan@smksmuhsatui.sch.id',
          order_position: 5,
          is_active: true,
          created_at: '2025-01-15T10:00:00Z'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-2xl text-gray-600 dark:text-gray-300">Memuat struktur organisasi...</div>
      </div>
    )
  }

  // Group leadership by position type
  const headmaster = leadership.find(person => person.position === 'Kepala Sekolah')
  const viceHeadmasters = leadership.filter(person => person.position.includes('Wakil'))
  const headOfAdministration = leadership.filter(person => person.position === 'Kepala Tata Usaha')
  const others = leadership.filter(person => 
    !person.position.includes('Kepala') && 
    !person.position.includes('Wakil')
  )

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Struktur Organisasi
              </h1>
              <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
                Kepemimpinan yang kuat untuk pendidikan berkualitas
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Organization Chart */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Kepala Sekolah */}
          {headmaster && (
            <ScrollReveal>
              <div className="flex justify-center mb-16">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-3xl p-8 shadow-xl max-w-md"
                >
                  <div className="text-center">
                    <img
                      src={headmaster.image_url}
                      alt={headmaster.name}
                      className="w-32 h-32 rounded-full object-cover mx-auto mb-6 shadow-lg"
                    />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {headmaster.name}
                    </h3>
                    <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-4">
                      {headmaster.position}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {headmaster.education}
                    </p>
                    {headmaster.message && (
                      <p className="text-gray-600 dark:text-gray-300 text-sm italic mb-4">
                        "{headmaster.message}"
                      </p>
                    )}
                    <div className="flex justify-center space-x-4">
                      {headmaster.email && (
                        <a
                          href={`mailto:${headmaster.email}`}
                          className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                        >
                          <Mail className="w-5 h-5" />
                        </a>
                      )}
                      {headmaster.phone && (
                        <a
                          href={`tel:${headmaster.phone}`}
                          className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                        >
                          <Phone className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>
          )}

          {/* Wakil Kepala Sekolah */}
          {viceHeadmasters.length > 0 && (
            <div className="mb-16">
              <ScrollReveal>
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                  Wakil Kepala Sekolah
                </h2>
              </ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {viceHeadmasters.map((person, index) => (
                  <ScrollReveal key={person.id} delay={index * 0.1}>
                    <motion.div
                      whileHover={{ y: -10 }}
                      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={person.image_url}
                          alt={person.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-bold text-white mb-1">
                            {person.name}
                          </h3>
                          <p className="text-blue-200 text-sm">
                            {person.position}
                          </p>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center space-x-2 mb-4">
                          <Building className="w-5 h-5 text-indigo-600" />
                          <span className="text-gray-600 dark:text-gray-300 text-sm">
                            {person.education}
                          </span>
                        </div>
                        
                        {person.experience && (
                          <div className="flex items-center space-x-2 mb-4">
                            <Users className="w-5 h-5 text-green-600" />
                            <span className="text-gray-600 dark:text-gray-300 text-sm">
                              {person.experience}
                            </span>
                          </div>
                        )}

                        {person.message && (
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 italic">
                            "{person.message}"
                          </p>
                        )}

                        <div className="flex space-x-4">
                          {person.email && (
                            <a
                              href={`mailto:${person.email}`}
                              className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                            >
                              <Mail className="w-5 h-5" />
                            </a>
                          )}
                          {person.phone && (
                            <a
                              href={`tel:${person.phone}`}
                              className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                            >
                              <Phone className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          )}

          {/* Kepala Tata Usaha */}
          {headOfAdministration.length > 0 && (
            <div className="mb-16">
              <ScrollReveal>
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                  Kepala Tata Usaha
                </h2>
              </ScrollReveal>
              <div className="flex justify-center">
                {headOfAdministration.map((person, index) => (
                  <ScrollReveal key={person.id} delay={index * 0.1}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 max-w-md"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={person.image_url}
                          alt={person.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-bold text-white mb-1">
                            {person.name}
                          </h3>
                          <p className="text-blue-200 text-sm">
                            {person.position}
                          </p>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center space-x-2 mb-4">
                          <Building className="w-5 h-5 text-indigo-600" />
                          <span className="text-gray-600 dark:text-gray-300 text-sm">
                            {person.education}
                          </span>
                        </div>

                        {person.experience && (
                          <div className="flex items-center space-x-2 mb-4">
                            <Users className="w-5 h-5 text-green-600" />
                            <span className="text-gray-600 dark:text-gray-300 text-sm">
                              {person.experience}
                            </span>
                          </div>
                        )}

                        {person.message && (
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 italic">
                            "{person.message}"
                          </p>
                        )}

                        <div className="flex justify-center space-x-4">
                          {person.email && (
                            <a
                              href={`mailto:${person.email}`}
                              className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                            >
                              <Mail className="w-5 h-5" />
                            </a>
                          )}
                          {person.phone && (
                            <a
                              href={`tel:${person.phone}`}
                              className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                            >
                              <Phone className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          )}

          {/* Other Leadership Positions */}
          {others.length > 0 && (
            <div>
              <ScrollReveal>
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                  Tim Kepemimpinan Lainnya
                </h2>
              </ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {others.map((person, index) => (
                  <ScrollReveal key={person.id} delay={index * 0.1}>
                    <motion.div
                      whileHover={{ y: -10 }}
                      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={person.image_url}
                          alt={person.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-bold text-white mb-1">
                            {person.name}
                          </h3>
                          <p className="text-blue-200 text-sm">
                            {person.position}
                          </p>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center space-x-2 mb-4">
                          <Building className="w-5 h-5 text-indigo-600" />
                          <span className="text-gray-600 dark:text-gray-300 text-sm">
                            {person.education}
                          </span>
                        </div>

                        {person.experience && (
                          <div className="flex items-center space-x-2 mb-4">
                            <Users className="w-5 h-5 text-green-600" />
                            <span className="text-gray-600 dark:text-gray-300 text-sm">
                              {person.experience}
                            </span>
                          </div>
                        )}

                        {person.message && (
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 italic">
                            "{person.message}"
                          </p>
                        )}

                        <div className="flex space-x-4">
                          {person.email && (
                            <a
                              href={`mailto:${person.email}`}
                              className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                            >
                              <Mail className="w-5 h-5" />
                            </a>
                          )}
                          {person.phone && (
                            <a
                              href={`tel:${person.phone}`}
                              className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                            >
                              <Phone className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          )}

          {leadership.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Data kepemimpinan belum tersedia
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}