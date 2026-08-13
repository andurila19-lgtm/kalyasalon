"use client";

import { useState } from "react";
import { servicesData, serviceCategories } from "@/data/services";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceCard } from "@/components/ui/service-card";
import { cn } from "@/lib/utils";

export function Services() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredServices = activeCategory === "all"
    ? servicesData
    : servicesData.filter((s) => s.category === activeCategory);

  const categories = [
    { id: "all", name: "Semua Layanan" },
    ...serviceCategories.map((c) => ({ id: c.id, name: c.name })),
  ];

  return (
    <section id="layanan" className="py-14 sm:py-16 md:py-20 lg:py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeading
          eyebrow="Signature Menu"
          title="Our Services"
          description="Rangkaian perawatan rambut profesional yang dirancang khusus untuk memenuhi kebutuhan dan karakter unik rambut Anda."
          align="center"
        />

        {/* Category Filter Tabs with smooth mobile horizontal scroll */}
        <div className="flex items-center gap-2 mb-8 sm:mb-10 lg:mb-12 overflow-x-auto no-scrollbar py-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-4 py-2 min-h-[40px] rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border cursor-pointer shrink-0 whitespace-nowrap active:scale-95",
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground border-primary shadow-xs"
                  : "bg-card text-muted-foreground border-border hover:border-gold/50 hover:text-foreground"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Services Grid: 1 col on mobile, 2 cols on tablet, 3 cols on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

      </div>
    </section>
  );
}
