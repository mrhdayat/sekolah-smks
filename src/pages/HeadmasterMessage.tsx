import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ScrollReveal } from '../components/ScrollReveal'
import { Quote, GraduationCap, Award, Users } from 'lucide-react'
import { leadershipService, type Leadership } from '../lib/database'
import { toast } from 'react-toastify'

export const HeadmasterMessage: React.FC = () => {
  const [headmaster, setHeadmaster] = useState<Leadership | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadHeadmaster()
  }, [])

  const loadHeadmaster = async () => {
    try {
      const data = await leadershipService.getHeadmaster()
      setHeadmaster(data)
    } catch (error) {
      console.error('Error loading headmaster:', error)
      toast.error('Gagal memuat data kepala sekolah')
      // Fallback data
      setHeadmaster({
        id: '1',
        name: 'Drs. Ahmad Fauzi, M.Pd.',
        position: 'Kepala Sekolah',
        education: 'S2 Manajemen Pendidikan - Universitas Lambung Mangkurat',
        experience: 'Berpengalaman lebih dari 20 tahun dalam bidang pendidikan, pernah menjabat sebagai Wakil Kepala Sekolah di beberapa sekolah terkemuka sebelum memimpin SMKS Muhammadiyah Satui.',
        message: `Assalamu'alaikum Warahmatullahi Wabarakatuh,

Puji syukur kita panjatkan kehadirat Allah SWT yang telah memberikan rahmat dan hidayah-Nya sehingga SMKS Muhammadiyah Satui dapat terus berkembang dan memberikan kontribusi terbaik dalam dunia pendidikan.

Sebagai Kepala Sekolah SMKS Muhammadiyah Satui, saya merasa bangga dan bersyukur atas pencapaian yang telah diraih sekolah ini. Dengan visi menjadi sekolah menengah kejuruan swasta terdepan yang mengintegrasikan ilmu pengetahuan, teknologi, dan nilai-nilai keislaman, kami berkomitmen untuk terus memberikan pendidikan berkualitas tinggi.

SMKS Muhammadiyah Satui tidak hanya fokus pada pengembangan kemampuan teknis siswa, tetapi juga pembentukan karakter yang berakhlak mulia. Kami percaya bahwa pendidikan yang holistik akan menghasilkan lulusan yang tidak hanya kompeten di bidangnya, tetapi juga memiliki integritas dan nilai-nilai moral yang kuat.

Dengan dukungan tenaga pendidik yang profesional, fasilitas yang memadai, dan kurikulum yang selalu disesuaikan dengan perkembangan industri, kami optimis dapat mencetak generasi muda yang siap menghadapi tantangan masa depan.

Kepada seluruh siswa, saya berpesan untuk selalu bersemangat dalam menuntut ilmu, disiplin dalam menjalankan kewajiban, dan senantiasa menjaga akhlak yang mulia. Kepada orang tua dan masyarakat, kami mengharapkan dukungan dan kepercayaan untuk terus memajukan pendidikan di SMKS Muhammadiyah Satui.

Mari kita bersama-sama membangun masa depan yang cerah melalui pendidikan yang berkualitas dan berkarakter.

Wassalamu'alaikum Warahmatullahi Wabarakatuh.`,
        image_url: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800',
        phone: '081234567890',
        email: 'ahmad.fauzi@smksmuhsatui.sch.id',
        order_position: 1,
        is_active: true,
        created_at: new Date().toISOString()
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-2xl text-gray-600 dark:text-gray-300">Memuat sambutan kepala sekolah...</div>
      </div>
    )
  }

  if (!headmaster) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Data kepala sekolah tidak ditemukan
          </h1>
        </div>
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
                Sambutan Kepala Sekolah
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                Pesan dan visi dari pemimpin SMKS Muhammadiyah Satui
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Headmaster Profile */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <ScrollReveal direction="left">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl transform rotate-3"></div>
                <img
                  src={headmaster.image_url}
                  alt={headmaster.name}
                  className="relative w-full h-96 object-cover rounded-3xl shadow-2xl"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <GraduationCap className="w-8 h-8 text-blue-600" />
                  <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg">
                    Kepala Sekolah
                  </span>
                </div>
                
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {headmaster.name}
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <Award className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Pendidikan</h3>
                      <p className="text-gray-600 dark:text-gray-300">{headmaster.education}</p>
                    </div>
                  </div>
                  
                  {headmaster.experience && (
                    <div className="flex items-start space-x-3">
                      <Users className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Pengalaman</h3>
                        <p className="text-gray-600 dark:text-gray-300">{headmaster.experience}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Visi Kepemimpinan
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    "Memimpin dengan integritas, mengembangkan potensi setiap siswa, dan membangun 
                    sekolah yang unggul dalam prestasi akademik maupun pembentukan karakter Islami."
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Message */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-xl relative">
              <Quote className="absolute top-8 right-8 w-12 h-12 text-blue-200 dark:text-blue-800" />
              
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Sambutan Kepala Sekolah
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
              </div>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {headmaster.message?.split('\n\n').map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4">
                  <img
                    src={headmaster.image_url}
                    alt={headmaster.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {headmaster.name}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">
                      Kepala Sekolah SMKS Muhammadiyah Satui
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* School Statistics */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Pencapaian Sekolah
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Prestasi yang telah diraih di bawah kepemimpinan beliau
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '800+', label: 'Siswa Aktif', icon: Users },
              { number: '5', label: 'Program Keahlian', icon: GraduationCap },
              { number: '30+', label: 'Prestasi Diraih', icon: Award },
              { number: '20', label: 'Tahun Pengalaman', icon: Quote }
            ].map((stat, index) => (
              <ScrollReveal key={stat.label} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8"
                >
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg mb-4 w-fit mx-auto">
                    <stat.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}