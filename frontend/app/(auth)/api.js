// api.js

const API_URL = 'https://social-ntw-api.vercel.app'; // Replace with your actual backend API URL

export async function fetchUserData(userId) {
  const response = await fetch(`${API_URL}/AllUsers/users/${userId}`);
  const userData = await response.json();
  return userData;
}

export async function updateUserData(userId, updatedUserData) {
  await fetch(`${API_URL}/AllUsers/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedUserData),
  });
}
