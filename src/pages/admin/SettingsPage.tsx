import React, { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { schoolProfileService } from '../../lib/database';
import { Save } from 'lucide-react';

type SettingsFormData = {
  school_name: string;
  address: string;
  phone: string;
  email: string;
  facebook_url: string;
  instagram_url: string;
  youtube_url: string;
  theme_color: 'blue' | 'green' | 'purple' | 'red';
};

export const SettingsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset, watch, setValue, formState: { isSubmitting } } = useForm<SettingsFormData>({
    defaultValues: { theme_color: 'blue' }
  });

  const selectedColor = watch('theme_color');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await schoolProfileService.getBySection('contact_info');
        if (data && data.content) {
          reset(data.content as SettingsFormData);
        }
      } catch (error) { toast.error('Gagal memuat pengaturan.'); } 
      finally { setLoading(false); }
    };
    fetchSettings();
  }, [reset]);

  const onSubmit: SubmitHandler<SettingsFormData> = async (formData) => {
    try {
      await schoolProfileService.upsert({ section: 'contact_info', content: formData });
      toast.success('Pengaturan berhasil disimpan! Muat ulang halaman publik untuk melihat perubahan tema.');
    } catch (error) { toast.error('Gagal menyimpan pengaturan.'); }
  };
  
  if (loading) return <div>Memuat pengaturan...</div>;

  const colorOptions = [
    { name: 'blue', hex: '#3b82f6' }, { name: 'green', hex: '#22c55e' },
    { name: 'purple', hex: '#8b5cf6' }, { name: 'red', hex: '#ef4444' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Pengaturan Situs</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Informasi Sekolah</h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-medium mb-2">Nama Sekolah</label><input type="text" {...register('school_name', { required: true })} className="w-full p-3 bg-gray-50 border rounded-xl" /></div>
              <div><label className="block text-sm font-medium mb-2">Alamat</label><textarea {...register('address', { required: true })} className="w-full p-3 bg-gray-50 border rounded-xl" rows={3}></textarea></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-medium mb-2">Nomor Telepon</label><input type="tel" {...register('phone')} className="w-full p-3 bg-gray-50 border rounded-xl" /></div>
              <div><label className="block text-sm font-medium mb-2">Email Kontak</label><input type="email" {...register('email', { pattern: /^\S+@\S+$/i })} className="w-full p-3 bg-gray-50 border rounded-xl" /></div>
            </div>
          </div>
        </div>
        <hr className="dark:border-gray-700" />
        <div>
          <h3 className="text-lg font-semibold mb-4">Link Media Sosial</h3>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium mb-2">URL Facebook</label><input type="url" {...register('facebook_url')} className="w-full p-3 bg-gray-50 border rounded-xl" /></div>
            <div><label className="block text-sm font-medium mb-2">URL Instagram</label><input type="url" {...register('instagram_url')} className="w-full p-3 bg-gray-50 border rounded-xl" /></div>
            <div><label className="block text-sm font-medium mb-2">URL YouTube</label><input type="url" {...register('youtube_url')} className="w-full p-3 bg-gray-50 border rounded-xl" /></div>
          </div>
        </div>
        <hr className="dark:border-gray-700" />
        <div>
            <h3 className="text-lg font-semibold mb-4">Tampilan</h3>
            <label className="block text-sm font-medium mb-3">Warna Tema Primer</label>
            <div className="flex items-center space-x-4">
                <input type="hidden" {...register('theme_color')} />
                {colorOptions.map(color => (<button key={color.name} type="button" onClick={() => setValue('theme_color', color.name as any, { shouldDirty: true })} className={`w-10 h-10 rounded-full transition-all duration-200 ${selectedColor === color.name ? 'ring-2 ring-offset-2 dark:ring-offset-gray-800 ring-blue-500' : 'hover:scale-110'}`} style={{ backgroundColor: color.hex }} />))}
            </div>
        </div>
        <div className="flex justify-end pt-4">
          <button type="submit" disabled={isSubmitting} className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50">
            <Save className="w-5 h-5" />
            <span>{isSubmitting ? 'Menyimpan...' : 'Simpan Pengaturan'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};