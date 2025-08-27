"use client"

import { useRef, useState, useEffect } from "react"

export default function BeltDesigner2D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Estados
  const [strapColor, setStrapColor] = useState("#1a1a1a")
  const [plateColor, setPlateColor] = useState("#d4af37")
  const [text, setText] = useState("CWC Champion")
  const [fontSize, setFontSize] = useState(28)
  const [plateShape, setPlateShape] = useState("oval")
  const [sideShape, setSideShape] = useState("circle")
  const [logo, setLogo] = useState<HTMLImageElement | null>(null)

  // 🔒 Estado para desbloquear solo el diseñador
  const [unlocked, setUnlocked] = useState(false)

  // Textura cuero más realista
  const drawLeatherTexture = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.save()
    ctx.fillStyle = strapColor
    ctx.fillRect(0, 0, width, height)

    ctx.globalAlpha = 0.08
    ctx.fillStyle = "#000"
    for (let i = 0; i < 400; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      ctx.beginPath()
      ctx.arc(x, y, Math.random() * 2, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.globalAlpha = 0.05
    ctx.strokeStyle = "#fff"
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + Math.random() * 10, y + Math.random() * 4)
      ctx.stroke()
    }
    ctx.globalAlpha = 1
    ctx.restore()
  }

  const drawPlateShape = (
    ctx: CanvasRenderingContext2D,
    shape: string,
    x: number,
    y: number,
    w: number,
    h: number,
    withText = false
  ) => {
    ctx.shadowColor = "rgba(0,0,0,0.5)"
    ctx.shadowBlur = 10
    ctx.shadowOffsetX = 4
    ctx.shadowOffsetY = 4

    const gradient = ctx.createLinearGradient(x - w, y - h, x + w, y + h)
    gradient.addColorStop(0, "#fff8dc")
    gradient.addColorStop(0.3, plateColor)
    gradient.addColorStop(0.6, "#b8860b")
    gradient.addColorStop(1, "#fff8dc")

    ctx.fillStyle = gradient
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 3

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
    ctx.shadowColor = "transparent"

    if (withText) {
      ctx.fillStyle = "#111"
      ctx.font = `bold ${fontSize}px serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(text, x, y)
    }
  }

  useEffect(() => {
    if (!unlocked) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "#ddd"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    drawLeatherTexture(ctx, canvas.width, canvas.height)
    ctx.fillStyle = strapColor
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 6
    ctx.beginPath()
    ctx.moveTo(40, 130)
    ctx.lineTo(760, 130)
    ctx.quadraticCurveTo(780, 150, 760, 170)
    ctx.lineTo(40, 170)
    ctx.quadraticCurveTo(20, 150, 40, 130)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    drawPlateShape(ctx, sideShape, 180, 150, 50, 40)
    drawPlateShape(ctx, sideShape, 620, 150, 50, 40)
    drawPlateShape(ctx, plateShape, 400, 150, 120, 80, true)

    if (logo) {
      ctx.drawImage(logo, 360, 110, 80, 80)
    }
  }, [strapColor, plateColor, text, fontSize, plateShape, sideShape, logo, unlocked])

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

      {/* 🔒 Overlay SOLO sobre este componente */}
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

      {/* Título */}
      <h2 className="text-2xl font-bold mb-6 text-center text-black">
        Diseñador de Cinturón (2D Mejorado)
      </h2>

      {/* Controles */}
      <div className="flex flex-wrap gap-6 justify-center mb-6 text-black">
        <label className="flex flex-col text-sm">
          Color de la correa
          <input
            type="color"
            value={strapColor}
            onChange={(e) => setStrapColor(e.target.value)}
            className="w-16 h-10 border rounded"
          />
        </label>

        <label className="flex flex-col text-sm">
          Color de la placa
          <input
            type="color"
            value={plateColor}
            onChange={(e) => setPlateColor(e.target.value)}
            className="w-16 h-10 border rounded"
          />
        </label>

        <label className="flex flex-col text-sm">
          Texto
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border p-1 rounded"
          />
        </label>

        <label className="flex flex-col text-sm">
          Tamaño de letra
          <input
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="border p-1 rounded w-20"
          />
        </label>

        <label className="flex flex-col text-sm">
          Forma placa central
          <select
            value={plateShape}
            onChange={(e) => setPlateShape(e.target.value)}
            className="border p-1 rounded"
          >
            <option value="oval">Oval</option>
            <option value="circle">Círculo</option>
            <option value="shield">Escudo</option>
            <option value="diamond">Diamante</option>
          </select>
        </label>

        <label className="flex flex-col text-sm">
          Forma placas laterales
          <select
            value={sideShape}
            onChange={(e) => setSideShape(e.target.value)}
            className="border p-1 rounded"
          >
            <option value="circle">Círculo</option>
            <option value="oval">Oval</option>
            <option value="shield">Escudo</option>
            <option value="diamond">Diamante</option>
          </select>
        </label>

        <label className="flex flex-col text-sm">
          Subir Logo
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
          />
        </label>
      </div>

      {/* Canvas */}
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={800}
          height={300}
          className="border rounded-lg shadow-inner bg-gray-400"
        />
      </div>

      {/* Exportar */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={exportPNG}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700"
        >
          Exportar PNG
        </button>
      </div>
    </div>
  )
}
