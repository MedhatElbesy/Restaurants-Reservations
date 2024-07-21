import ReactDOM from 'react-dom/client'
import AdminDashboard from './admindashboard.jsx';
import { SidebarProvider } from './context/SidebarContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <SidebarProvider>
    <AdminDashboard />
  </SidebarProvider>
)
