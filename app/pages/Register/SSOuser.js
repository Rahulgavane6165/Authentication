import GithubButton from "../../(components)/auth/signinbtns/GithubSignin";
import GoogleButton from "../../(components)/auth/signinbtns/GoggleSignin";
import React from "react";

function SSOUser() {
  return (
    <div className="w-72  bg-white p-8 pt-4 rounded shadow-md flex flex-col">
      <h4 className="mb-5">Sign in into your account</h4>

      <GoogleButton />
      <GithubButton />
    </div>
  );
}

export default SSOUser;
