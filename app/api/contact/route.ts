import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, email, company, message, interests } = body;

    if (!name || !email) {
      return NextResponse.json(
        { message: "Name and Email are required" },
        { status: 400 }
      );
    }

    // ✅ Configure transporter (Gmail example)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App password
      },
    });

    // ✅ Mail content
    await transporter.sendMail({
      from: `"Cognosutra Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // receive mail here
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "N/A"}</p>
        <p><strong>Catalog:</strong> ${body.catalog || "N/A"}</p>
        <p><strong>Interests:</strong> ${interests?.join(", ") || "None"}</p>
        <p><strong>Message:</strong></p>
        <p>${message || "No message"}</p>
      `,
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("MAIL ERROR:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}