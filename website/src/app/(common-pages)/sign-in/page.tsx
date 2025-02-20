"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignIn() {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const credentials = {
        email: event?.target.email.value,
        password: event?.target.password.value,
        Login: true,
      };

      const result = await signIn("credentials", {
        ...credentials,
        redirect: false,
        callbackUrl: "/",
      });

      if (result?.ok) {
        toast.success("Login Successful");
        router.push("/");
      }

      if (result?.error) {
        toast.error("Invalid Credential");
        console.log(result);
      }
    } catch (error) {
      console.log("bnagla error", error);

      toast.error("Login Failed");
    }
  };

  return (
    <div>
      <main id="content" role="main" className="w-full  max-w-md mx-auto p-6">
        <div className="mt-7 bg-white  rounded-xl shadow-lg   border-2 border-indigo-300">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 ">Forgot password?</h1>
            </div>
            <div className="mt-5">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold ml-1 mb-2 ">
                      Email address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="input-field"
                        aria-describedby="email-error"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-bold ml-1 mb-2 ">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="input-field"
                      />
                    </div>
                  </div>
                  <p className=" text-sm text-gray-600 ">
                    Are you new?
                    <Link
                      className="text-blue-600 decoration-2 ms-1 hover:underline font-medium"
                      href="#"
                    >
                      Register
                    </Link>
                  </p>

                  <button type="submit" className="btn-primary ">
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
