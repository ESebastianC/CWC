"use client"

import { motion } from "framer-motion"

export default function Eventos() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh] bg-gray-900 text-center overflow-hidden">
      {/* EFECTO DE LUCES */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/3 w-1/3 h-full bg-gradient-to-b from-blue-500/40 to-transparent blur-3xl"
          animate={{ opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-0 right-1/3 w-1/3 h-full bg-gradient-to-b from-purple-500/30 to-transparent blur-3xl"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {/* TITULO */}
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg uppercase"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        🎉 Eventos
      </motion.h1>

      {/* TEXTO */}
      <motion.p
        className="mt-4 text-lg text-gray-300"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        🚧 Próximamente… ¡prepárate para grandes momentos! ✨
      </motion.p>

      {/* EFECTO HUMO / ENTRADA */}
      <motion.div
        className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-gray-800/80 to-transparent blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 0.6, 0.3, 0.7] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* EFECTO PIROTECNIA / FUEGOS ARTIFICIALES */}
      <motion.div
        className="absolute top-10 left-10 text-blue-400 text-4xl"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
      >
        🎆
      </motion.div>
      <motion.div
        className="absolute top-10 right-10 text-purple-400 text-4xl"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 6 }}
      >
        ✨
      </motion.div>
    </div>
  )
}
