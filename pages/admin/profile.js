import Admin from "layouts/Admin";
import { getSession, signOut } from "next-auth/react";
import moment from "moment";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Profile({ data }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  console.log("data", data);

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleCancel = () => {
    router.push("/myaccount/resources");
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
                      type="text"
                      placeholder="Email"
                      className="border-0 px-3 py-3 placeholder-slate-300  bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase  text-xs font-bold mb-2">
                      Kata sandi lama
                    </label>
                    <input
                      type="password"
                      placeholder=" Kata sandi lama"
                      className="border-0 px-3 py-3 placeholder-slate-300  bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
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
                    />
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
                    />
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
