import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Images, FileText, Settings, LogOut, Plus, Edit, Trash2, Menu, X, Save,
  School, Calendar, Newspaper, GraduationCap, Trophy, MessageSquare, Search, UserCheck, Building, Mail, Eye, FileUp
} from 'lucide-react';
import { toast } from 'react-toastify';
import { signOut } from '../../lib/auth';
import { 
  galleryService, agendaService, newsService, programsService,
  extracurricularService, testimonialsService, leadershipService, staffTeachersService,
  staffEducationService, schoolStatsService, statisticsService, fileUploadService,
  schoolProfileService, messagesService,
  type GalleryItem, type Agenda, type News, type Program, type Extracurricular, type Testimonial,
  type Leadership, type StaffTeacher, type StaffEducation, type Message
} from '../../lib/database';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { SettingsPage } from './SettingsPage';
import { HeadmasterStatsForm } from './HeadmasterStatsForm';
import { ProfileContentPage } from './ProfileContentPage';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loadedTabs, setLoadedTabs] = useState(new Set(['overview']));
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [agendaItems, setAgendaItems] = useState<Agenda[]>([]);
  const [newsItems, setNewsItems] = useState<News[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [extracurriculars, setExtracurriculars] = useState<Extracurricular[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [leadership, setLeadership] = useState<Leadership[]>([]);
  const [staffTeachers, setStaffTeachers] = useState<StaffTeacher[]>([]);
  const [staffEducation, setStaffEducation] = useState<StaffEducation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  
  const [stats, setStats] = useState<any>({});
  const [heroStats, setHeroStats] = useState({ students: '800+', programs: '5', achievements: '30+' });
  const [headmasterStats, setHeadmasterStats] = useState({ siswa_aktif: '0', program_keahlian: '0', prestasi_diraih: '0', tahun_pengalaman: '0' });
  
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formType, setFormType] = useState<string>('');
  const navigate = useNavigate();

  const sidebarItems = [
    { id: 'overview', label: 'Dashboard', icon: FileText },
    { id: 'content-management', label: 'Manajemen Konten', icon: FileUp, isLink: true, href: '/admin/manajemen-konten' },
    { id: 'profile-content', label: 'Konten Profil', icon: FileText },
    { id: 'hero-stats', label: 'Statistik Hero', icon: Trophy },
    { id: 'messages', label: 'Pesan Masuk', icon: Mail },
    { id: 'staff-teachers', label: 'Staf Pengajar', icon: UserCheck },
    { id: 'staff-education', label: 'Staf Kependidikan', icon: Building },
    { id: 'gallery', label: 'Galeri', icon: Images },
    { id: 'agenda', label: 'Agenda', icon: Calendar },
    { id: 'news', label: 'Berita', icon: Newspaper },
    { id: 'programs', label: 'Program Keahlian', icon: GraduationCap },
    { id: 'extracurricular', label: 'Ekstrakurikuler', icon: School },
    { id: 'testimonials', label: 'Testimoni', icon: MessageSquare },
    { id: 'leadership', label: 'Kepemimpinan', icon: Users },
    { id: 'settings', label: 'Pengaturan', icon: Settings },
  ];

  const serviceMapForRead: { [key: string]: () => Promise<any> } = {
    'staff-teachers': staffTeachersService.getAll, 'staff-education': staffEducationService.getAll, 'gallery': galleryService.getAll, 
    'agenda': agendaService.getAll, 'news': newsService.getAll, 'programs': programsService.getAll, 'extracurricular': extracurricularService.getAll, 
    'testimonials': testimonialsService.getAll, 'leadership': leadershipService.getAllForAdmin, 'messages': messagesService.getAll,
  };
  
  const stateSetterMap: { [key: string]: React.Dispatch<React.SetStateAction<any[]>> } = {
    'staff-teachers': setStaffTeachers, 'staff-education': setStaffEducation, 'gallery': setGalleryItems, 'agenda': setAgendaItems, 
    'news': setNewsItems, 'programs': setPrograms, 'extracurricular': setExtracurriculars, 
    'testimonials': setTestimonials, 'leadership': setLeadership, 'messages': setMessages,
  };
  
  const serviceMapForCUD: { [key: string]: any } = {
    'staff-teachers': staffTeachersService, 'staff-education': staffEducationService, 'gallery': galleryService, 'agenda': agendaService, 'news': newsService,
    'programs': programsService, 'extracurricular': extracurricularService, 'testimonials': testimonialsService, 'leadership': leadershipService, 'messages': messagesService,
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const statsData = await statisticsService.getDashboardStats();
        const heroStatsData = await schoolStatsService.getAll();
        const { teachers, ...restStats } = statsData;
        setStats(restStats);
        if (heroStatsData?.content) setHeroStats(heroStatsData.content);
      } catch (error) { toast.error('Gagal memuat data awal'); } 
      finally { setLoading(false); }
    };
    loadInitialData();
  }, []);
  
  const handleTabClick = async (tabId: string) => {
    setActiveTab(tabId);
    setSidebarOpen(false);
    if (tabId === 'leadership' && !loadedTabs.has(tabId)) {
        const loadHeadmasterPageStats = async () => {
            try {
                const data = await schoolProfileService.getBySection('headmaster_page_stats');
                if(data && data.content) setHeadmasterStats(data.content);
            } catch (error) { console.error("Could not load headmaster stats for dashboard", error); }
        };
        loadHeadmasterPageStats();
    }
    if (loadedTabs.has(tabId) || !serviceMapForRead[tabId]) return;
    try {
      toast.info(`Memuat data untuk ${tabId}...`);
      const data = await serviceMapForRead[tabId]();
      stateSetterMap[tabId](data);
      setLoadedTabs(prev => new Set(prev).add(tabId));
    } catch (error) { toast.error(`Gagal memuat data ${tabId}`); }
  };
  
  const reloadDataForTab = (tabId: string) => {
    const newLoadedTabs = new Set(loadedTabs); newLoadedTabs.delete(tabId); setLoadedTabs(newLoadedTabs);
    setTimeout(() => handleTabClick(tabId), 0);
  };

  const handleLogout = async () => { await signOut(); toast.success('Berhasil logout'); navigate('/admin/login'); };
  const handleAdd = (type: string) => { setFormType(type); setEditingItem(null); setShowForm(true); };
  const handleEdit = (type: string, item: any) => { setFormType(type); setEditingItem(item); setShowForm(true); };

  const handleViewMessage = async (message: Message) => {
    setSelectedMessage(message);
    if (!message.is_read) {
      try {
        await messagesService.update(message.id, { is_read: true });
        reloadDataForTab('messages');
      } catch (error) { console.error("Gagal menandai pesan sebagai dibaca:", error); }
    }
  };

  const handleDelete = async (type: string, id: string) => {
    if (!confirm('Yakin ingin menghapus data ini?')) return;
    setDeletingId(id);
    try {
      await serviceMapForCUD[type].delete(id);
      toast.success('Data berhasil dihapus');
      reloadDataForTab(type);
    } catch (error) { toast.error('Gagal menghapus data'); } 
    finally { setDeletingId(null); }
  };

  const handleSave: SubmitHandler<any> = async (formData) => {
    try {
      const { image_file, ...restFormData } = formData;
      let finalData = { ...restFormData };
      if (image_file && image_file.length > 0) {
        toast.info('Mengunggah gambar...');
        const file = image_file[0];
        const folder = formType; 
        if (editingItem && editingItem.image_url) {
            try {
              const oldFilePath = new URL(editingItem.image_url).pathname.split('/uploads/').pop();
              if (oldFilePath) await fileUploadService.deleteFile(oldFilePath);
            } catch(e) { console.error("URL gambar lama tidak valid, tidak bisa menghapus.") }
        }
        const { publicUrl } = await fileUploadService.uploadFile(file, folder);
        finalData.image_url = publicUrl;
      }
      const service = serviceMapForCUD[formType];
      if (editingItem) {
        await service.update(editingItem.id, finalData);
        toast.success('Data berhasil diperbarui');
      } else {
        const imageRequired = ['gallery', 'staff-teachers', 'staff-education', 'news', 'programs', 'extracurricular', 'leadership'];
        if (imageRequired.includes(formType) && !finalData.image_url && !editingItem?.image_url) {
            toast.error("Gambar wajib diunggah untuk data baru.");
            return;
        }
        await service.create(finalData);
        toast.success('Data berhasil ditambahkan');
      }
      setShowForm(false); setEditingItem(null); reloadDataForTab(formType);
    } catch (error: any) { toast.error(`Gagal menyimpan data: ${error.message}`); }
  };
  
  const handleSaveHeadmasterStats = async (newStats: any) => {
    try {
      await schoolProfileService.upsert({ section: 'headmaster_page_stats', content: newStats });
      setHeadmasterStats(newStats);
      toast.success('Statistik halaman sambutan berhasil diperbarui');
    } catch (error) { toast.error('Gagal menyimpan statistik'); }
  };
  
  const handleSaveHeroStats = async (newStats: any) => { await schoolStatsService.update(newStats); setHeroStats(newStats); toast.success('Statistik hero diperbarui'); };
  const getFilteredData = (data: any[]) => !searchTerm ? data : data.filter(item => Object.values(item).some(v => String(v).toLowerCase().includes(searchTerm.toLowerCase())));

  if (loading) return <div className="min-h-screen flex items-center justify-center">Memuat dashboard...</div>;

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <AnimatePresence>{sidebarOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}</AnimatePresence>
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex items-center justify-between"><div className="flex items-center space-x-3"><GraduationCap className="w-8 h-8 text-blue-600"/><span className="text-lg font-bold">Admin Panel</span></div><button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2"><X className="w-6 h-6"/></button></div>
          <nav className="flex-1 p-2 space-y-1 overflow-y-auto">{sidebarItems.map((item) => (
            item.isLink ? (
              <Link key={item.id} to={item.href!} className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"><item.icon className="w-5 h-5" /><span>{item.label}</span></Link>
            ) : (
              <motion.button key={item.id} whileHover={{ x: 2 }} onClick={() => handleTabClick(item.id)} className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${activeTab === item.id ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}><item.icon className="w-5 h-5" /><span>{item.label}</span></motion.button>
            )
          ))}</nav>
          <div className="p-2 border-t"><motion.button whileHover={{ scale: 1.02 }} onClick={handleLogout} className="w-full flex items-center space-x-3 px-3 py-2.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"><LogOut className="w-5 h-5" /><span>Logout</span></motion.button></div>
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b"><div className="px-6 py-4 flex items-center justify-between"><div className="flex items-center space-x-4"><button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2"><Menu className="w-6 h-6"/></button><h1 className="text-2xl font-bold">{sidebarItems.find(item => item.id === activeTab)?.label}</h1></div><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="text" placeholder="Cari data..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 bg-gray-100 border rounded-lg" /></div></div></header>
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{(Object.keys(stats)).map((key: string) => <div key={key} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm"><p className="text-sm capitalize text-gray-500">{key.replace(/([A-Z])/g, ' $1')}</p><p className="text-3xl font-bold text-gray-900 dark:text-white">{stats[key]}</p></div>)}</div>)}
          {activeTab === 'hero-stats' && <HeroStatsForm stats={heroStats} onSave={handleSaveHeroStats} />}
          {activeTab === 'profile-content' && <ProfileContentPage />}
          {activeTab === 'messages' && <DataTable title="Pesan Masuk" data={getFilteredData(messages)} onAdd={() => alert('Pesan tidak dapat ditambahkan dari dasbor.')} onEdit={(item: Message) => handleViewMessage(item)} onDelete={(id: string) => handleDelete('messages', id)} deletingId={deletingId} columns={[{ key: 'name', label: 'Nama Pengirim' }, { key: 'subject', label: 'Subjek' }, { key: 'created_at', label: 'Tanggal', type: 'date' }, { key: 'is_read', label: 'Dibaca', type: 'boolean' }]} actionIcon={<Eye className="w-4 h-4" />} />}
          {activeTab === 'staff-teachers' && <DataTable title="Staf Pengajar" data={getFilteredData(staffTeachers)} onAdd={() => handleAdd('staff-teachers')} onEdit={(item: StaffTeacher) => handleEdit('staff-teachers', item)} onDelete={(id: string) => handleDelete('staff-teachers', id)} deletingId={deletingId} columns={[{ key: 'image_url', label: 'Foto', type: 'image' }, { key: 'name', label: 'Nama' }, { key: 'position', label: 'Jabatan' }, { key: 'department', label: 'Departemen' }]} />}
          {activeTab === 'staff-education' && <DataTable title="Staf Kependidikan" data={getFilteredData(staffEducation)} onAdd={() => handleAdd('staff-education')} onEdit={(item: StaffEducation) => handleEdit('staff-education', item)} onDelete={(id: string) => handleDelete('staff-education', id)} deletingId={deletingId} columns={[{ key: 'image_url', label: 'Foto', type: 'image' }, { key: 'name', label: 'Nama' }, { key: 'department', label: 'Departemen' }]} />}
          {activeTab === 'gallery' && <DataTable title="Galeri" data={getFilteredData(galleryItems)} onAdd={() => handleAdd('gallery')} onEdit={(item: GalleryItem) => handleEdit('gallery', item)} onDelete={(id: string) => handleDelete('gallery', id)} deletingId={deletingId} columns={[{ key: 'image_url', label: 'Gambar', type: 'image' }, { key: 'title', label: 'Judul' }, { key: 'category', label: 'Kategori' }]} />}
          {activeTab === 'agenda' && <DataTable title="Agenda" data={getFilteredData(agendaItems)} onAdd={() => handleAdd('agenda')} onEdit={(item: Agenda) => handleEdit('agenda', item)} onDelete={(id: string) => handleDelete('agenda', id)} deletingId={deletingId} columns={[{ key: 'title', label: 'Judul' }, { key: 'event_date', label: 'Tanggal', type: 'date' }, { key: 'category', label: 'Kategori' }]} />}
          {activeTab === 'news' && <DataTable title="Berita" data={getFilteredData(newsItems)} onAdd={() => handleAdd('news')} onEdit={(item: News) => handleEdit('news', item)} onDelete={(id: string) => handleDelete('news', id)} deletingId={deletingId} columns={[{ key: 'image_url', label: 'Gambar', type: 'image' }, { key: 'title', label: 'Judul' }, { key: 'category', label: 'Kategori' }]} />}
          {activeTab === 'programs' && <DataTable title="Program Keahlian" data={getFilteredData(programs)} onAdd={() => handleAdd('programs')} onEdit={(item: Program) => handleEdit('programs', item)} onDelete={(id: string) => handleDelete('programs', id)} deletingId={deletingId} columns={[{ key: 'image_url', label: 'Gambar', type: 'image' }, { key: 'name', label: 'Nama Program' }, { key: 'code', label: 'Kode' }]} />}
          {activeTab === 'extracurricular' && <DataTable title="Ekstrakurikuler" data={getFilteredData(extracurriculars)} onAdd={() => handleAdd('extracurricular')} onEdit={(item: Extracurricular) => handleEdit('extracurricular', item)} onDelete={(id: string) => handleDelete('extracurricular', id)} deletingId={deletingId} columns={[{ key: 'image_url', label: 'Gambar', type: 'image' }, { key: 'name', label: 'Nama' }, { key: 'category', label: 'Kategori' }]} />}
          {activeTab === 'testimonials' && <DataTable title="Testimoni" data={getFilteredData(testimonials)} onAdd={() => handleAdd('testimonials')} onEdit={(item: Testimonial) => handleEdit('testimonials', item)} onDelete={(id: string) => handleDelete('testimonials', id)} deletingId={deletingId} columns={[{ key: 'name', label: 'Nama' }, { key: 'role', label: 'Peran' }, { key: 'is_approved', label: 'Disetujui', type: 'boolean' }]} />}
          {activeTab === 'leadership' && (<> <DataTable title="Kepemimpinan" data={getFilteredData(leadership)} onAdd={() => handleAdd('leadership')} onEdit={(item: Leadership) => handleEdit('leadership', item)} onDelete={(id: string) => handleDelete('leadership', id)} deletingId={deletingId} columns={[{ key: 'image_url', label: 'Foto', type: 'image' }, { key: 'name', label: 'Nama' }, { key: 'position', label: 'Jabatan' }]} /> <HeadmasterStatsForm stats={headmasterStats} onSave={handleSaveHeadmasterStats} /> </>)}
          {activeTab === 'settings' && <SettingsPage />}
        </main>
      </div>
      <UniversalFormModal isOpen={showForm} onClose={() => { setShowForm(false); setEditingItem(null); }} onSave={handleSave} formType={formType} editingItem={editingItem} />
      <MessageViewModal message={selectedMessage} onClose={() => setSelectedMessage(null)} />
    </div>
  );
};


// =================================================================================
// KOMPONEN-KOMPONEN PEMBANTU (IMPLEMENTASI LENGKAP)
// =================================================================================
const HeroStatsForm: React.FC<{stats: any; onSave: (newStats: any) => void;}> = ({ stats, onSave }) => {
  const [formData, setFormData] = useState(stats);
  useEffect(() => { setFormData(stats); }, [stats]);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave(formData); };
  return <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm"><h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Statistik Hero Section</h2><form onSubmit={handleSubmit} className="space-y-6"><div className="grid md:grid-cols-3 gap-6"><div><label className="block text-sm font-medium">Siswa Aktif</label><input type="text" value={formData.students} onChange={(e) => setFormData({ ...formData, students: e.target.value })} className="w-full mt-2 p-3 bg-gray-50 dark:bg-gray-700 border rounded-xl" /></div><div><label className="block text-sm font-medium">Program Keahlian</label><input type="text" value={formData.programs} onChange={(e) => setFormData({ ...formData, programs: e.target.value })} className="w-full mt-2 p-3 bg-gray-50 dark:bg-gray-700 border rounded-xl" /></div><div><label className="block text-sm font-medium">Prestasi</label><input type="text" value={formData.achievements} onChange={(e) => setFormData({ ...formData, achievements: e.target.value })} className="w-full mt-2 p-3 bg-gray-50 dark:bg-gray-700 border rounded-xl" /></div></div><div className="flex justify-end"><motion.button whileHover={{scale:1.05}} type="submit" className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl"><Save className="w-5 h-5" /><span>Simpan</span></motion.button></div></form></div>;
};

const DataTable: React.FC<{
  title: string; data: any[]; onAdd: () => void; onEdit: (item: any) => void;
  onDelete: (id: string) => void; deletingId: string | null;
  columns: Array<{ key: string; label: string; type?: 'image' | 'date' | 'boolean' | 'text-truncate' }>;
  actionIcon?: React.ReactNode;
}> = ({ title, data, onAdd, onEdit, onDelete, columns, deletingId, actionIcon }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2><motion.button whileHover={{scale:1.05}} onClick={onAdd} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl" disabled={title === 'Pesan Masuk'}><Plus className="w-5 h-5" /><span>Tambah</span></motion.button></div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700"><tr>{columns.map((col) => <th key={col.key} className="p-3 text-left text-xs font-medium uppercase tracking-wider">{col.label}</th>)}<th className="p-3 text-left text-xs font-medium uppercase">Aksi</th></tr></thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {data && data.map((item: any) => (
                <tr key={item.id} className={`transition-opacity ${deletingId === item.id ? 'opacity-40' : 'opacity-100'}`}>
                  {columns.map((col) => (
                    <td key={col.key} className="p-3 whitespace-nowrap">
                      {col.type === 'image' ? <img src={item[col.key]} alt={item.name || item.title || ''} className="w-12 h-12 rounded-lg object-cover" />
                        : col.type === 'date' ? <span className="text-sm">{new Date(item[col.key]).toLocaleDateString('id-ID')}</span>
                        : col.type === 'boolean' ? <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${item[col.key] ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{item[col.key] ? 'Ya' : 'Tidak'}</span>
                        : <span className="text-sm max-w-xs truncate block">{Array.isArray(item[col.key]) ? item[col.key].join(', ') : String(item[col.key])}</span>
                      }
                    </td>
                  ))}
                  <td className="p-3 whitespace-nowrap"><div className="flex space-x-2">
                      <button onClick={() => onEdit(item)} disabled={deletingId === item.id} className="text-blue-600 disabled:opacity-50">{actionIcon || <Edit className="w-4 h-4" />}</button>
                      <button onClick={() => onDelete(item.id)} disabled={deletingId === item.id} className="text-red-600 disabled:opacity-50"><Trash2 className="w-4 h-4" /></button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {(!data || data.length === 0) && <div className="text-center py-12"><p className="text-gray-500">Belum ada data.</p></div>}
      </div>
    </div>
  );
};

const MessageViewModal: React.FC<{ message: Message | null, onClose: () => void }> = ({ message, onClose }) => {
  if (!message) return null;
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-bold">Detail Pesan</h3><button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200"><X className="w-5 h-5"/></button></div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div><strong className="block font-medium">Pengirim:</strong> {message.name}</div>
            <div><strong className="block font-medium">Email:</strong> <a href={`mailto:${message.email}`} className="text-blue-600">{message.email}</a></div>
            {message.phone && <div><strong className="block font-medium">Telepon:</strong> {message.phone}</div>}
            <div className="border-t dark:border-gray-700 pt-4"><strong className="block font-medium">Subjek:</strong> {message.subject}</div>
            <div className="border-t dark:border-gray-700 pt-4"><strong className="block font-medium mb-2">Isi Pesan:</strong><p className="whitespace-pre-wrap bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">{message.message}</p></div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const UniversalFormModal: React.FC<{ isOpen: boolean; onClose: () => void; onSave: SubmitHandler<any>; formType: string; editingItem: any; }> = ({ isOpen, onClose, onSave, formType, editingItem }) => {
  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm<any>();
  const [uploading, setUploading] = useState(false);
  const imageFile = watch('image_file');
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [imageFile]);

  useEffect(() => {
    if (!isOpen) return;
    if (editingItem) {
      const formData = { ...editingItem };
      Object.keys(formData).forEach(key => { if (Array.isArray(formData[key])) formData[key] = formData[key].join(', '); });
      reset(formData);
      setPreview(editingItem.image_url || null);
    } else {
      reset(getDefaultFormData(formType));
      setPreview(null);
    }
  }, [isOpen, editingItem, formType, reset]);
  
  const getDefaultFormData = (type: string): any => {
    const defaults: { [key: string]: any } = {
      'staff-teachers': { name: '', position: '', department: 'Rekayasa Perangkat Lunak', education: '', subjects: '', phone: '', email: '', image_url: '', bio: '', experience_years: 0 },
      'staff-education': { name: '', position: '', department: 'Administrasi', education: '', phone: '', email: '', image_url: '', bio: '' },
      'gallery': { title: '', description: '', image_url: '', category: 'Fasilitas' },
      'agenda': { title: '', description: '', event_date: '', event_time: '', location: '', category: 'Kegiatan', is_featured: false, image_url: '' },
      'news': { title: '', content: '', excerpt: '', image_url: '', category: 'Berita', author: '', is_published: true },
      'programs': { name: '', code: '', description: '', duration: '3 tahun', competencies: '', career_prospects: '', image_url: '', is_active: true },
      'extracurricular': { name: '', description: '', category: 'Olahraga', schedule: '', coach: '', image_url: '', achievements: '', is_active: true },
      'testimonials': { name: '', role: 'Alumni', content: '', rating: 5, is_featured: false, is_approved: false },
      'leadership': { name: '', position: '', education: '', experience: '', message: '', image_url: '', phone: '', email: '', order_position: 0, is_active: true }
    };
    return defaults[type] || {};
  };
  
  const handleSaveWrapper: SubmitHandler<any> = async (data) => {
    setUploading(true);
    try {
      const arrayFields: { [key: string]: string[] } = {
        'staff-teachers': ['subjects'], 'programs': ['competencies', 'career_prospects'], 'extracurricular': ['achievements'],
      };
      if (arrayFields[formType]) {
        arrayFields[formType].forEach(field => {
          if (typeof data[field] === 'string' && data[field]) {
            data[field] = data[field].split(',').map((item: string) => item.trim()).filter(Boolean);
          } else if (!data[field]) {
            data[field] = [];
          }
        });
      }
      await onSave(data);
    } catch (error) { console.error("Gagal menyimpan dari dalam modal:", error); } 
    finally { setUploading(false); }
  };

  if (!isOpen) return null;

  const renderField = (name: string, label: string, options: any = {}, type: string = 'text', as: 'input' | 'textarea' | 'select' = 'input', selectOptions: string[] = []) => (
    <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</label>{as === 'input' && <input type={type} {...register(name, options)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl" />}{as === 'textarea' && <textarea rows={3} {...register(name, options)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl resize-none" />}{as === 'select' && (<select {...register(name, options)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl">{selectOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select>)}{errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]?.message as string}</p>}</div>
  );
  
  const renderCheckbox = (name: string, label: string) => (<label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300"><input type="checkbox" {...register(name)} className="rounded" /><span>{label}</span></label>);
  const renderImageUpload = (name: string, label: string) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex items-center space-x-4">
        {preview ? <img src={preview} alt="Preview" className="w-24 h-24 rounded-lg object-cover" /> : editingItem?.image_url ? <img src={editingItem.image_url} alt="Current" className="w-24 h-24 rounded-lg object-cover" /> : <div className="w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400"><Images/></div>}
        <div className="flex-1"><input type="file" {...register(name)} accept="image/png, image/jpeg, image/webp" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/></div>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{editingItem ? 'Edit' : 'Tambah'} {formType}</h3>
          <form onSubmit={handleSubmit(handleSaveWrapper)} className="space-y-4">
            {formType === 'staff-teachers' && (<>{renderField('name', 'Nama Lengkap', { required: 'Wajib diisi' })}{renderField('position', 'Jabatan')}{renderField('department', 'Departemen/Jurusan', {}, 'text', 'select', ['Rekayasa Perangkat Lunak', 'Teknik Komputer Jaringan', 'Multimedia', 'Akuntansi', 'Administrasi Perkantoran', 'Umum'])}{renderField('education', 'Pendidikan')}{renderField('subjects', 'Mata Pelajaran (pisahkan koma)', {}, 'text', 'textarea')}{renderField('phone', 'Telepon')}{renderField('email', 'Email')}{renderField('bio', 'Bio', {}, 'text', 'textarea')}{renderField('experience_years', 'Pengalaman (Tahun)', {valueAsNumber: true}, 'number')}{renderImageUpload('image_file', 'Foto')}</>)}
            {formType === 'staff-education' && (<>{renderField('name', 'Nama Lengkap', { required: 'Wajib diisi' })}{renderField('position', 'Jabatan')}{renderField('department', 'Departemen', {}, 'text', 'select', ['Administrasi', 'Keuangan', 'Perpustakaan', 'Laboratorium', 'Keamanan', 'Kebersihan'])}{renderField('education', 'Pendidikan')}{renderField('phone', 'Telepon')}{renderField('email', 'Email')}{renderField('bio', 'Bio', {}, 'text', 'textarea')}{renderImageUpload('image_file', 'Foto')}</>)}
            {formType === 'gallery' && (<>{renderField('title', 'Judul', { required: 'Judul wajib diisi' })}{renderField('description', 'Deskripsi')}{renderField('category', 'Kategori', {}, 'text', 'select', ['Fasilitas', 'Kegiatan', 'Prestasi', 'Acara'])}{renderImageUpload('image_file', 'Unggah Gambar')}</>)}
            {formType === 'agenda' && (<>{renderField('title', 'Judul', { required: 'Wajib diisi' })}{renderField('description', 'Deskripsi', {}, 'text', 'textarea')}{renderField('event_date', 'Tanggal Acara', {}, 'date')}{renderField('event_time', 'Waktu Acara', {}, 'time')}{renderField('location', 'Lokasi')}{renderField('category', 'Kategori', {}, 'text', 'select', ['Kegiatan', 'Ujian', 'Lomba', 'Acara'])}{renderImageUpload('image_file', 'Gambar')}{renderCheckbox('is_featured', 'Jadikan Unggulan')}</>)}
            {formType === 'news' && (<>{renderField('title', 'Judul', { required: 'Wajib diisi' })}{renderField('author', 'Penulis', { required: 'Wajib diisi' })}{renderField('excerpt', 'Kutipan', { required: 'Wajib diisi' }, 'text', 'textarea')}{renderField('content', 'Isi Berita', { required: 'Wajib diisi' }, 'text', 'textarea')}{renderField('category', 'Kategori', {}, 'text', 'select', ['Berita', 'Artikel', 'Pengumuman', 'Prestasi'])}{renderImageUpload('image_file', 'Gambar')}{renderCheckbox('is_published', 'Publikasikan')}</>)}
            {formType === 'programs' && (<>{renderField('name', 'Nama Program', { required: 'Wajib diisi' })}{renderField('code', 'Kode', { required: 'Wajib diisi' })}{renderField('description', 'Deskripsi', {}, 'text', 'textarea')}{renderField('duration', 'Durasi')}{renderField('competencies', 'Kompetensi (pisahkan koma)', {}, 'text', 'textarea')}{renderField('career_prospects', 'Prospek Karir (pisahkan koma)', {}, 'text', 'textarea')}{renderImageUpload('image_file', 'Gambar')}{renderCheckbox('is_active', 'Aktif')}</>)}
            {formType === 'extracurricular' && (<>{renderField('name', 'Nama Ekstrakurikuler', { required: 'Wajib diisi' })}{renderField('category', 'Kategori', {}, 'text', 'select', ['Olahraga', 'Seni', 'Akademik', 'Keagamaan', 'Teknologi'])}{renderField('description', 'Deskripsi', {}, 'text', 'textarea')}{renderField('schedule', 'Jadwal')}{renderField('coach', 'Pelatih')}{renderField('achievements', 'Prestasi (pisahkan koma)', {}, 'text', 'textarea')}{renderImageUpload('image_file', 'Gambar')}{renderCheckbox('is_active', 'Aktif')}</>)}
            {formType === 'testimonials' && (<>{renderField('name', 'Nama', { required: 'Nama wajib diisi' })}{renderField('role', 'Peran', { required: 'Wajib diisi' }, 'text', 'select', ['Alumni', 'Orang Tua', 'Siswa', 'Mitra Industri'])}{renderField('content', 'Isi Testimoni', { required: 'Wajib diisi' }, 'text', 'textarea')}{renderField('rating', 'Rating', { required: 'Wajib diisi', valueAsNumber: true, min: 1, max: 5}, 'number')}<div className="flex space-x-4">{renderCheckbox('is_approved', 'Disetujui')}{renderCheckbox('is_featured', 'Jadikan Unggulan')}</div></>)}
            {formType === 'leadership' && (<>{renderField('name', 'Nama', { required: 'Wajib diisi' })}{renderField('position', 'Jabatan', { required: 'Wajib diisi' })}{renderField('education', 'Pendidikan')}{renderField('experience', 'Pengalaman', {}, 'text', 'textarea')}{renderField('message', 'Pesan', {}, 'text', 'textarea')}{renderField('phone', 'Telepon')}{renderField('email', 'Email')}{renderField('order_position', 'Urutan', {valueAsNumber: true}, 'number')}{renderImageUpload('image_file', 'Foto')}{renderCheckbox('is_active', 'Aktif')}</>)}
            
            <div className="flex space-x-3 pt-4"><button type="button" onClick={onClose} className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl">Batal</button><button type="submit" disabled={uploading} className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl disabled:opacity-50">{uploading ? 'Menyimpan...' : 'Simpan'}</button></div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};