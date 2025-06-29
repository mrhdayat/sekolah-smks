import React from 'react'
import { motion } from 'framer-motion'
import { ScrollReveal } from '../components/ScrollReveal'
import { Users, Award, BookOpen, Building, Calendar, Trophy } from 'lucide-react'

export const Profile: React.FC = () => {
  const facilities = [
    { name: 'Laboratorium Komputer', count: '3 Ruang', icon: BookOpen },
    { name: 'Workshop Teknik', count: '5 Ruang', icon: Building },
    { name: 'Perpustakaan Digital', count: '1 Ruang', icon: BookOpen },
    { name: 'Masjid Sekolah', count: '1 Ruang', icon: Building },
  ]

  const achievements = [
    { title: 'Juara 1 LKS Tingkat Kabupaten', year: '2024', category: 'Web Design' },
    { title: 'Juara 2 Olimpiade Sains', year: '2024', category: 'Komputer' },
    { title: 'Sekolah Adiwiyata Kabupaten', year: '2023', category: 'Lingkungan' },
    { title: 'Akreditasi B', year: '2023', category: 'Institusi' },
  ]

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Profil Sekolah
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                Mengenal lebih dekat SMKS Muhammadiyah Satui
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* History */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Sejarah Singkat
                </h2>
                <div className="space-y-6 text-gray-600 dark:text-gray-300">
                  <p className="text-lg leading-relaxed">
                    SMKS Muhammadiyah Satui didirikan pada tahun 2005 dengan visi menjadi 
                    lembaga pendidikan kejuruan yang mengintegrasikan ilmu pengetahuan, 
                    teknologi, dan nilai-nilai keislaman.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Berawal dari 2 program keahlian dengan 80 siswa, kini kami telah 
                    berkembang menjadi sekolah dengan 5 program keahlian dan lebih dari 
                    800 siswa aktif.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Dengan komitmen terhadap kualitas pendidikan, pembentukan karakter Islami, 
                    dan inovasi teknologi, kami terus beradaptasi dengan perkembangan zaman 
                    dan kebutuhan industri.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: Calendar, label: 'Berdiri', value: '2005' },
                    { icon: Users, label: 'Siswa', value: '800+' },
                    { icon: BookOpen, label: 'Program', value: '5' },
                    { icon: Trophy, label: 'Prestasi', value: '30+' },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg mb-3">
                        <stat.icon className="w-8 h-8 text-blue-600 mx-auto" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </div>
                      <div className="text-gray-600 dark:text-gray-300">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Program Keahlian
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Pilihan program keahlian yang sesuai dengan minat dan bakat
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Rekayasa Perangkat Lunak',
                description: 'Mengembangkan aplikasi dan sistem perangkat lunak',
                image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800'
              },
              {
                name: 'Teknik Komputer Jaringan',
                description: 'Merancang dan mengelola infrastruktur jaringan',
                image: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800'
              },
              {
                name: 'Multimedia',
                description: 'Desain grafis, video editing, dan animasi',
                image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800'
              },
              {
                name: 'Akuntansi dan Keuangan',
                description: 'Pengelolaan keuangan dan sistem akuntansi syariah',
                image: 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=800'
              },
              {
                name: 'Otomatisasi Tata Kelola Perkantoran',
                description: 'Manajemen administrasi dan kearsipan modern',
                image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800'
              }
            ].map((program, index) => (
              <ScrollReveal key={program.name} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {program.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {program.description}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Fasilitas Unggulan
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Fasilitas modern yang mendukung proses pembelajaran
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {facilities.map((facility, index) => (
              <ScrollReveal key={facility.name} delay={index * 0.1}>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 text-center">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg mb-4 w-fit mx-auto">
                    <facility.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {facility.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold">
                    {facility.count}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Prestasi Terbaru
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Pencapaian membanggakan yang diraih sekolah
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <ScrollReveal key={achievement.title} delay={index * 0.1}>
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-2xl">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {achievement.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full">
                          {achievement.category}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          {achievement.year}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}