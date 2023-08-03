export const metadata = {
  title: 'Dashboard | smdash',
  description: 'Page description',
}

import Link from 'next/link'

interface Post {
  imageUrl: string;
  caption: string;
}

interface SocialMediaData {
  username?: string;
  profilePic?: string;
  bio?: string;
  followers?: number;
  posts?: Post[];
}

export default function Dashboard({ socialMediaData = {} }: { socialMediaData?: SocialMediaData }) {
  const {
    username = 'username_here',
    profilePic = 'profile_picture_url_here',
    bio = 'User bio here',
    followers = 1000,
    posts = [],
  } = socialMediaData;

  return (
    <section className="bg-gradient-to-b from-gray-600 to-gray-901">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 pb-12 md:pt-20 md:pb-20">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 text-white">
              <img src={profilePic} alt={`${username}'s profile`} className="rounded-full mb-4" />
              <h1>{username}</h1>
              <p className="text-gray-300">{bio}</p>
              <p className="text-gray-400">{followers} Followers</p>
            </div>
            <div className="md:w-3/4">
              <h2 className="text-white mb-4">Recent Posts</h2>
              <div className="grid grid-cols-3 gap-4">
                {posts.map((post: Post, index: number) => (
                  <div key={index}>
                    <img src={post.imageUrl} alt={post.caption} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}