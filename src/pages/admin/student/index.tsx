import DashboardLayout from "@/components/layouts/DashboardLayout";
import Student from "@/components/views/Admin/Student";

const AdminStudentPage = () => {
  return (
    <DashboardLayout
      title="Student"
      description="List of all Student, create new Student Data and manage existing student data."
      type="admin"
    >
      <Student />
    </DashboardLayout>
  );
};

export default AdminStudentPage;
