import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import { galleryService, type GalleryItem } from '../lib/database'
import { toast } from 'react-toastify'

export const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const [filter, setFilter] = useState<string>('Semua')
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)

  const categories = ['Semua', 'Fasilitas', 'Kegiatan', 'Prestasi', 'Acara']
  
  useEffect(() => {
    loadGalleryItems()
  }, [])

  const loadGalleryItems = async () => {
    try {
      const data = await galleryService.getAll()
      setGalleryItems(data)
    } catch (error) {
      console.error('Error loading gallery:', error)
      toast.error('Gagal memuat galeri')
      // Fallback to static data if database fails
      setGalleryItems([
        {
          id: '1',
          title: 'Laboratorium Komputer',
          description: 'Fasilitas laboratorium komputer modern dengan perangkat terkini',
          image_url: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800',
          category: 'Fasilitas',
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Ruang Kelas Modern',
          description: 'Ruang kelas yang nyaman dan dilengkapi teknologi pembelajaran',
          image_url: 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=800',
          category: 'Fasilitas',
          created_at: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Kegiatan Praktikum',
          description: 'Siswa melakukan praktikum di laboratorium',
          image_url: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
          category: 'Kegiatan',
          created_at: new Date().toISOString()
        },
        {
          id: '4',
          title: 'Perpustakaan Digital',
          description: 'Perpustakaan modern dengan koleksi digital lengkap',
          image_url: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&w=800',
          category: 'Fasilitas',
          created_at: new Date().toISOString()
        },
        {
          id: '5',
          title: 'Kompetisi Siswa',
          description: 'Prestasi siswa dalam berbagai kompetisi',
          image_url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
          category: 'Prestasi',
          created_at: new Date().toISOString()
        },
        {
          id: '6',
          title: 'Workshop Teknik',
          description: 'Kegiatan workshop untuk meningkatkan keterampilan teknis',
          image_url: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
          category: 'Kegiatan',
          created_at: new Date().toISOString()
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const filteredImages = filter === 'Semua' 
    ? galleryItems 
    : galleryItems.filter(img => img.category === filter)

  if (loading) {
    return (
      <section id="gallery-section" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl text-gray-600 dark:text-gray-300">Memuat galeri...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="gallery-section" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Galeri Sekolah
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Dokumentasi kegiatan dan fasilitas sekolah kami
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Image Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={image.image_url}
                    alt={image.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <motion.button
                      onClick={() => setSelectedImage(image)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30"
                    >
                      <ZoomIn className="w-6 h-6 text-white" />
                    </motion.button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {image.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {image.description}
                  </p>
                  <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                    {image.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Tidak ada item galeri untuk kategori "{filter}"
            </p>
          </div>
        )}

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="relative max-w-4xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <img
                  src={selectedImage.image_url}
                  alt={selectedImage.title}
                  className="w-full h-auto"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedImage.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {selectedImage.description}
                  </p>
                  <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                    {selectedImage.category}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}