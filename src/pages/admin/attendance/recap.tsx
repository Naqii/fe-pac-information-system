import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailRecap from "@/components/views/Admin/DetailRecap";

const AdminDetailRecapPage = () => {
  return (
    <DashboardLayout
      title="Detail Monthly Recap"
      description="Manage Infromation of Detail Recap"
      type="admin"
    >
      <DetailRecap />
    </DashboardLayout>
  );
};

export default AdminDetailRecapPage;
