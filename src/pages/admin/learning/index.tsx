import DashboardLayout from "@/components/layouts/DashboardLayout";
import Learning from "@/components/views/Admin/Learning";

const AdminLearningPage = () => {
  return (
    <DashboardLayout
      title="Learning"
      description="List of all Learning, create new Learning Data and manage existing Learning data."
      type="admin"
    >
      <Learning />
    </DashboardLayout>
  );
};

export default AdminLearningPage;
