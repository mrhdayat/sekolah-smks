import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ScrollReveal } from '../components/ScrollReveal'
import { Calendar, User, ArrowRight, Search } from 'lucide-react'
import { newsService, type News } from '../lib/database'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

export const News: React.FC = () => {
  const [newsItems, setNewsItems] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState<string>('Semua')

  const categories = ['Semua', 'Berita', 'Artikel', 'Pengumuman', 'Prestasi']

  useEffect(() => {
    loadNews()
  }, [])

  const loadNews = async () => {
    try {
      const data = await newsService.getPublished()
      setNewsItems(data)
    } catch (error) {
      console.error('Error loading news:', error)
      toast.error('Gagal memuat berita')
      // Fallback data
      setNewsItems([
        {
          id: '1',
          title: 'SMKS Muhammadiyah Satui Raih Juara 1 LKS Tingkat Kabupaten',
          content: 'Siswa SMKS Muhammadiyah Satui berhasil meraih juara 1 dalam Lomba Kompetensi Siswa (LKS) tingkat kabupaten bidang Web Design. Prestasi ini membuktikan kualitas pendidikan di sekolah kami.',
          excerpt: 'Siswa SMKS Muhammadiyah Satui berhasil meraih juara 1 dalam Lomba Kompetensi Siswa (LKS) tingkat kabupaten bidang Web Design.',
          image_url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
          category: 'Prestasi',
          author: 'Admin Sekolah',
          is_published: true,
          published_at: '2025-01-15T10:00:00Z',
          created_at: '2025-01-15T10:00:00Z'
        },
        {
          id: '2',
          title: 'Workshop Digital Marketing untuk Siswa Multimedia',
          content: 'Sekolah mengadakan workshop digital marketing khusus untuk siswa program keahlian multimedia. Workshop ini bertujuan untuk meningkatkan keterampilan siswa di bidang pemasaran digital.',
          excerpt: 'Sekolah mengadakan workshop digital marketing khusus untuk siswa program keahlian multimedia.',
          image_url: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
          category: 'Berita',
          author: 'Tim Multimedia',
          is_published: true,
          published_at: '2025-01-10T09:00:00Z',
          created_at: '2025-01-10T09:00:00Z'
        },
        {
          id: '3',
          title: 'Pengumuman Penerimaan Peserta Didik Baru 2025/2026',
          content: 'SMKS Muhammadiyah Satui membuka pendaftaran peserta didik baru untuk tahun ajaran 2025/2026. Pendaftaran dibuka mulai tanggal 1 Februari 2025.',
          excerpt: 'SMKS Muhammadiyah Satui membuka pendaftaran peserta didik baru untuk tahun ajaran 2025/2026.',
          image_url: 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=800',
          category: 'Pengumuman',
          author: 'Panitia PPDB',
          is_published: true,
          published_at: '2025-01-05T08:00:00Z',
          created_at: '2025-01-05T08:00:00Z'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const filteredNews = newsItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'Semua' || item.category === filter
    return matchesSearch && matchesFilter
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-2xl text-gray-600 dark:text-gray-300">Memuat berita...</div>
      </div>
    )
  }

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Berita & Artikel
              </h1>
              <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
                Informasi terkini seputar kegiatan dan prestasi sekolah
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari berita..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setFilter(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      filter === category
                        ? 'bg-indigo-600 text-white shadow-lg'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredNews.length > 0 && (
            <>
              {/* Featured News */}
              <ScrollReveal>
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    Berita Utama
                  </h2>
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      <div className="relative h-64 lg:h-auto overflow-hidden">
                        <img
                          src={filteredNews[0].image_url}
                          alt={filteredNews[0].title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="flex items-center space-x-4 mb-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            filteredNews[0].category === 'Prestasi' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                            filteredNews[0].category === 'Pengumuman' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' :
                            'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200'
                          }`}>
                            {filteredNews[0].category}
                          </span>
                          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(filteredNews[0].published_at)}
                          </div>
                        </div>
                        
                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                          {filteredNews[0].title}
                        </h3>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                          {filteredNews[0].excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                            <User className="w-4 h-4 mr-1" />
                            {filteredNews[0].author}
                          </div>
                          
                          <Link
                            to={`/berita/${filteredNews[0].id}`}
                            className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
                          >
                            Baca Selengkapnya
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </ScrollReveal>

              {/* Other News */}
              {filteredNews.length > 1 && (
                <div>
                  <ScrollReveal>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                      Berita Lainnya
                    </h2>
                  </ScrollReveal>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredNews.slice(1).map((item, index) => (
                      <ScrollReveal key={item.id} delay={index * 0.1}>
                        <motion.div
                          whileHover={{ y: -10 }}
                          className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={item.image_url}
                              alt={item.title}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          
                          <div className="p-6">
                            <div className="flex items-center space-x-2 mb-3">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                item.category === 'Prestasi' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                                item.category === 'Pengumuman' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' :
                                'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200'
                              }`}>
                                {item.category}
                              </span>
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                              {item.title}
                            </h3>
                            
                            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                              {item.excerpt}
                            </p>
                            
                            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {formatDate(item.published_at)}
                              </div>
                              <div className="flex items-center">
                                <User className="w-4 h-4 mr-1" />
                                {item.author}
                              </div>
                            </div>
                            
                            <Link
                              to={`/berita/${item.id}`}
                              className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
                            >
                              Baca Selengkapnya
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                          </div>
                        </motion.div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {searchTerm ? `Tidak ada berita yang ditemukan untuk "${searchTerm}"` : `Tidak ada berita untuk kategori "${filter}"`}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}