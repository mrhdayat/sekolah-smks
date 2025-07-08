import React, { useState, useEffect } from 'react';
import { ppdbStepsService, type PpdbStep } from '../lib/database';
import { toast } from 'react-toastify';
import { ScrollReveal } from '../components/ScrollReveal';
import { Calendar, CheckCircle, Download, FileText } from 'lucide-react';

export const PpdbInfo: React.FC = () => {
  const [steps, setSteps] = useState<PpdbStep[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSteps = async () => {
      try {
        const data = await ppdbStepsService.getAll();
        setSteps(data);
      } catch (error) { toast.error("Gagal memuat informasi PPDB."); }
      finally { setLoading(false); }
    };
    loadSteps();
  }, []);

  const formatDate = (dateStr: string | null | undefined): string => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };
  
  if (loading) return <div className="pt-16 min-h-screen flex items-center justify-center">Memuat informasi...</div>;

  return (
    <div className="pt-16 bg-gray-50 dark:bg-gray-900">
      <section className="py-20 bg-gradient-to-br from-green-600 to-cyan-800 text-white">
        <div className="max-w-7xl mx-auto px-4"><ScrollReveal><h1 className="text-5xl font-bold text-center">Informasi PPDB</h1></ScrollReveal></div>
      </section>
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative border-l-4 border-green-500/30 ml-4">
            {steps.map((step, index) => (
              <ScrollReveal key={step.id} className="mb-12">
                <div className="relative">
                  <div className="absolute -left-[2.8rem] top-1 bg-green-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold ring-8 ring-gray-50 dark:ring-gray-900">{index + 1}</div>
                  <div className="ml-8 pl-8 pt-1">
                    <p className="text-sm text-gray-500 flex items-center mb-2"><Calendar className="w-4 h-4 mr-2"/> {formatDate(step.start_date)} - {formatDate(step.end_date)}</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                    <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                        {step.description?.split('\n').map((line, i) => (
                            <p key={i} className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0"/><span>{line}</span></p>
                        ))}
                    </div>
                    {step.document_url && 
                        <a href={step.document_url} target="_blank" rel="noreferrer" className="inline-flex items-center text-green-600 hover:underline mt-4">
                            <Download className="w-4 h-4 mr-2"/>Unduh Dokumen/Brosur
                        </a>
                    }
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          {steps.length === 0 && (
            <div className="text-center text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400"/>
                <p>Informasi pendaftaran akan segera diperbarui.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};