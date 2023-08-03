export const metadata = {
  title: 'Dashboard | smdash',
  description: 'Page description',
};

import Link from 'next/link';
import { GetServerSidePropsContext } from 'next';

type SocialMediaData = {
  username: string;
  profilePic: string;
  followers: number;
};

const Dashboard = ({ socialMediaData }: { socialMediaData: SocialMediaData }) => {
  const { username, profilePic, followers } = socialMediaData;

  return (
    <section className="bg-gradient-to-b from-gray-600 to-gray-901">
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
};

export default Dashboard;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const CLIENT_ID = '6466673846783326'; // Define CLIENT_ID here
    const CLIENT_SECRET = 'c1820458e70bebb7eebdf34e921a0c48'; // Define CLIENT_SECRET here
    const REDIRECT_URI = 'http://www.socialntw.com/dashboard';
    const SCOPE = 'user_profile,user_media';

    const req = context.req;
    if (!req.url) {
      throw new Error('Request URL is undefined');
    }
    const url = new URL(req.url, `http://${req.headers.host}`);
    const authorizationCode = url.searchParams.get('code');

    if (!authorizationCode) {
      const AUTH_URL = `https://api.instagram.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&response_type=code`;
      return {
        redirect: {
          destination: AUTH_URL,
          permanent: false,
        },
      };
    }

    const TOKEN_URL = 'https://api.instagram.com/oauth/access_token';

    const tokenResponse = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=authorization_code&redirect_uri=${REDIRECT_URI}&code=${authorizationCode}`,
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const USER_DETAILS_URL = `https://graph.instagram.com/me?fields=id,username,profile_picture_url&access_token=${accessToken}`;
    const userDetailsResponse = await fetch(USER_DETAILS_URL);
    const userData = await userDetailsResponse.json();

    const socialMediaData = {
      username: userData.username,
      profilePic: userData.profile_picture_url, // Modify this with the correct field from the API
      followers: userData.followers_count, // Modify this with the correct field from the API
    };

    return {
      props: { socialMediaData },
    };
  } catch (error) {
    console.error("Error fetching Instagram followers:", error);
    return {
      props: { socialMediaData: {} },
    };
  }
};
