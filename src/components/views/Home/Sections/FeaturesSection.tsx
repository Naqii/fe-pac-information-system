const FeaturesSection = () => {
  const features = [
    {
      title: "Manajemen Santri",
      desc: "Kelola data santri, izin, dan perkembangan akademik dengan mudah.",
    },
    {
      title: "Jadwal & Kegiatan",
      desc: "Pantau jadwal harian, kegiatan pondok, dan agenda penting.",
    },
    {
      title: "Komunikasi Terpadu",
      desc: "Hubungkan wali santri, ustadz, dan pengurus dalam satu sistem.",
    },
  ];

  return (
    <section className="bg-gray-50 py-20 text-center">
      <h2 className="mb-12 text-3xl font-semibold text-gray-800">
        Infromasi Website
      </h2>
      <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-3">
        {features.map((f, i) => (
          <div
            key={i}
            className="rounded-xl bg-white p-6 shadow transition hover:shadow-md"
          >
            <h3 className="mb-3 text-lg font-semibold text-emerald-700">
              {f.title}
            </h3>
            <p className="text-sm text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
