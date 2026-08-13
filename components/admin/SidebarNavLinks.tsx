"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, LayoutDashboard } from "lucide-react";

export const SidebarNavLinks: React.FC = () => {
  const pathname = usePathname();
  const isCalendar = pathname?.includes("/booking-calendar");
  const isDashboard = pathname === "/admin" || pathname === "/admin/";

  return (
    <div className="kalya-sidebar-quick-nav">
      <div className="kalya-sidebar-header-label">Halaman Utama</div>
      
      {/* 1. DEDICATED BOOKING CALENDAR PAGE */}
      <Link
        href="/admin/booking-calendar"
        className={`kalya-sidebar-link ${isCalendar ? "active" : ""}`}
      >
        <CalendarDays size={16} className="kalya-gold-icon" />
        <span>Kalender Booking</span>
        <span className="kalya-live-pill">Live</span>
      </Link>

      {/* 2. DEDICATED CMS CATALOG & CONTENT PAGE */}
      <Link
        href="/admin"
        className={`kalya-sidebar-link ${isDashboard ? "active" : ""}`}
      >
        <LayoutDashboard size={16} className="kalya-gold-icon" />
        <span>Dashboard CMS</span>
      </Link>
    </div>
  );
};
