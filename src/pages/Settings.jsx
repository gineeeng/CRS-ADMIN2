import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const Settings = () => {
  const token = Cookies.get('token');
  const adminId = Cookies.get('userId');
  const [adminInfo, setAdminInfo] = useState({
    name: '',
    email: '',
    role: '',
  });
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  useEffect(() => {
    // Fetch current admin info on component mount
    axios.get(`${import.meta.env.VITE_CRS_API_KEY}/api/admins/${adminId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      setAdminInfo({
        name: response.data.name,
        email: response.data.email,
      });
    })
    .catch(error => {
      console.error('Error fetching admin info:', error);
      toast.error('Failed to fetch admin info. Please try again.');
    });
  }, [adminId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (passwordField) => {
    setShowPasswords((prevShow) => ({
      ...prevShow,
      [passwordField]: !prevShow[passwordField],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`${import.meta.env.VITE_CRS_API_KEY}/api/admins/${adminId}`, adminInfo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      toast.success('Admin info updated successfully!');
    })
    .catch(error => {
      console.error('Error updating admin info:', error);
      toast.error('Failed to update admin info. Please try again.');
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error('New password and confirm password do not match');
      return;
    }
    axios.put(`${import.meta.env.VITE_CRS_API_KEY}/api/edit-password/${adminId}`, {
      oldPassword: passwords.oldPassword,
      newPassword: passwords.newPassword,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      toast.success('Password changed successfully!');
      setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
    })
    .catch(error => {
      console.error('Error changing password:', error);
      toast.error('Failed to change password. Please try again.');
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl font-semibold mb-4">Account Settings</h1>
      
      <div className="mb-8 bg-white shadow-lg rounded-lg p-6 dark:bg-[#191919] dark:text-white">
        <h2 className="text-xl font-semibold mb-4">Update Personal Info</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block">Username:</label>
            <input
              type="text"
              name="name"
              value={adminInfo.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded dark:bg-[#2e2e2e] dark:border-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block">Email:</label>
            <input
              type="email"
              name="email"
              value={adminInfo.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded dark:bg-[#2e2e2e] dark:border-white"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-lime-700 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Update Info
          </button>
        </form>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 dark:bg-[#191919] dark:text-white">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handlePasswordSubmit}>
          <div className="mb-4">
            <label className="block">Current Password:</label>
            <div className="relative">
              <input
                type={showPasswords.oldPassword ? 'text' : 'password'}
                name="oldPassword"
                value={passwords.oldPassword}
                onChange={handlePasswordChange}
                className="mt-1 p-2 w-full border rounded dark:bg-[#2e2e2e] dark:border-white"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                onClick={() => togglePasswordVisibility('oldPassword')}
              >
                {showPasswords.oldPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block">New Password:</label>
            <div className="relative">
              <input
                type={showPasswords.newPassword ? 'text' : 'password'}
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                className="mt-1 p-2 w-full border rounded dark:bg-[#2e2e2e] dark:border-white"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                onClick={() => togglePasswordVisibility('newPassword')}
              >
                {showPasswords.newPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block">Confirm New Password:</label>
            <div className="relative">
              <input
                type={showPasswords.confirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                className="mt-1 p-2 w-full border rounded dark:bg-[#2e2e2e] dark:border-white"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                onClick={() => togglePasswordVisibility('confirmPassword')}
              >
                {showPasswords.confirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="bg-lime-700 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
