import DashboardLayout from "@/components/layouts/DashboardLayout";
import Teacher from "@/components/views/Admin/Teacher";

const AdminTeacherPage = () => {
  return (
    <DashboardLayout
      title="Teacher"
      description="List of all Teacher, create new Teacher Data and manage existing Teacher data."
      type="admin"
    >
      <Teacher />
    </DashboardLayout>
  );
};

export default AdminTeacherPage;
