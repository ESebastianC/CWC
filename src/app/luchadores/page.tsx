"use client"

import { motion } from "framer-motion"

export default function Luchadores() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh] bg-black text-center overflow-hidden">
      {/* EFECTO DE LUCES */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 w-1/2 h-full bg-gradient-to-b from-red-600/40 to-transparent blur-3xl"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-0 right-1/4 w-1/2 h-full bg-gradient-to-b from-yellow-500/30 to-transparent blur-3xl"
          animate={{ opacity: [0.2, 0.7, 0.2] }}
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
        🥊 Luchadores
      </motion.h1>

      {/* TEXTO */}
      <motion.p
        className="mt-4 text-lg text-gray-300"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        🚧 Próximamente… la arena se está preparando para la gran batalla 🔥
      </motion.p>

      {/* EFECTO DE HUMO / ENTRADA */}
      <motion.div
        className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-gray-800/80 to-transparent blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 0.6, 0.3, 0.7] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* EFECTO PIROTECNIA */}
      <motion.div
        className="absolute top-10 left-10 text-red-500 text-4xl"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
      >
        💥
      </motion.div>
      <motion.div
        className="absolute top-10 right-10 text-yellow-400 text-4xl"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 6 }}
      >
        🔥
      </motion.div>
    </div>
  )
}
