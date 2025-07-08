import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '../components/ScrollReveal';
import { BookOpen, Clock, Users, Award, CheckCircle } from 'lucide-react';
import { programsService, type Program } from '../lib/database';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export const Programs: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        const data = await programsService.getActive();
        setPrograms(data);
      } catch (error) {
        console.error('Error loading programs:', error);
        toast.error('Gagal memuat program keahlian');
      } finally {
        setLoading(false);
      }
    };
    loadPrograms();
  }, []);

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-2xl text-gray-600 dark:text-gray-300">Memuat program...</div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Program Keahlian</h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                Pilihan program keahlian yang sesuai dengan minat dan bakat Anda
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Mengapa Memilih Program Kami?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Dirancang sesuai kebutuhan industri dengan fasilitas modern dan pengajar berpengalaman.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { icon: BookOpen, title: 'Kurikulum Terkini', desc: 'Sesuai standar industri' },
              { icon: Users, title: 'Pengajar Berpengalaman', desc: 'Praktisi dan akademisi' },
              { icon: Award, title: 'Sertifikasi Kompetensi', desc: 'Diakui dunia kerja' },
              { icon: Clock, title: 'Praktek Intensif', desc: '70% praktek, 30% teori' }
            ].map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 0.1}>
                <div className="text-center">
                  <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-2xl w-fit mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {programs.map((program, index) => (
              <ScrollReveal key={program.id} delay={index * 0.1}>
                <Link to={`/program-keahlian/${program.code}`}>
                  <motion.div
                    whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)" }}
                    className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl transition-all duration-300"
                  >
                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                      <div className={`relative h-64 lg:h-auto overflow-hidden ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                        <img src={program.image_url} alt={program.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <span className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold text-lg">{program.code}</span>
                        </div>
                      </div>
                      <div className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                        <div className="flex items-center space-x-4 mb-4">
                            <BookOpen className="w-6 h-6 text-blue-600" />
                            <span className="text-blue-600 dark:text-blue-400 font-medium">{program.duration}</span>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{program.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed line-clamp-3">{program.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-3">Kompetensi</h4>
                            <ul className="space-y-2">
                              {program.competencies.slice(0, 3).map((item, idx) => <li key={idx} className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1" /><span>{item}</span></li>)}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-3">Prospek Karir</h4>
                            <ul className="space-y-2">
                              {program.career_prospects.slice(0, 3).map((item, idx) => <li key={idx} className="flex items-start"><Award className="w-5 h-5 text-yellow-500 mr-2 mt-1" /><span>{item}</span></li>)}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};