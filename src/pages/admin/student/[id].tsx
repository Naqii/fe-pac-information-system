import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailStudent from "@/components/views/Admin/DetailStudent/DetailStudent";

const AdminDetailStudentPage = () => {
  return (
    <DashboardLayout
      title="Detail Student"
      description="Manage Infromation of Detail Student"
      type="admin"
    >
      <DetailStudent />
    </DashboardLayout>
  );
};

export default AdminDetailStudentPage;
