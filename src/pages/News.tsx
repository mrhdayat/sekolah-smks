import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '../components/ScrollReveal';
import { Calendar, User, ArrowRight, Search, ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { newsService, type News as NewsType } from '../lib/database'; // Tipe diubah namanya menjadi NewsType
import { toast } from 'react-toastify';
import { Link, useSearchParams } from 'react-router-dom';

export const News: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<string>('Semua');
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
  const [totalPages, setTotalPages] = useState(0);
  const PAGE_SIZE = 6;

  const categories = ['Semua', 'Berita', 'Artikel', 'Pengumuman', 'Prestasi'];

  useEffect(() => {
    loadNews(currentPage);
    window.scrollTo(0, 0); // Scroll ke atas saat halaman berubah
    setSearchParams({ page: String(currentPage) }, { replace: true });
  }, [currentPage]);

  const loadNews = async (page: number) => {
    setLoading(true);
    try {
      const { data, count } = await newsService.getPublished(page, PAGE_SIZE);
      setNewsItems(data);
      setTotalPages(Math.ceil(count / PAGE_SIZE));
    } catch (error) {
      console.error('Error loading news:', error);
      toast.error('Gagal memuat berita');
    } finally {
      setLoading(false);
    }
  };

  const filteredNews = newsItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'Semua' || item.category === filter;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });

  if (loading) {
    return <div className="pt-16 min-h-screen flex items-center justify-center">Memuat berita...</div>;
  }
  
  const PaginationControls = () => (
    <div className="flex items-center justify-center space-x-1 sm:space-x-2 mt-12">
      <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="p-2 rounded-md hover:bg-gray-200 disabled:opacity-50"><ChevronsLeft className="w-5 h-5" /></button>
      <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-md hover:bg-gray-200 disabled:opacity-50"><ChevronLeft className="w-5 h-5" /></button>
      <span className="text-sm text-gray-700">Halaman <span className="font-bold">{currentPage}</span> dari <span className="font-bold">{totalPages}</span></span>
      <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-md hover:bg-gray-200 disabled:opacity-50"><ChevronRight className="w-5 h-5" /></button>
      <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="p-2 rounded-md hover:bg-gray-200 disabled:opacity-50"><ChevronsRight className="w-5 h-5" /></button>
    </div>
  );

  return (
    <div className="pt-16">
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal><div className="text-center text-white"><h1 className="text-5xl md:text-6xl font-bold mb-6">Berita & Artikel</h1><p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">Informasi terkini seputar kegiatan dan prestasi sekolah</p></div></ScrollReveal>
        </div>
      </section>

      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              <div className="relative flex-1 w-full md:w-auto md:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" placeholder="Cari berita..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white border rounded-xl" />
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <motion.button key={category} onClick={() => setFilter(category)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${filter === category ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredNews.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredNews.map((item, index) => (
                  <ScrollReveal key={item.id} delay={index * 0.1}>
                    <motion.div whileHover={{ y: -10 }} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col">
                      <div className="relative h-48 overflow-hidden"><img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /></div>
                      <div className="p-6 flex flex-col flex-grow">
                        <span className={`px-3 py-1 mb-3 rounded-full text-xs font-medium self-start bg-indigo-100 text-indigo-800`}>{item.category}</span>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 flex-grow">{item.title}</h3>
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4"><div className="flex items-center"><Calendar className="w-4 h-4 mr-1" />{formatDate(item.published_at)}</div><div className="flex items-center"><User className="w-4 h-4 mr-1" />{item.author}</div></div>
                        <Link to={`/berita/${item.id}`} className="inline-flex items-center text-indigo-600 font-medium mt-auto">Baca Selengkapnya<ArrowRight className="w-4 h-4 ml-1" /></Link>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
              {totalPages > 1 && <PaginationControls />}
            </>
          ) : (
            <div className="text-center py-12"><Search className="w-16 h-16 text-gray-400 mx-auto mb-4" /><p className="text-gray-500 text-lg">{searchTerm ? `Tidak ada berita yang ditemukan untuk "${searchTerm}"` : `Tidak ada berita untuk kategori "${filter}"`}</p></div>
          )}
        </div>
      </section>
    </div>
  );
};