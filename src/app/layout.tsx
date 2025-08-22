import type { Metadata } from "next"
import "./globals.css"
import Link from "next/link"

export const metadata: Metadata = {
  title: "CWC - Chaos Wrestling Championship",
  description: "La nueva era de la lucha libre profesional.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-background text-foreground antialiased flex flex-col">
        {/* NAVBAR */}
        <header className="sticky top-0 z-50 border-b bg-black/90 backdrop-blur text-white">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="text-2xl font-extrabold tracking-tight text-red-600">
              CWC
            </Link>
            <div className="flex items-center gap-6 text-sm uppercase font-semibold">
              <Link href="/" className="hover:text-red-500">Inicio</Link>
              <Link href="/luchadores" className="hover:text-red-500">Luchadores</Link>
              <Link href="/eventos" className="hover:text-red-500">Eventos</Link>

            </div>
          </nav>
        </header>

        {/* MAIN */}
        <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-8">{children}</main>

        {/* FOOTER */}
        <footer className="border-t py-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} CWC. Todos los derechos reservados.
        </footer>
      </body>
    </html>
  )
}
