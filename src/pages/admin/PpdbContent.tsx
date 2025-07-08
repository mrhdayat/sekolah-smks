import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray, type SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ppdbStepsService, type PpdbStep } from '../../lib/database';
import { Save, Plus, Trash2, GripVertical } from 'lucide-react';
import { motion } from 'framer-motion';

type PpdbFormData = {
  steps: Partial<PpdbStep>[];
};

export const PpdbContent: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [deletedStepIds, setDeletedStepIds] = useState<string[]>([]);

  const { register, control, handleSubmit, reset, formState: { isSubmitting } } = useForm<PpdbFormData>({
    defaultValues: { steps: [] }
  });

  const { fields, append, remove } = useFieldArray({ // 'move' dihapus dari sini
    control,
    name: "steps"
  });

  const loadSteps = async () => {
    setLoading(true);
    try {
      const data = await ppdbStepsService.getAll();
      if (data) reset({ steps: data });
    } catch (error) {
      toast.error('Gagal memuat data tahapan PPDB.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSteps();
  }, [reset]);

  const handleRemove = (index: number) => {
    const step = fields[index];
    if (step.id) {
      setDeletedStepIds(prev => [...prev, step.id!]);
    }
    remove(index);
  };

  const onSubmit: SubmitHandler<PpdbFormData> = async (data) => {
    try {
      const promises = [];

      for (const id of deletedStepIds) {
        promises.push(ppdbStepsService.delete(id));
      }

      for (const [index, step] of data.steps.entries()) {
        const stepData = {
          title: step.title!, // Memastikan title tidak undefined
          description: step.description,
          start_date: step.start_date,
          end_date: step.end_date,
          document_url: step.document_url,
          order_position: index,
        };

        if (step.id) {
          promises.push(ppdbStepsService.update(step.id, stepData));
        } else {
          promises.push(ppdbStepsService.create(stepData));
        }
      }

      await Promise.all(promises);
      
      toast.success('Data Panduan PPDB berhasil diperbarui!');
      setDeletedStepIds([]);
      loadSteps(); // Muat ulang data
    } catch (error) {
      toast.error('Gagal menyimpan data Panduan PPDB.');
      console.error(error);
    }
  };
  
  if (loading) return <div>Memuat formulir PPDB...</div>

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm mt-8">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Edit Panduan PPDB</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="pt-8 cursor-grab"><GripVertical className="w-5 h-5 text-gray-400" /></div>
              <div className="flex-1 space-y-3">
                <div><label className="block text-sm font-medium">Judul Tahapan</label><input {...register(`steps.${index}.title` as const, { required: true })} className="w-full mt-1 p-2 border rounded-md" /></div>
                <div><label className="block text-sm font-medium">Deskripsi / Syarat</label><textarea {...register(`steps.${index}.description` as const)} rows={3} className="w-full mt-1 p-2 border rounded-md resize-none" /></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium">Tanggal Mulai</label><input type="date" {...register(`steps.${index}.start_date` as const)} className="w-full mt-1 p-2 border rounded-md" /></div>
                  <div><label className="block text-sm font-medium">Tanggal Selesai</label><input type="date" {...register(`steps.${index}.end_date` as const)} className="w-full mt-1 p-2 border rounded-md" /></div>
                </div>
                 <div><label className="block text-sm font-medium">Link Dokumen/Brosur (Opsional)</label><input type="url" {...register(`steps.${index}.document_url` as const)} className="w-full mt-1 p-2 border rounded-md" placeholder="https://..."/></div>
              </div>
              <button type="button" onClick={() => handleRemove(index)} className="p-2 mt-8 bg-red-500 text-white rounded-lg hover:bg-red-600"><Trash2 className="w-5 h-5" /></button>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => append({ title: '', description: '', start_date: '', end_date: '', document_url: '', order_position: fields.length })} className="flex items-center space-x-2 text-sm text-blue-600 font-medium mt-4"><Plus className="w-4 h-4" /><span>Tambah Tahapan PPDB</span></button>
        <div className="flex justify-end pt-4">
          <motion.button type="submit" disabled={isSubmitting} whileHover={{scale: 1.05}} className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50"><Save className="w-4 h-4" /><span>{isSubmitting ? 'Menyimpan...' : 'Simpan Panduan PPDB'}</span></motion.button>
        </div>
      </form>
    </div>
  );
};