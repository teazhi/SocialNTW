import React, { useState, useEffect } from 'react';

type SocialMediaData = {
  username: string;
  profilePic: string;
  followers: number;
};

export default function Dashboard() {
  const [socialMediaData, setSocialMediaData] = useState<SocialMediaData | null>(null);

  useEffect(() => {
    // Replace this with your logic to fetch the social media data
    fetch('/instagram/dashboard')
      .then((response) => response.json())
      .then((data) => {
        setSocialMediaData({
          username: data.username,
          profilePic: data.profile_picture_url,
          followers: data.followers_count, // Adjust this according to the actual API
        });
      })
      .catch((error) => {
        console.error('Error fetching social media data:', error);
      });
  }, []);

  if (!socialMediaData) return <div>Loading...</div>; // Display a loading message while the data is being fetched

  const { username, profilePic, followers } = socialMediaData;

  return (
    <section className="bg-gradient-to-b from-gray-600 to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 pb-12 md:pt-20 md:pb-20">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 text-white">
              <img src={profilePic} alt={`${username}'s profile`} className="rounded-full mb-4" />
              <h1>{username}</h1>
              <p className="text-gray-400">{followers} Followers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
