"use client";

import React from 'react';
import Link from 'next/link';
import { GetServerSidePropsContext } from 'next';

type SocialMediaData = {
  username: string;
  profilePic: string;
  followers: number;
};

export default function Dashboard({ socialMediaData }: { socialMediaData: SocialMediaData }) {
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
