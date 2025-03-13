import { useState} from "react";
import Navbar from "../../../components/admin/AdminNavbar";
import Sidebar from "../../../components/admin/AdminSidebar";


const Admin = (props) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);  
 
  const toggleSideBar = () => setIsSideBarOpen(!isSideBarOpen);
  return (
    <>
      <Navbar toggleMenu={toggleSideBar} menuStatus={isSideBarOpen} />

      <div className="flex gap-0">
        <aside className="pt-0 pr-4 overflow-y-auto overflow-x-hidden fixed top-[64px] left-0 md:sticky md-left-0 h-full md:h-[100vh] z-20">
          <Sidebar menuStatus={isSideBarOpen} toggleMenu={toggleSideBar} />
        </aside>

        <main className=" w-full min-h-[100vh] h-full md:l-0  overflow-hidden">
{ props.children}
        </main>
      </div>
    </>
  );
};

export default Admin;
