import NewsStatistics from "../../components/admin/NewsStatistics"
import Admin from "./AdminHOC/admin";

const AdminDashboard = () => {
return (
    <Admin>

        <div className="bg-gray-300 p-4  h-full min-h-[100vh] m-t-0 mix-blend-multiply">
          <h2 className="text-4xl -mb-2 text-gray-600 text-center">
            Welcome Admin -
            <span className="text-red-900 text-2xl">Username</span>
          </h2>
          <h1 className="text-2xl font-bold mb-4">News Statistics</h1>
          <div className="bg-white rounded-lg mt-4 w-full">
          <NewsStatistics/>
          </div>
        </div>
    </Admin>
  );
};

export default AdminDashboard;
