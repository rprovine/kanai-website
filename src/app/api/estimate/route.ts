import { NextResponse } from "next/server";
import { createContact, createOpportunity } from "@/lib/ghl";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { firstName, lastName, email, phone, address, city, state, zip, description } = body;

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields: firstName, lastName, email, phone" },
        { status: 400 }
      );
    }

    const pipelineId = process.env.GHL_ESTIMATE_PIPELINE_ID;
    if (!pipelineId) {
      console.error("GHL_ESTIMATE_PIPELINE_ID is not configured");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const contact = await createContact({
      firstName,
      lastName,
      email,
      phone,
      address1: address,
      city,
      state,
      postalCode: zip,
      tags: ["estimate-request", "website"],
      source: "Website Estimate Form",
    });

    const contactId = contact.contact?.id;
    if (!contactId) {
      throw new Error("Failed to retrieve contact ID from GHL response");
    }

    const opportunity = await createOpportunity({
      pipelineId,
      name: `Estimate – ${firstName} ${lastName}`,
      contactId,
      source: "Website Estimate Form",
    });

    return NextResponse.json({
      success: true,
      contactId,
      opportunityId: opportunity.opportunity?.id,
    });
  } catch (error) {
    console.error("Estimate API error:", error);
    return NextResponse.json(
      { error: "Failed to submit estimate request" },
      { status: 500 }
    );
  }
}
