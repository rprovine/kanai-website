import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Verify webhook auth if secret is configured
  const webhookSecret = process.env.WORKIZ_WEBHOOK_SECRET;
  if (webhookSecret) {
    const providedSecret = request.headers.get("X-Webhook-Secret");
    if (providedSecret !== webhookSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const payload = await request.json();

    // Log the webhook payload
    console.log("[WORKIZ_WEBHOOK]", {
      receivedAt: new Date().toISOString(),
      payload,
    });

    // TODO: Update job status in Supabase
    // TODO: Sync status to executive portal
    // TODO: Send status update notification to customer if applicable

    return NextResponse.json({ received: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
