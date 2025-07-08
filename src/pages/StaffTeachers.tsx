import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '../components/ScrollReveal';
import { GraduationCap, Mail, Phone, BookOpen, Award } from 'lucide-react'; // Impor digunakan kembali
import { staffTeachersService, type StaffTeacher } from '../lib/database';
import { toast } from 'react-toastify';

export const StaffTeachers: React.FC = () => {
  const [teachers, setTeachers] = useState<StaffTeacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('Semua');
  const [categories, setCategories] = useState<string[]>(['Semua']);

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    try {
      const data = await staffTeachersService.getAll();
      setTeachers(data);
      const dynamicCategories = ['Semua', ...Array.from(new Set(data.map(t => t.department).filter(Boolean)))];
      setCategories(dynamicCategories);
    } catch (error) {
      console.error('Error loading teachers:', error);
      toast.error('Gagal memuat data guru');
    } finally {
      setLoading(false);
    }
  };

  const filteredTeachers = filter === 'Semua' 
    ? teachers 
    : teachers.filter(teacher => teacher.department === filter);

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-2xl text-gray-600 dark:text-gray-300">Memuat data guru...</div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Staf Pengajar</h1>
              <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto">
                Tenaga pengajar profesional dan berpengalaman di bidangnya
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <motion.button key={category} onClick={() => setFilter(category)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    filter === category
                      ? 'bg-emerald-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}>
                  {category}
                </motion.button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTeachers.map((teacher, index) => (
              <ScrollReveal key={teacher.id} delay={index * 0.1}>
                <motion.div whileHover={{ y: -10 }} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="relative">
                    <img src={teacher.image_url} alt={teacher.name} className="w-full h-64 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-1">{teacher.name}</h3>
                      <p className="text-emerald-200 font-medium">{teacher.position}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <GraduationCap className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{teacher.education}</span>
                    </div>
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Mata Pelajaran:</h4>
                      <div className="flex flex-wrap gap-2">
                        {teacher.subjects.map((subject, idx) => (
                          <span key={idx} className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-sm rounded-full">
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                    {teacher.bio && (<p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">{teacher.bio}</p>)}
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center space-x-1">
                        <Award className="w-4 h-4" />
                        <span>{teacher.experience_years} tahun pengalaman</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {teacher.email && (
                        <div className="flex items-center space-x-2 text-sm">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <a href={`mailto:${teacher.email}`} className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300">
                            {teacher.email}
                          </a>
                        </div>
                      )}
                      {teacher.phone && (
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <a href={`tel:${teacher.phone}`} className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300">
                            {teacher.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
          {filteredTeachers.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">Tidak ada guru untuk kategori "{filter}"</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};