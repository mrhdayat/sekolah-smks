import { supabase } from './supabase'
import type { Database } from './supabase'

// Types
export type Teacher = Database['public']['Tables']['teachers']['Row']
export type TeacherInsert = Database['public']['Tables']['teachers']['Insert']
export type TeacherUpdate = Database['public']['Tables']['teachers']['Update']

export type GalleryItem = Database['public']['Tables']['gallery']['Row']
export type GalleryInsert = Database['public']['Tables']['gallery']['Insert']
export type GalleryUpdate = Database['public']['Tables']['gallery']['Update']

export type SchoolProfile = Database['public']['Tables']['school_profile']['Row']
export type SchoolProfileInsert = Database['public']['Tables']['school_profile']['Insert']
export type SchoolProfileUpdate = Database['public']['Tables']['school_profile']['Update']

export type VisiMisi = { visi: string; misi: string[]; }
export type PpdbStep = { id: string; title: string; description?: string; start_date?: string; end_date?: string; document_url?: string; order_position: number; created_at: string; }
export type Document = { id: string; title: string; description?: string; file_url: string; category: string; file_size_kb?: number; created_at: string; }
// New types for additional features
export type Agenda = {
  id: string
  title: string
  description: string
  event_date: string
  event_time?: string
  location?: string
  category: string
  image_url?: string
  is_featured: boolean
  created_at: string
}

export type Message = {
    id: string;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

export type News = {
  id: string
  title: string
  content: string
  excerpt: string
  image_url: string
  category: string
  author: string
  is_published: boolean
  published_at: string
  created_at: string
}

export type StaffTeacher = {
  id: string
  name: string
  position: string
  department: string
  education: string
  subjects: string[]
  phone?: string
  email?: string
  image_url: string
  bio?: string
  experience_years: number
  created_at: string
}

export type StaffEducation = {
  id: string
  name: string
  position: string
  department: string
  education: string
  phone?: string
  email?: string
  image_url: string
  bio?: string
  created_at: string
}

export type Program = {
  id: string
  name: string
  code: string
  description: string
  duration: string
  competencies: string[]
  career_prospects: string[]
  image_url: string
  is_active: boolean
  created_at: string
}

export type Extracurricular = {
  id: string
  name: string
  description: string
  category: string
  schedule?: string
  coach?: string
  image_url: string
  achievements: string[]
  is_active: boolean
  created_at: string
}

export type Testimonial = {
  id: string
  name: string
  role: string
  graduation_year?: number
  current_job?: string
  content: string
  rating: number
  image_url?: string
  is_featured: boolean
  is_approved: boolean
  created_at: string
}

export type Leadership = {
  id: string
  name: string
  position: string
  education: string
  experience?: string
  message?: string
  image_url: string
  phone?: string
  email?: string
  order_position: number
  is_active: boolean
  created_at: string
}

// New type for school statistics
export type SchoolStats = {
  id: string
  section: string
  content: any
  updated_at: string
}

// File Upload Service
export const fileUploadService = {
  async uploadFile(file: File, folder: string = 'uploads') {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `${folder}/${fileName}`
    
    const { data, error } = await supabase.storage
      .from('uploads') // Nama bucket utama kita
      .upload(filePath, file)
    
    if (error) throw error
    
    const { data: { publicUrl } } = supabase.storage
      .from('uploads')
      .getPublicUrl(filePath)
    
    return { fileName: filePath, publicUrl }
  },

  async deleteFile(filePath: string) {
    const { error } = await supabase.storage
      .from('uploads')
      .remove([filePath])
    
    // Jangan throw error jika file tidak ditemukan, anggap saja sudah terhapus
    if (error && error.message !== 'The resource was not found') {
      console.error("Gagal menghapus file lama:", error);
      // Anda bisa memilih untuk throw error di sini jika ingin proses berhenti
      // throw error; 
    }
  }
}

// Teachers CRUD
export const teachersService = {
  async getAll() {
    const { data, error } = await supabase
      .from('teachers')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('teachers')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async create(teacher: TeacherInsert) {
    const { data, error } = await supabase
      .from('teachers')
      .insert([teacher])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, teacher: TeacherUpdate) {
    const { data, error } = await supabase
      .from('teachers')
      .update(teacher)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('teachers')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Gallery CRUD
export const galleryService = {
  async getAll() {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getByCategory(category: string) {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async create(item: GalleryInsert) {
    const { data, error } = await supabase
      .from('gallery')
      .insert([item])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, item: GalleryUpdate) {
    const { data, error } = await supabase
      .from('gallery')
      .update(item)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Agenda CRUD
export const agendaService = {
  async getAll() {
    const { data, error } = await supabase
      .from('agenda')
      .select('*')
      .order('event_date', { ascending: true })
    
    if (error) throw error
    return data as Agenda[]
  },

  async getFeatured() {
    const { data, error } = await supabase
      .from('agenda')
      .select('*')
      .eq('is_featured', true)
      .order('event_date', { ascending: true })
      .limit(5)
    
    if (error) throw error
    return data as Agenda[]
  },

  async create(agenda: Omit<Agenda, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('agenda')
      .insert([agenda])
      .select()
      .single()
    
    if (error) throw error
    return data as Agenda
  },

  async update(id: string, agenda: Partial<Agenda>) {
    const { data, error } = await supabase
      .from('agenda')
      .update(agenda)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Agenda
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('agenda')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// News CRUD
export const newsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('published_at', { ascending: false });
    
    if (error) throw error;
    return data as News[];
  },

  async getPublished(page: number = 1, pageSize: number = 6) {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await supabase
      .from('news')
      .select('*', { count: 'exact' })
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .range(from, to);
    
    if (error) throw error;
    return { data: data as News[], count: count || 0 };
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as News;
  },

  async create(news: Omit<News, 'id' | 'created_at' | 'published_at'>) {
    const { data, error } = await supabase
      .from('news')
      .insert([{...news, published_at: new Date().toISOString()}])
      .select()
      .single();
    
    if (error) throw error;
    return data as News;
  },

  async update(id: string, news: Partial<News>) {
    const { data, error } = await supabase
      .from('news')
      .update(news)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as News;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};


// Staff Teachers CRUD
export const staffTeachersService = {
  async getAll() {
    const { data, error } = await supabase
      .from('staff_teachers')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data as StaffTeacher[]
  },

  async create(staff: Omit<StaffTeacher, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('staff_teachers')
      .insert([staff])
      .select()
      .single()
    
    if (error) throw error
    return data as StaffTeacher
  },

  async update(id: string, staff: Partial<StaffTeacher>) {
    const { data, error } = await supabase
      .from('staff_teachers')
      .update(staff)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as StaffTeacher
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('staff_teachers')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Staff Education CRUD
export const staffEducationService = {
  async getAll() {
    const { data, error } = await supabase
      .from('staff_education')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data as StaffEducation[]
  },

  async create(staff: Omit<StaffEducation, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('staff_education')
      .insert([staff])
      .select()
      .single()
    
    if (error) throw error
    return data as StaffEducation
  },

  async update(id: string, staff: Partial<StaffEducation>) {
    const { data, error } = await supabase
      .from('staff_education')
      .update(staff)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as StaffEducation
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('staff_education')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Programs CRUD
export const programsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data as Program[]
  },

  async getActive() {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .eq('is_active', true)
      .order('name')
    
    if (error) throw error
    return data as Program[]
  },

  // --- FUNGSI BARU DITAMBAHKAN DI SINI ---
  async getByCode(code: string) {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .eq('code', code)
      .single()
    
    if (error) throw error
    return data as Program
  },

  async getLatest(limit: number = 3) {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data as Program[]
  },

  // --- AKHIR FUNGSI BARU ---

  async create(program: Omit<Program, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('programs')
      .insert([program])
      .select()
      .single()
    
    if (error) throw error
    return data as Program
  },

  async update(id: string, program: Partial<Program>) {
    const { data, error } = await supabase
      .from('programs')
      .update(program)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Program
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('programs')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}


// Extracurricular CRUD
export const extracurricularService = {
  async getAll() {
    const { data, error } = await supabase
      .from('extracurricular')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data as Extracurricular[]
  },

  async getActive() {
    const { data, error } = await supabase
      .from('extracurricular')
      .select('*')
      .eq('is_active', true)
      .order('name')
    
    if (error) throw error
    return data as Extracurricular[]
  },

  async create(extracurricular: Omit<Extracurricular, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('extracurricular')
      .insert([extracurricular])
      .select()
      .single()
    
    if (error) throw error
    return data as Extracurricular
  },

  async update(id: string, extracurricular: Partial<Extracurricular>) {
    const { data, error } = await supabase
      .from('extracurricular')
      .update(extracurricular)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Extracurricular
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('extracurricular')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// =======================================================
// INI ADALAH BAGIAN YANG BERUBAH
// =======================================================
export const testimonialsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Testimonial[]
  },

  async getApproved() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Testimonial[]
  },

  async getFeatured() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_approved', true)
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Testimonial[]
  },

  // Fungsi create sekarang memanggil RPC, bukan .insert()
  async create(testimonial: Omit<Testimonial, 'id' | 'created_at' | 'is_approved' | 'is_featured'>) {
    const { error } = await supabase.rpc('create_testimonial', {
      name: testimonial.name,
      role: testimonial.role,
      content: testimonial.content,
      rating: testimonial.rating,
    })
    
    if (error) throw error
  },

  async update(id: string, testimonial: Partial<Testimonial>) {
    const { data, error } = await supabase
      .from('testimonials')
      .update(testimonial)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Testimonial
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}
// =======================================================
// AKHIR DARI BAGIAN YANG BERUBAH
// =======================================================


// Leadership CRUD
export const leadershipService = {
  async getAll() {
    const { data, error } = await supabase
      .from('leadership')
      .select('*')
      .eq('is_active', true)
      .order('order_position')
    
    if (error) throw error
    return data as Leadership[]
  },

  async getAllForAdmin() {
    const { data, error } = await supabase
      .from('leadership')
      .select('*')
      .order('order_position')
    
    if (error) throw error
    return data as Leadership[]
  },

  async getHeadmaster() {
    const { data, error } = await supabase
      .from('leadership')
      .select('*')
      .eq('position', 'Kepala Sekolah')
      .eq('is_active', true)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data as Leadership | null
  },

  async create(leadership: Omit<Leadership, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('leadership')
      .insert([leadership])
      .select()
      .single()
    
    if (error) throw error
    return data as Leadership
  },

  async update(id: string, leadership: Partial<Leadership>) {
    const { data, error } = await supabase
      .from('leadership')
      .update(leadership)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Leadership
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('leadership')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// School Stats Service (for Hero section statistics)
export const schoolStatsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('school_profile')
      .select('*')
      .eq('section', 'hero_stats')
      .maybeSingle()
    
    if (error) throw error
    
    if (data === null) {
      // Return default stats if not found
      return {
        id: 'default',
        section: 'hero_stats',
        content: {
          students: '800+',
          programs: '5',
          achievements: '30+'
        },
        updated_at: new Date().toISOString()
      }
    }
    
    return data
  },

  async update(stats: { students: string; programs: string; achievements: string }) {
    const { data, error } = await supabase
      .from('school_profile')
      .upsert([{
        section: 'hero_stats',
        content: stats
      }], { onConflict: 'section' })
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

// School Profile CRUD
export const schoolProfileService = {
  async getBySection(section: string) {
    const { data, error } = await supabase
      .from('school_profile')
      .select('*')
      .eq('section', section)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async upsert(profile: SchoolProfileInsert) {
    const { data, error } = await supabase
      .from('school_profile')
      .upsert([profile], { onConflict: 'section' })
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getAll() {
    const { data, error } = await supabase
      .from('school_profile')
      .select('*')
      .order('section')
    
    if (error) throw error
    return data
  }
}
export const messagesService = {
  async getAll() {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as Message[];
  },

  async create(message: Omit<Message, 'id' | 'created_at' | 'is_read'>) {
    const { data, error } = await supabase
      .from('messages')
      .insert([message])
      .select()
      .single();
    if (error) throw error;
    return data as Message;
  },

  async update(id: string, updates: Partial<Message>) {
    const { data, error } = await supabase
      .from('messages')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Message;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

export const visiMisiService = {
  async get() {
    const { data, error } = await supabase
      .from('school_profile')
      .select('content')
      .eq('section', 'visi_misi')
      .single();
    if (error && error.code !== 'PGRST116') throw error;
    return data?.content as VisiMisi | null;
  },
  async upsert(content: VisiMisi) {
    const { data, error } = await supabase
      .from('school_profile')
      .upsert({ section: 'visi_misi', content }, { onConflict: 'section' });
    if (error) throw error;
    return data;
  }
};

// Service untuk Tahapan PPDB
export const ppdbStepsService = {
  async getAll() {
    const { data, error } = await supabase.from('ppdb_steps').select('*').order('order_position', { ascending: true });
    if (error) throw error; return data as PpdbStep[];
  },
  async create(step: Omit<PpdbStep, 'id' | 'created_at'>) {
    const { data, error } = await supabase.from('ppdb_steps').insert(step).select().single();
    if (error) throw error; return data;
  },
  async update(id: string, updates: Partial<PpdbStep>) {
    const { data, error } = await supabase.from('ppdb_steps').update(updates).eq('id', id).select().single();
    if (error) throw error; return data;
  },
  async delete(id: string) {
    const { error } = await supabase.from('ppdb_steps').delete().eq('id', id);
    if (error) throw error;
  }
};

// Service untuk Pusat Dokumen
export const documentsService = {
  async getAll() {
    const { data, error } = await supabase.from('documents').select('*').order('created_at', { ascending: false });
    if (error) throw error; return data as Document[];
  },
  async create(doc: Omit<Document, 'id' | 'created_at'>) {
    const { data, error } = await supabase.from('documents').insert(doc).select().single();
    if (error) throw error; return data;
  },
  async update(id: string, updates: Partial<Document>) {
    const { data, error } = await supabase.from('documents').update(updates).eq('id', id).select().single();
    if (error) throw error; return data;
  },
  async delete(id: string) {
    const { error } = await supabase.from('documents').delete().eq('id', id);
    if (error) throw error;
  }
};

// Statistics
export const statisticsService = {
  async getDashboardStats() {
    const [
      teachersCount, 
      galleryCount, 
      agendaCount, 
      newsCount, 
      staffTeachersCount, 
      staffEducationCount,
      programsCount,
      extracurricularCount,
      testimonialsCount,
      leadershipCount
    ] = await Promise.all([
      supabase.from('teachers').select('id', { count: 'exact', head: true }),
      supabase.from('gallery').select('id', { count: 'exact', head: true }),
      supabase.from('agenda').select('id', { count: 'exact', head: true }),
      supabase.from('news').select('id', { count: 'exact', head: true }),
      supabase.from('staff_teachers').select('id', { count: 'exact', head: true }),
      supabase.from('staff_education').select('id', { count: 'exact', head: true }),
      supabase.from('programs').select('id', { count: 'exact', head: true }),
      supabase.from('extracurricular').select('id', { count: 'exact', head: true }),
      supabase.from('testimonials').select('id', { count: 'exact', head: true }),
      supabase.from('leadership').select('id', { count: 'exact', head: true })
    ])

    return {
      teachers: teachersCount.count || 0,
      gallery: galleryCount.count || 0,
      agenda: agendaCount.count || 0,
      news: newsCount.count || 0,
      staffTeachers: staffTeachersCount.count || 0,
      staffEducation: staffEducationCount.count || 0,
      programs: programsCount.count || 0,
      extracurricular: extracurricularCount.count || 0,
      testimonials: testimonialsCount.count || 0,
      leadership: leadershipCount.count || 0
    }
  }
}