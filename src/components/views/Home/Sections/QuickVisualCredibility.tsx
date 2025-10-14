import React from "react";

const QuickVisualCredibility = () => {
  const stats = [
    { value: "1200+", label: "Santri Aktif" },
    { value: "80+", label: "Guru & Pembimbing" },
    { value: "10+", label: "Cabang Pondok" },
  ];

  return (
    <section className="border-b bg-white py-10">
      <div className="mx-auto flex max-w-5xl justify-around text-center">
        {stats.map((item, i) => (
          <div key={i}>
            <h3 className="text-2xl font-bold text-emerald-700">
              {item.value}
            </h3>
            <p className="text-gray-600">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuickVisualCredibility;
