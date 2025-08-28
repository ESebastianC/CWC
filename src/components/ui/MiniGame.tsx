"use client"

import { useRef, useState, useEffect } from "react"

export default function BeltDesigner2D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Estados
  const [plateColor, setPlateColor] = useState("#d4af37")
  const [text, setText] = useState("CWC Champion")
  const [fontSize, setFontSize] = useState(28)
  const [plateShape, setPlateShape] = useState("oval")
  const [sideShape, setSideShape] = useState("circle")
  const [logo, setLogo] = useState<HTMLImageElement | null>(null)
  const [logoSize, setLogoSize] = useState(80)

  const [unlocked, setUnlocked] = useState(false)

  // 🔲 Fondo blanco
  const drawBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, width, height)
  }

  // 🖤 Correa como placa negra con textura
  const drawBeltShape = (ctx: CanvasRenderingContext2D) => {
    ctx.save()
    ctx.fillStyle = "#000000"
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 6
    ctx.beginPath()
    ctx.moveTo(100, 140)
    ctx.quadraticCurveTo(250, 120, 400, 130)
    ctx.quadraticCurveTo(550, 120, 700, 140)
    ctx.quadraticCurveTo(710, 150, 700, 160)
    ctx.quadraticCurveTo(550, 180, 400, 170)
    ctx.quadraticCurveTo(250, 180, 100, 160)
    ctx.quadraticCurveTo(90, 150, 100, 140)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Textura ligera
    ctx.globalAlpha = 0.1
    ctx.fillStyle = "#222"
    for (let i = 0; i < 300; i++) {
      const x = 100 + Math.random() * 600
      const y = 130 + Math.random() * 40
      ctx.beginPath()
      ctx.arc(x, y, Math.random() * 2, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalAlpha = 1
    ctx.restore()
  }

  // 🥇 Placas WWE con bisel dorado y sombra realista
  const drawPlateShape = (
    ctx: CanvasRenderingContext2D,
    shape: string,
    x: number,
    y: number,
    w: number,
    h: number,
    withText = false
  ) => {
    ctx.save()

    // Sombra más marcada
    ctx.shadowColor = "rgba(0,0,0,0.6)"
    ctx.shadowBlur = 12
    ctx.shadowOffsetX = 5
    ctx.shadowOffsetY = 5

    // Gradiente tipo dorado
    const gradient = ctx.createLinearGradient(x - w, y - h, x + w, y + h)
    gradient.addColorStop(0, "#fff8dc")
    gradient.addColorStop(0.25, plateColor)
    gradient.addColorStop(0.5, "#ffd700")
    gradient.addColorStop(0.75, "#b8860b")
    gradient.addColorStop(1, "#fff8dc")

    ctx.fillStyle = gradient
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 4

    ctx.beginPath()
    if (shape === "oval") {
      ctx.ellipse(x, y, w, h, 0, 0, Math.PI * 2)
    } else if (shape === "circle") {
      ctx.arc(x, y, Math.min(w, h), 0, Math.PI * 2)
    } else if (shape === "shield") {
      ctx.moveTo(x, y - h)
      ctx.lineTo(x + w, y - h / 3)
      ctx.lineTo(x + w / 2, y + h)
      ctx.lineTo(x - w / 2, y + h)
      ctx.lineTo(x - w, y - h / 3)
      ctx.closePath()
    } else if (shape === "diamond") {
      ctx.moveTo(x, y - h)
      ctx.lineTo(x + w, y)
      ctx.lineTo(x, y + h)
      ctx.lineTo(x - w, y)
      ctx.closePath()
    }
    ctx.fill()
    ctx.stroke()

    // ✨ Efecto de brillo interior
    ctx.lineWidth = 2
    ctx.strokeStyle = "rgba(255,255,255,0.5)"
    ctx.stroke()

    // Texto en placa central con relieve
    if (withText) {
      ctx.fillStyle = "#111"
      ctx.font = `bold ${fontSize}px serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      // Sombra 3D
      ctx.strokeStyle = "white"
      ctx.lineWidth = 5
      ctx.strokeText(text, x, y)

      ctx.strokeStyle = "black"
      ctx.lineWidth = 2
      ctx.strokeText(text, x, y)

      ctx.fillText(text, x, y)
    }

    ctx.restore()
  }

  useEffect(() => {
    if (!unlocked) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 1️⃣ Fondo blanco
    drawBackground(ctx, canvas.width, canvas.height)

    // 2️⃣ Correa negra como placa independiente
    drawBeltShape(ctx)

    // 3️⃣ Placas sobre la correa
    drawPlateShape(ctx, sideShape, 250, 150, 50, 40)
    drawPlateShape(ctx, sideShape, 550, 150, 50, 40)
    drawPlateShape(ctx, plateShape, 400, 150, 120, 80, true)

    // 4️⃣ Logo escalable
    if (logo) {
      ctx.drawImage(logo, 400 - logoSize / 2, 150 - logoSize / 2, logoSize, logoSize)
    }
  }, [plateColor, text, fontSize, plateShape, sideShape, logo, logoSize, unlocked])

  const exportPNG = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const url = canvas.toDataURL("image/png")
    const a = document.createElement("a")
    a.href = url
    a.download = "belt.png"
    a.click()
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const img = new Image()
    img.onload = () => setLogo(img)
    img.src = URL.createObjectURL(file)
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto p-6 bg-gray-100 rounded-2xl shadow-lg">
      {!unlocked && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center rounded-2xl z-10">
          <button
            onClick={() => setUnlocked(true)}
            className="px-8 py-4 bg-green-600 text-white text-xl font-bold rounded-lg shadow-lg hover:bg-green-700"
          >
            ¿Quieres diseñar el campeonato?
          </button>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6 text-center text-black">
        Diseñador Cinturón CWC
      </h2>

      {/* Controles */}
      <div className="flex flex-wrap gap-6 justify-center mb-6 text-black">
        <label className="flex flex-col text-sm">
          Color de la placa
          <input type="color" value={plateColor} onChange={(e) => setPlateColor(e.target.value)} />
        </label>
        <label className="flex flex-col text-sm">
          Texto
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        </label>
        <label className="flex flex-col text-sm">
          Tamaño de letra
          <input type="number" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} />
        </label>
        <label className="flex flex-col text-sm">
          Forma placa central
          <select value={plateShape} onChange={(e) => setPlateShape(e.target.value)}>
            <option value="oval">Oval</option>
            <option value="circle">Círculo</option>
            <option value="shield">Escudo</option>
            <option value="diamond">Diamante</option>
          </select>
        </label>
        <label className="flex flex-col text-sm">
          Forma placas laterales
          <select value={sideShape} onChange={(e) => setSideShape(e.target.value)}>
            <option value="circle">Círculo</option>
            <option value="oval">Oval</option>
            <option value="shield">Escudo</option>
            <option value="diamond">Diamante</option>
          </select>
        </label>
        <label className="flex flex-col text-sm">
          Subir Logo
          <input type="file" accept="image/*" onChange={handleLogoUpload} />
        </label>
        <label className="flex flex-col text-sm">
          Tamaño del Logo
          <input type="range" min="40" max="160" value={logoSize} onChange={(e) => setLogoSize(Number(e.target.value))} />
        </label>
      </div>

      <div className="flex justify-center">
        <canvas ref={canvasRef} width={800} height={300} className="border rounded-lg shadow-inner bg-gray-400" />
      </div>

      <div className="mt-6 flex justify-center">
        <button onClick={exportPNG} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700">
          Exportar PNG
        </button>
      </div>
    </div>
  )
}
