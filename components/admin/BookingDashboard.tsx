"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Scissors,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Plus,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  Lock,
  Edit,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Award,
  CalendarDays,
  ListFilter
} from "lucide-react";
import { getTodayDateJakarta, minutesToTime, timeToMinutes } from "@/lib/booking-types";
import { getSupabaseClient } from "@/lib/supabase-client";
import { servicesData } from "@/data/services";

export function BookingDashboard() {
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDateJakarta());
  const [viewMode, setViewMode] = useState<"day" | "week" | "list">("day");
  const [bookings, setBookings] = useState<any[]>([]);
  const [blockedTimes, setBlockedTimes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // Selected Booking for Detail / Action Drawer
  const [activeBooking, setActiveBooking] = useState<any | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "info" | "error" } | null>(null);

  // Block Time Modal State
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [blockStartTime, setBlockStartTime] = useState("12:00");
  const [blockEndTime, setBlockEndTime] = useState("13:00");
  const [blockReason, setBlockReason] = useState("Istirahat Siang");

  // Reschedule Modal State
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState(getTodayDateJakarta());
  const [rescheduleTime, setRescheduleTime] = useState("10:00");

  // 1. Fetch Bookings and Blocked Times for Selected Date
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch bookings for date
      const [bookingsRes, blockedRes] = await Promise.all([
        fetch(`/api/bookings?limit=100`),
        fetch(`/api/blocked-times`),
      ]);

      const bookingsJson = await bookingsRes.json();
      const blockedJson = await blockedRes.json();

      if (bookingsJson.success) {
        setBookings(bookingsJson.docs || []);
      }
      if (blockedJson.success) {
        setBlockedTimes(blockedJson.docs || []);
      }
    } catch (err) {
      console.error("Failed to load admin booking data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 2. Supabase Realtime for Live Admin Calendar Updates
  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    const channel = supabase
      .channel("admin-bookings-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "bookings" },
        (payload: any) => {
          fetchData();
          setNotification({
            message: `🔔 Booking baru masuk: ${payload.new?.customerName || "Pelanggan"} (${payload.new?.bookingDate} ${payload.new?.startTime})`,
            type: "info",
          });
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "bookings" },
        () => {
          fetchData();
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "blocked_times" },
        () => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchData]);

  // Filtered Bookings for current selected date
  const dateBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchDate = b.bookingDate === selectedDate;
      const matchStatus = statusFilter === "ALL" || b.status === statusFilter;
      const matchSearch =
        !searchQuery ||
        b.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.bookingCode?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.customerPhone?.includes(searchQuery);
      return matchDate && matchStatus && matchSearch;
    });
  }, [bookings, selectedDate, statusFilter, searchQuery]);

  // Blocked times for selected date
  const dateBlockedTimes = useMemo(() => {
    return blockedTimes.filter((b) => b.date === selectedDate && b.active !== false);
  }, [blockedTimes, selectedDate]);

  // KPI Metrics for Today
  const todayDateStr = getTodayDateJakarta();
  const todayBookings = useMemo(() => bookings.filter((b) => b.bookingDate === todayDateStr), [bookings, todayDateStr]);
  const kpiTotal = todayBookings.length;
  const kpiConfirmed = todayBookings.filter((b) => b.status === "CONFIRMED").length;
  const kpiCompleted = todayBookings.filter((b) => b.status === "COMPLETED").length;
  const kpiCancelled = todayBookings.filter((b) => b.status === "CANCELLED").length;

  // 3. Actions: Update Status (Completed, Cancel, No Show)
  const handleUpdateStatus = async (bookingId: string, newStatus: string) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        setNotification({
          message: `Status booking berhasil diubah menjadi ${newStatus}.`,
          type: "success",
        });
        setActiveBooking(null);
        fetchData();
      } else {
        alert(json.message || "Gagal mengubah status.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  // 4. Action: Cancel Booking (Frees up slot)
  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm("Apakah Anda yakin ingin membatalkan booking ini? Slot waktu akan otomatis kembali tersedia.")) {
      return;
    }
    setActionLoading(true);
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "cancel" }),
      });
      const json = await res.json();
      if (json.success) {
        setNotification({ message: "Booking berhasil dibatalkan dan slot kembali dibuka.", type: "success" });
        setActiveBooking(null);
        fetchData();
      } else {
        alert(json.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  // 5. Action: Reschedule Booking
  const handleReschedule = async () => {
    if (!activeBooking) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/bookings/${activeBooking.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reschedule",
          newDate: rescheduleDate,
          newStartTime: rescheduleTime,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setNotification({
          message: `Jadwal berhasil dipindahkan ke ${rescheduleDate} pukul ${rescheduleTime} WIB.`,
          type: "success",
        });
        setShowRescheduleModal(false);
        setActiveBooking(null);
        fetchData();
      } else {
        alert(json.message || "Slot tujuan tidak tersedia.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  // 6. Action: Create Blocked Time
  const handleCreateBlockedTime = async () => {
    try {
      const res = await fetch("/api/blocked-times", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selectedDate,
          startTime: blockStartTime,
          endTime: blockEndTime,
          reason: blockReason,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setNotification({ message: "Jadwal blokir waktu berhasil ditambahkan.", type: "success" });
        setShowBlockModal(false);
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Generate hourly schedule slots (09:00 to 20:00)
  const hoursSchedule = useMemo(() => {
    const hours = [];
    for (let h = 9; h < 20; h++) {
      hours.push(`${h.toString().padStart(2, "0")}:00`);
    }
    return hours;
  }, []);

  return (
    <div className="kalya-booking-admin-root">
      {/* NOTIFICATION TOAST */}
      {notification && (
        <div className="kalya-toast-notification">
          <span>{notification.message}</span>
          <button onClick={() => setNotification(null)}>✕</button>
        </div>
      )}

      {/* TOP KPI OVERVIEW */}
      <div className="kalya-kpi-grid">
        <div className="kalya-kpi-card total">
          <div className="kalya-kpi-icon"><CalendarDays size={20} /></div>
          <div>
            <div className="kalya-kpi-label">Booking Hari Ini</div>
            <div className="kalya-kpi-val">{kpiTotal} Jadwal</div>
          </div>
        </div>

        <div className="kalya-kpi-card confirmed">
          <div className="kalya-kpi-icon"><CheckCircle2 size={20} /></div>
          <div>
            <div className="kalya-kpi-label">Terkonfirmasi Aktif</div>
            <div className="kalya-kpi-val">{kpiConfirmed} Pelanggan</div>
          </div>
        </div>

        <div className="kalya-kpi-card completed">
          <div className="kalya-kpi-icon"><Award size={20} /></div>
          <div>
            <div className="kalya-kpi-label">Selesai Dilayani</div>
            <div className="kalya-kpi-val">{kpiCompleted} Selesai</div>
          </div>
        </div>

        <div className="kalya-kpi-card cancelled">
          <div className="kalya-kpi-icon"><XCircle size={20} /></div>
          <div>
            <div className="kalya-kpi-label">Dibatalkan</div>
            <div className="kalya-kpi-val">{kpiCancelled} Batal</div>
          </div>
        </div>
      </div>

      {/* TOOLBAR: DATE SELECTOR + VIEW SWITCH + QUICK ACTIONS */}
      <div className="kalya-calendar-toolbar">
        <div className="kalya-toolbar-left">
          <button
            className="kalya-tool-btn"
            onClick={() => {
              const d = new Date(selectedDate);
              d.setDate(d.getDate() - 1);
              setSelectedDate(d.toISOString().split("T")[0]);
            }}
          >
            <ChevronLeft size={16} />
          </button>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="kalya-date-input"
          />

          <button
            className="kalya-tool-btn"
            onClick={() => {
              const d = new Date(selectedDate);
              d.setDate(d.getDate() + 1);
              setSelectedDate(d.toISOString().split("T")[0]);
            }}
          >
            <ChevronRight size={16} />
          </button>

          <button
            className="kalya-tool-btn today"
            onClick={() => setSelectedDate(getTodayDateJakarta())}
          >
            Hari Ini
          </button>
        </div>

        <div className="kalya-toolbar-right">
          <div className="kalya-search-box">
            <Search size={14} />
            <input
              type="text"
              placeholder="Cari nama / kode booking..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button
            className="kalya-tool-btn primary"
            onClick={() => setShowBlockModal(true)}
          >
            <Lock size={14} />
            <span>Blokir Jam / Libur</span>
          </button>

          <button
            className="kalya-tool-btn refresh"
            onClick={fetchData}
            title="Refresh Realtime"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* CALENDAR SCHEDULE (DAY VIEW) */}
      <div className="kalya-schedule-container">
        <div className="kalya-schedule-header">
          <h3>
            Jadwal Kunjungan:{" "}
            <span className="kalya-gold-text">
              {new Date(selectedDate).toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </h3>
          <span className="kalya-count-badge">
            {dateBookings.length} Reservasi Terjadwal
          </span>
        </div>

        {loading ? (
          <div className="kalya-loading-spinner-box">
            <RefreshCw className="kalya-spin-icon" size={28} />
            <p>Memuat kalender reservasi salon...</p>
          </div>
        ) : (
          <div className="kalya-hourly-grid">
            {hoursSchedule.map((hour) => {
              const slotMinutes = timeToMinutes(hour);
              const nextSlotMinutes = slotMinutes + 60;

              // Find bookings that start in this hour slot
              const matchingBookings = dateBookings.filter((b) => {
                const bStart = timeToMinutes(b.startTime);
                return bStart >= slotMinutes && bStart < nextSlotMinutes;
              });

              // Find blocked times that overlap with this hour
              const matchingBlock = dateBlockedTimes.find((block) => {
                const bStart = timeToMinutes(block.startTime);
                const bEnd = timeToMinutes(block.endTime);
                return slotMinutes < bEnd && nextSlotMinutes > bStart;
              });

              return (
                <div key={hour} className="kalya-hour-row">
                  <div className="kalya-hour-time">
                    <span>{hour}</span>
                  </div>

                  <div className="kalya-hour-content">
                    {matchingBlock && (
                      <div className="kalya-blocked-slot-chip">
                        <Lock size={14} />
                        <span>DIBLOKIR: {matchingBlock.reason} ({matchingBlock.startTime} - {matchingBlock.endTime})</span>
                      </div>
                    )}

                    {matchingBookings.length === 0 && !matchingBlock && (
                      <div className="kalya-empty-hour-slot">
                        <span className="kalya-slot-available-tag">Slot Tersedia</span>
                      </div>
                    )}

                    {matchingBookings.map((booking) => {
                      const serviceName =
                        typeof booking.service === "object" ? booking.service?.name : "Layanan Salon";
                      return (
                        <div
                          key={booking.id}
                          onClick={() => setActiveBooking(booking)}
                          className={`kalya-booking-card-item ${booking.status.toLowerCase()}`}
                        >
                          <div className="kalya-card-item-top">
                            <span className="kalya-booking-code">{booking.bookingCode}</span>
                            <span className={`kalya-status-badge ${booking.status.toLowerCase()}`}>
                              {booking.status}
                            </span>
                          </div>

                          <div className="kalya-customer-name">
                            <User size={13} />
                            <strong>{booking.customerName}</strong>
                          </div>

                          <div className="kalya-service-name">
                            <Scissors size={13} />
                            <span>{serviceName}</span>
                          </div>

                          <div className="kalya-time-interval">
                            <Clock size={13} />
                            <span>{booking.startTime} - {booking.endTime} WIB ({booking.duration} mnt)</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* BOOKING DETAIL DRAWER / MODAL */}
      {activeBooking && (
        <div className="kalya-modal-backdrop" onClick={() => setActiveBooking(null)}>
          <div className="kalya-drawer-content" onClick={(e) => e.stopPropagation()}>
            <div className="kalya-drawer-header">
              <div>
                <span className="kalya-drawer-tag">Detail Reservasi Janji Temu</span>
                <h2>{activeBooking.bookingCode}</h2>
              </div>
              <button onClick={() => setActiveBooking(null)} className="kalya-close-btn">✕</button>
            </div>

            <div className="kalya-drawer-body">
              <div className="kalya-detail-section">
                <div className="kalya-detail-row">
                  <span className="label">Nama Pelanggan:</span>
                  <span className="val font-bold">{activeBooking.customerName}</span>
                </div>
                <div className="kalya-detail-row">
                  <span className="label">WhatsApp / Telp:</span>
                  <span className="val">
                    <a href={`https://wa.me/${activeBooking.customerPhone}`} target="_blank" rel="noopener noreferrer" className="kalya-wa-link">
                      {activeBooking.customerPhone} ↗
                    </a>
                  </span>
                </div>
                {activeBooking.customerEmail && (
                  <div className="kalya-detail-row">
                    <span className="label">Email:</span>
                    <span className="val">{activeBooking.customerEmail}</span>
                  </div>
                )}
                <div className="kalya-detail-row">
                  <span className="label">Layanan Perawatan:</span>
                  <span className="val font-bold">
                    {typeof activeBooking.service === "object" ? activeBooking.service?.name : "Layanan"}
                  </span>
                </div>
                <div className="kalya-detail-row">
                  <span className="label">Jadwal Tanggal & Jam:</span>
                  <span className="val text-gold font-bold">
                    {activeBooking.bookingDate} ({activeBooking.startTime} - {activeBooking.endTime} WIB)
                  </span>
                </div>
                <div className="kalya-detail-row">
                  <span className="label">Durasi Pengerjaan:</span>
                  <span className="val">{activeBooking.duration} Menit</span>
                </div>
                <div className="kalya-detail-row">
                  <span className="label">Total Biaya Layanan:</span>
                  <span className="val font-bold">Rp {activeBooking.totalPrice?.toLocaleString("id-ID")}</span>
                </div>
                <div className="kalya-detail-row">
                  <span className="label">Status Saat Ini:</span>
                  <span className={`kalya-status-badge ${activeBooking.status?.toLowerCase()}`}>
                    {activeBooking.status}
                  </span>
                </div>
                {activeBooking.notes && (
                  <div className="kalya-notes-box">
                    <span className="label">Catatan Pelanggan:</span>
                    <p>{activeBooking.notes}</p>
                  </div>
                )}
              </div>

              {/* ACTION BUTTONS */}
              <div className="kalya-drawer-actions">
                <button
                  disabled={actionLoading || activeBooking.status === "COMPLETED"}
                  onClick={() => handleUpdateStatus(activeBooking.id, "COMPLETED")}
                  className="kalya-btn-action complete"
                >
                  <CheckCircle2 size={16} />
                  <span>Tandai Selesai (Completed)</span>
                </button>

                <button
                  disabled={actionLoading}
                  onClick={() => {
                    setRescheduleDate(activeBooking.bookingDate);
                    setRescheduleTime(activeBooking.startTime);
                    setShowRescheduleModal(true);
                  }}
                  className="kalya-btn-action reschedule"
                >
                  <Edit size={16} />
                  <span>Ubah Jadwal (Reschedule)</span>
                </button>

                <button
                  disabled={actionLoading || activeBooking.status === "CANCELLED"}
                  onClick={() => handleCancelBooking(activeBooking.id)}
                  className="kalya-btn-action cancel"
                >
                  <XCircle size={16} />
                  <span>Batalkan Booking (Buka Slot)</span>
                </button>

                <button
                  disabled={actionLoading || activeBooking.status === "NO_SHOW"}
                  onClick={() => handleUpdateStatus(activeBooking.id, "NO_SHOW")}
                  className="kalya-btn-action noshow"
                >
                  <AlertTriangle size={16} />
                  <span>Tandai Tidak Hadir (No Show)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RESCHEDULE MODAL */}
      {showRescheduleModal && activeBooking && (
        <div className="kalya-modal-backdrop" onClick={() => setShowRescheduleModal(false)}>
          <div className="kalya-modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Ubah Jadwal Reservasi: {activeBooking.bookingCode}</h3>
            <p className="subtitle">Pilih tanggal dan jam baru. Sistem akan otomatis memvalidasi ketersediaan slot.</p>

            <div className="kalya-form-group">
              <label>Tanggal Baru:</label>
              <input
                type="date"
                value={rescheduleDate}
                onChange={(e) => setRescheduleDate(e.target.value)}
              />
            </div>

            <div className="kalya-form-group">
              <label>Jam Mulai Baru (HH:mm):</label>
              <input
                type="time"
                value={rescheduleTime}
                onChange={(e) => setRescheduleTime(e.target.value)}
              />
            </div>

            <div className="kalya-modal-buttons">
              <button onClick={() => setShowRescheduleModal(false)} className="cancel">Batal</button>
              <button disabled={actionLoading} onClick={handleReschedule} className="submit">
                {actionLoading ? "Memproses..." : "Simpan Jadwal Baru"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BLOCK TIME MODAL */}
      {showBlockModal && (
        <div className="kalya-modal-backdrop" onClick={() => setShowBlockModal(false)}>
          <div className="kalya-modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Blokir Jam Reservasi / Waktu Libur</h3>
            <p className="subtitle">Jam yang diblokir otomatis tidak akan muncul untuk dipesan oleh pelanggan.</p>

            <div className="kalya-form-group">
              <label>Tanggal Blokir:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <div className="kalya-form-row">
              <div className="kalya-form-group">
                <label>Jam Mulai:</label>
                <input
                  type="time"
                  value={blockStartTime}
                  onChange={(e) => setBlockStartTime(e.target.value)}
                />
              </div>
              <div className="kalya-form-group">
                <label>Jam Selesai:</label>
                <input
                  type="time"
                  value={blockEndTime}
                  onChange={(e) => setBlockEndTime(e.target.value)}
                />
              </div>
            </div>

            <div className="kalya-form-group">
              <label>Alasan Pemblokiran:</label>
              <input
                type="text"
                placeholder="Contoh: Istirahat Siang / Perbaikan Salon"
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
              />
            </div>

            <div className="kalya-modal-buttons">
              <button onClick={() => setShowBlockModal(false)} className="cancel">Tutup</button>
              <button onClick={handleCreateBlockedTime} className="submit">Blokir Sekarang</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
