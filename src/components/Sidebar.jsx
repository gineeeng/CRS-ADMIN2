import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineLocalPolice } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { TbAmbulance } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { GiPoliceOfficerHead } from "react-icons/gi";
import { FaFire, FaBiohazard } from "react-icons/fa";
import Cookies from "js-cookie";

const Sidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleLogout = async () => {
    if (!confirm("Are you sure you want to logout")) {
      return;
    }

    Cookies.remove("role");
    Cookies.remove("token");
    Cookies.remove("userId");

    navigate("/");
  };

  const menus = [
    { name: "Dashboard", link: "/dashboard", icon: MdOutlineDashboard },
    { name: "Crimes", link: "/dashboard/crime", icon: MdOutlineLocalPolice },
    { name: "Accidents", link: "/dashboard/accident", icon: TbAmbulance },
    { name: "Hazards", link: "/dashboard/hazard", icon: FaBiohazard },
    { name: "Arsons", link: "/dashboard/arson", icon: FaFire },
    { name: "Users", link: "/dashboard/user", icon: AiOutlineUser },
  ];

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  return (
    <section className="flex">
      <div
        className={`bg-[#191919] min-h-screen ${
          open ? "w-16 sm:w-60" : "w-16"
        } duration-500 text-gray-100 px-2`}
      >
        <div className="py-2 flex justify-end">
          <HiMenuAlt3
            size={24}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="group flex items-center text-2xl font-bold gap-2 font-medium p-2 bg-gray-700 rounded-md border mb-6">
          <div>
            <GiPoliceOfficerHead />
          </div>
          <h2
            style={{
              transitionDelay: `${3 + 3}00ms`,
            }}
            className={`whitespace-pre duration-500 hidden sm:block    ${
              !open && " opacity-0 translate-x-20 overflow-hidden"
            }`}
          >
            CRS Admin
          </h2>
          <h2
            className={`${
              open && "hidden"
            } hidden sm:block  left-36 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden `}
          >
            CRS Admin
          </h2>
        </div>
        <div className="mt-2 flex flex-col gap-3 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu.link}
              onClick={() => handleMenuClick(i)}
              key={i}
              className={`${
                menu?.margin && "mt-3"
              } group flex items-center text-xl gap-2 font-medium p-2 hover:bg-gray-700 rounded-md ${
                selectedMenu === i ? "border border-white" : ""
              }`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 hidden sm:block ${
                  !open && "opacity-0 translate-x-20 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } hidden sm:block  left-36 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
          <div
            className="group flex items-center text-xl gap-2 font-medium p-2 hover:bg-gray-700 rounded-md"
            onClick={handleLogout}
          >
            <div>
              <FiLogOut />
            </div>
            <h2
              style={{
                transitionDelay: `${3 + 3}00ms`,
              }}
              className={`whitespace-pre duration-500 hidden sm:block ${
                !open && "opacity-0 translate-x-20 overflow-hidden "
              }`}
            >
              Logout
            </h2>
            <h2
              className={`${
                open && "hidden"
              }hidden sm:block left-36 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden `}
            >
              Logout
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
