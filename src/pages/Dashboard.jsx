import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Cookies from "js-cookie";

const Dashboard = () => {
  const navigate = useNavigate();
  const token = Cookies.get('token');

  useEffect(() => {
    if (!token) {
      return navigate('/');
    }
  }, [token]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="overflow-y-auto  w-full max-w-screen bg-white text-gray-600 dark:bg-[#2e2e2e] dark:text-white ">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
