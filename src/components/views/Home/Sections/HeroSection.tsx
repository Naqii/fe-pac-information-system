import Image from "next/image";

const HeroSection = () => (
  <section className="relative flex flex-col justify-center overflow-hidden">
    <div className="relative z-10 container mx-auto px-4 py-20">
      <div className="flex flex-col items-center lg:flex-row">
        <div className="animate-fade-in-left lg:w-1/2">
          <h1 className="mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
            <span className="text-gradient">Sistem Informasi Generus</span> PAC
            Kramas
          </h1>
          <p className="mb-8 max-w-lg text-lg text-gray-300">
            Platform digital untuk mengelola kegiatan & data generus secara
            efisien.
          </p>
        </div>
        <div className="animate-fade-in-right mt-12 lg:mt-0 lg:w-1/2">
          <div className="animate-float relative mx-auto max-w-md">
            <Image
              src="/images/illustration/dummy.png"
              alt="Trading platform dashboard"
              width={400}
              height={300}
              className="rounded-xl border border-white/10 shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
