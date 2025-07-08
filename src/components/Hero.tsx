import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Users, BookOpen } from 'lucide-react';
import { useViewTransition } from '../hooks/useViewTransition';
import { schoolStatsService, galleryService, type GalleryItem } from '../lib/database';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

export const Hero: React.FC = () => {
  const { startTransition } = useViewTransition();
  const [stats, setStats] = useState({ students: '800+', programs: '5', achievements: '30+' });
  const [sliderImages, setSliderImages] = useState<GalleryItem[]>([]);

  useEffect(() => {
    const loadHeroData = async () => {
      try {
        const [statsData, imagesData] = await Promise.all([
          schoolStatsService.getAll(),
          galleryService.getByCategory('Fasilitas')
        ]);

        if (statsData && statsData.content) setStats(statsData.content);
        
        if (imagesData && imagesData.length > 0) {
          setSliderImages(imagesData);
        } else {
          setSliderImages([
            { id: '1', title: 'Perpustakaan Digital', image_url: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'Fasilitas', description: '', created_at: '' },
            { id: '2', title: 'Ruang Kelas Modern', image_url: 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'Fasilitas', description: '', created_at: '' },
          ]);
        }
      } catch (error) { console.error('Error loading hero data:', error); }
    };
    loadHeroData();
  }, []);

  const handleExploreClick = () => {
    const profileSection = document.getElementById('profile-section');
    if (profileSection) profileSection.scrollIntoView({ behavior: 'smooth' });
    else startTransition('/profil');
  };
  const handleGalleryClick = () => startTransition('/galeri');

  return (
    // Container utama ini akan 'mendorong' konten di bawahnya
    <section className="relative h-screen bg-gray-900 text-white overflow-hidden">
      {/* Latar belakang slider diposisikan absolut di dalam container */}
      <div className="absolute inset-0 w-full h-full">
        <Swiper
          modules={[Autoplay, EffectFade]}
          spaceBetween={0}
          centeredSlides={true}
          loop={true}
          effect={'fade'}
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          className="w-full h-full"
        >
          {sliderImages.map((image) => (
            <SwiperSlide key={image.id}>
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${image.image_url})` }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Lapisan overlay gelap */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Konten teks diletakkan di atas dengan z-index */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <motion.span initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="block">SMKS</motion.span>
            <motion.span initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="block bg-gradient-to-r from-primary-light to-emerald-400 bg-clip-text text-transparent">
              Muhammadiyah Satui
            </motion.span>
          </h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Membentuk generasi unggul dengan pendidikan berkualitas tinggi, teknologi terdepan, dan nilai-nilai Islami
          </motion.p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <motion.button onClick={handleExploreClick} whileHover={{ scale: 1.05 }} className="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary-dark font-semibold rounded-full transition-colors shadow-lg">
            Jelajahi Sekolah <ArrowRight className="ml-2 w-5 h-5" />
          </motion.button>
          <motion.button onClick={handleGalleryClick} whileHover={{ scale: 1.05 }} className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 font-semibold rounded-full border border-white/20">
            Lihat Galeri
          </motion.button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { icon: Users, label: 'Siswa Aktif', value: stats.students },
            { icon: BookOpen, label: 'Program Keahlian', value: stats.programs },
            { icon: Award, label: 'Prestasi', value: stats.achievements },
          ].map((stat, index) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <stat.icon className="w-8 h-8 text-primary-light mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};