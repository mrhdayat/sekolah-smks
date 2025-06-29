import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ScrollReveal } from '../components/ScrollReveal'
import { BookOpen, Clock, Users, Award, CheckCircle } from 'lucide-react'
import { programsService, type Program } from '../lib/database'
import { toast } from 'react-toastify'

export const Programs: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPrograms()
  }, [])

  const loadPrograms = async () => {
    try {
      const data = await programsService.getActive()
      setPrograms(data)
    } catch (error) {
      console.error('Error loading programs:', error)
      toast.error('Gagal memuat program keahlian')
      // Fallback data
      setPrograms([
        {
          id: '1',
          name: 'Rekayasa Perangkat Lunak',
          code: 'RPL',
          description: 'Program keahlian yang mempelajari pengembangan aplikasi dan sistem perangkat lunak menggunakan teknologi terkini.',
          duration: '3 tahun',
          competencies: [
            'Pemrograman Web (HTML, CSS, JavaScript, PHP)',
            'Pemrograman Mobile (Android, Flutter)',
            'Database Management (MySQL, PostgreSQL)',
            'Framework Development (Laravel, React)',
            'UI/UX Design',
            'Software Testing'
          ],
          career_prospects: [
            'Web Developer',
            'Mobile App Developer',
            'Software Engineer',
            'UI/UX Designer',
            'Database Administrator',
            'System Analyst'
          ],
          image_url: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800',
          is_active: true,
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Teknik Komputer dan Jaringan',
          code: 'TKJ',
          description: 'Program keahlian yang fokus pada instalasi, konfigurasi, dan pemeliharaan jaringan komputer serta sistem keamanan.',
          duration: '3 tahun',
          competencies: [
            'Instalasi dan Konfigurasi Jaringan',
            'Network Security',
            'Server Administration (Windows, Linux)',
            'Troubleshooting Hardware',
            'Wireless Network',
            'Cloud Computing'
          ],
          career_prospects: [
            'Network Administrator',
            'IT Support Specialist',
            'System Administrator',
            'Network Security Analyst',
            'Cloud Engineer',
            'IT Consultant'
          ],
          image_url: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800',
          is_active: true,
          created_at: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Multimedia',
          code: 'MM',
          description: 'Program keahlian yang mengembangkan kreativitas dalam bidang desain grafis, video editing, dan animasi.',
          duration: '3 tahun',
          competencies: [
            'Desain Grafis (Photoshop, Illustrator)',
            'Video Editing (Premiere Pro, After Effects)',
            'Animasi 2D dan 3D',
            'Web Design',
            'Photography',
            'Digital Marketing'
          ],
          career_prospects: [
            'Graphic Designer',
            'Video Editor',
            'Animator',
            'Web Designer',
            'Content Creator',
            'Digital Marketing Specialist'
          ],
          image_url: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
          is_active: true,
          created_at: new Date().toISOString()
        },
        {
          id: '4',
          name: 'Akuntansi dan Keuangan Lembaga',
          code: 'AKL',
          description: 'Program keahlian yang mempelajari pengelolaan keuangan, akuntansi syariah, dan administrasi keuangan lembaga.',
          duration: '3 tahun',
          competencies: [
            'Akuntansi Dasar dan Lanjutan',
            'Akuntansi Syariah',
            'Perpajakan',
            'Audit Internal',
            'Aplikasi Akuntansi (MYOB, Accurate)',
            'Manajemen Keuangan'
          ],
          career_prospects: [
            'Staff Accounting',
            'Tax Consultant',
            'Internal Auditor',
            'Financial Analyst',
            'Bank Teller',
            'Entrepreneur'
          ],
          image_url: 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=800',
          is_active: true,
          created_at: new Date().toISOString()
        },
        {
          id: '5',
          name: 'Otomatisasi dan Tata Kelola Perkantoran',
          code: 'OTKP',
          description: 'Program keahlian yang mengembangkan kemampuan administrasi perkantoran modern dan manajemen kearsipan.',
          duration: '3 tahun',
          competencies: [
            'Administrasi Perkantoran',
            'Kearsipan Digital',
            'Komunikasi Bisnis',
            'Aplikasi Perkantoran (MS Office)',
            'Customer Service',
            'Event Management'
          ],
          career_prospects: [
            'Administrative Assistant',
            'Secretary',
            'Customer Service Representative',
            'Office Manager',
            'Event Coordinator',
            'Public Relations'
          ],
          image_url: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
          is_active: true,
          created_at: new Date().toISOString()
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-2xl text-gray-600 dark:text-gray-300">Memuat program keahlian...</div>
      </div>
    )
  }

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Program Keahlian
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                Pilihan program keahlian yang sesuai dengan minat dan bakat Anda
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Mengapa Memilih Program Keahlian Kami?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Program keahlian yang dirancang sesuai kebutuhan industri dengan fasilitas modern dan tenaga pengajar berpengalaman
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { icon: BookOpen, title: 'Kurikulum Terkini', desc: 'Sesuai standar industri' },
              { icon: Users, title: 'Pengajar Berpengalaman', desc: 'Praktisi dan akademisi' },
              { icon: Award, title: 'Sertifikasi Kompetensi', desc: 'Diakui dunia kerja' },
              { icon: Clock, title: 'Praktek Intensif', desc: '70% praktek, 30% teori' }
            ].map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 0.1}>
                <div className="text-center">
                  <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-2xl w-fit mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Programs List */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {programs.map((program, index) => (
              <ScrollReveal key={program.id} delay={index * 0.2}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                    <div className={`relative h-64 lg:h-auto overflow-hidden ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                      <img
                        src={program.image_url}
                        alt={program.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold text-lg">
                          {program.code}
                        </span>
                      </div>
                    </div>
                    
                    <div className={`p-8 lg:p-12 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                      <div className="flex items-center space-x-4 mb-4">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                        <span className="text-blue-600 dark:text-blue-400 font-medium">
                          {program.duration}
                        </span>
                      </div>
                      
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        {program.name}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                        {program.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                            Kompetensi yang Dipelajari
                          </h4>
                          <ul className="space-y-2">
                            {program.competencies.slice(0, 4).map((competency, idx) => (
                              <li key={idx} className="flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-600 dark:text-gray-300 text-sm">
                                  {competency}
                                </span>
                              </li>
                            ))}
                            {program.competencies.length > 4 && (
                              <li className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                                +{program.competencies.length - 4} kompetensi lainnya
                              </li>
                            )}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                            Prospek Karir
                          </h4>
                          <ul className="space-y-2">
                            {program.career_prospects.slice(0, 4).map((career, idx) => (
                              <li key={idx} className="flex items-start space-x-2">
                                <Award className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-600 dark:text-gray-300 text-sm">
                                  {career}
                                </span>
                              </li>
                            ))}
                            {program.career_prospects.length > 4 && (
                              <li className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                                +{program.career_prospects.length - 4} prospek lainnya
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Siap Bergabung dengan Kami?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Daftarkan diri Anda sekarang dan wujudkan masa depan cerah bersama SMKS Muhammadiyah Satui
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
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