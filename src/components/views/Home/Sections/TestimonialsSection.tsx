const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Ahmad Fauzi",
      role: "Santri Kelas 3",
      quote:
        "Sistem ini sangat membantu kami dalam melihat jadwal dan nilai tanpa harus datang ke kantor.",
    },
    {
      name: "Ibu Siti",
      role: "Wali Santri",
      quote:
        "Saya bisa memantau perkembangan anak saya dari rumah. Sangat transparan dan efisien!",
    },
  ];

  return (
    <section className="bg-gray-50 py-20 text-center">
      <h2 className="mb-12 text-3xl font-semibold text-gray-800">
        Apa Kata Mereka
      </h2>
      <div className="mx-auto flex max-w-6xl flex-col justify-center gap-8 px-6 md:flex-row">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="max-w-sm rounded-xl bg-white p-6 shadow transition hover:shadow-md"
          >
            <p className="text-gray-600 italic">“{t.quote}”</p>
            <h4 className="mt-4 font-semibold text-emerald-700">{t.name}</h4>
            <p className="text-sm text-gray-500">{t.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
