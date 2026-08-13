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
  CheckCircle2,
  Calendar,
  Eye,
  Settings,
  ChevronRight
} from "lucide-react";

export const DashboardHero: React.FC = () => {
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
    <div className="kalya-executive-dashboard">
      {/* TOP HEADER: BRAND + REALTIME STATUS + CTAs */}
      <header className="kalya-dash-header">
        <div className="kalya-dash-brand">
          <div className="kalya-monogram">KS</div>
          <div>
            <div className="kalya-brand-subtitle-row">
              <span className="kalya-live-badge">
                <span className="kalya-live-dot"></span>
                ONLINE • SUPABASE POSTGRESQL
              </span>
              {currentDate && <span className="kalya-date-text">{currentDate}</span>}
            </div>
            <h1 className="kalya-dash-title">
              Kalya Salon <span className="kalya-gold-gradient">Executive Portal</span>
            </h1>
            <p className="kalya-dash-subtitle">
              Pusat kendali operasional katalog layanan, tarif perawatan, portofolio galeri foto, dan ulasan pelanggan.
            </p>
          </div>
        </div>

        <div className="kalya-dash-actions">
          <a
            href="https://kalyasalon.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="kalya-action-btn primary"
          >
            <ExternalLink size={15} />
            <span>Lihat Website Live</span>
          </a>
          <a
            href="https://wa.me/6283845494574"
            target="_blank"
            rel="noopener noreferrer"
            className="kalya-action-btn secondary"
          >
            <MessageCircle size={15} />
            <span>WhatsApp Salon</span>
          </a>
        </div>
      </header>

      {/* QUICK METRIC STATS ROW */}
      <div className="kalya-metrics-bar">
        <div className="kalya-metric-chip">
          <span className="kalya-chip-icon gold"><Scissors size={14} /></span>
          <span className="kalya-chip-label">Layanan:</span>
          <span className="kalya-chip-val">7 Treatment</span>
        </div>
        <div className="kalya-metric-chip">
          <span className="kalya-chip-icon brown"><Layers size={14} /></span>
          <span className="kalya-chip-label">Kategori:</span>
          <span className="kalya-chip-val">5 Kategori</span>
        </div>
        <div className="kalya-metric-chip">
          <span className="kalya-chip-icon gold"><Star size={14} /></span>
          <span className="kalya-chip-label">Google Rating:</span>
          <span className="kalya-chip-val">4.8 / 5.0 (284+ Review)</span>
        </div>
        <div className="kalya-metric-chip">
          <span className="kalya-chip-icon blush"><Clock size={14} /></span>
          <span className="kalya-chip-label">Jam Buka:</span>
          <span className="kalya-chip-val">09:00 - 20:00 WIB</span>
        </div>
      </div>

      {/* SECTION 1: PRIMARY CATALOG & CONTENT MANAGEMENT (4 LUXURY CARDS) */}
      <div className="kalya-section-title">
        <div className="kalya-title-left">
          <Sparkles size={16} className="kalya-gold-icon" />
          <h2>Katalog & Manajemen Konten</h2>
        </div>
        <span className="kalya-pill-tag">Kontrol Utama</span>
      </div>

      <div className="kalya-cards-grid">
        {/* CARD 1: SERVICES */}
        <div className="kalya-luxury-card">
          <div className="kalya-card-top">
            <div className="kalya-icon-bubble gold">
              <Scissors size={20} />
            </div>
            <Link href="/admin/collections/services/create" className="kalya-pill-btn add">
              <Plus size={14} />
              <span>Tambah Baru</span>
            </Link>
          </div>
          <div className="kalya-card-info">
            <h3>Menu Layanan & Tarif</h3>
            <p>Atur nama perawatan, durasi, harga promo, dan foto ilustrasi layanan salon.</p>
          </div>
          <div className="kalya-card-actions">
            <Link href="/admin/collections/services" className="kalya-manage-link">
              <span>Kelola Daftar Layanan</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* CARD 2: CATEGORIES */}
        <div className="kalya-luxury-card">
          <div className="kalya-card-top">
            <div className="kalya-icon-bubble espresso">
              <Layers size={20} />
            </div>
            <Link href="/admin/collections/categories/create" className="kalya-pill-btn add">
              <Plus size={14} />
              <span>Tambah Baru</span>
            </Link>
          </div>
          <div className="kalya-card-info">
            <h3>Kategori Treatment</h3>
            <p>Kelola taksonomi (Haircut, Hair Spa, Keratin, Perming, Coloring) untuk filter menu.</p>
          </div>
          <div className="kalya-card-actions">
            <Link href="/admin/collections/categories" className="kalya-manage-link">
              <span>Kelola Kategori Menu</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* CARD 3: GALLERY */}
        <div className="kalya-luxury-card">
          <div className="kalya-card-top">
            <div className="kalya-icon-bubble blush">
              <ImageIcon size={20} />
            </div>
            <Link href="/admin/collections/gallery/create" className="kalya-pill-btn add">
              <Plus size={14} />
              <span>Upload Foto</span>
            </Link>
          </div>
          <div className="kalya-card-info">
            <h3>Portofolio Galeri</h3>
            <p>Unggah foto hasil penataan gaya rambut, balayage, dan interior estetik salon.</p>
          </div>
          <div className="kalya-card-actions">
            <Link href="/admin/collections/gallery" className="kalya-manage-link">
              <span>Buka Portofolio Galeri</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* CARD 4: REVIEWS */}
        <div className="kalya-luxury-card">
          <div className="kalya-card-top">
            <div className="kalya-icon-bubble gold">
              <Star size={20} />
            </div>
            <Link href="/admin/collections/reviews/create" className="kalya-pill-btn add">
              <Plus size={14} />
              <span>Catat Ulasan</span>
            </Link>
          </div>
          <div className="kalya-card-info">
            <h3>Ulasan & Testimoni</h3>
            <p>Kelola ulasan Google Maps bintang 5 untuk meningkatkan kepercayaan calon pelanggan.</p>
          </div>
          <div className="kalya-card-actions">
            <Link href="/admin/collections/reviews" className="kalya-manage-link">
              <span>Kelola Semua Ulasan</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* SECTION 2: SYSTEM & MEDIA MANAGEMENT */}
      <div className="kalya-section-title">
        <div className="kalya-title-left">
          <Settings size={16} className="kalya-gold-icon" />
          <h2>Aset Media & Pengaturan Akun</h2>
        </div>
        <span className="kalya-pill-tag">Sistem & Media</span>
      </div>

      <div className="kalya-secondary-grid">
        {/* MEDIA ASSETS */}
        <div className="kalya-compact-card">
          <div className="kalya-compact-left">
            <div className="kalya-icon-bubble blush small">
              <FolderOpen size={18} />
            </div>
            <div>
              <h4>Penyimpanan Media (Uploads)</h4>
              <p>Kelola seluruh file gambar, thumbnail, dan aset media website.</p>
            </div>
          </div>
          <div className="kalya-compact-right">
            <Link href="/admin/collections/media" className="kalya-pill-btn secondary">
              <span>Buka Media</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        {/* USER ACCESS */}
        <div className="kalya-compact-card">
          <div className="kalya-compact-left">
            <div className="kalya-icon-bubble gold small">
              <Users size={18} />
            </div>
            <div>
              <h4>Pengaturan Akun & Akses Admin</h4>
              <p>Kelola email, password, dan hak akses Administrator atau Staff.</p>
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

      {/* SECTION 3: QUICK WEBSITE DIRECT SHORTCUTS */}
      <div className="kalya-website-bar">
        <div className="kalya-website-bar-title">
          <Eye size={16} className="kalya-gold-icon" />
          <span>Navigasi Cepat Website Live:</span>
        </div>
        <div className="kalya-website-links">
          <a href="https://kalyasalon.vercel.app/layanan" target="_blank" rel="noopener noreferrer">
            Menu Layanan &rarr;
          </a>
          <a href="https://kalyasalon.vercel.app/harga" target="_blank" rel="noopener noreferrer">
            Daftar Harga &rarr;
          </a>
          <a href="https://kalyasalon.vercel.app/galeri" target="_blank" rel="noopener noreferrer">
            Galeri Foto &rarr;
          </a>
          <a href="https://kalyasalon.vercel.app/ulasan" target="_blank" rel="noopener noreferrer">
            Ulasan Google &rarr;
          </a>
          <a href="https://kalyasalon.vercel.app/lokasi" target="_blank" rel="noopener noreferrer">
            Lokasi & Jam Buka &rarr;
          </a>
        </div>
      </div>

      {/* BOTTOM FOOTER STATUS */}
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
          <span>Security: Next.js 16 + Payload 3.0 + Supabase</span>
        </div>
      </footer>
    </div>
  );
};
