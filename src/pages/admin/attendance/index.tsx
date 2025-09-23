import DashboardLayout from "@/components/layouts/DashboardLayout";
import Attendance from "@/components/views/Admin/Attendance";

const AdminAttendancePage = () => {
  return (
    <DashboardLayout
      title="Attandance"
      description="List of all Attendance, create new Attendance Data and manage existing Attendance data."
      type="admin"
    >
      <Attendance />
    </DashboardLayout>
  );
};

export default AdminAttendancePage;
