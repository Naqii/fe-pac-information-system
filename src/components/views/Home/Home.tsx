import HeroSection from "./Sections/HeroSection";
import TeacherPreviewSection from "./Sections/TeacherPreviewSection";
import useHome from "./useHome";

const Home = () => {
  const { dataTeacher, isLoadingTeachers } = useHome();
  return (
    <div>
      <HeroSection />
      <TeacherPreviewSection
        teacher={dataTeacher?.data}
        isLoading={isLoadingTeachers}
      />
    </div>
  );
};

export default Home;
