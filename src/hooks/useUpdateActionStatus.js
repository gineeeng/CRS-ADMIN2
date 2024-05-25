import axios from 'axios';
import sendEmail from '../utils/sendEmail';
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const useUpdateActionStatus = (actionStatus, setActionStatus) => {
  const token = Cookies.get("token");

  const updateActionStatus = (id, index, newStatus) => {
    const updatedStatus = [...actionStatus];
    updatedStatus[index] = newStatus;
    setActionStatus(updatedStatus);

    axios
      .put(
        `${import.meta.env.VITE_CRS_API_KEY}/api/reports/${id}`,
        { action_status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async () => {
        await sendEmail({
          to_email: "diestapatrick1@gmail.com",
          subject: "Report Status in Crime Reporting System",
          message: `
          We are pleased to inform you that your report's status changes to ${newStatus}.
          
          Thank you for cooperation.`,
        });
        toast.success(`Status updated to ${newStatus} successfully!`);
      })
      .catch((error) => {
        console.log(error);
        updatedStatus[index] = actionStatus[index];
        setActionStatus(updatedStatus);
        toast.error(`Failed to update status to ${newStatus}. Please try again.`);
      });
  };

  return updateActionStatus;
};

export default useUpdateActionStatus;
