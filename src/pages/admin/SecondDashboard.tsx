import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, FileUp, Download } from 'lucide-react';
import { VisiMisiContent } from './VisiMisiContent';
import { PpdbContent } from './PpdbContent';
import { DocumentCenter } from './DocumentCenter';

export const SecondDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('visi-misi');

  const sidebarItems = [
    { id: 'visi-misi', label: 'Visi & Misi', icon: FileText },
    { id: 'ppdb', label: 'Panduan PPDB', icon: FileUp },
    { id: 'documents', label: 'Pusat Dokumen', icon: Download },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'visi-misi':
        return <VisiMisiContent />;
      case 'ppdb':
        return <PpdbContent />;
      case 'documents':
        return <DocumentCenter />;
      default:
        return <VisiMisiContent />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-xl">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Manajemen Konten</h2>
          </div>
          <nav className="flex-1 p-2 space-y-1">
            {sidebarItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ x: 2 }}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  activeTab === item.id 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </motion.button>
            ))}
          </nav>
          <div className="p-2 border-t">
            <Link to="/admin/dashboard" className="w-full flex items-center space-x-3 px-3 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              <ArrowLeft className="w-5 h-5" />
              <span>Kembali ke Dasbor Utama</span>
            </Link>
          </div>
        </div>
      </div>
      <main className="flex-1 overflow-y-auto p-6 ml-64">
        {renderContent()}
      </main>
    </div>
  );
};