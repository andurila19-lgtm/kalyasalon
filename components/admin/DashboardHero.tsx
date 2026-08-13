import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Scissors,
  Layers,
  Image as ImageIcon,
  Star,
  ExternalLink,
  MessageCircle,
  Plus,
  ShieldCheck,
  Database,
  MapPin,
  Clock,
  Sparkle
} from "lucide-react";

export const DashboardHero: React.FC = () => {
  return (
    <div className="kalya-admin-dashboard">
      {/* 1. LUXURY EXECUTIVE WELCOME BANNER */}
      <div className="kalya-hero-banner">
        <div className="kalya-hero-banner-inner">
          <div className="kalya-hero-content">
            <div className="kalya-badge-wrapper">
              <span className="kalya-status-pill online">
                <span className="kalya-ping-dot"></span>
                Supabase PostgreSQL Connected
              </span>
              <span className="kalya-status-pill location">
                <MapPin size={13} />
                Madiun City, ID
              </span>
            </div>

            <h1 className="kalya-hero-title">
              Kalya Salon <span className="kalya-gold-text">Control Center</span>
            </h1>
            <p className="kalya-hero-subtitle">
              Pusat kendali operasional untuk mengelola layanan, tarif perawatan, portofolio galeri foto, dan ulasan pelanggan secara realtime.
            </p>
          </div>

          <div className="kalya-hero-actions">
            <a
              href="https://kalyasalon.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="kalya-btn kalya-btn-primary"
            >
              <ExternalLink size={16} />
              <span>Lihat Website Live</span>
            </a>
            <a
              href="https://wa.me/6283845494574"
              target="_blank"
              rel="noopener noreferrer"
              className="kalya-btn kalya-btn-outline"
            >
              <MessageCircle size={16} />
              <span>WhatsApp Salon</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. STATS & QUICK ENTRY KPI CARDS */}
      <div className="kalya-section-header">
        <div className="kalya-section-title-group">
          <Sparkles size={18} className="kalya-section-icon" />
          <h2 className="kalya-section-heading">Katalog & Manajemen Konten</h2>
        </div>
        <span className="kalya-section-tag">Akses Cepat</span>
      </div>

      <div className="kalya-stats-grid">
        {/* SERVICES CARD */}
        <div className="kalya-stat-card">
          <div className="kalya-stat-card-header">
            <div className="kalya-stat-icon-box gold">
              <Scissors size={22} />
            </div>
            <Link href="/admin/collections/services/create" className="kalya-add-shortcut" title="Tambah Layanan Baru">
              <Plus size={16} />
              <span>Tambah</span>
            </Link>
          </div>
          <div className="kalya-stat-body">
            <h3 className="kalya-stat-title">Menu Layanan</h3>
            <p className="kalya-stat-desc">Haircut, Scalp Spa, Keratin Glow, Balayage, Perming</p>
          </div>
          <Link href="/admin/collections/services" className="kalya-stat-footer">
            <span>Buka Semua Layanan</span>
            <span className="kalya-arrow">&rarr;</span>
          </Link>
        </div>

        {/* CATEGORIES CARD */}
        <div className="kalya-stat-card">
          <div className="kalya-stat-card-header">
            <div className="kalya-stat-icon-box brown">
              <Layers size={22} />
            </div>
            <Link href="/admin/collections/categories/create" className="kalya-add-shortcut" title="Tambah Kategori">
              <Plus size={16} />
              <span>Tambah</span>
            </Link>
          </div>
          <div className="kalya-stat-body">
            <h3 className="kalya-stat-title">Kategori Menu</h3>
            <p className="kalya-stat-desc">Pengelompokan menu perawatan & filter halaman harga</p>
          </div>
          <Link href="/admin/collections/categories" className="kalya-stat-footer">
            <span>Kelola Kategori</span>
            <span className="kalya-arrow">&rarr;</span>
          </Link>
        </div>

        {/* GALLERY CARD */}
        <div className="kalya-stat-card">
          <div className="kalya-stat-card-header">
            <div className="kalya-stat-icon-box blush">
              <ImageIcon size={22} />
            </div>
            <Link href="/admin/collections/gallery/create" className="kalya-add-shortcut" title="Upload Foto Portofolio">
              <Plus size={16} />
              <span>Upload</span>
            </Link>
          </div>
          <div className="kalya-stat-body">
            <h3 className="kalya-stat-title">Portofolio Galeri</h3>
            <p className="kalya-stat-desc">Foto hasil styling, pewarnaan, dan suasana interior salon</p>
          </div>
          <Link href="/admin/collections/gallery" className="kalya-stat-footer">
            <span>Buka Galeri Foto</span>
            <span className="kalya-arrow">&rarr;</span>
          </Link>
        </div>

        {/* REVIEWS CARD */}
        <div className="kalya-stat-card">
          <div className="kalya-stat-card-header">
            <div className="kalya-stat-icon-box gold">
              <Star size={22} />
            </div>
            <Link href="/admin/collections/reviews/create" className="kalya-add-shortcut" title="Tambah Ulasan">
              <Plus size={16} />
              <span>Catat</span>
            </Link>
          </div>
          <div className="kalya-stat-body">
            <h3 className="kalya-stat-title">Ulasan Google (4.8★)</h3>
            <p className="kalya-stat-desc">284+ testimoni terverifikasi kepuasan pelanggan</p>
          </div>
          <Link href="/admin/collections/reviews" className="kalya-stat-footer">
            <span>Kelola Ulasan</span>
            <span className="kalya-arrow">&rarr;</span>
          </Link>
        </div>
      </div>

      {/* 3. SALON INFORMATION & SEO SUMMARY */}
      <div className="kalya-info-banner">
        <div className="kalya-info-item">
          <Clock size={18} className="kalya-info-icon" />
          <div>
            <div className="kalya-info-label">Jam Operasional</div>
            <div className="kalya-info-val">Senin - Minggu: 09:00 - 20:00 WIB</div>
          </div>
        </div>
        <div className="kalya-info-divider"></div>
        <div className="kalya-info-item">
          <MapPin size={18} className="kalya-info-icon" />
          <div>
            <div className="kalya-info-label">Alamat Salon</div>
            <div className="kalya-info-val">Jl. Slamet Riyadi No.8, Klegen, Kec. Kartoharjo, Kota Madiun</div>
          </div>
        </div>
        <div className="kalya-info-divider"></div>
        <div className="kalya-info-item">
          <ShieldCheck size={18} className="kalya-info-icon" />
          <div>
            <div className="kalya-info-label">Status Keamanan</div>
            <div className="kalya-info-val">JWT Encrypted & Role Guarded</div>
          </div>
        </div>
      </div>

      {/* 4. TITLE DIVIDER BEFORE PAYLOAD DEFAULT TABLES */}
      <div className="kalya-section-header payload-divider">
        <div className="kalya-section-title-group">
          <Database size={18} className="kalya-section-icon" />
          <h2 className="kalya-section-heading">Tabel Koleksi Database</h2>
        </div>
      </div>
    </div>
  );
};
