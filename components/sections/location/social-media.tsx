"use client";

import { salonData } from "@/data/salon";
import { SectionHeading } from "@/components/ui/section-heading";
import { trackSocialClick } from "@/lib/analytics";
import { Video, ArrowUpRight } from "lucide-react";

function InstagramIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function SocialMedia() {
  return (
    <section className="py-16 lg:py-24 bg-background relative border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeading
          eyebrow="Stay Connected"
          title="Follow Kalya"
          description={`Follow ${salonData.socialLinks.instagramHandle} untuk inspirasi gaya rambut terbaru, hasil perawatan, dan update salon harian di Madiun.`}
          align="center"
        />

        {/* 2 Social Media Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          
          {/* Instagram Card */}
          <a
            href={salonData.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackSocialClick("instagram")}
            className="group bg-card p-6 sm:p-8 rounded-2xl border border-border hover:border-gold/60 shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                <InstagramIcon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground block">
                  Instagram
                </span>
                <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors font-display">
                  {salonData.socialLinks.instagramHandle}
                </h3>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-secondary transition-all">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </a>

          {/* TikTok Card */}
          <a
            href={salonData.socialLinks.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackSocialClick("tiktok")}
            className="group bg-card p-6 sm:p-8 rounded-2xl border border-border hover:border-gold/60 shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                <Video className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground block">
                  TikTok
                </span>
                <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors font-display">
                  {salonData.socialLinks.tiktokHandle}
                </h3>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-secondary transition-all">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </a>

        </div>

      </div>
    </section>
  );
}
