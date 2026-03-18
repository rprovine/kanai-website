import { NextResponse } from "next/server";
import { createContact, addContactNote } from "@/lib/ghl";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { firstName, lastName, email, phone, message } = body;

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields: firstName, lastName, email, phone" },
        { status: 400 }
      );
    }

    const contact = await createContact({
      firstName,
      lastName,
      email,
      phone,
      tags: ["contact-form", "website"],
      source: "Website Contact Form",
    });

    const contactId = contact.contact?.id;
    if (!contactId) {
      throw new Error("Failed to retrieve contact ID from GHL response");
    }

    if (message) {
      await addContactNote(contactId, `Website Contact Form Message:\n\n${message}`);
    }

    return NextResponse.json({
      success: true,
      contactId,
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to submit contact request" },
      { status: 500 }
    );
  }
}
