import React, { useState, useEffect } from 'react';
import { documentsService, type Document } from '../lib/database';
import { toast } from 'react-toastify';
import { ScrollReveal } from '../components/ScrollReveal';
import { Download, FileText } from 'lucide-react';

export const Downloads: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDocs = async () => {
      try {
        const data = await documentsService.getAll();
        setDocuments(data);
      } catch (error) { toast.error("Gagal memuat dokumen."); }
      finally { setLoading(false); }
    };
    loadDocs();
  }, []);

  const groupedDocs = documents.reduce((acc, doc) => {
    (acc[doc.category] = acc[doc.category] || []).push(doc);
    return acc;
  }, {} as { [key: string]: Document[] });

  if (loading) return <div className="pt-16 min-h-screen flex items-center justify-center">Memuat dokumen...</div>;

  return (
    <div className="pt-16 bg-white dark:bg-gray-900">
      <section className="py-20 bg-gradient-to-br from-purple-600 to-pink-800 text-white">
        <div className="max-w-7xl mx-auto px-4"><ScrollReveal><h1 className="text-5xl font-bold text-center">Pusat Dokumen</h1></ScrollReveal></div>
      </section>
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 space-y-12">
          {Object.keys(groupedDocs).length > 0 ? (
            Object.entries(groupedDocs).map(([category, docs]) => (
              <ScrollReveal key={category}>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-purple-500 pl-4">{category}</h2>
                <div className="space-y-4">
                  {docs.map(doc => (
                    <div key={doc.id} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="w-6 h-6 text-purple-500 mr-4"/>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{doc.title}</h3>
                          <p className="text-sm text-gray-500">{doc.description}</p>
                        </div>
                      </div>
                      <a href={doc.file_url} download target="_blank" rel="noreferrer" className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                        <Download className="w-4 h-4"/>
                        <span>Unduh</span>
                      </a>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            ))
          ) : (
            <div className="text-center text-gray-500">
              <p>Belum ada dokumen yang tersedia untuk diunduh.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};