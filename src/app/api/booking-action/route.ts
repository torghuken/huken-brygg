import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const floorNames: Record<string, string> = {
  gastro: "The Gastro Bar",
  lounge: "The Cocktail Lounge",
  underground: "The Underground",
};

function htmlPage(title: string, msg: string, ok: boolean, booking?: Record<string, string>) {
  const c = ok ? "#c8a04c" : "#c84466";
  const ico = ok ? "&#10003;" : "&#10007;";
  const det = booking
    ? `<div class="d">
        <p><s>Etasje</s><strong>${floorNames[booking.floor] || booking.floor}</strong></p>
        <p><s>Dato</s><strong>${booking.date}</strong></p>
        <p><s>Tid</s><strong>${booking.time}</strong></p>
        <p><s>Gjester</s><strong>${booking.guests}</strong></p>
        <p><s>Navn</s><strong>${booking.name}</strong></p>
      </div>` : "";

  return `<!DOCTYPE html><html lang="no"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title} – Huken Brygg</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant:wght@300;400;600&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Cormorant',serif;background:#0a0a0a;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
.card{background:#111;border:1px solid ${c}40;padding:40px 28px;max-width:400px;width:100%;text-align:center}
.ico{width:64px;height:64px;border-radius:50%;border:1px solid ${c};display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:26px;color:${c}}
h1{font-size:22px;color:${c};margin-bottom:10px;letter-spacing:0.1em;text-transform:uppercase;font-weight:400}
p.m{color:#888;line-height:1.6;margin-bottom:20px;font-size:16px}
.d{background:#0a0a0a;padding:16px;text-align:left;margin-top:16px}
.d p{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #1a1a1a;font-size:14px}
.d p:last-child{border:none}.d s{color:#666;text-decoration:none}.d strong{color:#c8a04c;font-weight:400}
.logo{margin-top:24px;color:#c8a04c;font-size:10px;letter-spacing:4px;text-transform:uppercase}
</style></head><body><div class="card">
<div class="ico">${ico}</div>
<h1>${title}</h1><p class="m">${msg}</p>${det}
<p class="logo">Huken Brygg</p></div></body></html>`;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const action = searchParams.get("action");

  if (!token || !["approve", "reject"].includes(action || "")) {
    return new NextResponse(
      htmlPage("Ugyldig lenke", "Lenken er ikke gyldig.", false),
      { headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  // Find booking by token
  const { data: rows } = await supabase
    .from("bookings")
    .select("*")
    .eq("approval_token", token);

  if (!rows || rows.length === 0) {
    return new NextResponse(
      htmlPage("Ikke funnet", "Bookingen ble ikke funnet eller lenken er utløpt.", false),
      { headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  const booking = rows[0];

  if (booking.status === "approved" || booking.status === "rejected") {
    return new NextResponse(
      htmlPage(
        "Allerede behandlet",
        `Bookingen er allerede ${booking.status === "approved" ? "godkjent" : "avvist"}.`,
        booking.status === "approved",
        booking
      ),
      { headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  const newStatus = action === "approve" ? "approved" : "rejected";

  const { error } = await supabase
    .from("bookings")
    .update({ status: newStatus })
    .eq("id", booking.id);

  if (error) {
    return new NextResponse(
      htmlPage("Serverfeil", "Kunne ikke oppdatere bookingstatus.", false),
      { headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  // Send confirmation SMS to guest
  const ok = newStatus === "approved";
  const twilioSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

  if (twilioSid && twilioToken && twilioPhone && booking.phone) {
    const guestPhone = booking.phone.startsWith("+")
      ? booking.phone
      : "+47" + booking.phone.replace(/\s/g, "");

    const smsBody = ok
      ? `Hei ${booking.name}! Din reservasjon på Huken Brygg er bekreftet.\n\n${floorNames[booking.floor] || booking.floor}\nDato: ${booking.date}\nTid: ${booking.time}\nGjester: ${booking.guests}\n\nVi gleder oss til å se deg!`
      : `Hei ${booking.name}. Dessverre kunne vi ikke bekrefte din reservasjon på Huken Brygg (${booking.date}). Ta gjerne kontakt for alternativer.`;

    try {
      await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`,
        {
          method: "POST",
          headers: {
            Authorization: "Basic " + Buffer.from(`${twilioSid}:${twilioToken}`).toString("base64"),
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            To: guestPhone,
            From: twilioPhone,
            Body: smsBody,
          }),
        }
      );
    } catch (e) {
      console.error("Guest SMS error:", e);
    }
  }

  return new NextResponse(
    htmlPage(
      ok ? "Booking godkjent!" : "Booking avvist",
      ok
        ? `Reservasjonen for ${booking.name} er godkjent. Bekreftelse sendt på SMS.`
        : `Reservasjonen for ${booking.name} er avvist.`,
      ok,
      booking
    ),
    { headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}
