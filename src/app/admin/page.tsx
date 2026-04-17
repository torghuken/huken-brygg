"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Tab = "events" | "bookings" | "settings";

// Placeholder data
const dummyBookings = [
  { id: "1", name: "Ola Nordmann", phone: "+4799887766", floor: "gastro", date: "2026-04-20", time: "19:00", guests: 4, status: "pending", notes: "" },
  { id: "2", name: "Kari Hansen", phone: "+4798765432", floor: "lounge", date: "2026-04-21", time: "20:00", guests: 2, status: "approved", notes: "Bursdag" },
  { id: "3", name: "Erik Svendsen", phone: "+4741234567", floor: "underground", date: "2026-04-25", time: "23:00", guests: 6, status: "pending", notes: "Mask Night" },
];

const dummyEvents = [
  { id: "1", title: "MASK NIGHT", date: "2026-04-25", time: "23:00", description: "Identity fades. The night begins." },
  { id: "2", title: "VINYL SESSIONS", date: "2026-05-02", time: "22:00", description: "Analog warmth in the deep." },
];

const floorLabels: Record<string, string> = {
  gastro: "The Gastro Bar",
  lounge: "The Cocktail Lounge",
  underground: "The Underground",
};

const statusColors: Record<string, string> = {
  pending: "#d4a855",
  approved: "#4ade80",
  rejected: "#ef4444",
};

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("bookings");
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: real auth
            if (password === "huken2026") setAuthenticated(true);
          }}
          className="flex flex-col items-center gap-6"
        >
          <h1 className="font-instrument text-3xl tracking-wide text-white">Admin</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Passord"
            className="w-64 rounded-sm border border-white/10 bg-transparent px-4 py-3 font-cormorant text-sm text-white outline-none transition focus:border-white/30"
          />
          <button
            type="submit"
            className="cta-btn"
            style={{ borderColor: "var(--color-brand)", color: "var(--color-brand)" }}
          >
            Logg inn
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-6 pb-16 pt-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-instrument text-3xl tracking-wide text-white">Admin</h1>
            <p className="font-cormorant text-xs tracking-[0.3em] uppercase text-white/30 mt-1">Huken Brygg</p>
          </div>
          <button
            onClick={() => setAuthenticated(false)}
            className="font-cormorant text-xs tracking-[0.2em] uppercase text-white/30 transition hover:text-white/60"
          >
            Logg ut
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-6 border-b border-white/10 pb-3">
          {(["bookings", "events", "settings"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="font-cormorant text-xs tracking-[0.3em] uppercase transition"
              style={{
                color: tab === t ? "var(--color-brand)" : "rgba(255,255,255,0.3)",
              }}
            >
              {t === "bookings" ? "Bookinger" : t === "events" ? "Events" : "Innstillinger"}
            </button>
          ))}
        </div>

        {/* Bookings tab */}
        {tab === "bookings" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-4"
          >
            {dummyBookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-sm border border-white/10 p-5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-cormorant text-lg text-white">{booking.name}</h3>
                    <p className="font-cormorant text-xs text-white/40 mt-0.5">
                      {floorLabels[booking.floor]} · {booking.date} · {booking.time} · {booking.guests} gjester
                    </p>
                    {booking.notes && (
                      <p className="font-cormorant text-xs italic text-white/30 mt-1">{booking.notes}</p>
                    )}
                  </div>
                  <span
                    className="font-cormorant text-xs tracking-[0.2em] uppercase"
                    style={{ color: statusColors[booking.status] }}
                  >
                    {booking.status}
                  </span>
                </div>

                {booking.status === "pending" && (
                  <div className="mt-4 flex gap-3">
                    <button
                      className="cta-btn text-xs py-2"
                      style={{ borderColor: "#4ade80", color: "#4ade80" }}
                      onClick={() => {/* TODO: approve via API */}}
                    >
                      Godkjenn
                    </button>
                    <button
                      className="cta-btn text-xs py-2"
                      style={{ borderColor: "#ef4444", color: "#ef4444" }}
                      onClick={() => {/* TODO: reject via API */}}
                    >
                      Avvis
                    </button>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}

        {/* Events tab */}
        {tab === "events" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-6"
          >
            {/* Add event form */}
            <div className="rounded-sm border border-white/10 p-5">
              <h3
                className="font-cormorant mb-4 text-xs tracking-[0.3em] uppercase"
                style={{ color: "var(--color-brand)" }}
              >
                Legg til event
              </h3>
              <form className="flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); /* TODO */ }}>
                <input
                  type="text"
                  placeholder="Tittel"
                  className="w-full rounded-sm border border-white/10 bg-transparent px-4 py-2 font-cormorant text-sm text-white outline-none focus:border-white/30"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    className="rounded-sm border border-white/10 bg-transparent px-4 py-2 font-cormorant text-sm text-white outline-none focus:border-white/30"
                  />
                  <input
                    type="time"
                    className="rounded-sm border border-white/10 bg-transparent px-4 py-2 font-cormorant text-sm text-white outline-none focus:border-white/30"
                  />
                </div>
                <textarea
                  placeholder="Beskrivelse"
                  rows={2}
                  className="w-full resize-none rounded-sm border border-white/10 bg-transparent px-4 py-2 font-cormorant text-sm text-white outline-none focus:border-white/30"
                />
                <button
                  type="submit"
                  className="cta-btn mt-2 w-full justify-center text-xs"
                  style={{ borderColor: "var(--color-brand)", color: "var(--color-brand)" }}
                >
                  Legg til
                </button>
              </form>
            </div>

            {/* Existing events */}
            {dummyEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between rounded-sm border border-white/10 p-5">
                <div>
                  <h3 className="font-bebas text-xl tracking-wider text-white">{event.title}</h3>
                  <p className="font-cormorant text-xs text-white/40">{event.date} · {event.time}</p>
                  <p className="font-cormorant text-xs italic text-white/30 mt-1">{event.description}</p>
                </div>
                <button
                  className="font-cormorant text-xs text-white/20 transition hover:text-red-400"
                  onClick={() => {/* TODO: delete */}}
                >
                  Slett
                </button>
              </div>
            ))}
          </motion.div>
        )}

        {/* Settings tab */}
        {tab === "settings" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-6"
          >
            <div className="rounded-sm border border-white/10 p-5">
              <h3
                className="font-cormorant mb-4 text-xs tracking-[0.3em] uppercase"
                style={{ color: "var(--color-brand)" }}
              >
                Åpningstider
              </h3>
              <div className="flex flex-col gap-3">
                {["Man–Tor", "Fre–Lør", "Søn"].map((day) => (
                  <div key={day} className="flex items-center gap-4">
                    <span className="font-cormorant text-sm text-white/50 w-20">{day}</span>
                    <input
                      type="text"
                      defaultValue={day === "Søn" ? "Stengt" : day.includes("Fre") ? "16:00 – 03:00" : "16:00 – 01:00"}
                      className="flex-1 rounded-sm border border-white/10 bg-transparent px-3 py-2 font-cormorant text-sm text-white outline-none focus:border-white/30"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-sm border border-white/10 p-5">
              <h3
                className="font-cormorant mb-4 text-xs tracking-[0.3em] uppercase"
                style={{ color: "var(--color-brand)" }}
              >
                Meny-lenke
              </h3>
              <input
                type="url"
                placeholder="https://..."
                className="w-full rounded-sm border border-white/10 bg-transparent px-4 py-2 font-cormorant text-sm text-white outline-none focus:border-white/30"
              />
            </div>

            <button
              className="cta-btn w-full justify-center"
              style={{ borderColor: "var(--color-brand)", color: "var(--color-brand)" }}
              onClick={() => {/* TODO: save */}}
            >
              Lagre endringer
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
