import React, { useState } from "react";
import { useRouter } from "next/router";
import Auth from "layouts/Auth.js";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import Link from "next/link";

export default function Lupakatasandi() {
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const email = data.email;

      const response = await fetch(
        "http://localhost:3001/api/user/forgetpassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const res = await response.json();
      console.log(res);
      if (res.success) {
        toast.success(res.success.messages);
        setSubmitting(false);
      } else {
        console.error("Gagal Mengirimkan Password", res.error);
        toast.error(res.error.messages);
        setSubmitting(false);
      }
    } catch (error) {
      console.error("Error occurred during password reset:", error);
      toast.error("An error occurred during the password reset process.");
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-200 border-0">
              <div className="flex-auto  lg:px-10 pt-0 rounded-t mb-0 px-6 py-6">
                <div className="text-slate-400 text-center mb-6 font-bold mt-8">
                  <h4>Silahkan masukan email untuk reset kata sandi</h4>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase  text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-slate-300  bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <span className="text-red-500 text-xs italic mt-1">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <div className="text-center mt-6">
                    {submitting ? (
                      <button
                        type="button"
                        className="inline-flex justify-center leading-6 bg-slate-800 transition ease-in-out duration-150 cursor-not-allowed text-white active:bg-slate-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full "
                        disabled
                      >
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span className="ml-2">Loading...</span>
                      </button>
                    ) : (
                      <>
                        <button
                          className="bg-slate-800 text-white active:bg-slate-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="submit"
                          onClick={handleSubmit(onSubmit)}
                        >
                          Kirim Email Konfirmasi
                        </button>
                      </>
                    )}
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <Link href="/" className="text-slate-200">
                  <small>Sudah Punya Akun?</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Lupakatasandi.layout = Auth;
