import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-soft-pink/60 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-md w-full p-8 sm:p-10 rounded-3xl bg-card border border-border shadow-xl space-y-6 relative">
        {/* Subtle Brand Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-primary text-[10px] sm:text-xs font-bold uppercase tracking-widest border border-brand-blush-pink">
          <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
          <span>Kalya Salon Madiun</span>
        </div>

        <div className="space-y-2">
          <span className="text-6xl sm:text-7xl font-bold font-display text-gold block">
            404
          </span>
          <h1 className="text-xl sm:text-2xl font-bold font-display text-foreground">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1">
            Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
          </p>
        </div>

        <div className="pt-2">
          <Button variant="gold" size="default" asChild className="w-full rounded-full min-h-[44px] shadow-xs text-xs font-semibold">
            <Link href="/" className="gap-2">
              <Home className="w-4 h-4" />
              <span>Kembali ke Beranda</span>
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
