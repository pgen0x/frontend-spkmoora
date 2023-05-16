import React, { useState, useEffect } from "react";
import Admin from "layouts/Admin.js";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import toast from "react-hot-toast";

export default function UbahJenisKendaraan() {
  const [isLoading, setLoading] = useState(false);
  const token = Cookies.get("token");
  const router = useRouter();
  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
    reset,
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/jeniskendaraan/update/${router.query.slug}`,
        {
          jenis_kendaraan: data?.jenis_kendaraan,
          kapasitas_muatan: data?.kapasitas_muatan,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.success.messages);
      router.push("/admin/jeniskendaraan");
    } catch (error) {
      toast.error(error.message);
      console.error("Error:", error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3001/api/jeniskendaraan/getbyid/${router.query.slug}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setValue("jenis_kendaraan", response.data.jenis_kendaraan);
      setValue("kapasitas_muatan", response.data.kapasitas_muatan);
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setLoading(false);
        // If token is expired, log out the user or refresh the token
        Cookies.remove("token");
        toast.error("Token kedaluwarsa. Silahkan login kembali");
        router.push("/");
      } else {
        toast.error(error.message);
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-slate-700 text-xl font-bold">
                  Ubah Jenis Kendaraan
                </h6>
                <div>
                  <button
                    className="bg-slate-700 active:bg-slate-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleSubmit(onSubmit)()}
                  >
                    <i className="fas fa-save mr-2"></i>Simpan
                  </button>
                  <Link href="/admin/jeniskendaraan">
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
                        Jenis Kendaraan
                      </label>
                      <input
                        type="text"
                        placeholder="Jenis Kendaraan"
                        className="border-0 px-3 py-3 placeholder-slate-300  bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        {...register("jenis_kendaraan", { required: true })}
                      />
                      {errors?.jenis_kendaraan && (
                        <span className="mt-1 text-xs italic text-red-500">
                          {errors.jenis_kendaraan.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="relative w-full mb-3 ">
                      <label className="block uppercase  text-xs font-bold mb-2">
                        Kapasitas Muatan (KG)
                      </label>
                      <input
                        type="text"
                        placeholder="Kapasitas Muatan"
                        className="border-0 px-3 py-3 placeholder-slate-300  bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        {...register("kapasitas_muatan", { required: true })}
                      />

                      {errors?.kapasitas_muatan && (
                        <span className="mt-1 text-xs italic text-red-500">
                          {errors.kapasitas_muatan.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

UbahJenisKendaraan.layout = Admin;
