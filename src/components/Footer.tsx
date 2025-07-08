import React, { useState, useEffect } from 'react';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import { schoolProfileService } from '../lib/database';
import { Link } from 'react-router-dom';

interface ContactInfo {
  school_name?: string; address?: string; phone?: string; email?: string;
  facebook_url?: string; instagram_url?: string; youtube_url?: string;
}

export const Footer: React.FC = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({});

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const data = await schoolProfileService.getBySection('contact_info');
        if (data && data.content) {
          setContactInfo(data.content);
        }
      } catch (error) {
        console.log("Gagal memuat info kontak.");
      }
    };
    fetchContactInfo();
  }, []);

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <GraduationCap className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold">{contactInfo.school_name || 'SMKS Muhammadiyah Satui'}</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Sekolah Menengah Kejuruan Swasta yang berkomitmen menghasilkan lulusan berkualitas.
            </p>
            <div className="flex space-x-4">
              {contactInfo.facebook_url && <a href={contactInfo.facebook_url} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-700 hover:bg-primary rounded-full transition-colors"><Facebook className="w-5 h-5" /></a>}
              {contactInfo.instagram_url && <a href={contactInfo.instagram_url} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-700 hover:bg-pink-600 rounded-full transition-colors"><Instagram className="w-5 h-5" /></a>}
              {contactInfo.youtube_url && <a href={contactInfo.youtube_url} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-700 hover:bg-red-600 rounded-full transition-colors"><Youtube className="w-5 h-5" /></a>}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-primary transition-colors">Beranda</Link></li>
              <li><Link to="/profil" className="text-gray-300 hover:text-primary transition-colors">Profil</Link></li>
              <li><Link to="/program-keahlian" className="text-gray-300 hover:text-primary transition-colors">Program Keahlian</Link></li>
              <li><Link to="/galeri" className="text-gray-300 hover:text-primary transition-colors">Galeri</Link></li>
              <li><Link to="/kontak" className="text-gray-300 hover:text-primary transition-colors">Kontak</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3"><MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" /><p className="text-gray-300" dangerouslySetInnerHTML={{ __html: contactInfo.address?.replace(/\n/g, '<br />') || '' }}></p></div>
              <div className="flex items-center space-x-3"><Phone className="w-5 h-5 text-primary" /><p>{contactInfo.phone}</p></div>
              <div className="flex items-center space-x-3"><Mail className="w-5 h-5 text-primary" /><p>{contactInfo.email}</p></div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center"><p className="text-gray-400">© {new Date().getFullYear()} {contactInfo.school_name || 'SMKS Muhammadiyah Satui'}. All rights reserved.</p></div>
      </div>
    </footer>
  );
};