import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  const { nombre, edad, estilo, motivacion } = await req.json()

  // 👉 Aquí pones tu correo y credenciales SMTP
  const transporter = nodemailer.createTransport({
    service: "gmail", // o "hotmail", "yahoo", etc.
    auth: {
      user: process.env.EMAIL_USER, // tu correo
      pass: process.env.EMAIL_PASS, // tu contraseña o app password
    },
  })

  try {
    await transporter.sendMail({
      from: `"CWC Web" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO, // correo donde quieres recibir postulaciones
      subject: "Nueva postulación a luchador",
      html: `
        <h2>Nuevo aspirante a CWC</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Edad:</strong> ${edad}</p>
        <p><strong>Estilo:</strong> ${estilo}</p>
        <p><strong>Motivación:</strong> ${motivacion}</p>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
