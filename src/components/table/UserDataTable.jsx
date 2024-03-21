import { Link } from 'react-router-dom';
import Select from 'react-select';

const UserDataTable = ({ data, userStatus, updateUserStatus }) => {
  const headers = [
    'ID',
    'Name',
    'Contact No.',
    'Address',
    'Status',
    'Action'
  ];
  
  return (
    <div className="overflow-x-auto mt-4 justify-center min-h-screen">
      <table className="table justify-center bg-[#191919]">
      <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="text-white text-lg font-semibold text-center"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={user._id}>
              <td className="text-white text-md font-base text-center">{index + 1}</td>
              <td className="text-white text-md font-base text-center">{user.name}</td>
              <td className="text-white text-md font-base text-center">{user.contact_no}</td>
              <td className="text-white text-md font-base text-center">
                {`${
                  user.address.houseNumber ? `#${user.address.houseNumber}, ` : ''
                } ${
                  user.address.street ? `${user.address.street}, ` : ''
                } Brgy.${user.address.barangay}, 
                  ${user.address.municipality},   ${user.address.province}, ${
                  user.address.country
                }`}
              </td>
              <td className="text-black text-md font-base text-center">
                <Select
                  options={[
                    { value: 'active', label: 'Active' },
                    { value: 'disabled', label: 'Disabled' },
                  ]}
                  value={{
                    value: userStatus[index] || 'active',
                    label: userStatus[index] || 'Active',
                  }}
                  onChange={(selectedOption) =>
                    updateUserStatus(index, selectedOption.value)
                  }
                  className="px-2 py-1 fs-5 rounded-lg text-md"
                />
              </td>
              <td className="text-white text-md font-base text-center flex items-center justify-center">
                <Link
                  to={`${user._id}`}
                  className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 
                    focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 
                    dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDataTable;
