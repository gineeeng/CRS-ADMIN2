import React, { useState, useContext } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineLocalPolice, MdOutlineBookmark } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";
import Cookies from "js-cookie";
import Logo from "../assets/logo.png";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const Sidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const { theme, toggleTheme } = useContext(ThemeContext);

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
    { name: "Reports", link: "/dashboard/reports", icon: MdOutlineLocalPolice },
    { name: "Users", link: "/dashboard/user", icon: AiOutlineUser },
    { name: "Archive", link: "/dashboard/archive", icon: MdOutlineBookmark },
    { name: "Settings", link: "/dashboard/settings", icon: AiOutlineUser },

  ];

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  return (
    <section className="flex">
      <div
        className={`bg-yellow-500 min-h-screen duration-500 text-gray-100 px-2
         ${open ? "w-16 sm:w-60" : "w-16"}`}
      >
        <div className="py-2 flex justify-end">
          <HiMenuAlt3
            size={24}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="group flex items-center text-2xl bg-white rounded-lg text-lime-700 font-bold gap-2 p-2 mb-2">
          <div>
            <img  src={Logo} alt="Logo" className="w-full" />
          </div>
          <h2
            style={{
              transitionDelay: `${3 + 3}00ms`,
            }}
            className={`whitespace-pre duration-500 hidden sm:block ${
              !open && " opacity-0 translate-x-20 overflow-hidden font-bold"
            }`}
          >
            CRS Admin
          </h2>
          <h2
            className={`${
              open && "hidden"
            } hidden sm:block left-36 bg-white font-bold whitespace-pre rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden`}
          >
            CRS Admin
          </h2>
        </div>
        <div className="group flex items-center text-xl gap-2 font-medium p-2 rounded-md mt-3 cursor-pointer">
          <div>
          <DarkModeSwitch
            className="text-white"
            checked={theme === "dark"}
            onChange={toggleTheme}
            size={30}
          />
          </div>
          <h2
            style={{
              transitionDelay: `${menus.length + 3}00ms`,
            }}
            className={`whitespace-pre duration-500 hidden sm:block ${
              !open && "opacity-0 translate-x-20 overflow-hidden"
            }`}
          >
            {theme === "light" ? "Turn Dark" : "Turn Light"}
          </h2>
          <h2
            className={`${
              open && "hidden"
            } hidden sm:block left-36 bg-white font-semibold whitespace-pre rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden`}
          >
            {theme === "light" ? "Turn Dark" : "Turn Light"}
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
              } group flex items-center dark:text-white text-xl gap-2 font-medium p-2 hover:bg-lime-700 rounded-md ${
                selectedMenu === i
                  ? "bg-lime-700 border border-white text-gray-white"
                  : ""
              }`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 hidden sm:block ${
                  !open &&
                  "opacity-0 translate-x-20 overflow-hidden   dark:text-white"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } hidden sm:block  left-36 bg-white whitespace-pre text-gray-700 dark:text-white rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
          <div
            className="group flex items-center text-xl gap-2 font-medium p-2 bg-red-700 hover:bg-red-600 rounded-md"
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
              }hidden sm:block left-36 bg-white font-semibold whitespace-pre rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden `}
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
