import React from 'react'
import { motion } from 'framer-motion'
import { Target, Eye, Star, Heart } from 'lucide-react'
import { ScrollReveal } from './ScrollReveal'

export const VisionMission: React.FC = () => {
  return (
    <section id="profile-section" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Visi & Misi
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Komitmen kami dalam membentuk generasi unggul dengan karakter Islami dan kompeten
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Visi */}
          <ScrollReveal direction="left" delay={0.2}>
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-2xl">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white ml-4">
                  Visi
                </h3>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Menjadi sekolah menengah kejuruan swasta terdepan yang mengintegrasikan 
                ilmu pengetahuan, teknologi, dan nilai-nilai keislaman dalam menghasilkan 
                lulusan yang kompeten, berkarakter, dan siap menghadapi tantangan global.
              </p>
            </div>
          </ScrollReveal>

          {/* Misi */}
          <ScrollReveal direction="right" delay={0.4}>
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-3 rounded-2xl">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white ml-4">
                  Misi
                </h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Menyelenggarakan pendidikan kejuruan berkualitas tinggi berbasis nilai-nilai Islam',
                  'Mengembangkan kurikulum yang relevan dengan industri dan perkembangan teknologi',
                  'Membentuk karakter siswa yang berakhlak mulia dan berjiwa entrepreneur',
                  'Memfasilitasi pengembangan keterampilan digital dan teknologi terkini',
                  'Membangun kemitraan strategis dengan dunia usaha dan industri'
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center text-gray-600 dark:text-gray-300"
                  >
                    <Star className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        {/* Values */}
        <ScrollReveal delay={0.8}>
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Nilai-Nilai Kami
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Heart, title: 'Islami', desc: 'Berdasarkan nilai-nilai Islam' },
                { icon: Star, title: 'Excellence', desc: 'Selalu memberikan yang terbaik' },
                { icon: Target, title: 'Inovasi', desc: 'Kreatif dan adaptif' },
                { icon: Eye, title: 'Visionaris', desc: 'Berpikir ke depan' }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-emerald-500 p-3 rounded-full w-fit mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {value.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}