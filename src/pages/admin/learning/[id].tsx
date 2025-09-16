import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailLearning from "@/components/views/Admin/DetailLearning/DetailLearning";

const AdminDetailLearningPage = () => {
  return (
    <DashboardLayout
      title="Detail Learning"
      description="Manage Infromation of Detail Learning"
      type="admin"
    >
      <DetailLearning />
    </DashboardLayout>
  );
};

export default AdminDetailLearningPage;
