import useHome from "../useHome";

const TeacherPreviewSection = () => {
  const { dataTeacher, isLoadingTeachers } = useHome();

  return (
    <section className="bg-white py-20 text-center">
      <h2 className="mb-10 text-3xl font-semibold text-gray-800">
        Guru & Pembimbing
      </h2>
      {isLoadingTeachers ? (
        <p className="text-gray-500">Memuat data guru...</p>
      ) : (
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 md:grid-cols-4"></div>
      )}
    </section>
  );
};

export default TeacherPreviewSection;
