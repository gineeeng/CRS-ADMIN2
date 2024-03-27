import axios from 'axios';

const useUpdateActionStatus = (data, actionStatus, setActionStatus, token, toast) => {
  const updateActionStatus = (index, newStatus) => {
    const updatedStatus = [...actionStatus];
    updatedStatus[index] = newStatus;
    setActionStatus(updatedStatus);

    axios
      .put(
        `${import.meta.env.VITE_CRS_API_KEY}/api/reports/${data[index]._id}`,
        { action_status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success(`Status updated to ${newStatus} successfully!`);
        const updatedStatus = [...actionStatus];
        updatedStatus[index] = newStatus;
        setActionStatus(updatedStatus);
      })
      .catch((error) => {
        console.log(error);
        updatedStatus[index] = actionStatus[index];
        setActionStatus(updatedStatus);
        toast.error(
          `Failed to update status to ${newStatus}. Please try again.`
        );
      });
  };

  return updateActionStatus;
};

export default useUpdateActionStatus;
