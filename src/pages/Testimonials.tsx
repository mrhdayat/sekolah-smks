// src/pages/Testimonials.tsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '../components/ScrollReveal';
import { Star, Quote, GraduationCap, Briefcase } from 'lucide-react';
import { testimonialsService, type Testimonial } from '../lib/database';
import { toast } from 'react-toastify';
// --- PERUBAHAN 1: Impor Link ---
import { Link } from 'react-router-dom';

export const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('Semua');

  const roles = ['Semua', 'Alumni', 'Orang Tua', 'Siswa', 'Mitra Industri'];

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const data = await testimonialsService.getApproved();
      setTestimonials(data);
    } catch (error) {
      console.error('Error loading testimonials:', error);
      toast.error('Gagal memuat testimoni');
      // Data fallback jika terjadi error
      setTestimonials([
        {
          id: '1',
          name: 'Muhammad Rizki Pratama',
          role: 'Alumni',
          graduation_year: 2022,
          current_job: 'Web Developer di PT. Teknologi Nusantara',
          content: 'SMKS Muhammadiyah Satui memberikan bekal yang sangat baik untuk karir saya...',
          rating: 5,
          image_url: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400',
          is_featured: true,
          is_approved: true,
          created_at: new Date().toISOString()
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredTestimonials = filter === 'Semua' 
    ? testimonials 
    : testimonials.filter(item => item.role === filter);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-2xl text-gray-600 dark:text-gray-300">Memuat testimoni...</div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-teal-600 to-cyan-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Testimoni</h1>
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

      {/* ... (bagian Featured dan All Testimonials tetap sama) ... */}
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
              
              {/* --- PERUBAHAN 2: Tombol dibungkus dengan Link --- */}
              <Link to="/kirim-testimoni">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-teal-600 font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Kirim Testimoni
                </motion.button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};