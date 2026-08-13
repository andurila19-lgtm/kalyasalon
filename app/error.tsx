"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RefreshCw, Home, MessageSquare } from "lucide-react";
import { createConsultationUrl } from "@/lib/whatsapp";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Kalya App Error]", error);
  }, [error]);

  const whatsappUrl = createConsultationUrl("Bantuan Teknis Website");

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6 text-center relative overflow-hidden">
      <div className="max-w-md w-full p-8 sm:p-10 rounded-3xl bg-card border border-border shadow-xl space-y-6 relative">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-primary text-[10px] sm:text-xs font-bold uppercase tracking-widest border border-brand-blush-pink">
          <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
          <span>Kalya Salon Madiun</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-bold font-display text-foreground">
            Terjadi Sedikit Kendala
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1">
            Halaman sedang mengalami gangguan sementara. Silakan coba muat ulang atau hubungi tim kami via WhatsApp.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Button 
            variant="gold" 
            size="default" 
            onClick={() => reset()} 
            className="w-full sm:flex-1 rounded-full min-h-[44px] shadow-xs text-xs font-semibold cursor-pointer gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Coba Lagi</span>
          </Button>

          <Button variant="outline" size="default" asChild className="w-full sm:flex-1 rounded-full min-h-[44px] text-xs font-semibold">
            <Link href="/" className="gap-2">
              <Home className="w-4 h-4" />
              <span>Beranda</span>
            </Link>
          </Button>
        </div>

        <div className="pt-2 border-t border-border/60">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat Admin WhatsApp</span>
          </a>
        </div>
      </div>
    </main>
  );
}
