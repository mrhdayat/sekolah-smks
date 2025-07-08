import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '../components/ScrollReveal';
import { Users, BookOpen, Building, Calendar, Trophy, Award } from 'lucide-react';
import { schoolProfileService, programsService, type Program } from '../lib/database';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { VisionMission } from '../components/VisionMission';

// Definisikan tipe data untuk setiap seksi
interface Sejarah { content: string; tahun_berdiri: string; jumlah_siswa: string; program_keahlian: string; }
// Tipe Fasilitas diperbarui untuk menyertakan 'description'
interface Fasilitas { name: string; count: string; description?: string; }
interface Prestasi { title: string; year: string; category: string; }

export const Profile: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [sejarah, setSejarah] = useState<Partial<Sejarah>>({});
  const [fasilitas, setFasilitas] = useState<Fasilitas[]>([]);
  const [prestasi, setPrestasi] = useState<Prestasi[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setLoading(true);
        const [
          sejarahData,
          fasilitasData,
          prestasiData,
          programsData
        ] = await Promise.all([
          schoolProfileService.getBySection('sejarah'),
          schoolProfileService.getBySection('fasilitas_unggulan'),
          schoolProfileService.getBySection('prestasi_terbaru'),
          programsService.getLatest(3) // Mengambil 3 program terbaru
        ]);

        if (sejarahData?.content) setSejarah(sejarahData.content);
        if (fasilitasData?.content?.fasilitas) setFasilitas(fasilitasData.content.fasilitas);
        if (prestasiData?.content?.prestasi) setPrestasi(prestasiData.content.prestasi);
        if (programsData) setPrograms(programsData);
        
      } catch (error) {
        console.error("Gagal memuat data profil:", error);
        toast.error('Gagal memuat data halaman profil.');
      } finally {
        setLoading(false);
      }
    };
    loadProfileData();
  }, []);

  if (loading) {
    return <div className="pt-16 min-h-screen flex items-center justify-center">Memuat Profil...</div>;
  }

  const historyStats = [
    { icon: Calendar, label: 'Berdiri', value: sejarah.tahun_berdiri || 'N/A' },
    { icon: Users, label: 'Siswa', value: sejarah.jumlah_siswa || 'N/A' },
    { icon: BookOpen, label: 'Program', value: sejarah.program_keahlian || 'N/A' },
    { icon: Trophy, label: 'Prestasi', value: '30+' }, // Ini bisa dibuat dinamis juga nanti
  ];
  
  // Icon mapping untuk fasilitas
  const facilityIcons: { [key: string]: React.ElementType } = {
    'Laboratorium Komputer': BookOpen,
    'Workshop Teknik': Building,
    'Perpustakaan Digital': BookOpen,
    'Masjid Sekolah': Building,
    'Gazebo': Building, // Contoh penambahan ikon
  };

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Profil Sekolah</h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">Mengenal lebih dekat SMKS Muhammadiyah Satui</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Sejarah */}
      <section id="sejarah" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Sejarah Singkat</h2>
                <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed text-lg"
                     dangerouslySetInnerHTML={{ __html: sejarah.content?.replace(/\n/g, '<br/><br/>') || 'Konten sejarah belum diatur.' }}
                />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.2}>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  {historyStats.map((stat, index) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + index * 0.1 }} className="text-center">
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg mb-3"><stat.icon className="w-8 h-8 text-blue-600 mx-auto" /></div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                      <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      <VisionMission />
      {/* Program Keahlian */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal><div className="text-center mb-16"><h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Program Keahlian Unggulan</h2><p className="text-xl text-gray-600 dark:text-gray-300">Pilihan program yang dirancang untuk masa depan</p></div></ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <ScrollReveal key={program.id} delay={index * 0.1}>
                <Link to={`/program-keahlian/${program.code}`}>
                  <motion.div whileHover={{ y: -10 }} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden"><img src={program.image_url} alt={program.name} className="w-full h-full object-cover"/></div>
                    <div className="p-6 flex flex-col flex-grow"><h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{program.name}</h3><p className="text-gray-600 dark:text-gray-300 flex-grow">{program.description}</p></div>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fasilitas Unggulan */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal><div className="text-center mb-16"><h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Fasilitas Unggulan</h2><p className="text-xl text-gray-600 dark:text-gray-300">Fasilitas modern yang mendukung proses pembelajaran</p></div></ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {fasilitas.map((facility, index) => {
              const Icon = facilityIcons[facility.name] || Building;
              return (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 text-center h-full flex flex-col">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg mb-4 w-fit mx-auto"><Icon className="w-8 h-8 text-blue-600" /></div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{facility.name}</h3>
                      <p className="text-blue-600 font-semibold mb-3">{facility.count}</p>
                      {/* --- DESKRIPSI DITAMPILKAN DI SINI --- */}
                      <p className="text-sm text-gray-500 dark:text-gray-400">{facility.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Prestasi Terbaru */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal><div className="text-center mb-16"><h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Prestasi Terbaru</h2><p className="text-xl text-gray-600 dark:text-gray-300">Pencapaian membanggakan yang diraih sekolah</p></div></ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {prestasi.map((achievement, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-2xl"><Award className="w-6 h-6 text-white" /></div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{achievement.title}</h3>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full">{achievement.category}</span>
                        <span className="text-gray-500 dark:text-gray-400">{achievement.year}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};