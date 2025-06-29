import React from 'react'
import { Gallery as GalleryComponent } from '../components/Gallery'
import { ScrollReveal } from '../components/ScrollReveal'

export const Gallery: React.FC = () => {
  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-pink-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Galeri Sekolah
              </h1>
              <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto">
                Momen berharga dan fasilitas unggulan sekolah kami
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery Component */}
      <GalleryComponent />
    </div>
  )
}