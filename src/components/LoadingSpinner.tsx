import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mb-4"
        >
          <GraduationCap className="w-16 h-16 text-white mx-auto" />
        </motion.div>
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white text-xl font-semibold"
        >
          Memuat...
        </motion.div>
      </div>
    </div>
  )
}