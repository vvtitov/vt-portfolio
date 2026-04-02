import { NextResponse } from "next/server"
import { Resend } from "resend"

const resendApiKey = process.env.RESEND_API_KEY
const recipientEmail = process.env.CONTACT_EMAIL ?? process.env.CONTACT_TO_EMAIL ?? "vladislavtitov.r@gmail.com"
const senderEmail = process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>"
const resend = resendApiKey ? new Resend(resendApiKey) : null

export async function POST(request: Request) {
  try {
    if (!resend) {
      console.error("Missing RESEND_API_KEY environment variable")
      return NextResponse.json({ error: "Email service is not configured." }, { status: 500 })
    }

    const data = await request.json()
    const requiredFields = ["name", "email", "subject", "message"]
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    const { name, email, subject, message } = data as {
      name: string
      email: string
      subject: string
      message: string
    }

    const { error } = await resend.emails.send({
      from: senderEmail,
      to: recipientEmail,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    })

    if (error) {
      console.error("Resend API error:", error)
      return NextResponse.json({ error: "Failed to send your message. Please try again." }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
    })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: "Failed to send your message. Please try again." }, { status: 500 })
  }
}

