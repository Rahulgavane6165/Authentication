import Link from "next/link";
import  SignOut from "../auth/SignOut";
import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession(options);
  if(!session){
    redirect("/")
  }
  return (
    <>
      <section className="relative w-full bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl text-center bg-green-200 p-12 pr-23 ltr:sm:text-left rtl:sm:text-right">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Welcome to the dashboard!
              <strong className="block font-extrabold text-rose-700">
                {" "}
                {session.user.name} .{" "}
              </strong>
            </h1>

            <p className="mt-4 max-w-lg sm:text-xl/relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
              illo tenetur fuga ducimus numquam ea!
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-center">
              <p className="font-bold">User ID: {session.user.id}</p>
              <p className="font-bold">Email: {session.user.email}</p>
              <p className="font-bold">Role: {session.user.role}</p>
              <p className="font-bold">Group: {session.user.group}</p>
              {/* <p className="font-bold">Access type: {session.user.access_type}</p> */}
              <p className="font-bold">usertype: {session.user.usertype}</p>
             

              <Link
                className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:text-white focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
                href="/api/auth/signout?callbackUrl=/"
              >
                Logout
              </Link>

              <SignOut/>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
