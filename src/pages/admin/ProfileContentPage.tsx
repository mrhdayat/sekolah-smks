import React, { useEffect } from 'react';
import { useForm, useFieldArray, type SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { schoolProfileService } from '../../lib/database';
import { Save, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Tipe Data untuk setiap form
type SejarahFormData = { content: string; tahun_berdiri: string; jumlah_siswa: string; program_keahlian: string; };
type FasilitasFormData = { fasilitas: { name: string; count: string; description?: string; }[] };
type PrestasiFormData = { prestasi: { title: string; year: string; category: string; }[] };

// Komponen Form untuk Sejarah
const SejarahForm: React.FC = () => {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<SejarahFormData>();

  useEffect(() => {
    schoolProfileService.getBySection('sejarah').then(data => {
      if (data && data.content) reset(data.content);
    });
  }, [reset]);

  const onSubmit: SubmitHandler<SejarahFormData> = async (data) => {
    try {
      await schoolProfileService.upsert({ section: 'sejarah', content: data });
      toast.success('Data Sejarah berhasil diperbarui!');
    } catch (error) { toast.error('Gagal menyimpan data Sejarah.'); }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Edit Bagian Sejarah & Statistik</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Konten Paragraf Sejarah</label>
          <textarea {...register('content')} rows={5} className="w-full p-3 bg-gray-50 dark:bg-gray-700 border rounded-xl" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tahun Berdiri</label><input {...register('tahun_berdiri')} className="w-full p-3 bg-gray-50 dark:bg-gray-700 border rounded-xl" /></div>
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Jumlah Siswa</label><input {...register('jumlah_siswa')} className="w-full p-3 bg-gray-50 dark:bg-gray-700 border rounded-xl" /></div>
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Jumlah Program</label><input {...register('program_keahlian')} className="w-full p-3 bg-gray-50 dark:bg-gray-700 border rounded-xl" /></div>
        </div>
        <div className="flex justify-end"><motion.button type="submit" disabled={isSubmitting} whileHover={{scale: 1.05}} className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl"><Save className="w-4 h-4" /><span>{isSubmitting ? 'Menyimpan...' : 'Simpan Sejarah'}</span></motion.button></div>
      </form>
    </div>
  );
};

// Komponen Form untuk Fasilitas
const FasilitasForm: React.FC = () => {
  const { register, control, handleSubmit, reset, formState: { isSubmitting } } = useForm<FasilitasFormData>({ defaultValues: { fasilitas: [] } });
  const { fields, append, remove } = useFieldArray({ control, name: 'fasilitas' });

  useEffect(() => {
    schoolProfileService.getBySection('fasilitas_unggulan').then(data => {
      if (data && data.content?.fasilitas) reset({ fasilitas: data.content.fasilitas });
    });
  }, [reset]);

  const onSubmit: SubmitHandler<FasilitasFormData> = async (data) => {
    try {
      await schoolProfileService.upsert({ section: 'fasilitas_unggulan', content: data });
      toast.success('Data Fasilitas berhasil diperbarui!');
    } catch (error) { toast.error('Gagal menyimpan data Fasilitas.'); }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm mt-8">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Edit Bagian Fasilitas Unggulan</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-3">
              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Fasilitas</label>
                  <input {...register(`fasilitas.${index}.name` as const, { required: true })} className="w-full mt-1 p-2 border rounded" />
                </div>
                <div className="w-1/3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Jumlah</label>
                  <input {...register(`fasilitas.${index}.count` as const)} className="w-full mt-1 p-2 border rounded" />
                </div>
                <button type="button" onClick={() => remove(index)} className="p-2 bg-red-500 text-white rounded hover:bg-red-600"><Trash2 className="w-4 h-4" /></button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Deskripsi Singkat</label>
                <input {...register(`fasilitas.${index}.description` as const)} className="w-full mt-1 p-2 border rounded" placeholder="Contoh: Dilengkapi 40 unit PC Core i7"/>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => append({ name: '', count: '', description: '' })} className="flex items-center space-x-2 text-sm text-blue-600 font-medium mt-4"><Plus className="w-4 h-4" /><span>Tambah Fasilitas</span></button>
        <div className="flex justify-end pt-4"><motion.button type="submit" disabled={isSubmitting} whileHover={{scale: 1.05}} className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl"><Save className="w-4 h-4" /><span>{isSubmitting ? 'Menyimpan...' : 'Simpan Fasilitas'}</span></motion.button></div>
      </form>
    </div>
  );
};

// Komponen Form untuk Prestasi
const PrestasiForm: React.FC = () => {
  const { register, control, handleSubmit, reset, formState: { isSubmitting } } = useForm<PrestasiFormData>({ defaultValues: { prestasi: [] } });
  const { fields, append, remove } = useFieldArray({ control, name: 'prestasi' });

  useEffect(() => {
    schoolProfileService.getBySection('prestasi_terbaru').then(data => {
      if (data && data.content?.prestasi) reset({ prestasi: data.content.prestasi });
    });
  }, [reset]);

  const onSubmit: SubmitHandler<PrestasiFormData> = async (data) => {
    try {
      await schoolProfileService.upsert({ section: 'prestasi_terbaru', content: data });
      toast.success('Data Prestasi berhasil diperbarui!');
    } catch (error) { toast.error('Gagal menyimpan data Prestasi.'); }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm mt-8">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Edit Bagian Prestasi Terbaru</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="md:col-span-2"><label className="block text-sm font-medium">Judul Prestasi</label><input {...register(`prestasi.${index}.title` as const, { required: true })} className="w-full mt-1 p-2 border rounded" /></div>
              <div><label className="block text-sm font-medium">Tahun</label><input {...register(`prestasi.${index}.year` as const)} className="w-full mt-1 p-2 border rounded" /></div>
              <div className="flex items-center gap-2">
                  <div className="flex-1"><label className="block text-sm font-medium">Kategori</label><input {...register(`prestasi.${index}.category` as const)} className="w-full mt-1 p-2 border rounded" /></div>
                  <button type="button" onClick={() => remove(index)} className="p-2 bg-red-500 text-white rounded hover:bg-red-600"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => append({ title: '', year: '', category: '' })} className="flex items-center space-x-2 text-sm text-blue-600 font-medium mt-4"><Plus className="w-4 h-4" /><span>Tambah Prestasi</span></button>
        <div className="flex justify-end pt-4"><motion.button type="submit" disabled={isSubmitting} whileHover={{scale: 1.05}} className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl"><Save className="w-4 h-4" /><span>{isSubmitting ? 'Menyimpan...' : 'Simpan Prestasi'}</span></motion.button></div>
      </form>
    </div>
  );
};


// Komponen utama yang menggabungkan semua form
export const ProfileContentPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
        Manajemen Konten Halaman Profil
      </h2>
      <SejarahForm />
      <FasilitasForm />
      <PrestasiForm />
    </div>
  );
};