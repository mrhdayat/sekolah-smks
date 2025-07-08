import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Star } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { visiMisiService, type VisiMisi as VisiMisiType } from '../lib/database';

export const VisionMission: React.FC = () => {
  const [data, setData] = useState<Partial<VisiMisiType>>({
    visi: 'Visi sekolah sedang dimuat...',
    misi: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVisiMisi = async () => {
      try {
        const visiMisiData = await visiMisiService.get();
        if (visiMisiData) {
          setData(visiMisiData);
        }
      } catch (error) {
        console.error("Gagal memuat data Visi & Misi:", error);
      } finally {
        setLoading(false);
      }
    };
    loadVisiMisi();
  }, []);

  return (
    <section id="visi-misi" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Visi & Misi
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Komitmen kami dalam membentuk generasi unggul dengan karakter Islami dan kompeten
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <ScrollReveal direction="left" delay={0.2}>
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-2xl">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white ml-4">
                  Visi
                </h3>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {loading ? 'Memuat...' : data.visi}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.4}>
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-3 rounded-2xl">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white ml-4">
                  Misi
                </h3>
              </div>
              <ul className="space-y-4">
                {loading ? (
                  <li>Memuat...</li>
                ) : (
                  data.misi?.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-start text-gray-600 dark:text-gray-300"
                    >
                      <Star className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-1" />
                      <span>{item}</span>
                    </motion.li>
                  ))
                )}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};