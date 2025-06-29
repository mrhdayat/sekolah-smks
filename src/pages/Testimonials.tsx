import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ScrollReveal } from '../components/ScrollReveal'
import { Star, Quote, GraduationCap, Briefcase } from 'lucide-react'
import { testimonialsService, type Testimonial } from '../lib/database'
import { toast } from 'react-toastify'

export const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('Semua')

  const roles = ['Semua', 'Alumni', 'Orang Tua', 'Siswa', 'Mitra Industri']

  useEffect(() => {
    loadTestimonials()
  }, [])

  const loadTestimonials = async () => {
    try {
      const data = await testimonialsService.getApproved()
      setTestimonials(data)
    } catch (error) {
      console.error('Error loading testimonials:', error)
      toast.error('Gagal memuat testimoni')
      // Fallback data
      setTestimonials([
        {
          id: '1',
          name: 'Muhammad Rizki Pratama',
          role: 'Alumni',
          graduation_year: 2022,
          current_job: 'Web Developer di PT. Teknologi Nusantara',
          content: 'SMKS Muhammadiyah Satui memberikan bekal yang sangat baik untuk karir saya. Pembelajaran yang praktis dan guru-guru yang berpengalaman membuat saya siap menghadapi dunia kerja. Sekarang saya bekerja sebagai Web Developer dan sangat bersyukur atas pendidikan yang saya terima.',
          rating: 5,
          image_url: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400',
          is_featured: true,
          is_approved: true,
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Siti Nurhaliza',
          role: 'Orang Tua',
          graduation_year: null,
          current_job: null,
          content: 'Sebagai orang tua, saya sangat puas dengan pendidikan yang diberikan SMKS Muhammadiyah Satui kepada anak saya. Sekolah tidak hanya mengajarkan ilmu pengetahuan, tetapi juga membentuk karakter Islami yang baik. Fasilitas yang lengkap dan guru-guru yang peduli membuat anak saya berkembang dengan baik.',
          rating: 5,
          image_url: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400',
          is_featured: true,
          is_approved: true,
          created_at: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Ahmad Fauzan',
          role: 'Alumni',
          graduation_year: 2021,
          current_job: 'Network Administrator di PT. Telkom Indonesia',
          content: 'Program TKJ di SMKS Muhammadiyah Satui sangat berkualitas. Saya mendapat pengalaman praktis yang langsung bisa diterapkan di dunia kerja. Guru-guru yang kompeten dan laboratorium yang lengkap membuat pembelajaran menjadi sangat efektif.',
          rating: 5,
          image_url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
          is_featured: false,
          is_approved: true,
          created_at: new Date().toISOString()
        },
        {
          id: '4',
          name: 'Fatimah Azzahra',
          role: 'Siswa',
          graduation_year: null,
          current_job: null,
          content: 'Saya sangat senang belajar di SMKS Muhammadiyah Satui. Program Multimedia yang saya ambil sangat menarik dan sesuai dengan minat saya. Guru-guru sangat sabar dalam mengajar dan selalu memberikan motivasi kepada siswa.',
          rating: 5,
          image_url: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400',
          is_featured: false,
          is_approved: true,
          created_at: new Date().toISOString()
        },
        {
          id: '5',
          name: 'Budi Santoso',
          role: 'Mitra Industri',
          graduation_year: null,
          current_job: 'HRD Manager PT. Digital Solutions',
          content: 'Kami sering menerima siswa magang dari SMKS Muhammadiyah Satui dan mereka selalu menunjukkan kualitas yang baik. Siswa-siswa dari sekolah ini memiliki kemampuan teknis yang solid dan etos kerja yang baik. Kami sangat merekomendasikan lulusan dari sekolah ini.',
          rating: 5,
          image_url: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400',
          is_featured: true,
          is_approved: true,
          created_at: new Date().toISOString()
        },
        {
          id: '6',
          name: 'Dewi Sartika',
          role: 'Alumni',
          graduation_year: 2020,
          current_job: 'Graphic Designer di Creative Agency',
          content: 'Program Multimedia di SMKS Muhammadiyah Satui memberikan fondasi yang kuat untuk karir saya di bidang desain. Pembelajaran yang kreatif dan fasilitas yang mendukung membuat saya bisa mengembangkan kemampuan dengan maksimal.',
          rating: 4,
          image_url: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400',
          is_featured: false,
          is_approved: true,
          created_at: new Date().toISOString()
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const filteredTestimonials = filter === 'Semua' 
    ? testimonials 
    : testimonials.filter(item => item.role === filter)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-2xl text-gray-600 dark:text-gray-300">Memuat testimoni...</div>
      </div>
    )
  }

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-teal-600 to-cyan-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Testimoni
              </h1>
              <p className="text-xl md:text-2xl text-teal-100 max-w-3xl mx-auto">
                Apa kata mereka tentang SMKS Muhammadiyah Satui
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
              {roles.map((role) => (
                <motion.button
                  key={role}
                  onClick={() => setFilter(role)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    filter === role
                      ? 'bg-teal-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {role}
                </motion.button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Testimonials */}
      {testimonials.some(t => t.is_featured) && (
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                Testimoni Pilihan
              </h2>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {testimonials
                .filter(t => t.is_featured && (filter === 'Semua' || t.role === filter))
                .slice(0, 2)
                .map((testimonial, index) => (
                <ScrollReveal key={testimonial.id} delay={index * 0.2}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 relative"
                  >
                    <Quote className="absolute top-6 right-6 w-8 h-8 text-teal-200 dark:text-teal-800" />
                    
                    <div className="flex items-center space-x-4 mb-6">
                      <img
                        src={testimonial.image_url || 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400'}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                          {testimonial.role === 'Alumni' && <GraduationCap className="w-4 h-4" />}
                          {testimonial.role === 'Mitra Industri' && <Briefcase className="w-4 h-4" />}
                          <span>{testimonial.role}</span>
                          {testimonial.graduation_year && (
                            <span>• Lulusan {testimonial.graduation_year}</span>
                          )}
                        </div>
                        {testimonial.current_job && (
                          <p className="text-sm text-teal-600 dark:text-teal-400 font-medium">
                            {testimonial.current_job}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1 mb-4">
                      {renderStars(testimonial.rating)}
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                      "{testimonial.content}"
                    </p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Testimonials */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Semua Testimoni
            </h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTestimonials.map((testimonial, index) => (
              <ScrollReveal key={testimonial.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={testimonial.image_url || 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400'}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </h3>
                      <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
                        {testimonial.role === 'Alumni' && <GraduationCap className="w-3 h-3" />}
                        {testimonial.role === 'Mitra Industri' && <Briefcase className="w-3 h-3" />}
                        <span>{testimonial.role}</span>
                        {testimonial.graduation_year && (
                          <span>• {testimonial.graduation_year}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 mb-3">
                    {renderStars(testimonial.rating)}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-4">
                    "{testimonial.content}"
                  </p>
                  
                  {testimonial.current_job && (
                    <p className="text-xs text-teal-600 dark:text-teal-400 font-medium mt-3">
                      {testimonial.current_job}
                    </p>
                  )}
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {filteredTestimonials.length === 0 && (
            <div className="text-center py-12">
              <Quote className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Tidak ada testimoni untuk kategori "{filter}"
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-teal-600 to-cyan-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Ingin Berbagi Pengalaman?
              </h2>
              <p className="text-xl text-teal-100 mb-8 max-w-3xl mx-auto">
                Ceritakan pengalaman Anda bersama SMKS Muhammadiyah Satui
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-teal-600 font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
              >
                Kirim Testimoni
              </motion.button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}