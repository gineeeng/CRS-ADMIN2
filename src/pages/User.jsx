import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import SearchBar from "../components/input/Searchbar";
import useFetchData from "../hooks/useFetchData";
import Loader from "../components/Loader";
import UserDataTable from "../components/table/UserDataTable";
import ReadyToPrintUserTable from "../components/table/ReadyToPrintUserTable";

const User = () => {
  const token = Cookies.get("token");
  const { data, loading } = useFetchData(
    `${import.meta.env.VITE_CRS_API_KEY}/api/users`
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [userStatus, setUserStatus] = useState([]);

  useEffect(() => {
    if (data) {
      const initialUserStatus = data.map((user) => user.status);
      setUserStatus(initialUserStatus);
    }
  }, []);

  const updateUserStatus = (index, newStatus) => {
    const updatedStatus = [...userStatus];
    updatedStatus[index] = newStatus;
    setUserStatus(updatedStatus);

    axios
      .put(
        `${import.meta.env.VITE_CRS_API_KEY}/api/users/${
          data[index]._id
        }/status`,
        {
          actionStatus: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success(`Status updated to ${newStatus} successfully!`);
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          `Failed to update status to ${newStatus}. Please try again.`
        );
      });
  };

  const filteredUsers = data.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <Loader />;

  return (
    <div className="p-2 justify-center text-4xl">
      <div className="flex gap-2 items-center justify-between mt-4">
        <h1 className="font-semibold">User Management</h1>
        <ReadyToPrintUserTable data={filteredUsers} />
      </div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <UserDataTable
        data={filteredUsers}
        userStatus={userStatus}
        updateUserStatus={updateUserStatus}
      />
    </div>
  );
};

export default User;
