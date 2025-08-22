"use client"   // 👈 asegúrate que esté arriba de todo

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa"
import { FaUserCircle } from "react-icons/fa"
import Image from "next/image"

export default function Home() {
  return (
    <div className="space-y-20">
      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 px-6 bg-[url('https://www.wwe.com/sites/default/files/2021/hero.jpg')] bg-cover bg-center rounded-2xl shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black/70 rounded-2xl" />

        {/* 👇 IMAGEN DEL RING (atrás del texto) */}
      <motion.div
  className="absolute inset-0 flex items-center justify-center z-0"
  initial={{ opacity: 0 }}
  animate={{ opacity: 0.25 }}
  transition={{ duration: 1.2 }}
>
  <Image
    src="/img1.png"
    alt="Ring CWC"
    fill
    className="object-cover pointer-events-none"  // 👈 este es el truco
    priority
  />
</motion.div>


        {/* ANIMACIÓN DE LUCHADORES */}
        <motion.img
          src="https://media.tenor.com/fLh7sPHv0F0AAAAi/wrestling-wwe.gif"
          alt="Luchadores animados"
          className="absolute bottom-4 left-6 w-32 md:w-40 rounded-lg shadow-lg"
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
        />

        <motion.img
          src="https://media.tenor.com/4V4qLJ3CXqUAAAAi/undertaker-wwe.gif"
          alt="Luchador animado"
          className="absolute bottom-4 right-6 w-32 md:w-40 rounded-lg shadow-lg"
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        />

        {/* TEXTO PRINCIPAL */}
        <div className="relative z-10 max-w-3xl">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg uppercase"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Chaos Wrestling Championship (CWC)
          </motion.h1>
          <motion.p
            className="mt-4 text-lg md:text-xl text-gray-200"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Una marca de lucha libre profesional hecha en Ecuador, con el objetivo de revolucionar el
            espectáculo y dar oportunidades a nuevos talentos.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: "0px 0px 12px rgba(255,0,0,0.6)" }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg"
            >
              Conoce nuestra historia
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* HISTORIA */}
      <section className="max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-4xl font-bold">Nuestra Historia</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Desde sus inicios, <span className="font-bold text-red-600">CWC</span> nació en Ecuador
          como un proyecto independiente con la misión de impulsar la lucha libre en Latinoamérica.
          Buscamos ofrecer shows espectaculares y formar una nueva generación de luchadores que
          lleven el nombre de nuestro país al mundo entero.
        </p>
      </section>

   {/* ROSTER con humo/niebla */}
<section className="relative bg-[#0b0b0b] py-16 px-6 text-white rounded-2xl shadow-2xl max-w-6xl mx-auto overflow-hidden">
  {/* Capas de niebla */}
  <motion.div
    aria-hidden
    className="pointer-events-none absolute -left-1/3 top-0 w-[120%] h-[140%] blur-3xl opacity-30"
    style={{
      background:
        "radial-gradient(45% 35% at 30% 40%, rgba(255,0,0,0.35) 0%, rgba(255,0,0,0.05) 60%, transparent 70%), radial-gradient(40% 30% at 70% 60%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.04) 55%, transparent 70%)",
    }}
    initial={{ x: -80, y: -20, opacity: 0.25 }}
    animate={{ x: [ -80, 40, -60, 0, -80 ], y: [ -20, 10, -15, 0, -20 ], opacity: [0.2, 0.35, 0.25, 0.3, 0.2] }}
    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
  />
  <motion.div
    aria-hidden
    className="pointer-events-none absolute -right-1/3 -bottom-1/3 w-[120%] h-[140%] blur-3xl opacity-25"
    style={{
      background:
        "radial-gradient(55% 45% at 70% 70%, rgba(255,0,0,0.3) 0%, rgba(255,0,0,0.06) 60%, transparent 72%), radial-gradient(35% 28% at 35% 35%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 55%, transparent 70%)",
    }}
    initial={{ x: 60, y: 40, opacity: 0.2 }}
    animate={{ x: [ 60, -30, 50, 0, 60 ], y: [ 40, -10, 30, 0, 40 ], opacity: [0.18, 0.3, 0.22, 0.26, 0.18] }}
    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
  />

  {/* Overlay de grano suave */}
  <div
    aria-hidden
    className="absolute inset-0 opacity-[0.08] mix-blend-soft-light pointer-events-none"
    style={{
      backgroundImage:
        "repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 2px)",
    }}
  />

  <h2 className="relative text-4xl md:text-5xl font-extrabold text-center mb-12 uppercase tracking-wider">
    Roster <span className="text-red-600">CWC</span>
    <div className="mt-3 text-sm text-gray-400 font-medium">Próximamente – revelación oficial</div>
  </h2>

  <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8">
    {[1, 2, 3, 4].map((i) => (
      <motion.div
        key={i}
        className="group relative flex flex-col items-center justify-end rounded-2xl overflow-hidden bg-gradient-to-b from-white/5 to-black/40 border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)] aspect-[3/4]"
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay: i * 0.15 }}
      >
        {/* Silueta humanizada (SVG) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            viewBox="0 0 300 420"
            className="w-[72%] h-auto text-black/90 drop-shadow-[0_10px_30px_rgba(255,0,0,0.25)]"
          >
            {/* Sombra base para look misterioso */}
            <ellipse cx="150" cy="390" rx="80" ry="18" fill="rgba(0,0,0,0.45)" />
            {/* Silueta (cabeza + torso + brazos cruzados + trapecios) */}
            <path
              d="
                M150 55
                c 28 0 50 22 50 50
                c 0 28 -22 50 -50 50
                c -28 0 -50 -22 -50 -50
                c 0 -28 22 -50 50 -50
                Z
              "
              fill="currentColor"
            />
            <path
              d="
                M95 180
                c 30 -35 130 -35 160 0
                c 10 12 15 26 15 42
                c 0 40 -35 70 -120 70
                c -85 0 -120 -30 -120 -70
                c 0 -16 5 -30 15 -42
                Z
              "
              fill="currentColor"
            />
            {/* Brazos cruzados */}
            <path
              d="
                M70 245
                c 20 -25 60 -35 80 -35
                c 20 0 60 10 80 35
                c 6 8 4 20 -10 24
                c -56 16 -128 16 -140 0
                c -10 -12 -10 -18 -10 -24
                Z
              "
              fill="currentColor"
            />
            {/* Detalle cinturón/torso para “wrestler vibe” */}
            <rect x="85" y="280" width="130" height="10" rx="5" fill="rgba(255,255,255,0.08)" />
          </svg>
        </div>

        {/* Glow al pasar mouse */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute -inset-8 blur-2xl rounded-full bg-red-600/20" />
        </div>

        {/* Etiqueta */}
        <div className="relative z-10 w-full text-center p-4 backdrop-blur-sm bg-black/40 border-t border-white/10">
          <p className="text-sm tracking-widest text-gray-300">INCOGNITO</p>
          <p className="text-xs text-gray-400">Revealed soon</p>
        </div>
      </motion.div>
    ))}
  </div>
</section>


      {/* FORMULARIO */}
      <section className="bg-gray-50 p-10 rounded-2xl shadow-xl max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">
          ¿Quieres ser parte de <span className="text-red-600">CWC</span>?
        </h2>

        {/* 👇 Aquí pegas el iframe de Google Forms 👇 */}
        <div className="relative w-full h-[800px]">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScDJx0ShEJiVzRSAkiqHNO5_yy5GqjowJ4a63BiYIkNU-TB5Q/viewform?embedded=true"
            width="100%"
            height="100%"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
          >
            Cargando…
          </iframe>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative bg-black text-white py-12 mt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-700/20 via-black to-red-700/20 animate-pulse" />

        {/* Cuerdas de ring */}
        <div className="flex flex-col items-center space-y-2 relative z-10 mb-8">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-11/12 h-1 bg-red-600 rounded-full"
              animate={{ x: [0, -5, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.3 }}
            />
          ))}
        </div>

        {/* Logo / Nombre */}
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-red-600 text-center drop-shadow-lg uppercase tracking-wider relative z-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Chaos Wrestling Championship - Ecuador
        </motion.h2>

        {/* Redes Sociales */}
        <div className="flex justify-center space-x-8 mt-6 relative z-10">
          <a href="#" className="hover:text-red-500 transition-colors text-2xl">
            <FaFacebook />
          </a>
          <a href="#" className="hover:text-red-500 transition-colors text-2xl">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-red-500 transition-colors text-2xl">
            <FaYoutube />
          </a>
        </div>

        <p className="mt-6 text-center text-gray-400 relative z-10">
          © {new Date().getFullYear()} CWC - Chaos Wrestling Championship, Ecuador. Todos los
          derechos reservados
        </p>
      </footer>
    </div>
  )
}
