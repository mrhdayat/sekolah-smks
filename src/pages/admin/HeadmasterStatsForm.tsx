// src/pages/admin/HeadmasterStatsForm.tsx

import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Save } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeadmasterStatsFormProps {
  stats: {
    siswa_aktif: string;
    program_keahlian: string;
    prestasi_diraih: string;
    tahun_pengalaman: string;
  };
  onSave: (newStats: any) => void;
}

export const HeadmasterStatsForm: React.FC<HeadmasterStatsFormProps> = ({ stats, onSave }) => {
  const { register, handleSubmit, reset } = useForm<HeadmasterStatsFormProps['stats']>();

  useEffect(() => {
    reset(stats);
  }, [stats, reset]);

  const onSubmit: SubmitHandler<HeadmasterStatsFormProps['stats']> = (data) => {
    onSave(data);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm mt-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Edit Statistik Halaman Sambutan
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Siswa Aktif</label>
            <input {...register('siswa_aktif')} className="w-full mt-1 p-3 bg-gray-50 dark:bg-gray-700 border rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Program Keahlian</label>
            <input {...register('program_keahlian')} className="w-full mt-1 p-3 bg-gray-50 dark:bg-gray-700 border rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Prestasi Diraih</label>
            <input {...register('prestasi_diraih')} className="w-full mt-1 p-3 bg-gray-50 dark:bg-gray-700 border rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tahun Pengalaman</label>
            <input {...register('tahun_pengalaman')} className="w-full mt-1 p-3 bg-gray-50 dark:bg-gray-700 border rounded-xl" />
          </div>
        </div>
        <div className="flex justify-end">
          <motion.button type="submit" whileHover={{ scale: 1.05 }} className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl">
            <Save className="w-5 h-5" />
            <span>Simpan Statistik</span>
          </motion.button>
        </div>
      </form>
    </div>
  );
};