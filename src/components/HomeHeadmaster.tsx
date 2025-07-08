// src/components/HomeHeadmaster.tsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Quote, ArrowRight } from 'lucide-react';
import { leadershipService, type Leadership } from '../lib/database';
import { ScrollReveal } from './ScrollReveal';

export const HomeHeadmaster: React.FC = () => {
  const [headmaster, setHeadmaster] = useState<Leadership | null>(null);

  useEffect(() => {
    const loadHeadmaster = async () => {
      try {
        const data = await leadershipService.getHeadmaster();
        setHeadmaster(data);
      } catch (error) {
        console.error('Gagal memuat data kepala sekolah untuk halaman utama:', error);
      }
    };
    loadHeadmaster();
  }, []);

  if (!headmaster) {
    return null; // Jangan tampilkan apa-apa jika data tidak ada
  }

  // Ambil 2 paragraf pertama dari pesan untuk ringkasan
  const messageSnippet = headmaster.message?.split('\n\n').slice(0, 2).join('<br/><br/>') + '...';

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <ScrollReveal direction="left">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative aspect-w-3 aspect-h-4"
            >
              <div className="absolute -inset-2 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-3xl transform -rotate-3"></div>
              <img
                src={headmaster.image_url}
                alt={headmaster.name}
                className="relative w-full h-full object-cover rounded-3xl shadow-2xl"
              />
            </motion.div>
          </ScrollReveal>
          
          <div className="lg:col-span-2">
            <ScrollReveal direction="right" delay={0.2}>
              <Quote className="w-12 h-12 text-blue-200 dark:text-blue-800 mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Sambutan dari Kepala Sekolah
              </h2>
              <div
                className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed line-clamp-4 mb-8"
                dangerouslySetInnerHTML={{ __html: messageSnippet }}
              />
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">{headmaster.name}</h4>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-6">{headmaster.position}</p>
                <Link to="/sambutan-kepsek">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors shadow-lg"
                  >
                    Baca Selengkapnya
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </motion.button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};