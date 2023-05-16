import Admin from "layouts/Admin";
import { getSession, signOut } from "next-auth/react";
import moment from "moment";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Link from "next/link";
import axios from "axios";
import React, { useState } from "react";

export default function Profile() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [email, setEmail] = useState("");
  const token = Cookies.get("token");

  const handleEmailUpdate = (event) => {
    const updatedEmail = event.detail.email;
    setEmail(updatedEmail);
  };

  const updateEmail = (newEmail) => {
    // Update the email value
    setEmail(newEmail);

    // Dispatch custom event to notify other components
    document.dispatchEvent(
      new CustomEvent("emailUpdated", { detail: { email: newEmail } })
    );
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/user/update",
        {
          newPassword: data.newPassword,
          newEmail: data.newEmail,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response:", response.data);
      toast.success(response.data.success.messages);
      Cookies.set("email", data.newEmail);
      updateEmail(data.newEmail);
      // Reset form after successful submission
      reset();
    } catch (error) {
      if (error.response) {
        console.log("Error:", error.response.data.error.messages);
        toast.error(error.response.data.error.messages);
      } else {
        console.error("Error:", error.message);
        toast.error(error.message);
      }
    }
  };

  return (
    // Layout for page profile
    <div className="flex flex-wrap">
      <div className="w-full px-4">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-slate-700 text-xl font-bold">
                Perbarui Profil
              </h6>
              <div>
                <button
                  className="bg-slate-700 active:bg-slate-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => handleSubmit(onSubmit)()}
                >
                  <i className="fas fa-save mr-2"></i>Simpan
                </button>
                <Link href="/admin/dashboard">
                  <button
                    className="bg-slate-700 active:bg-slate-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    <i className="fas fa-arrow-left mr-2"></i>Kembali
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form>
              <div className="flex flex-wrap mt-6 mb-6">
                <div className="w-full  px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase  text-xs font-bold mb-2">
                      Email
                    </label>
                    <input
                      defaultValue={Cookies.get("email")}
                      type="text"
                      placeholder="Email"
                      className="border-0 px-3 py-3 placeholder-slate-300  bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      {...register("newEmail", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Alamat email tidak valid",
                        },
                      })}
                    />
                    {errors.newEmail && (
                      <p className="text-red-500 text-xs italic mt-1">
                        {errors.newEmail.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="w-full px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase  text-xs font-bold mb-2">
                      Kata sandi baru
                    </label>
                    <input
                      type="password"
                      placeholder="Kata sandi baru"
                      className="border-0 px-3 py-3 placeholder-slate-300  bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      {...register("newPassword", {
                        required: "Password is required",
                      })}
                    />
                    {errors.newPassword && (
                      <p className="text-red-500 text-xs italic mt-1">
                        {errors.newPassword.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase  text-xs font-bold mb-2">
                      Konfirmasi kata sandi baru
                    </label>
                    <input
                      type="password"
                      placeholder="Konfirmasi kata sandi baru"
                      className="border-0 px-3 py-3 placeholder-slate-300  bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      {...register("confirmPassword", {
                        required: "Password is required",
                        validate: (value) => {
                          return (
                            value === watch("newPassword") ||
                            "Konfirmasi kata sandi tidak cocok dengan kata sandi baru"
                          );
                        },
                      })}
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-xs italic mt-1">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

Profile.layout = Admin;
