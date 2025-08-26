"use client"
import { useEffect, useMemo, useRef, useState, Suspense } from "react"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Html } from "@react-three/drei"
import { Text } from '@react-three/drei';
/**
 * CWC Belt Designer 3D (Optimizado)
 * - Texto con relieve visible (bumpMap dinámico)
 * - Materiales PBR mejorados
 * - Interfaz pulida con estados hover/active
 * - Control de tamaño de correa añadido
 * - Interfaz más profesional
 */

export default function BeltDesigner3D() {
  const [strapColor, setStrapColor] = useState("#36312cff")
  const [plateColor, setPlateColor] = useState("#c9a227") // dorado
  const [sidePlateColor, setSidePlateColor] = useState("#b5b5b5") // plateado
  const [metalness, setMetalness] = useState(1)
  const [roughness, setRoughness] = useState(0.25)
  const [text, setText] = useState("CWC CHAMPION")
  const [textSize, setTextSize] = useState(48)
  const [textDepth, setTextDepth] = useState(0.75)
  const [stickerSet, setStickerSet] = useState<Array<Sticker>>([])
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [strapWidth, setStrapWidth] = useState(1.0) // Nuevo estado para el ancho de la correa

  const [sidePlateShape, setSidePlateShape] = useState<"circle" | "hex" | "shield">("circle")
  const [spin, setSpin] = useState(false)

  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(false)

  const canvasWrapRef = useRef<HTMLDivElement | null>(null)

  const onUploadLogo: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setLogoUrl(url)
  }

  const addSticker = (type: StickerType) => {
    setStickerSet((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type,
        position: { x: (Math.random() - 0.5) * 1.2, y: Math.random() * 0.5, z: 0.11 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: 0.2 + Math.random() * 0.25,
        color: "#ffffff",
      },
    ])
  }

  const removeSticker = (id: string) => setStickerSet((prev) => prev.filter((s) => s.id !== id))

  const savePreset = () => {
    const preset = {
      strapColor,
      plateColor,
      sidePlateColor,
      metalness,
      roughness,
      text,
      textSize,
      textDepth,
      strapWidth,
      sidePlateShape,
      stickerSet,
      logoUrl,
    }
    const blob = new Blob([JSON.stringify(preset, null, 2)], { type: "application/json" })
    const a = document.createElement("a")
    a.href = URL.createObjectURL(blob)
    a.download = "cwc-belt-preset.json"
    a.click()
  }

  const loadPreset: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      setLoading(true)
      const txt = await file.text()
      const p = JSON.parse(txt)
      setStrapColor(p.strapColor ?? strapColor)
      setPlateColor(p.plateColor ?? plateColor)
      setSidePlateColor(p.sidePlateColor ?? sidePlateColor)
      setMetalness(p.metalness ?? metalness)
      setRoughness(p.roughness ?? roughness)
      setText(p.text ?? text)
      setTextSize(p.textSize ?? textSize)
      setTextDepth(p.textDepth ?? textDepth)
      setStrapWidth(p.strapWidth ?? strapWidth)
      setSidePlateShape(p.sidePlateShape ?? sidePlateShape)
      setStickerSet(p.stickerSet ?? [])
      setLogoUrl(p.logoUrl ?? null)
    } catch (err) {
      alert("No se pudo cargar el preset :(")
    } finally {
      setLoading(false)
    }
  }

  const exportPNG = async () => {
    const el = canvasWrapRef.current?.querySelector("canvas") as HTMLCanvasElement | null
    if (!el) return
    setSaving(true)
    try {
      // Crear un canvas temporal con fondo blanco para la exportación
      const tempCanvas = document.createElement('canvas')
      tempCanvas.width = el.width
      tempCanvas.height = el.height
      const tempCtx = tempCanvas.getContext('2d')
      
      if (tempCtx) {
        // Rellenar con fondo blanco
        tempCtx.fillStyle = 'white'
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height)
        
        // Dibujar el contenido del canvas 3D
        tempCtx.drawImage(el, 0, 0)
        
        // Crear el enlace de descarga
        const url = tempCanvas.toDataURL("image/png", 1.0)
        const a = document.createElement("a")
        a.href = url
        a.download = "cwc-belt.png"
        a.click()
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 p-4 md:p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Panel lateral */}
        <div className="md:col-span-2 space-y-6 p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200">
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800">🏆 CWC Belt Designer</h1>
            <p className="text-gray-600 mt-1">Diseña tu cinturón de campeonato personalizado</p>
          </div>
          
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="ui-input">
                <span className="font-medium text-gray-700">Color correa</span>
                <div className="flex items-center mt-1">
                  <input type="color" value={strapColor} onChange={(e) => setStrapColor(e.target.value)} 
                    className="w-8 h-8 border-0 rounded cursor-pointer" />
                  <span className="ml-2 text-sm text-gray-600">{strapColor}</span>
                </div>
              </div>
              <div className="ui-input">
                <span className="font-medium text-gray-700">Ancho correa</span>
                <input type="range" min="0.8" max="1.4" step="0.05" value={strapWidth} 
                  onChange={(e) => setStrapWidth(parseFloat(e.target.value))} 
                  className="mt-1 w-full" />
                <span className="text-xs text-gray-500 block text-right mt-1">{strapWidth.toFixed(2)}</span>
              </div>
              <div className="ui-input">
                <span className="font-medium text-gray-700">Placa central</span>
                <div className="flex items-center mt-1">
                  <input type="color" value={plateColor} onChange={(e) => setPlateColor(e.target.value)} 
                    className="w-8 h-8 border-0 rounded cursor-pointer" />
                  <span className="ml-2 text-sm text-gray-600">{plateColor}</span>
                </div>
              </div>
              <div className="ui-input">
                <span className="font-medium text-gray-700">Placas laterales</span>
                <div className="flex items-center mt-1">
                  <input type="color" value={sidePlateColor} onChange={(e) => setSidePlateColor(e.target.value)} 
                    className="w-8 h-8 border-0 rounded cursor-pointer" />
                  <span className="ml-2 text-sm text-gray-600">{sidePlateColor}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="ui-input">
                <span className="font-medium text-gray-700">Metalicidad</span>
                <input type="range" min={0} max={1} step={0.01} value={metalness} 
                  onChange={(e) => setMetalness(parseFloat(e.target.value))} 
                  className="w-full mt-1" />
                <span className="text-xs text-gray-500 block text-right mt-1">{metalness.toFixed(2)}</span>
              </div>
              <div className="ui-input">
                <span className="font-medium text-gray-700">Rugosidad</span>
                <input type="range" min={0} max={1} step={0.01} value={roughness} 
                  onChange={(e) => setRoughness(parseFloat(e.target.value))} 
                  className="w-full mt-1" />
                <span className="text-xs text-gray-500 block text-right mt-1">{roughness.toFixed(2)}</span>
              </div>
            </div>

            <div className="ui-input">
              <span className="font-medium text-gray-700">Texto personalizado</span>
              <input className="border rounded px-3 py-2 w-full mt-1 text-sm" 
                value={text} onChange={(e) => setText(e.target.value)} 
                placeholder="CWC CHAMPION" />
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div>
                  <span className="text-xs text-gray-600">Tamaño texto</span>
                  <input type="range" min={24} max={96} value={textSize} 
                    onChange={(e) => setTextSize(parseInt(e.target.value))} 
                    className="w-full" />
                  <span className="text-xs text-gray-500 block text-right">{textSize}px</span>
                </div>
                <div>
                  <span className="text-xs text-gray-600">Relieve texto</span>
                  <input type="range" min={0} max={2} step={0.05} value={textDepth} 
                    onChange={(e) => setTextDepth(parseFloat(e.target.value))} 
                    className="w-full" />
                  <span className="text-xs text-gray-500 block text-right">{textDepth.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="ui-input">
                <span className="font-medium text-gray-700">Forma placa lateral</span>
                <div className="flex gap-2 mt-2">
                  {(["circle", "hex", "shield"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSidePlateShape(s)}
                      className={`px-3 py-1.5 rounded-lg border transition-all text-sm capitalize ${
                        sidePlateShape === s 
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm" 
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {s === 'circle' ? 'Circular' : s === 'hex' ? 'Hexagonal' : 'Escudo'}
                    </button>
                  ))}
                </div>
              </div>
              <div className="ui-input">
                <span className="font-medium text-gray-700">Logo personalizado</span>
                <label className="flex items-center justify-center mt-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors text-sm">
                  <span className="text-gray-700">Seleccionar imagen</span>
                  <input type="file" accept="image/*" onChange={onUploadLogo} className="hidden" />
                </label>
                {logoUrl && (
                  <button onClick={() => setLogoUrl(null)} className="text-red-500 text-xs mt-2 hover:underline">
                    Eliminar logo
                  </button>
                )}
              </div>
            </div>

            <div className="ui-input">
              <span className="font-medium text-gray-700">Stickers 3D</span>
              <div className="flex flex-wrap gap-2 mt-2">
                <button className="btn-sticker bg-amber-100 hover:bg-amber-200 text-amber-800" onClick={() => addSticker("star")}>⭐ Estrella</button>
                <button className="btn-sticker bg-yellow-100 hover:bg-yellow-200 text-yellow-800" onClick={() => addSticker("lightning")}>⚡ Rayo</button>
                <button className="btn-sticker bg-purple-100 hover:bg-purple-200 text-purple-800" onClick={() => addSticker("crown")}>👑 Corona</button>
              </div>
              {stickerSet.length > 0 && (
                <div className="mt-3 max-h-32 overflow-auto pr-2 space-y-1">
                  {stickerSet.map((s) => (
                    <div key={s.id} className="flex items-center justify-between text-xs bg-white rounded-lg p-2 border">
                      <span className="capitalize">{s.type}</span>
                      <button onClick={() => removeSticker(s.id)} className="text-red-600 hover:text-red-800 transition-colors">
                        Eliminar
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button onClick={exportPNG} disabled={saving}
                className="btn-primary bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:opacity-70">
                {saving ? "Exportando..." : "Exportar PNG"}
              </button>
              <button onClick={savePreset} 
                className="btn-primary bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black">
                Guardar preset
              </button>
              <label className="btn-primary bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300 hover:from-gray-200 hover:to-gray-300 cursor-pointer">
                {loading ? "Cargando..." : "Cargar preset"}
                <input type="file" accept="application/json" onChange={loadPreset} className="hidden" />
              </label>
              <button onClick={() => setSpin((s) => !s)} 
                className={`btn-primary ${spin 
                  ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800" 
                  : "bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800"}`}>
                {spin ? "Detener giro" : "Girar automático"}
              </button>
            </div>
          </div>
        </div>

        {/* Lienzo 3D */}
        <div ref={canvasWrapRef} className="md:col-span-3 h-[600px] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-100 to-slate-200 shadow-xl border border-gray-300 relative">
          <Canvas camera={{ position: [0, 1.2, 4.2], fov: 50 }} shadows>
            <color attach="background" args={['#f8fafc']} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[4, 6, 5]} intensity={1.4} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
            <Suspense fallback={<Html center><div className="px-4 py-2 rounded-xl bg-white shadow-md text-gray-700">Cargando materiales...</div></Html>}>
              <Scene
                strapColor={strapColor}
                plateColor={plateColor}
                sidePlateColor={sidePlateColor}
                metalness={metalness}
                roughness={roughness}
                text={text}
                textSize={textSize}
                textDepth={textDepth}
                strapWidth={strapWidth}
                sidePlateShape={sidePlateShape}
                logoUrl={logoUrl}
                stickers={stickerSet}
                spin={spin}
              />
              <Environment preset="studio" />
            </Suspense>
            <OrbitControls enableDamping dampingFactor={0.08} maxPolarAngle={Math.PI * 0.6} minDistance={2.5} maxDistance={7} />
          </Canvas>
          <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
            Usa click y arrastra para rotar • Rueda del mouse para zoom
          </div>
        </div>
      </div>
    </div>
  )
}

/******************** estilos UI ********************/
const ui = `
.ui-input { 
  @apply flex flex-col p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm shadow-sm; 
}
.btn-primary { 
  @apply px-4 py-2.5 rounded-xl text-sm font-medium shadow-sm transition-all duration-200 hover:shadow-md active:scale-95 flex items-center justify-center; 
}
.btn-sticker { 
  @apply px-3 py-1.5 rounded-lg text-xs transition-all duration-200 hover:shadow active:scale-95; 
}
`
if (typeof document !== "undefined" && !document.getElementById("belt-ui-styles")) {
  const style = document.createElement("style")
  style.id = "belt-ui-styles"
  style.innerHTML = ui
  document.head.appendChild(style)
}

/******************** tipos ********************/
type StickerType = "star" | "lightning" | "crown"

type Sticker = {
  id: string
  type: StickerType
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
  scale: number
  color: string
}

/******************** escena ********************/
function Scene(props: {
  strapColor: string
  plateColor: string
  sidePlateColor: string
  metalness: number
  roughness: number
  text: string
  textSize: number
  textDepth: number
  strapWidth: number
  sidePlateShape: "circle" | "hex" | "shield"
  logoUrl: string | null
  stickers: Sticker[]
  spin: boolean
}) {
  const group = useRef<THREE.Group>(null)
  useFrame((_state, delta) => {
    if (props.spin && group.current) group.current.rotation.y += delta * 0.4
  })

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* piso */}
      <mesh rotation-x={-Math.PI / 2} position-y={-0.75} receiveShadow>
        <circleGeometry args={[12, 64]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.9} metalness={0} />
      </mesh>

      <BeltStrap color={props.strapColor} width={props.strapWidth} />

      {/* placas laterales */}
      <SidePlate x={-1.55} color={props.sidePlateColor} shape={props.sidePlateShape} metalness={props.metalness} roughness={props.roughness} />
      <SidePlate x={1.55} color={props.sidePlateColor} shape={props.sidePlateShape} metalness={props.metalness} roughness={props.roughness} />

      {/* placa central */}
      <CenterPlate
        color={props.plateColor}
        metalness={props.metalness}
        roughness={props.roughness}
        text={props.text}
        textSize={props.textSize}
        textDepth={props.textDepth}
        logoUrl={props.logoUrl}
      />

      {/* stickers */}
      {props.stickers.map((s) => (
        <Sticker3D key={s.id} {...s} />
      ))}
    </group>
  )
}

/******************** correa ********************/
function BeltStrap({ color, width = 1.0 }: { color: string; width?: number }) {
  const segments = 9
  const meshes = []
  for (let i = 0; i < segments; i++) {
    const t = (i / (segments - 1)) * Math.PI * 0.12 - Math.PI * 0.06
    const x = (i - (segments - 1) / 2) * 0.45
    const y = Math.sin(t) * 0.12
    meshes.push(
      <mesh key={i} position={[x, y, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.44 * width, 0.22, 0.06]} />
        <meshStandardMaterial color={color} roughness={0.8} metalness={0.1} />
      </mesh>
    )
  }
  return <group>{meshes}</group>
}

/******************** placa lateral ********************/
function SidePlate({ x, color, shape, metalness, roughness }: { x: number; color: string; shape: "circle" | "hex" | "shield"; metalness: number; roughness: number }) {
  const geom = useMemo(() => {
    switch (shape) {
      case "hex": {
        const shape = new THREE.Shape()
        const r = 0.5
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * Math.PI * 2
          const vx = Math.cos(a) * r
          const vy = Math.sin(a) * r
          if (i === 0) shape.moveTo(vx, vy)
          else shape.lineTo(vx, vy)
        }
        shape.closePath()
        return new THREE.ExtrudeGeometry(shape, { depth: 0.12, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.03, bevelThickness: 0.03 })
      }
      case "shield": {
        const s = new THREE.Shape()
        s.moveTo(-0.5, 0.2)
        s.quadraticCurveTo(0, 0.6, 0.5, 0.2)
        s.quadraticCurveTo(0.5, -0.2, 0, -0.55)
        s.quadraticCurveTo(-0.5, -0.2, -0.5, 0.2)
        return new THREE.ExtrudeGeometry(s, { depth: 0.12, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.03, bevelThickness: 0.03 })
      }
      default:
        return new THREE.CylinderGeometry(0.5, 0.5, 0.12, 48)
    }
  }, [shape])

  return (
    <mesh geometry={geom as any} position={[x, 0.02, 0]} rotation={[0, 0, 0]} castShadow receiveShadow>
      <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} envMapIntensity={1.2} />
    </mesh>
  )
}

/******************** placa central ********************/
function CenterPlate({ color, metalness, roughness, text, textSize, textDepth, logoUrl }) {
  const geom = useMemo(() => {
    const s = new THREE.Shape();
    const w = 1.6, h = 1.0;
    const steps = 64;
    for (let i = 0; i <= steps; i++) {
      const a = (i / steps) * Math.PI * 2;
      const vx = Math.cos(a) * (w / 2);
      const vy = Math.sin(a) * (h / 2);
      if (i === 0) s.moveTo(vx, vy);
      else s.lineTo(vx, vy);
    }
    s.closePath();
    return new THREE.ExtrudeGeometry(s, { 
      depth: 0.16, 
      bevelEnabled: true, 
      bevelSegments: 4, 
      steps: 1, 
      bevelSize: 0.05, 
      bevelThickness: 0.06 
    });
  }, []);

  const logoTexture = useLogoTexture(logoUrl);

  return (
    <group position={[0, 0.08, 0]}>
      {/* Placa base */}
      <mesh geometry={geom} castShadow receiveShadow>
        <meshStandardMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
          envMapIntensity={1.4}
        />
      </mesh>
      
      {/* Texto 3D */}
{text && text.trim() !== '' && (
  <Text
    color="black"
    anchorX="center"
    anchorY="center"
    fontSize={textSize / 100}
    maxWidth={1.2}
    lineHeight={1}
    letterSpacing={0.05}
    bevelEnabled={true}
    bevelSize={0.005}
    bevelThickness={0.01}
    depth={textDepth / 10}
    position={[0, 0, 0.2]}   // 🔹 lo movemos un poco más al frente
    renderOrder={999}         // 🔹 se renderiza después de todo
    castShadow
  >
    {text}
    <meshStandardMaterial
      color="#ffffff"
      metalness={metalness + 0.1}
      roughness={roughness - 0.1}
      envMapIntensity={1.6}
      depthTest={false}       // 🔹 ignora la geometría detrás
    />
  </Text>
)}

      
      {/* Logo */}
      {logoTexture && (
        <mesh position={[0, -0.1, 0.11]} castShadow>
          <planeGeometry args={[0.6, 0.3]} />
          <meshStandardMaterial 
            map={logoTexture} 
            transparent 
            metalness={0.4} 
            roughness={0.6} 
            envMapIntensity={1.2} 
          />
        </mesh>
      )}
    </group>
  );
}


/******************** stickers ********************/
function Sticker3D({ type, position, rotation, scale, color }: Sticker) {
  const geom = useMemo(() => makeStickerGeometry(type), [type])
  return (
    <mesh position={[position.x, position.y + 0.15, position.z]} rotation={[rotation.x, rotation.y, rotation.z]} scale={scale} castShadow>
      <primitive object={geom} attach="geometry" />
      <meshStandardMaterial color={color} metalness={0.6} roughness={0.35} envMapIntensity={1.2} />
    </mesh>
  )
}

function makeStickerGeometry(type: StickerType) {
  const depth = 0.08
  if (type === "star") {
    const s = new THREE.Shape()
    const spikes = 5
    const outer = 0.4
    const inner = 0.18
    for (let i = 0; i < spikes * 2; i++) {
      const r = i % 2 === 0 ? outer : inner
      const a = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2
      const x = Math.cos(a) * r
      const y = Math.sin(a) * r
      if (i === 0) s.moveTo(x, y)
      else s.lineTo(x, y)
    }
    s.closePath()
    return new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.025, bevelThickness: 0.03 })
  }
  if (type === "lightning") {
    const s = new THREE.Shape()
    s.moveTo(-0.15, 0.5)
    s.lineTo(0.05, 0.1)
    s.lineTo(-0.1, 0.1)
    s.lineTo(0.12, -0.5)
    s.lineTo(-0.02, -0.08)
    s.lineTo(0.12, -0.08)
    s.closePath()
    return new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.02, bevelThickness: 0.025 })
  }
  const s = new THREE.Shape()
  s.moveTo(-0.5, -0.2)
  s.lineTo(-0.3, 0.25)
  s.lineTo(-0.1, -0.05)
  s.lineTo(0.1, 0.3)
  s.lineTo(0.3, -0.05)
  s.lineTo(0.5, 0.25)
  s.lineTo(0.5, -0.2)
  s.lineTo(-0.5, -0.2)
  return new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.02, bevelThickness: 0.03 })
}

/******************** utilidades ********************/
function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  // Si el texto está vacío, retornar array vacío
  if (!text || text.trim() === '') return [''];
  
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + " " + word).width;
    
    if (width < maxWidth) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  
  lines.push(currentLine);
  return lines;
}

function useLogoTexture(url: string | null) {
  const [tex, setTex] = useState<THREE.Texture | null>(null)
  useEffect(() => {
    if (!url) return setTex(null)
    const loader = new THREE.TextureLoader()
    loader.load(url, (t) => {
      t.anisotropy = 8
      t.colorSpace = THREE.SRGBColorSpace
      t.needsUpdate = true
      setTex(t)
    })
    return () => setTex(null)
  }, [url])
  return tex
}