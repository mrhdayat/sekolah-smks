import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ScrollReveal } from '../components/ScrollReveal'
import { Calendar, Clock, MapPin, Star } from 'lucide-react'
import { agendaService, type Agenda } from '../lib/database'
import { toast } from 'react-toastify'

export const Agenda: React.FC = () => {
  const [agendaItems, setAgendaItems] = useState<Agenda[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('Semua')

  const categories = ['Semua', 'Kegiatan', 'Ujian', 'Lomba', 'Acara']

  useEffect(() => {
    loadAgenda()
  }, [])

  const loadAgenda = async () => {
    try {
      const data = await agendaService.getAll()
      setAgendaItems(data)
    } catch (error) {
      console.error('Error loading agenda:', error)
      toast.error('Gagal memuat agenda')
      // Fallback data
      setAgendaItems([
        {
          id: '1',
          title: 'Ujian Tengah Semester',
          description: 'Pelaksanaan ujian tengah semester untuk semua program keahlian',
          event_date: '2025-02-15',
          event_time: '08:00',
          location: 'Ruang Kelas',
          category: 'Ujian',
          image_url: 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=800',
          is_featured: true,
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Workshop Digital Marketing',
          description: 'Pelatihan digital marketing untuk siswa program keahlian multimedia',
          event_date: '2025-02-20',
          event_time: '09:00',
          location: 'Lab Multimedia',
          category: 'Kegiatan',
          image_url: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
          is_featured: false,
          created_at: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Lomba Kompetensi Siswa',
          description: 'Kompetisi antar siswa dalam bidang teknologi informasi',
          event_date: '2025-03-01',
          event_time: '08:00',
          location: 'Aula Sekolah',
          category: 'Lomba',
          image_url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
          is_featured: true,
          created_at: new Date().toISOString()
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const filteredAgenda = filter === 'Semua' 
    ? agendaItems 
    : agendaItems.filter(item => item.category === filter)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (timeString?: string) => {
    if (!timeString) return ''
    return timeString.slice(0, 5) + ' WITA'
  }

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-2xl text-gray-600 dark:text-gray-300">Memuat agenda...</div>
      </div>
    )
  }

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-emerald-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Agenda Kegiatan
              </h1>
              <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
                Jadwal kegiatan dan aktivitas sesuai kalender pendidikan
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Agenda Content */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setFilter(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    filter === category
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </ScrollReveal>

          {/* Agenda Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredAgenda.map((item, index) => (
              <ScrollReveal key={item.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  {item.image_url && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                      {item.is_featured && (
                        <div className="absolute top-4 right-4 bg-yellow-500 text-white p-2 rounded-full">
                          <Star className="w-4 h-4" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.category === 'Ujian' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' :
                        item.category === 'Lomba' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                        'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      }`}>
                        {item.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {item.description}
                    </p>
                    
                    <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(item.event_date)}</span>
                      </div>
                      
                      {item.event_time && (
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{formatTime(item.event_time)}</span>
                        </div>
                      )}
                      
                      {item.location && (
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{item.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {filteredAgenda.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Tidak ada agenda untuk kategori "{filter}"
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}