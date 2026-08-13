import { SectionHeading } from "@/components/ui/section-heading";

export function CustomerExperience() {
  const experiences = [
    {
      num: "01",
      title: "Friendly Service",
      description:
        "Sentuhan ramah dari seluruh staf kami yang siap melayani dengan ketulusan sejak Anda melangkah masuk.",
    },
    {
      num: "02",
      title: "Personal Consultation",
      description:
        "Mendengarkan keinginan Anda secara saksama dan memberikan rekomendasi perawatan terbaik sesuai kebutuhan rambut.",
    },
    {
      num: "03",
      title: "Comfortable Space",
      description:
        "Desain interior estetik bernuansa pastel blush pink, cermin lengkung mewah, dan kebersihan yang selalu terjaga.",
    },
    {
      num: "04",
      title: "Worth Every Visit",
      description:
        "Kombinasi hasil akhir rambut memukau, produk berkualitas, dan harga yang tetap bersahabat untuk perawatan rutin.",
    },
  ];

  return (
    <section className="py-14 sm:py-16 md:py-20 lg:py-24 bg-brand-marble-white/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeading
          eyebrow="The Kalya Standard"
          title={
            <>
              A Salon Experience <br />
              <span className="italic font-normal text-primary">You&apos;ll Want to Repeat</span>
            </>
          }
          description="Komitmen kami untuk memberikan rasa nyaman, percaya diri, dan kepuasan di setiap detik kunjungan Anda di Kalya Salon Madiun."
          align="center"
        />

        {/* 4 Cards Grid with Editorial Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {experiences.map((exp) => (
            <div
              key={exp.num}
              className="group relative bg-card p-6 sm:p-7 rounded-2xl border border-border hover:border-gold/60 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              {/* Subtle top gold accent bar */}
              <div className="w-8 h-[2px] bg-gold/40 group-hover:w-14 group-hover:bg-gold transition-all duration-300 mb-4 sm:mb-6" />

              <div>
                <span className="text-3xl font-display font-light text-gold/80 block mb-3">
                  {exp.num}
                </span>
                <h3 className="text-lg font-bold font-display text-foreground mb-3 group-hover:text-primary transition-colors">
                  {exp.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>
              </div>

              {/* Architectural bottom corner accent */}
              <div className="mt-6 pt-4 border-t border-border/40 flex justify-end">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                  Kalya Salon
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
