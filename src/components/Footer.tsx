import React from 'react'
import { GraduationCap, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* School Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold">SMKS Muhammadiyah Satui</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Sekolah Menengah Kejuruan Swasta yang berkomitmen menghasilkan lulusan berkualitas 
              dengan keterampilan teknis tinggi dan karakter Islami yang mulia.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-pink-600 hover:bg-pink-700 rounded-full transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-red-600 hover:bg-red-700 rounded-full transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              {['Beranda', 'Profil Sekolah', 'Program Keahlian', 'Fasilitas', 'Galeri', 'Kontak'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300">
                  Jl. Pendidikan No. 123<br />
                  Satui, Tanah Bumbu 72211
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <p className="text-gray-300">(0518) 1234-5678</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <p className="text-gray-300">info@smksmuhsatui.sch.id</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            © 2025 SMKS Muhammadiyah Satui. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}