import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ScrollReveal } from '../components/ScrollReveal'
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'
import { newsService, type News } from '../lib/database'
import { toast } from 'react-toastify'

export const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [news, setNews] = useState<News | null>(null)
  const [loading, setLoading] = useState(true)
  const [relatedNews, setRelatedNews] = useState<News[]>([])

  useEffect(() => {
    if (id) {
      loadNewsDetail(id)
    }
  }, [id])

  const loadNewsDetail = async (newsId: string) => {
    try {
      const newsData = await newsService.getById(newsId)
      setNews(newsData)
      
      // Load related news
      const allNews = await newsService.getPublished()
      const related = allNews
        .filter(item => item.id !== newsId && item.category === newsData.category)
        .slice(0, 3)
      setRelatedNews(related)
    } catch (error) {
      console.error('Error loading news detail:', error)
      toast.error('Gagal memuat detail berita')
      
      // Fallback data
      setNews({
        id: newsId,
        title: 'SMKS Muhammadiyah Satui Raih Juara 1 LKS Tingkat Kabupaten',
        content: `
          <p>Siswa SMKS Muhammadiyah Satui berhasil meraih juara 1 dalam Lomba Kompetensi Siswa (LKS) tingkat kabupaten bidang Web Design. Prestasi membanggakan ini diraih oleh Muhammad Rizki Pratama, siswa kelas XII program keahlian Rekayasa Perangkat Lunak.</p>
          
          <p>Lomba yang diselenggarakan oleh Dinas Pendidikan Kabupaten Tanah Bumbu ini diikuti oleh 25 sekolah menengah kejuruan se-kabupaten. Kompetisi berlangsung selama 3 hari dengan berbagai tantangan yang menguji kemampuan teknis dan kreativitas peserta.</p>
          
          <p>"Saya sangat bangga dengan prestasi yang diraih. Ini adalah hasil dari kerja keras dan dukungan dari guru-guru di sekolah," ujar Muhammad Rizki Pratama saat diwawancarai.</p>
          
          <p>Kepala Sekolah SMKS Muhammadiyah Satui, Drs. Ahmad Fauzi, M.Pd., menyampaikan apresiasi tinggi atas prestasi yang diraih. "Prestasi ini membuktikan bahwa kualitas pendidikan di sekolah kami terus meningkat. Kami berkomitmen untuk terus mengembangkan potensi siswa di berbagai bidang," katanya.</p>
          
          <p>Dengan prestasi ini, Muhammad Rizki Pratama berhak mewakili Kabupaten Tanah Bumbu dalam LKS tingkat provinsi yang akan diselenggarakan bulan depan di Banjarmasin.</p>
          
          <p>SMKS Muhammadiyah Satui terus berupaya meningkatkan kualitas pendidikan dan menghasilkan lulusan yang kompeten dan siap bersaing di dunia kerja. Prestasi ini menjadi motivasi bagi seluruh civitas akademika untuk terus berprestasi.</p>
        `,
        excerpt: 'Siswa SMKS Muhammadiyah Satui berhasil meraih juara 1 dalam Lomba Kompetensi Siswa (LKS) tingkat kabupaten bidang Web Design.',
        image_url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200',
        category: 'Prestasi',
        author: 'Admin Sekolah',
        is_published: true,
        published_at: '2025-01-15T10:00:00Z',
        created_at: '2025-01-15T10:00:00Z'
      })
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const shareUrl = window.location.href
  const shareTitle = news?.title || ''

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-2xl text-gray-600 dark:text-gray-300">Memuat berita...</div>
      </div>
    )
  }

  if (!news) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Berita tidak ditemukan
          </h1>
          <Link
            to="/berita"
            className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Berita
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <Link
              to="/berita"
              className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Berita
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Article */}
      <article className="pb-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Article Header */}
          <ScrollReveal>
            <header className="mb-8">
              <div className="flex items-center space-x-4 mb-6">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  news.category === 'Prestasi' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                  news.category === 'Pengumuman' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' :
                  'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200'
                }`}>
                  {news.category}
                </span>
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDate(news.published_at)}
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                  <User className="w-4 h-4 mr-2" />
                  {news.author}
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {news.title}
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                {news.excerpt}
              </p>
            </header>
          </ScrollReveal>

          {/* Featured Image */}
          <ScrollReveal delay={0.2}>
            <div className="mb-8">
              <img
                src={news.image_url}
                alt={news.title}
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </ScrollReveal>

          {/* Article Content */}
          <ScrollReveal delay={0.4}>
            <div 
              className="prose prose-lg dark:prose-invert max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
          </ScrollReveal>

          {/* Share Buttons */}
          <ScrollReveal delay={0.6}>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mb-12">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Share2 className="w-5 h-5 mr-2" />
                Bagikan Artikel
              </h3>
              <div className="flex space-x-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                  <span>Facebook</span>
                </motion.a>
                
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                  <span>Twitter</span>
                </motion.a>
                
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </motion.a>
              </div>
            </div>
          </ScrollReveal>

          {/* Related News */}
          {relatedNews.length > 0 && (
            <ScrollReveal delay={0.8}>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                  Berita Terkait
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedNews.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                          {item.excerpt}
                        </p>
                        <Link
                          to={`/berita/${item.id}`}
                          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm font-medium"
                        >
                          Baca Selengkapnya →
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </article>
    </div>
  )
}