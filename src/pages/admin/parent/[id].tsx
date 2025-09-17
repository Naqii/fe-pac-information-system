import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailParent from "@/components/views/Admin/DetailParent/DetailParent";

const AdminDetailParentPage = () => {
  return (
    <DashboardLayout
      title="Detail Parent"
      description="Manage Infromation of Detail Parent"
      type="admin"
    >
      <DetailParent />
    </DashboardLayout>
  );
};

export default AdminDetailParentPage;
