import React from 'react'
import { motion } from 'framer-motion'
import { ScrollReveal } from '../components/ScrollReveal'
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from 'lucide-react'

export const Contact: React.FC = () => {
  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Hubungi Kami
              </h1>
              <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto">
                Kami siap membantu dan menjawab pertanyaan Anda
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <ScrollReveal direction="left">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                  Informasi Kontak
                </h2>
                
                <div className="space-y-6">
                  {[
                    {
                      icon: MapPin,
                      title: 'Alamat',
                      info: 'Jl. Pendidikan No. 123, Satui, Tanah Bumbu 72211',
                      color: 'text-red-500'
                    },
                    {
                      icon: Phone,
                      title: 'Telepon',
                      info: '(0518) 1234-5678',
                      color: 'text-green-500'
                    },
                    {
                      icon: Mail,
                      title: 'Email',
                      info: 'info@smksmuhsatui.sch.id',
                      color: 'text-blue-500'
                    },
                    {
                      icon: Clock,
                      title: 'Jam Operasional',
                      info: 'Senin - Jumat: 07:00 - 16:00 WITA',
                      color: 'text-purple-500'
                    }
                  ].map((contact, index) => (
                    <motion.div
                      key={contact.title}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl"
                    >
                      <div className={`p-3 rounded-xl bg-white dark:bg-gray-700 ${contact.color}`}>
                        <contact.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {contact.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {contact.info}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social Media */}
                <div className="mt-12">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Media Sosial
                  </h3>
                  <div className="flex space-x-4">
                    {[
                      { icon: Facebook, name: 'Facebook', color: 'bg-blue-600 hover:bg-blue-700' },
                      { icon: Instagram, name: 'Instagram', color: 'bg-pink-600 hover:bg-pink-700' },
                      { icon: Youtube, name: 'YouTube', color: 'bg-red-600 hover:bg-red-700' }
                    ].map((social) => (
                      <motion.a
                        key={social.name}
                        href="#"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`p-3 rounded-full text-white transition-colors ${social.color}`}
                      >
                        <social.icon className="w-6 h-6" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal direction="right" delay={0.2}>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-3xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                  Kirim Pesan
                </h2>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
                        placeholder="nama@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      No. Telepon
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
                      placeholder="08xx-xxxx-xxxx"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subjek
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
                      placeholder="Subjek pesan"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Pesan
                    </label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white resize-none"
                      placeholder="Tulis pesan Anda di sini..."
                    ></textarea>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Kirim Pesan
                  </motion.button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Lokasi Sekolah
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Temukan kami di Satui, Tanah Bumbu
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-4 shadow-xl">
              <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    Peta interaktif akan ditampilkan di sini
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                    Jl. Pendidikan No. 123, Satui, Tanah Bumbu
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}