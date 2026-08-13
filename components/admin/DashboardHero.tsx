"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Scissors,
  Layers,
  Image as ImageIcon,
  Star,
  Users,
  FolderOpen,
  ExternalLink,
  MessageCircle,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles,
  Calendar,
  Eye,
  Settings,
  ChevronRight,
  Lightbulb,
  CheckCircle2,
  CalendarDays,
  Grid
} from "lucide-react";
import { BookingDashboard } from "./BookingDashboard";

export const DashboardHero: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<string>("");
  const [activeMainTab, setActiveMainTab] = useState<"bookings" | "catalog">("bookings");
  const [activeGuideTab, setActiveGuideTab] = useState<string>("layanan");

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
    <div className="kalya-executive-dashboard">
      {/* 1. TOP HEADER: BRAND + REALTIME STATUS + ACTION BUTTONS */}
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
              Kalya Salon <span className="kalya-gold-gradient">Control Center</span>
            </h1>
            <p className="kalya-dash-subtitle">
              Pusat kendali operasional booking janji temu pelanggan, katalog layanan, tarif perawatan, dan portofolio foto galeri.
            </p>
          </div>
        </div>

        <div className="kalya-dash-actions">
          <a
            href="https://kalyasalon.vercel.app/booking"
            target="_blank"
            rel="noopener noreferrer"
            className="kalya-action-btn primary"
          >
            <ExternalLink size={15} />
            <span>Buka Booking Publik</span>
          </a>
          <a
            href="https://wa.me/6283845494574"
            target="_blank"
            rel="noopener noreferrer"
            className="kalya-action-btn secondary"
          >
            <MessageCircle size={15} />
            <span>WhatsApp Reservasi</span>
          </a>
        </div>
      </header>

      {/* 2. MAIN SECTION SWITCHER TABS */}
      <div className="kalya-main-tab-bar">
        <button
          onClick={() => setActiveMainTab("bookings")}
          className={`kalya-main-tab-item ${activeMainTab === "bookings" ? "active" : ""}`}
        >
          <CalendarDays size={18} />
          <span>Kalender & Reservasi Booking (Realtime)</span>
        </button>

        <button
          onClick={() => setActiveMainTab("catalog")}
          className={`kalya-main-tab-item ${activeMainTab === "catalog" ? "active" : ""}`}
        >
          <Grid size={18} />
          <span>Katalog Layanan & Konten Salon</span>
        </button>
      </div>

      {/* TAB 1: VISUAL REALTIME BOOKING CALENDAR & MANAGEMENT */}
      {activeMainTab === "bookings" && (
        <section className="kalya-tab-pane animate-in fade-in duration-200">
          <BookingDashboard />
        </section>
      )}

      {/* TAB 2: CATALOG & CONTENT MANAGEMENT */}
      {activeMainTab === "catalog" && (
        <section className="kalya-tab-pane animate-in fade-in duration-200 space-y-6">
          {/* QUICK METRIC STATS ROW */}
          <div className="kalya-metrics-bar">
            <div className="kalya-metric-chip">
              <span className="kalya-chip-icon gold"><Scissors size={14} /></span>
              <span className="kalya-chip-label">Menu Layanan:</span>
              <span className="kalya-chip-val">Siap Dikelola</span>
            </div>
            <div className="kalya-metric-chip">
              <span className="kalya-chip-icon brown"><Layers size={14} /></span>
              <span className="kalya-chip-label">Kategori Treatment:</span>
              <span className="kalya-chip-val">Otomatis Terfilter</span>
            </div>
            <div className="kalya-metric-chip">
              <span className="kalya-chip-icon gold"><Star size={14} /></span>
              <span className="kalya-chip-label">Rating Google:</span>
              <span className="kalya-chip-val">4.8★ (284+ Ulasan)</span>
            </div>
            <div className="kalya-metric-chip">
              <span className="kalya-chip-icon blush"><Clock size={14} /></span>
              <span className="kalya-chip-label">Jam Operasional:</span>
              <span className="kalya-chip-val">09:00 - 20:00 WIB</span>
            </div>
          </div>

          {/* 4 PRIMARY CARDS */}
          <div className="kalya-section-title">
            <div className="kalya-title-left">
              <Sparkles size={16} className="kalya-gold-icon" />
              <h2>Kelola Konten Utama Website</h2>
            </div>
            <span className="kalya-pill-tag">Menu Cepat</span>
          </div>

          <div className="kalya-cards-grid">
            {/* SERVICES */}
            <div className="kalya-luxury-card">
              <div className="kalya-card-top">
                <div className="kalya-icon-bubble gold"><Scissors size={20} /></div>
                <Link href="/admin/collections/services/create" className="kalya-pill-btn add">
                  <Plus size={14} />
                  <span>+ Tambah Layanan</span>
                </Link>
              </div>
              <div className="kalya-card-info">
                <h3>Menu & Tarif Layanan</h3>
                <p>Tambah perawatan baru, ubah harga promo, durasi waktu, dan foto contoh hasil rambut.</p>
              </div>
              <div className="kalya-card-actions">
                <Link href="/admin/collections/services" className="kalya-manage-link">
                  <span>Buka Daftar Semua Layanan</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            {/* CATEGORIES */}
            <div className="kalya-luxury-card">
              <div className="kalya-card-top">
                <div className="kalya-icon-bubble espresso"><Layers size={20} /></div>
                <Link href="/admin/collections/categories/create" className="kalya-pill-btn add">
                  <Plus size={14} />
                  <span>+ Tambah Kategori</span>
                </Link>
              </div>
              <div className="kalya-card-info">
                <h3>Kategori Treatment</h3>
                <p>Kelompokkan menu salon (Haircut, Hair Spa, Keratin, Perming, Coloring, Men’s Hair).</p>
              </div>
              <div className="kalya-card-actions">
                <Link href="/admin/collections/categories" className="kalya-manage-link">
                  <span>Buka Daftar Kategori</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            {/* GALLERY */}
            <div className="kalya-luxury-card">
              <div className="kalya-card-top">
                <div className="kalya-icon-bubble blush"><ImageIcon size={20} /></div>
                <Link href="/admin/collections/gallery/create" className="kalya-pill-btn add">
                  <Plus size={14} />
                  <span>+ Upload Foto</span>
                </Link>
              </div>
              <div className="kalya-card-info">
                <h3>Portofolio Galeri</h3>
                <p>Unggah foto hasil penataan rambut klien, hasil balayage, smoothing, dan interior salon.</p>
              </div>
              <div className="kalya-card-actions">
                <Link href="/admin/collections/gallery" className="kalya-manage-link">
                  <span>Buka Semua Foto Galeri</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            {/* REVIEWS */}
            <div className="kalya-luxury-card">
              <div className="kalya-card-top">
                <div className="kalya-icon-bubble gold"><Star size={20} /></div>
                <Link href="/admin/collections/reviews/create" className="kalya-pill-btn add">
                  <Plus size={14} />
                  <span>+ Catat Testimoni</span>
                </Link>
              </div>
              <div className="kalya-card-info">
                <h3>Ulasan & Testimoni</h3>
                <p>Input ulasan kepuasan pelanggan dari Google Maps untuk memperkuat citra salon.</p>
              </div>
              <div className="kalya-card-actions">
                <Link href="/admin/collections/reviews" className="kalya-manage-link">
                  <span>Buka Daftar Ulasan</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* STEP-BY-STEP CHEATSHEET */}
          <div className="kalya-guide-box">
            <div className="kalya-guide-header">
              <div className="kalya-guide-title">
                <Lightbulb size={20} className="kalya-gold-icon" />
                <div>
                  <h3>Panduan Praktis Pemilik Salon (Sangat Mudah Digunakan)</h3>
                  <p>Klik tab di bawah untuk melihat cara cepat mengupdate isi website:</p>
                </div>
              </div>
            </div>

            <div className="kalya-guide-tabs">
              <button
                type="button"
                className={`kalya-tab-btn ${activeGuideTab === "layanan" ? "active" : ""}`}
                onClick={() => setActiveGuideTab("layanan")}
              >
                ✂️ Cara Tambah Layanan / Ubah Harga
              </button>
              <button
                type="button"
                className={`kalya-tab-btn ${activeGuideTab === "galeri" ? "active" : ""}`}
                onClick={() => setActiveGuideTab("galeri")}
              >
                📸 Cara Upload Foto ke Galeri
              </button>
              <button
                type="button"
                className={`kalya-tab-btn ${activeGuideTab === "ulasan" ? "active" : ""}`}
                onClick={() => setActiveGuideTab("ulasan")}
              >
                ⭐ Cara Tambah Ulasan Pelanggan
              </button>
            </div>

            <div className="kalya-guide-content">
              {activeGuideTab === "layanan" && (
                <div className="kalya-step-list">
                  <div className="kalya-step-item">
                    <span className="kalya-step-num">1</span>
                    <div><strong>Klik Tombol "+ Tambah Layanan"</strong> di kartu atas atau menu sidebar.</div>
                  </div>
                  <div className="kalya-step-item">
                    <span className="kalya-step-num">2</span>
                    <div><strong>Isi Nama & Harga:</strong> Masukkan nama perawatan dan harga angka (misal: <code className="kalya-code">150000</code>). Sistem otomatis memformat menjadi <code className="kalya-code">Rp 150.000</code>!</div>
                  </div>
                  <div className="kalya-step-item">
                    <span className="kalya-step-num">3</span>
                    <div><strong>Klik "Save" (Simpan):</strong> Layanan akan langsung aktif dan muncul di website seketika.</div>
                  </div>
                </div>
              )}

              {activeGuideTab === "galeri" && (
                <div className="kalya-step-list">
                  <div className="kalya-step-item">
                    <span className="kalya-step-num">1</span>
                    <div><strong>Klik "+ Upload Foto Baru":</strong> Buka formulir unggah gambar.</div>
                  </div>
                  <div className="kalya-step-item">
                    <span className="kalya-step-num">2</span>
                    <div><strong>Pilih Foto dari HP/Laptop:</strong> Klik kotak gambar, pilih foto hasil karya rambut klien Anda.</div>
                  </div>
                  <div className="kalya-step-item">
                    <span className="kalya-step-num">3</span>
                    <div><strong>Pilih Kategori & Simpan:</strong> Pilih kategori (misal: <em>Coloring / Haircut</em>) lalu klik <strong>Save</strong>. Foto langsung tayang di galeri website!</div>
                  </div>
                </div>
              )}

              {activeGuideTab === "ulasan" && (
                <div className="kalya-step-list">
                  <div className="kalya-step-item">
                    <span className="kalya-step-num">1</span>
                    <div><strong>Klik "+ Catat Testimoni":</strong> Buka formulir input ulasan baru.</div>
                  </div>
                  <div className="kalya-step-item">
                    <span className="kalya-step-num">2</span>
                    <div><strong>Salin Nama & Komentar:</strong> Masukkan nama pelanggan dan salin komentar bintang 5 dari Google Maps.</div>
                  </div>
                  <div className="kalya-step-item">
                    <span className="kalya-step-num">3</span>
                    <div><strong>Simpan:</strong> Ulasan pelanggan akan langsung tampil di halaman review dan beranda!</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SECONDARY SYSTEM ITEMS */}
          <div className="kalya-secondary-grid">
            <div className="kalya-compact-card">
              <div className="kalya-compact-left">
                <div className="kalya-icon-bubble blush small"><FolderOpen size={18} /></div>
                <div>
                  <h4>Penyimpanan Media & Foto</h4>
                  <p>Kumpulan seluruh file foto dan gambar salon yang tersimpan.</p>
                </div>
              </div>
              <div className="kalya-compact-right">
                <Link href="/admin/collections/media" className="kalya-pill-btn secondary">
                  <span>Buka Media</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            <div className="kalya-compact-card">
              <div className="kalya-compact-left">
                <div className="kalya-icon-bubble gold small"><Users size={18} /></div>
                <div>
                  <h4>Akun Pemilik & Staf</h4>
                  <p>Kelola email & password login Admin atau akses Stylist.</p>
                </div>
              </div>
              <div className="kalya-compact-right">
                <Link href="/admin/collections/users" className="kalya-pill-btn secondary">
                  <span>Kelola Akun</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. FOOTER STATUS */}
      <footer className="kalya-dash-footer">
        <div className="kalya-footer-item">
          <MapPin size={14} className="kalya-gold-icon" />
          <span>Jl. Slamet Riyadi No.8, Klegen, Kec. Kartoharjo, Kota Madiun</span>
        </div>
        <div className="kalya-footer-divider"></div>
        <div className="kalya-footer-item">
          <Clock size={14} className="kalya-gold-icon" />
          <span>Buka Setiap Hari: 09:00 - 20:00 WIB</span>
        </div>
        <div className="kalya-footer-divider"></div>
        <div className="kalya-footer-item">
          <ShieldCheck size={14} className="kalya-gold-icon" />
          <span>Realtime Engine: Supabase PostgreSQL + WebSockets</span>
        </div>
      </footer>
    </div>
  );
};
