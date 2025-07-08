import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '../components/ScrollReveal';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { messagesService, schoolProfileService } from '../lib/database';

type ContactFormData = { name: string; email: string; phone?: string; subject: string; message: string; };
interface ContactInfo {
  school_name?: string; address?: string; phone?: string; email?: string;
  facebook_url?: string; instagram_url?: string; youtube_url?: string;
}

export const Contact: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormData>();
  const [contactInfo, setContactInfo] = useState<ContactInfo>({});

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const data = await schoolProfileService.getBySection('contact_info');
        if (data && data.content) setContactInfo(data.content);
      } catch (error) { console.log("Gagal memuat info kontak."); }
    };
    fetchContactInfo();
  }, []);

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    try {
      await messagesService.create(data);
      toast.success('Pesan Anda berhasil terkirim! Terima kasih.');
      reset();
    } catch (error: any) {
      toast.error(`Gagal mengirim pesan: ${error.message}`);
    }
  };

  return (
    <div className="pt-16">
      {/* ... JSX Header ... */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ScrollReveal direction="left">
                {/* ... JSX Informasi Kontak ... */}
                <div>
                  {/* Contoh informasi kontak, ganti dengan konten sebenarnya */}
                  <h2 className="text-3xl font-bold mb-8">Informasi Kontak</h2>
                  <ul className="space-y-4">
                    {contactInfo.address && (
                      <li className="flex items-center gap-3">
                        <MapPin className="text-emerald-600" /> {contactInfo.address}
                      </li>
                    )}
                    {contactInfo.phone && (
                      <li className="flex items-center gap-3">
                        <Phone className="text-emerald-600" /> {contactInfo.phone}
                      </li>
                    )}
                    {contactInfo.email && (
                      <li className="flex items-center gap-3">
                        <Mail className="text-emerald-600" /> {contactInfo.email}
                      </li>
                    )}
                    <li className="flex items-center gap-3">
                      <Clock className="text-emerald-600" /> Senin - Sabtu, 07.00 - 15.00
                    </li>
                  </ul>
                  <div className="flex gap-4 mt-6">
                    {contactInfo.facebook_url && (
                      <a href={contactInfo.facebook_url} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <Facebook className="w-6 h-6 text-blue-600" />
                      </a>
                    )}
                    {contactInfo.instagram_url && (
                      <a href={contactInfo.instagram_url} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <Instagram className="w-6 h-6 text-pink-500" />
                      </a>
                    )}
                    {contactInfo.youtube_url && (
                      <a href={contactInfo.youtube_url} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                        <Youtube className="w-6 h-6 text-red-600" />
                      </a>
                    )}
                  </div>
                </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.2}>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-3xl p-8">
                <h2 className="text-3xl font-bold mb-8">Kirim Pesan</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div><label>Nama Lengkap</label><input {...register('name', { required: 'Nama wajib diisi' })} className="w-full mt-1 p-3 border rounded-xl" />{errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}</div>
                  <div><label>Email</label><input type="email" {...register('email', { required: 'Email wajib diisi', pattern: { value: /^\S+@\S+$/i, message: 'Format email tidak valid' } })} className="w-full mt-1 p-3 border rounded-xl" />{errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}</div>
                  <div><label>No. Telepon (Opsional)</label><input type="tel" {...register('phone')} className="w-full mt-1 p-3 border rounded-xl" /></div>
                  <div><label>Subjek</label><input {...register('subject', { required: 'Subjek wajib diisi' })} className="w-full mt-1 p-3 border rounded-xl" />{errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}</div>
                  <div><label>Pesan</label><textarea rows={5} {...register('message', { required: 'Pesan wajib diisi' })} className="w-full mt-1 p-3 border rounded-xl resize-none"></textarea>{errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}</div>
                  <motion.button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-4 rounded-xl disabled:opacity-50">{isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}</motion.button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal><div className="text-center mb-12"><h2 className="text-3xl font-bold">Lokasi Sekolah</h2><p className="text-xl text-gray-600">Temukan kami di Satui, Tanah Bumbu</p></div></ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-4 shadow-xl overflow-hidden">
              {/* DI SINI ANDA BISA MENAMBAHKAN PETA DARI GOOGLE MAPS */}
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.0958241536455!2d115.39426207447953!3d-3.7893141961845163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2de63b03e05a19a3%3A0x93c4a513d32f2abf!2sSMK%20Muhammadiyah%20Satui!5e0!3m2!1sid!2sid!4v1751341169111!5m2!1sid!2sid" width="100%" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};