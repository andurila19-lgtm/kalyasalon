"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BookingDashboard } from "./BookingDashboard";
import {
  CalendarDays,
  ExternalLink,
  MessageCircle,
  ArrowLeft,
  LayoutDashboard
} from "lucide-react";

export const BookingCalendarView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setCurrentDate(formatted);
  }, []);

  return (
    <div className="kalya-booking-view-root">
      {/* 1. TOP HEADER BANNER */}
      <header className="kalya-dash-header">
        <div className="kalya-dash-brand">
          <div className="kalya-monogram">KS</div>
          <div>
            <div className="kalya-brand-subtitle-row">
              <span className="kalya-live-badge">
                <span className="kalya-live-dot"></span>
                ONLINE • REALTIME SYNC
              </span>
              {currentDate && <span className="kalya-date-text">{currentDate}</span>}
            </div>
            <h1 className="kalya-dash-title">
              Kalender Reservasi <span className="kalya-gold-gradient">& Janji Temu</span>
            </h1>
            <p className="kalya-dash-subtitle">
              Sistem manajemen jadwal harian salon, monitoring status kedatangan pelanggan, dan pemblokiran waktu operasional secara realtime.
            </p>
          </div>
        </div>

        <div className="kalya-dash-actions">
          <Link href="/admin" className="kalya-action-btn secondary">
            <LayoutDashboard size={15} />
            <span>Kembali ke Dashboard CMS</span>
          </Link>
          <a
            href="https://kalyasalon.vercel.app/booking"
            target="_blank"
            rel="noopener noreferrer"
            className="kalya-action-btn primary"
          >
            <ExternalLink size={15} />
            <span>Buka Booking Publik</span>
          </a>
        </div>
      </header>

      {/* 2. REALTIME CALENDAR & KPI MANAGEMENT */}
      <main className="kalya-calendar-main-content">
        <BookingDashboard />
      </main>
    </div>
  );
};
