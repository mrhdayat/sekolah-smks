import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { programsService, type Program } from '../lib/database';
import { toast } from 'react-toastify';
import { ScrollReveal } from '../components/ScrollReveal';
import { ArrowLeft, Award, CheckCircle } from 'lucide-react';

export const ProgramDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (code) {
      const loadProgramDetail = async () => {
        setLoading(true);
        try {
          const data = await programsService.getByCode(code);
          setProgram(data);
        } catch (error) {
          console.error('Error loading program detail:', error);
          toast.error('Gagal memuat detail program keahlian.');
        } finally {
          setLoading(false);
        }
      };
      loadProgramDetail();
    }
  }, [code]);

  if (loading) {
    return <div className="pt-16 min-h-screen flex items-center justify-center">Memuat detail program...</div>;
  }

  if (!program) {
    return (
      <div className="pt-16 min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold mb-4">Program Keahlian Tidak Ditemukan</h1>
        <Link to="/program-keahlian" className="inline-flex items-center text-blue-600 dark:text-blue-400">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Daftar Program
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-16 bg-white dark:bg-gray-900">
      <section className="relative py-24 bg-gray-800 text-white">
        <img src={program.image_url} alt={program.name} className="absolute inset-0 w-full h-full object-cover opacity-20"/>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400 font-semibold">{program.code}</span>
            <h1 className="text-5xl md:text-6xl font-bold mt-6 mb-4">{program.name}</h1>
            <p className="text-xl text-gray-300">{program.duration}</p>
          </ScrollReveal>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
        <Link to="/program-keahlian" className="inline-flex items-center text-blue-600 dark:text-blue-400 mb-12 hover:underline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Semua Program
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <ScrollReveal>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Deskripsi Program</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{program.description}</p>
            </ScrollReveal>
          </div>
          <div className="space-y-8">
            <ScrollReveal>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Kompetensi Keahlian</h3>
                <ul className="space-y-2">
                  {program.competencies.map((item, index) => (
                    <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Prospek Karir</h3>
                <ul className="space-y-2">
                  {program.career_prospects.map((item, index) => (
                    <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                        <Award className="w-5 h-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
};