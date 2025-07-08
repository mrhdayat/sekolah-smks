import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '../components/ScrollReveal';
import { Quote, GraduationCap, Award, Users, Mail, Phone } from 'lucide-react';
import { leadershipService, schoolProfileService, type Leadership } from '../lib/database';
import { toast } from 'react-toastify';

export const HeadmasterMessage: React.FC = () => {
  const [headmaster, setHeadmaster] = useState<Leadership | null>(null);
  const [stats, setStats] = useState({
    siswa_aktif: '0',
    program_keahlian: '0',
    prestasi_diraih: '0',
    tahun_pengalaman: '0'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [headmasterData, statsData] = await Promise.all([
          leadershipService.getHeadmaster(),
          schoolProfileService.getBySection('headmaster_page_stats')
        ]);
        
        setHeadmaster(headmasterData);
        
        if (statsData && statsData.content) {
          setStats(statsData.content);
        }
      } catch (error) {
        console.error('Gagal memuat data halaman:', error);
        toast.error('Gagal memuat data halaman sambutan');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        Memuat...
      </div>
    );
  }

  if (!headmaster) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        Data Kepala Sekolah tidak ditemukan.
      </div>
    );
  }

  const achievementStats = [
      { number: stats.siswa_aktif, label: 'Siswa Aktif', icon: Users },
      { number: stats.program_keahlian, label: 'Program Keahlian', icon: GraduationCap },
      { number: stats.prestasi_diraih, label: 'Prestasi Diraih', icon: Award },
      { number: stats.tahun_pengalaman, label: 'Tahun Pengalaman', icon: Quote }
  ];

  return (
    <div className="pt-16">
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Sambutan Kepala Sekolah</h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">Pesan dan visi dari pemimpin SMKS Muhammadiyah Satui</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <ScrollReveal direction="left">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl transform rotate-3"></div>
                <img src={headmaster.image_url} alt={headmaster.name} className="relative w-full h-96 object-cover rounded-3xl shadow-2xl"/>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.2}>
              <div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{headmaster.name}</h2>
                <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold mb-6">{headmaster.position}</p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3"><Award className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" /><div><h3 className="font-semibold text-gray-900 dark:text-white">Pendidikan</h3><p className="text-gray-600 dark:text-gray-300">{headmaster.education}</p></div></div>
                  {headmaster.experience && (<div className="flex items-start space-x-3"><Users className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" /><div><h3 className="font-semibold text-gray-900 dark:text-white">Pengalaman</h3><p className="text-gray-600 dark:text-gray-300">{headmaster.experience}</p></div></div>)}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-xl relative">
              <Quote className="absolute top-8 right-8 w-12 h-12 text-blue-100 dark:text-blue-900" />
              <div className="mb-8"><h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Pesan dari Kepala Sekolah</h2><div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div></div>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {headmaster.message?.split('\n\n').map((paragraph, index) => (<motion.p key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{paragraph}</motion.p>))}
              </div>
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4">
                  <img src={headmaster.image_url} alt={headmaster.name} className="w-16 h-16 rounded-full object-cover"/>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{headmaster.name}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      {headmaster.email && <a href={`mailto:${headmaster.email}`} className="text-gray-500 hover:text-blue-600"><Mail className="w-5 h-5"/></a>}
                      {headmaster.phone && <a href={`tel:${headmaster.phone}`} className="text-gray-500 hover:text-blue-600"><Phone className="w-5 h-5"/></a>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal><div className="text-center mb-16"><h2 className="text-3xl font-bold">Pencapaian Sekolah</h2></div></ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievementStats.map((stat, index) => (
              <ScrollReveal key={stat.label} delay={index * 0.1}>
                <motion.div whileHover={{ y: -10 }} className="text-center bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
                  <div className="bg-white dark:bg-gray-700 p-4 rounded-2xl shadow-lg mb-4 w-fit mx-auto"><stat.icon className="w-8 h-8 text-blue-600" /></div>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{stat.number}</div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};