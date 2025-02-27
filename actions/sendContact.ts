"use server";

import prisma from "@/lib/prisma";

export default async function sendContact(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    const db = await prisma.contact.create({
      data,
    });

    return db;
  } catch (error) {
    console.error("Failed to save contact form:", error);
    return null;
  }
}
