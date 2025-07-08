import React, { useEffect } from 'react';
import { useForm, useFieldArray, type SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { visiMisiService } from '../../lib/database';
import { Save, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Definisikan tipe untuk satu poin misi
type MisiPoint = {
  value: string;
};

// Definisikan tipe data untuk keseluruhan form
type VisiMisiFormData = {
  visi: string;
  misi: MisiPoint[];
};

export const VisiMisiContent: React.FC = () => {
  const { register, control, handleSubmit, reset, formState: { isSubmitting } } = useForm<VisiMisiFormData>({
    defaultValues: {
      visi: '',
      misi: [{ value: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "misi"
  });

  useEffect(() => {
    const loadVisiMisi = async () => {
      try {
        const data = await visiMisiService.get();
        if (data && data.misi) {
          // Format data agar sesuai dengan tipe MisiPoint[]
          const formattedData = {
            ...data,
            misi: data.misi.map(item => ({ value: item }))
          };
          reset(formattedData);
        }
      } catch (error) {
        toast.error('Gagal memuat data Visi & Misi.');
        console.error(error);
      }
    };
    loadVisiMisi();
  }, [reset]);

  const onSubmit: SubmitHandler<VisiMisiFormData> = async (data) => {
    try {
      // Ubah kembali format misi menjadi array of strings sebelum disimpan
      const dataToSave = {
        visi: data.visi,
        misi: data.misi.map(item => item.value)
      };
      await visiMisiService.upsert(dataToSave);
      toast.success('Data Visi & Misi berhasil diperbarui!');
    } catch (error) {
      toast.error('Gagal menyimpan data Visi & Misi.');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Edit Visi & Misi Sekolah</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="visi" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Visi Sekolah</label>
          <textarea
            id="visi"
            {...register('visi', { required: "Visi tidak boleh kosong" })}
            rows={4}
            className="w-full p-3 bg-gray-50 dark:bg-gray-700 border rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Misi Sekolah</label>
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-4">
                <input
                  {...register(`misi.${index}.value` as const, { required: true })}
                  className="w-full p-3 bg-gray-50 dark:bg-gray-700 border rounded-xl flex-1"
                  placeholder={`Poin Misi #${index + 1}`}
                />
                <button type="button" onClick={() => remove(index)} className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => append({ value: "" })}
            className="flex items-center space-x-2 text-sm text-blue-600 font-medium mt-4"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Poin Misi</span>
          </button>
        </div>

        <div className="flex justify-end pt-4">
          <motion.button 
            type="submit" 
            disabled={isSubmitting} 
            whileHover={{scale: 1.05}}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSubmitting ? 'Menyimpan...' : 'Simpan Visi & Misi'}</span>
          </motion.button>
        </div>
      </form>
    </div>
  );
};