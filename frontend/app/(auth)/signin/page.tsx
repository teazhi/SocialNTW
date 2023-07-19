"use client";

import React from 'react';
import axios from 'axios';
import Link from 'next/link'


export default function SignIn() {
  const [signinMessage, setSigninMessage] = React.useState('');
  // Handle sign in form submission, which is invoked when the sign in button is clicked
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement)?.value;
    const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement)?.value;

    // Sends POST HTTP request to /signin route in the backend with email and password
    try {
      //https://social-ntw-api.vercel.app
      const response = await axios.post('https://social-ntw-api.vercel.app/signin', { email, password });
      console.log(response.data);
      console.log(response.data);
      setSigninMessage('Sign up successful!'); // Display a success message
      // TODO: Redirect the user to the homepage or dashboard
    } catch (error) {
      console.error(error);
      // TODO: Show an error message to the user
      setSigninMessage('Sign up failed. Please try again.'); // Display an error message
    }
  };

  return (
    <section className="bg-gradient-to-b from-gray-900 to-gray-901">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 pb-12 md:pt-20 md:pb-20">

          {/* Page header */}
          <div className="max-w-2xl mx-auto text-orange-100 text-center pb-6 md:pb-6">
            <h1 className="h1">Sign in</h1>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            <form onSubmit={handleSignIn}>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Email</label>
                  <input id="email" type="email" className="form-input w-full text-gray-800" placeholder="Enter your email address" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <div className="flex justify-between">
                    <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Password</label>
                    <Link href="/reset-password" className="text-sm font-medium text-blue-600 hover:underline">Having trouble signing in?</Link>
                  </div>
                  <input id="password" type="password" className="form-input w-full text-gray-800" placeholder="Enter your password" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <div className="flex justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox" />
                      <span className="text-gray-400 ml-2">Keep me signed in</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button type="submit" className="btn text-white bg-orange-100 w-full">Sign in</button>
                </div>
              </div>
            </form>
            {signinMessage && (
              <div className="text-white text-center mt-4">
                {signinMessage}
              </div>
            )}
            <div className="text-gray-600 text-center mt-6">
              Don't you have an account? <Link href="/signup" className="text-orange-100 hover:underline transition duration-150 ease-in-out">Sign up</Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
