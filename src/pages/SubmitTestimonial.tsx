// src/pages/SubmitTestimonial.tsx

import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { testimonialsService } from '../lib/database';
import { ScrollReveal } from '../components/ScrollReveal';
import { Send, User, Star, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type TestimonialFormData = {
  name: string;
  role: 'Alumni' | 'Orang Tua' | 'Siswa' | 'Mitra Industri';
  content: string;
  rating: number;
};

export const SubmitTestimonial: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TestimonialFormData>({
    defaultValues: { role: 'Siswa', rating: 5 }
  });

  const onSubmit: SubmitHandler<TestimonialFormData> = async (data) => {
    try {
      // --- PERBAIKAN DI SINI ---
      // Kita tidak perlu lagi mengirim is_approved atau is_featured,
      // karena sudah ditangani oleh fungsi database.
      await testimonialsService.create(data);
      
      toast.success('Terima kasih! Testimoni Anda telah dikirim dan akan ditinjau oleh admin.');
      navigate('/testimoni');
    } catch (error: any) {
      toast.error(`Gagal mengirim testimoni: ${error.message}`);
    }
  };

  // ... sisa kode komponen tidak ada perubahan ...
  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-cyan-600 to-teal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Bagikan Pengalaman Anda
              </h1>
              <p className="text-xl md:text-2xl text-cyan-100 max-w-3xl mx-auto">
                Kesan dan pesan Anda sangat berarti bagi kami untuk terus menjadi lebih baik.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Formulir */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nama Lengkap</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="name"
                      type="text"
                      {...register('name', { required: 'Nama wajib diisi' })}
                      className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="Masukkan nama Anda"
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Peran Anda</label>
                   <select
                      id="role"
                      {...register('role', { required: 'Peran wajib dipilih' })}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="Siswa">Siswa</option>
                      <option value="Alumni">Alumni</option>
                      <option value="Orang Tua">Orang Tua</option>
                      <option value="Mitra Industri">Mitra Industri</option>
                    </select>
                  {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating (1-5)</label>
                  <div className="relative">
                    <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                     <input
                      id="rating"
                      type="number"
                      {...register('rating', { 
                        required: 'Rating wajib diisi',
                        valueAsNumber: true,
                        min: { value: 1, message: 'Rating minimal 1' },
                        max: { value: 5, message: 'Rating maksimal 5' }
                      })}
                      className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl"
                      placeholder="Beri rating dari 1 sampai 5"
                    />
                  </div>
                  {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>}
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Testimoni Anda</label>
                   <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                     <textarea
                      id="content"
                      rows={5}
                      {...register('content', { required: 'Testimoni wajib diisi', minLength: { value: 20, message: 'Testimoni minimal 20 karakter' } })}
                      className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl resize-none"
                      placeholder="Tuliskan pengalaman Anda di sini..."
                    />
                  </div>
                  {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70"
                >
                  <Send className="w-5 h-5 mr-2" />
                  {isSubmitting ? 'Mengirim...' : 'Kirim Testimoni'}
                </motion.button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};