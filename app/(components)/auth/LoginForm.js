/* eslint-disable react/no-unescaped-entities */
// components/LoginForm.js
"use client";

import { signIn, useSession } from "next-auth/react";

import ForgotPasswordForm from "./ResetPassword";
import GithubButton from "./signinbtns/GithubSignin";
import GoogleButton from "./signinbtns/GoggleSignin";
import Link from "next/link";
import Loader from '../loader/loader'
import React from "react";
import ReactCardFlip from "react-card-flip";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading</div>;
  }
  if (session && session.user) {
    router.replace("pages/Dashboard")
  }
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        remember: rememberMe ? "1" : undefined,
      });
      if (!result.error) {
        router.push("/pages/Dashboard");
        toast.success("Login success");
      } else {
        setError("*Invalid Credentials");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  function flipcard() {
    setIsFlipped(!isFlipped);
  }

  return (
    <>
      <ReactCardFlip
        flipDirection="vertical"
        isFlipped={isFlipped}
        className="flex align-middle justify-center"
      >
        <div className="w-80 bg-white p-8 pt-2 rounded shadow-md flex flex-col">
          {isSubmitting && (
           <Loader/>
          )}{" "}
          <form onSubmit={handleSubmit}>
            {error && (
              <div className=" text-red-500 px-6 py-1 rounded-md">{error}</div>
            )}

            <h5 className="text-xl  mb-3">Sign in into your account</h5>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border border-lime-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border border-lime-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4 flex justify-between">
              <div>
                <input
                  id="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2 border-lime-400 cursor-pointer"
                />
                <label htmlFor="rememberMe" className="text-sm">
                  Remember Me
                </label>
              </div>
              <div className="mr-2">
                <Link
                  href="#"
                  className="text-blue-500 hover:underline"
                  onClick={flipcard}
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            <button
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline self-end"
              type="submit"
            >
              Login
            </button>
            <span className="flex items-center pt-5 pb-5">
              <span className="h-px flex-1 bg-black"></span>
              <span className="shrink-0 px-6">or</span>
              <span className="h-px flex-1 bg-black"></span>
            </span>
          </form>
          {/* Login with Google */}
          <GoogleButton />
          {/* Login with Github */}
          <GithubButton />
          <p className="mt-3">
            Don't have an account?{" "}
            <strong>
              <Link className="text-blue-700 hover:text-blue-800 hover:underline" href="/pages/Register">
                Sign up{" "}
              </Link>
            </strong>{" "}
          </p>
        </div>

        <div>
          <ForgotPasswordForm />
        </div>
      </ReactCardFlip>
    </>
  );
};

export default LoginForm;
