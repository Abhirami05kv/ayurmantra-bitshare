
import SideBar from '../components/SideBar'
import Navbar from '../components/Navbar'
import { Outlet } from "react-router-dom";
function AdminLayout() {
  return (
    <div className="flex h-screen">
      <SideBar/>
      <div className="w-full h-screen">
        <Navbar />
        <section className="h-main-section p-6">
          <Outlet />
        </section>
      </div>
    </div>
  )
}

export default AdminLayout