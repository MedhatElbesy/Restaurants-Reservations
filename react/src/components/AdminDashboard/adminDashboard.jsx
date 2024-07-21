import './admin.css';
import Sidebar from './layout/Sidebar/Sidebar';
// import Content from './layout/Content/Content';
import { Outlet } from "react-router-dom";
function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <Outlet/>
    </div>
  );
}

export default AdminDashboard;
