import axios from "axios";
import sendEmail from "../utils/sendEmail";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const useUpdateActionStatus = (actionStatus, setActionStatus) => {
  const token = Cookies.get("token");

  const updateActionStatus = async (id, index, userId, newStatus) => {
    const updatedStatus = [...actionStatus];
    updatedStatus[index] = newStatus;
    setActionStatus(updatedStatus);

    try {
      const userResponse = await axios.get(
        `${import.meta.env.VITE_CRS_API_KEY}/api/users/${userId}`
      );

      await axios.put(
        `${import.meta.env.VITE_CRS_API_KEY}/api/reports/${id}`,
        { action_status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await sendEmail({
        to_email: userResponse.data.email,
        subject: "Report Status in Crime Reporting System",
        message: `
          We are pleased to inform you that your report's status changes to ${newStatus}.
          Thank you for your cooperation.`,
      });

      toast.success(`Status updated to ${newStatus} successfully!`);
    } catch (error) {
      console.error(error);
      updatedStatus[index] = actionStatus[index];
      setActionStatus(updatedStatus);
      toast.error(`Failed to update status to ${newStatus}. Please try again.`);
    }
  };

  return updateActionStatus;
};

export default useUpdateActionStatus;
