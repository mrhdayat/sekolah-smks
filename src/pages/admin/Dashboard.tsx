import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  Images, 
  FileText, 
  Settings, 
  LogOut, 
  Plus,
  Edit,
  Trash2,
  Menu,
  X,
  Save,
  Upload,
  School,
  Calendar,
  Newspaper,
  GraduationCap,
  Trophy,
  MessageSquare,
  Search,
  Eye,
  EyeOff,
  UserCheck,
  Building
} from 'lucide-react'
import { toast } from 'react-toastify'
import { signOut } from '../../lib/auth'
import { 
  teachersService, 
  galleryService, 
  schoolProfileService,
  statisticsService,
  agendaService,
  newsService,
  programsService,
  extracurricularService,
  testimonialsService,
  leadershipService,
  staffTeachersService,
  staffEducationService,
  schoolStatsService,
  type Teacher, 
  type GalleryItem,
  type SchoolProfile,
  type Agenda,
  type News,
  type Program,
  type Extracurricular,
  type Testimonial,
  type Leadership,
  type StaffTeacher,
  type StaffEducation
} from '../../lib/database'
import { useNavigate } from 'react-router-dom'

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [agendaItems, setAgendaItems] = useState<Agenda[]>([])
  const [newsItems, setNewsItems] = useState<News[]>([])
  const [programs, setPrograms] = useState<Program[]>([])
  const [extracurriculars, setExtracurriculars] = useState<Extracurricular[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [leadership, setLeadership] = useState<Leadership[]>([])
  const [staffTeachers, setStaffTeachers] = useState<StaffTeacher[]>([])
  const [staffEducation, setStaffEducation] = useState<StaffEducation[]>([])
  const [stats, setStats] = useState({ 
    teachers: 0, 
    gallery: 0, 
    agenda: 0, 
    news: 0, 
    programs: 0, 
    extracurricular: 0, 
    testimonials: 0,
    leadership: 0,
    staffTeachers: 0,
    staffEducation: 0
  })
  const [heroStats, setHeroStats] = useState({
    students: '800+',
    programs: '5',
    achievements: '30+'
  })
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [formType, setFormType] = useState<string>('')
  const navigate = useNavigate()

  const sidebarItems = [
    { id: 'overview', label: 'Dashboard', icon: FileText },
    { id: 'hero-stats', label: 'Statistik Hero', icon: Trophy },
    { id: 'teachers', label: 'Data Guru', icon: Users },
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
  ]

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [
        teachersData, 
        galleryData, 
        agendaData,
        newsData,
        programsData,
        extracurricularsData,
        testimonialsData,
        leadershipData,
        staffTeachersData,
        staffEducationData,
        statsData,
        heroStatsData
      ] = await Promise.all([
        teachersService.getAll(),
        galleryService.getAll(),
        agendaService.getAll(),
        newsService.getAll(),
        programsService.getAll(),
        extracurricularService.getAll(),
        testimonialsService.getAll(),
        leadershipService.getAllForAdmin(),
        staffTeachersService.getAll(),
        staffEducationService.getAll(),
        statisticsService.getDashboardStats(),
        schoolStatsService.getAll()
      ])

      setTeachers(teachersData)
      setGalleryItems(galleryData)
      setAgendaItems(agendaData)
      setNewsItems(newsData)
      setPrograms(programsData)
      setExtracurriculars(extracurricularsData)
      setTestimonials(testimonialsData)
      setLeadership(leadershipData)
      setStaffTeachers(staffTeachersData)
      setStaffEducation(staffEducationData)
      setStats(statsData)
      if (heroStatsData && heroStatsData.content) {
        setHeroStats(heroStatsData.content)
      }
    } catch (error) {
      console.error('Error loading data:', error)
      toast.error('Gagal memuat data')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut()
      toast.success('Berhasil logout')
      navigate('/admin/login')
    } catch (error) {
      toast.error('Gagal logout')
    }
  }

  const handleAdd = (type: string) => {
    setFormType(type)
    setEditingItem(null)
    setShowForm(true)
  }

  const handleEdit = (type: string, item: any) => {
    setFormType(type)
    setEditingItem(item)
    setShowForm(true)
  }

  const handleDelete = async (type: string, id: string) => {
    if (!confirm('Yakin ingin menghapus data ini?')) return
    
    try {
      switch (type) {
        case 'teachers':
          await teachersService.delete(id)
          break
        case 'staff-teachers':
          await staffTeachersService.delete(id)
          break
        case 'staff-education':
          await staffEducationService.delete(id)
          break
        case 'gallery':
          await galleryService.delete(id)
          break
        case 'agenda':
          await agendaService.delete(id)
          break
        case 'news':
          await newsService.delete(id)
          break
        case 'programs':
          await programsService.delete(id)
          break
        case 'extracurricular':
          await extracurricularService.delete(id)
          break
        case 'testimonials':
          await testimonialsService.delete(id)
          break
        case 'leadership':
          await leadershipService.delete(id)
          break
      }
      
      toast.success('Data berhasil dihapus')
      loadData()
    } catch (error) {
      console.error('Error deleting:', error)
      toast.error('Gagal menghapus data')
    }
  }

  const handleSave = async (formData: any) => {
    try {
      if (editingItem) {
        // Update existing item
        switch (formType) {
          case 'teachers':
            await teachersService.update(editingItem.id, formData)
            break
          case 'staff-teachers':
            await staffTeachersService.update(editingItem.id, formData)
            break
          case 'staff-education':
            await staffEducationService.update(editingItem.id, formData)
            break
          case 'gallery':
            await galleryService.update(editingItem.id, formData)
            break
          case 'agenda':
            await agendaService.update(editingItem.id, formData)
            break
          case 'news':
            await newsService.update(editingItem.id, formData)
            break
          case 'programs':
            await programsService.update(editingItem.id, formData)
            break
          case 'extracurricular':
            await extracurricularService.update(editingItem.id, formData)
            break
          case 'testimonials':
            await testimonialsService.update(editingItem.id, formData)
            break
          case 'leadership':
            await leadershipService.update(editingItem.id, formData)
            break
        }
        toast.success('Data berhasil diperbarui')
      } else {
        // Create new item
        switch (formType) {
          case 'teachers':
            await teachersService.create(formData)
            break
          case 'staff-teachers':
            await staffTeachersService.create(formData)
            break
          case 'staff-education':
            await staffEducationService.create(formData)
            break
          case 'gallery':
            await galleryService.create(formData)
            break
          case 'agenda':
            await agendaService.create(formData)
            break
          case 'news':
            await newsService.create(formData)
            break
          case 'programs':
            await programsService.create(formData)
            break
          case 'extracurricular':
            await extracurricularService.create(formData)
            break
          case 'testimonials':
            await testimonialsService.create(formData)
            break
          case 'leadership':
            await leadershipService.create(formData)
            break
        }
        toast.success('Data berhasil ditambahkan')
      }
      
      setShowForm(false)
      setEditingItem(null)
      loadData()
    } catch (error) {
      console.error('Error saving:', error)
      toast.error('Gagal menyimpan data')
    }
  }

  const handleSaveHeroStats = async (newStats: typeof heroStats) => {
    try {
      await schoolStatsService.update(newStats)
      setHeroStats(newStats)
      toast.success('Statistik hero berhasil diperbarui')
    } catch (error) {
      console.error('Error updating hero stats:', error)
      toast.error('Gagal memperbarui statistik hero')
    }
  }

  const getFilteredData = (data: any[]) => {
    if (!searchTerm) return data
    return data.filter(item => 
      Object.values(item).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-2xl text-gray-600 dark:text-gray-300">Memuat dashboard...</div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Admin Panel
              </h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              SMKS Muhammadiyah Satui
            </p>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {sidebarItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ x: 4 }}
                onClick={() => {
                  setActiveTab(item.id)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-xl hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {sidebarItems.find(item => item.id === activeTab)?.label}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari data..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  { label: 'Total Guru', value: stats.teachers, color: 'bg-blue-500', icon: Users },
                  { label: 'Galeri Item', value: stats.gallery, color: 'bg-green-500', icon: Images },
                  { label: 'Agenda', value: stats.agenda, color: 'bg-purple-500', icon: Calendar },
                  { label: 'Berita', value: stats.news, color: 'bg-orange-500', icon: Newspaper },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-xl ${stat.color}`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Aktivitas Terbaru
                </h3>
                <div className="space-y-4">
                  {teachers.slice(0, 5).map((teacher, index) => (
                    <div key={teacher.id} className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <img
                        src={teacher.image_url}
                        alt={teacher.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">
                          Data guru {teacher.name} ditambahkan
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {teacher.subject}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hero-stats' && (
            <HeroStatsForm 
              stats={heroStats} 
              onSave={handleSaveHeroStats} 
            />
          )}

          {activeTab === 'teachers' && (
            <DataTable
              title="Data Guru"
              data={getFilteredData(teachers)}
              onAdd={() => handleAdd('teachers')}
              onEdit={(item) => handleEdit('teachers', item)}
              onDelete={(id) => handleDelete('teachers', id)}
              columns={[
                { key: 'image_url', label: 'Foto', type: 'image' },
                { key: 'name', label: 'Nama' },
                { key: 'subject', label: 'Mata Pelajaran' },
                { key: 'description', label: 'Deskripsi', type: 'text-truncate' }
              ]}
            />
          )}

          {activeTab === 'staff-teachers' && (
            <DataTable
              title="Staf Pengajar"
              data={getFilteredData(staffTeachers)}
              onAdd={() => handleAdd('staff-teachers')}
              onEdit={(item) => handleEdit('staff-teachers', item)}
              onDelete={(id) => handleDelete('staff-teachers', id)}
              columns={[
                { key: 'image_url', label: 'Foto', type: 'image' },
                { key: 'name', label: 'Nama' },
                { key: 'position', label: 'Jabatan' },
                { key: 'education', label: 'Pendidikan', type: 'text-truncate' },
                { key: 'experience_years', label: 'Pengalaman (Tahun)' }
              ]}
            />
          )}

          {activeTab === 'staff-education' && (
            <DataTable
              title="Staf Tenaga Kependidikan"
              data={getFilteredData(staffEducation)}
              onAdd={() => handleAdd('staff-education')}
              onEdit={(item) => handleEdit('staff-education', item)}
              onDelete={(id) => handleDelete('staff-education', id)}
              columns={[
                { key: 'image_url', label: 'Foto', type: 'image' },
                { key: 'name', label: 'Nama' },
                { key: 'position', label: 'Jabatan' },
                { key: 'department', label: 'Departemen' },
                { key: 'education', label: 'Pendidikan', type: 'text-truncate' }
              ]}
            />
          )}

          {activeTab === 'gallery' && (
            <DataTable
              title="Galeri"
              data={getFilteredData(galleryItems)}
              onAdd={() => handleAdd('gallery')}
              onEdit={(item) => handleEdit('gallery', item)}
              onDelete={(id) => handleDelete('gallery', id)}
              columns={[
                { key: 'image_url', label: 'Gambar', type: 'image' },
                { key: 'title', label: 'Judul' },
                { key: 'category', label: 'Kategori' },
                { key: 'description', label: 'Deskripsi', type: 'text-truncate' }
              ]}
            />
          )}

          {activeTab === 'agenda' && (
            <DataTable
              title="Agenda"
              data={getFilteredData(agendaItems)}
              onAdd={() => handleAdd('agenda')}
              onEdit={(item) => handleEdit('agenda', item)}
              onDelete={(id) => handleDelete('agenda', id)}
              columns={[
                { key: 'title', label: 'Judul' },
                { key: 'event_date', label: 'Tanggal', type: 'date' },
                { key: 'category', label: 'Kategori' },
                { key: 'is_featured', label: 'Unggulan', type: 'boolean' }
              ]}
            />
          )}

          {activeTab === 'news' && (
            <DataTable
              title="Berita"
              data={getFilteredData(newsItems)}
              onAdd={() => handleAdd('news')}
              onEdit={(item) => handleEdit('news', item)}
              onDelete={(id) => handleDelete('news', id)}
              columns={[
                { key: 'image_url', label: 'Gambar', type: 'image' },
                { key: 'title', label: 'Judul' },
                { key: 'category', label: 'Kategori' },
                { key: 'author', label: 'Penulis' },
                { key: 'is_published', label: 'Status', type: 'boolean' }
              ]}
            />
          )}

          {activeTab === 'programs' && (
            <DataTable
              title="Program Keahlian"
              data={getFilteredData(programs)}
              onAdd={() => handleAdd('programs')}
              onEdit={(item) => handleEdit('programs', item)}
              onDelete={(id) => handleDelete('programs', id)}
              columns={[
                { key: 'image_url', label: 'Gambar', type: 'image' },
                { key: 'name', label: 'Nama Program' },
                { key: 'code', label: 'Kode' },
                { key: 'duration', label: 'Durasi' },
                { key: 'is_active', label: 'Status', type: 'boolean' }
              ]}
            />
          )}

          {activeTab === 'extracurricular' && (
            <DataTable
              title="Ekstrakurikuler"
              data={getFilteredData(extracurriculars)}
              onAdd={() => handleAdd('extracurricular')}
              onEdit={(item) => handleEdit('extracurricular', item)}
              onDelete={(id) => handleDelete('extracurricular', id)}
              columns={[
                { key: 'image_url', label: 'Gambar', type: 'image' },
                { key: 'name', label: 'Nama' },
                { key: 'category', label: 'Kategori' },
                { key: 'coach', label: 'Pelatih' },
                { key: 'is_active', label: 'Status', type: 'boolean' }
              ]}
            />
          )}

          {activeTab === 'testimonials' && (
            <DataTable
              title="Testimoni"
              data={getFilteredData(testimonials)}
              onAdd={() => handleAdd('testimonials')}
              onEdit={(item) => handleEdit('testimonials', item)}
              onDelete={(id) => handleDelete('testimonials', id)}
              columns={[
                { key: 'name', label: 'Nama' },
                { key: 'role', label: 'Peran' },
                { key: 'rating', label: 'Rating' },
                { key: 'is_approved', label: 'Disetujui', type: 'boolean' },
                { key: 'is_featured', label: 'Unggulan', type: 'boolean' }
              ]}
            />
          )}

          {activeTab === 'leadership' && (
            <DataTable
              title="Kepemimpinan"
              data={getFilteredData(leadership)}
              onAdd={() => handleAdd('leadership')}
              onEdit={(item) => handleEdit('leadership', item)}
              onDelete={(id) => handleDelete('leadership', id)}
              columns={[
                { key: 'image_url', label: 'Foto', type: 'image' },
                { key: 'name', label: 'Nama' },
                { key: 'position', label: 'Jabatan' },
                { key: 'education', label: 'Pendidikan', type: 'text-truncate' },
                { key: 'order_position', label: 'Urutan' },
                { key: 'is_active', label: 'Status', type: 'boolean' }
              ]}
            />
          )}

          {activeTab === 'settings' && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Pengaturan Sistem</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Pengaturan Umum
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Mode Maintenance</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Aktifkan untuk maintenance website</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Universal Form Modal */}
      <UniversalFormModal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false)
          setEditingItem(null)
        }}
        onSave={handleSave}
        formType={formType}
        editingItem={editingItem}
      />
    </div>
  )
}

// Hero Stats Form Component
const HeroStatsForm: React.FC<{
  stats: { students: string; programs: string; achievements: string }
  onSave: (stats: { students: string; programs: string; achievements: string }) => void
}> = ({ stats, onSave }) => {
  const [formData, setFormData] = useState(stats)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Statistik Hero Section
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Siswa Aktif
            </label>
            <input
              type="text"
              value={formData.students}
              onChange={(e) => setFormData({ ...formData, students: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              placeholder="800+"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Program Keahlian
            </label>
            <input
              type="text"
              value={formData.programs}
              onChange={(e) => setFormData({ ...formData, programs: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              placeholder="5"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Prestasi
            </label>
            <input
              type="text"
              value={formData.achievements}
              onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              placeholder="30+"
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors"
          >
            <Save className="w-5 h-5" />
            <span>Simpan Perubahan</span>
          </motion.button>
        </div>
      </form>
    </div>
  )
}

// Data Table Component
const DataTable: React.FC<{
  title: string
  data: any[]
  onAdd: () => void
  onEdit: (item: any) => void
  onDelete: (id: string) => void
  columns: Array<{
    key: string
    label: string
    type?: 'image' | 'date' | 'boolean' | 'text-truncate'
  }>
}> = ({ title, data, onAdd, onEdit, onDelete, columns }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAdd}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah</span>
        </motion.button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {columns.map((column) => (
                  <th key={column.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {column.label}
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {data.map((item, index) => (
                <tr key={item.id || index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                      {column.type === 'image' ? (
                        <img
                          src={item[column.key]}
                          alt=""
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      ) : column.type === 'date' ? (
                        <span className="text-sm text-gray-900 dark:text-white">
                          {new Date(item[column.key]).toLocaleDateString('id-ID')}
                        </span>
                      ) : column.type === 'boolean' ? (
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          item[column.key] 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {item[column.key] ? 'Ya' : 'Tidak'}
                        </span>
                      ) : column.type === 'text-truncate' ? (
                        <span className="text-sm text-gray-900 dark:text-white max-w-xs truncate block">
                          {item[column.key]}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-900 dark:text-white">
                          {Array.isArray(item[column.key]) ? item[column.key].join(', ') : item[column.key]}
                        </span>
                      )}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onEdit(item)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(item.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Belum ada data. Tambahkan data pertama.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// Universal Form Modal Component
const UniversalFormModal: React.FC<{
  isOpen: boolean
  onClose: () => void
  onSave: (data: any) => void
  formType: string
  editingItem: any
}> = ({ isOpen, onClose, onSave, formType, editingItem }) => {
  const [formData, setFormData] = useState<any>({})
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem)
    } else {
      // Reset form for new item
      setFormData(getDefaultFormData(formType))
    }
  }, [editingItem, formType])

  const getDefaultFormData = (type: string) => {
    switch (type) {
      case 'teachers':
        return { name: '', subject: '', description: '', image_url: '' }
      case 'staff-teachers':
        return { name: '', position: '', education: '', subjects: [], phone: '', email: '', image_url: '', bio: '', experience_years: 0 }
      case 'staff-education':
        return { name: '', position: '', department: '', education: '', phone: '', email: '', image_url: '', bio: '' }
      case 'gallery':
        return { title: '', description: '', image_url: '', category: 'Fasilitas' }
      case 'agenda':
        return { title: '', description: '', event_date: '', event_time: '', location: '', category: 'Kegiatan', is_featured: false }
      case 'news':
        return { title: '', content: '', excerpt: '', image_url: '', category: 'Berita', author: '', is_published: true }
      case 'programs':
        return { name: '', code: '', description: '', duration: '3 tahun', competencies: [], career_prospects: [], image_url: '', is_active: true }
      case 'extracurricular':
        return { name: '', description: '', category: 'Olahraga', schedule: '', coach: '', image_url: '', achievements: [], is_active: true }
      case 'testimonials':
        return { name: '', role: 'Alumni', content: '', rating: 5, is_featured: false, is_approved: false }
      case 'leadership':
        return { name: '', position: '', education: '', experience: '', message: '', image_url: '', phone: '', email: '', order_position: 0, is_active: true }
      default:
        return {}
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleArrayChange = (field: string, value: string) => {
    const array = value.split(',').map(item => item.trim()).filter(item => item)
    setFormData({ ...formData, [field]: array })
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            {editingItem ? 'Edit' : 'Tambah'} {formType}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Dynamic form fields based on formType */}
            {formType === 'teachers' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Mata Pelajaran
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject || ''}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Deskripsi
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    URL Foto
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.image_url || ''}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  />
                </div>
              </>
            )}

            {formType === 'staff-teachers' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Jabatan
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.position || ''}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Pendidikan
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.education || ''}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mata Pelajaran (pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    value={Array.isArray(formData.subjects) ? formData.subjects.join(', ') : ''}
                    onChange={(e) => handleArrayChange('subjects', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    placeholder="Matematika, Fisika, Kimia"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Telepon
                    </label>
                    <input
                      type="tel"
                      value={formData.phone || ''}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Pengalaman (Tahun)
                    </label>
                    <input
                      type="number"
                      value={formData.experience_years || 0}
                      onChange={(e) => setFormData({ ...formData, experience_years: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    rows={3}
                    value={formData.bio || ''}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    URL Foto
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.image_url || ''}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  />
                </div>
              </>
            )}

            {formType === 'staff-education' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Jabatan
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.position || ''}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Departemen
                    </label>
                    <select
                      required
                      value={formData.department || ''}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    >
                      <option value="">Pilih Departemen</option>
                      <option value="Administrasi">Administrasi</option>
                      <option value="Keuangan">Keuangan</option>
                      <option value="Perpustakaan">Perpustakaan</option>
                      <option value="Laboratorium">Laboratorium</option>
                      <option value="Keamanan">Keamanan</option>
                      <option value="Kebersihan">Kebersihan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Pendidikan
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.education || ''}
                      onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Telepon
                    </label>
                    <input
                      type="tel"
                      value={formData.phone || ''}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    rows={3}
                    value={formData.bio || ''}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    URL Foto
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.image_url || ''}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  />
                </div>
              </>
            )}

            {formType === 'leadership' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Jabatan
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.position || ''}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Pendidikan
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.education || ''}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Pengalaman
                  </label>
                  <textarea
                    rows={3}
                    value={formData.experience || ''}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Pesan/Visi
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message || ''}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white resize-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Telepon
                    </label>
                    <input
                      type="tel"
                      value={formData.phone || ''}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Urutan Posisi
                    </label>
                    <input
                      type="number"
                      value={formData.order_position || 0}
                      onChange={(e) => setFormData({ ...formData, order_position: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      URL Foto
                    </label>
                    <input
                      type="url"
                      required
                      value={formData.image_url || ''}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Status Aktif
                    </label>
                    <select
                      value={formData.is_active ? 'true' : 'false'}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.value === 'true' })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    >
                      <option value="true">Aktif</option>
                      <option value="false">Tidak Aktif</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Add other form types as needed */}
            
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={uploading}
                className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors disabled:opacity-50"
              >
                {uploading ? 'Mengupload...' : 'Simpan'}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}