"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from 'react'; // Import ChangeEvent and FormEvent
import { fetchUserData, updateUserData } from '../api';

export default function Account() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Replace 'USER_ID' with the actual user ID from your MongoDB database
  const userId = 'USER_ID';

  useEffect(() => {
    async function getUserData() {
      try {
        const userData = await fetchUserData(userId);
        setUserData(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    getUserData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => { // Specify the type for 'e' as ChangeEvent<HTMLInputElement>
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => { // Specify the type for 'e' as FormEvent<HTMLFormElement>
    e.preventDefault();
    try {
      await updateUserData(userId, userData);
      alert('Account details updated successfully!');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <section className="bg-gray-901 min-h-screen flex">
      <div className="w-1/3 bg-blue-500 p-8">
        <h1 className="text-white text-2xl mb-4">Account Details</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-1" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-4 py-2 rounded bg-gray-700 text-white"
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-4 py-2 rounded bg-gray-700 text-white"
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-4 py-2 rounded bg-gray-700 text-white"
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
          </div>
          <button
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            type="submit"
          >
            Save Changes
          </button>
        </form>
      </div>

      <div className="w-2/3 bg-red-500 p-8">
        <h1 className="text-white text-2xl mb-4">Edit Account Details</h1>
        {/* Add a separate form here with fields for editing the account details */}
      </div>
    </section>
  );
}
