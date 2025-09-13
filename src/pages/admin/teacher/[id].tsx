import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailTeacher from "@/components/views/Admin/DetailTeacher/DetailTeacher";

const AdminDetailTeacherPage = () => {
  return (
    <DashboardLayout
      title="Detail Teacher"
      description="Manage Infromation of Detail Teacher"
      type="admin"
    >
      <DetailTeacher />
    </DashboardLayout>
  );
};

export default AdminDetailTeacherPage;
