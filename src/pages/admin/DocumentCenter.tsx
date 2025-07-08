import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray, type SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { documentsService, fileUploadService, type Document } from '../../lib/database';
import { Save, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

type DocumentFormData = {
  documents: (Partial<Document> & { file_upload?: FileList })[];
};

export const DocumentCenter: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [deletedDocIds, setDeletedDocIds] = useState<string[]>([]);

  const { register, control, handleSubmit, reset, formState: { isSubmitting } } = useForm<DocumentFormData>({
    defaultValues: { documents: [] }
  });

  const { fields, append, remove } = useFieldArray({ control, name: "documents" });

  const loadDocuments = async () => {
    setLoading(true);
    try {
      const data = await documentsService.getAll();
      if (data) reset({ documents: data });
    } catch (error) {
      toast.error('Gagal memuat data dokumen.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, [reset]);

  const handleRemove = (index: number) => {
    const doc = fields[index];
    if (doc.id) {
      setDeletedDocIds(prev => [...prev, doc.id!]);
      if(doc.file_url) {
        const filePath = new URL(doc.file_url).pathname.split('/uploads/').pop();
        if(filePath) fileUploadService.deleteFile(filePath);
      }
    }
    remove(index);
  };

  const onSubmit: SubmitHandler<DocumentFormData> = async (data) => {
    try {
      const promises = [];

      for (const id of deletedDocIds) {
        promises.push(documentsService.delete(id));
      }

      for (const doc of data.documents) {
        let fileUrl = doc.file_url;
        if (doc.file_upload && doc.file_upload.length > 0) {
          const file = doc.file_upload[0];
          toast.info(`Mengunggah ${file.name}...`);
          const { publicUrl } = await fileUploadService.uploadFile(file, 'documents');
          fileUrl = publicUrl;
        }

        const docData = {
          title: doc.title!,
          description: doc.description,
          category: doc.category!,
          file_url: fileUrl,
        };

        if (doc.id) {
          promises.push(documentsService.update(doc.id, docData));
        } else {
          if (!fileUrl) {
            toast.warn(`File untuk "${doc.title}" belum diunggah.`);
            continue;
          }
          promises.push(documentsService.create(docData as any));
        }
      }

      await Promise.all(promises);
      toast.success('Data Pusat Dokumen berhasil diperbarui!');
      setDeletedDocIds([]);
      loadDocuments();
    } catch (error) {
      toast.error('Gagal menyimpan data Pusat Dokumen.');
      console.error(error);
    }
  };
  
  if (loading) return <div>Memuat formulir Pusat Dokumen...</div>

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm mt-8">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Edit Pusat Dokumen</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium">Judul Dokumen</label><input {...register(`documents.${index}.title` as const, { required: true })} className="w-full mt-1 p-2 border rounded-md" /></div>
                <div><label className="block text-sm font-medium">Kategori</label><input {...register(`documents.${index}.category` as const, { required: true })} className="w-full mt-1 p-2 border rounded-md" placeholder="Contoh: Kurikulum, Brosur" /></div>
              </div>
              <div><label className="block text-sm font-medium">Deskripsi</label><textarea {...register(`documents.${index}.description` as const)} rows={2} className="w-full mt-1 p-2 border rounded-md resize-none" /></div>
              <div>
                <label className="block text-sm font-medium">File Dokumen</label>
                <input type="file" {...register(`documents.${index}.file_upload` as const)} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mt-1"/>
                {field.file_url && <a href={field.file_url} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline">Lihat file saat ini</a>}
              </div>
              <div className="flex justify-end"><button type="button" onClick={() => handleRemove(index)} className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-xs"><Trash2 className="w-4 h-4 inline-block mr-1"/> Hapus Dokumen Ini</button></div>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => append({ title: '', category: '', description: '', file_url: '' })} className="flex items-center space-x-2 text-sm text-blue-600 font-medium mt-4"><Plus className="w-4 h-4" /><span>Tambah Dokumen</span></button>
        <div className="flex justify-end pt-4"><motion.button type="submit" disabled={isSubmitting} whileHover={{scale: 1.05}} className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50"><Save className="w-4 h-4" /><span>{isSubmitting ? 'Menyimpan...' : 'Simpan Semua Perubahan'}</span></motion.button></div>
      </form>
    </div>
  );
};