import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hukenbrygg.no";

const floorNames: Record<string, string> = {
  gastro: "The Gastro Bar (1. etasje)",
  lounge: "The Cocktail Lounge (2. etasje)",
  underground: "The Underground (Kjelleren)",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { floor, date, time, guests, name, phone, email, notes } = body;

    // Validate required fields
    if (!floor || !date || !time || !guests || !name || !phone) {
      return NextResponse.json(
        { error: "Manglende felter" },
        { status: 400 }
      );
    }

    // Insert booking with approval token
    const approvalToken = randomUUID();
    const { data, error } = await supabase
      .from("bookings")
      .insert({
        floor,
        date,
        time,
        guests,
        name,
        phone,
        email: email || null,
        notes: notes || null,
        status: "pending",
        approval_token: approvalToken,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Kunne ikke lagre booking" },
        { status: 500 }
      );
    }

    // Send SMS to manager (if Twilio is configured)
    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
    const managerPhone = process.env.MANAGER_PHONE;

    if (twilioSid && twilioToken && twilioPhone && managerPhone) {
      const approveUrl = `${BASE_URL}/api/booking-action?token=${approvalToken}&action=approve`;
      const rejectUrl = `${BASE_URL}/api/booking-action?token=${approvalToken}&action=reject`;

      const smsBody =
        `Ny booking – Huken BRYGG\n\n` +
        `${floorNames[floor] || floor}\n` +
        `Dato: ${date}\n` +
        `Tid: ${time}\n` +
        `Gjester: ${guests}\n` +
        `Navn: ${name}\n` +
        `Tlf: ${phone}\n` +
        (email ? `E-post: ${email}\n` : "") +
        `\nGodkjenn:\n${approveUrl}\n` +
        `\nAvvis:\n${rejectUrl}`;

      try {
        const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`;
        await fetch(twilioUrl, {
          method: "POST",
          headers: {
            Authorization:
              "Basic " +
              Buffer.from(`${twilioSid}:${twilioToken}`).toString("base64"),
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            To: managerPhone,
            From: twilioPhone,
            Body: smsBody,
          }),
        });
      } catch (smsError) {
        console.error("SMS error:", smsError);
        // Don't fail the booking if SMS fails
      }
    }

    return NextResponse.json({ success: true, booking: data });
  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json(
      { error: "Serverfeil" },
      { status: 500 }
    );
  }
}
