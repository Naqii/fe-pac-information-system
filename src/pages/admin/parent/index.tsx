import DashboardLayout from "@/components/layouts/DashboardLayout";
import Parent from "@/components/views/Admin/Parent";

const AdminParentPage = () => {
  return (
    <DashboardLayout
      title="Parent"
      description="List of all Parent, create new Parent Data and manage existing Parent data."
      type="admin"
    >
      <Parent />
    </DashboardLayout>
  );
};

export default AdminParentPage;
