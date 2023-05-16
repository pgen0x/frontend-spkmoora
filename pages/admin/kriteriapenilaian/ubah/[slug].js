import React, { useState, useEffect } from "react";
import Admin from "layouts/Admin.js";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import toast from "react-hot-toast";

export default function UbahKriteriaPenilaian() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onMenuOpen = () => setIsMenuOpen(true);
  const onMenuClose = () => setIsMenuOpen(false);
  const [isLoading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState([
    {
      value: ">=",
      label: ">=",
    },
    {
      value: "<",
      label: "<",
    },
  ]);
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
        `http://localhost:3001/api/kriteriapenilaian/update/${router.query.slug}`,
        {
          kode_kriteria: data?.kode_kriteria,
          nama_kriteria: data?.nama_kriteria,
          bobot: data?.bobot,
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
      router.push("/admin/kriteriapenilaian");
    } catch (error) {
      toast.error(error.message);
      console.error("Error:", error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3001/api/kriteriapenilaian/getbyid/${router.query.slug}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setValue("kode_kriteria", response.data.kode_kriteria);
      setValue("nama_kriteria", response.data.nama_kriteria);
      setValue("bobot", response.data.bobot);
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
                  Ubah Kriteria Penilaian
                </h6>
                <div>
                  <button
                    className="bg-slate-700 active:bg-slate-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleSubmit(onSubmit)()}
                  >
                    <i className="fas fa-save mr-2"></i>Simpan
                  </button>
                  <Link href="/admin/kriteriapenilaian">
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
                        Kode Kriteria
                      </label>
                      <input
                        type="text"
                        placeholder="Kode Kriteria"
                        className="border-0 px-3 py-3 placeholder-slate-300  bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        {...register("kode_kriteria", {
                          required: true,
                          pattern: {
                            value: /^(C1|C2|C3)$/,
                            message: "Kode Kriteria harus C1, C2, atau C3",
                          },
                        })}
                      />

                      {errors?.kode_kriteria && (
                        <span className="mt-1 text-xs italic text-red-500">
                          {errors.kode_kriteria.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase  text-xs font-bold mb-2">
                        Nama Kriteria
                      </label>
                      <input
                        type="text"
                        placeholder="Nama Kriteria"
                        className="border-0 px-3 py-3 placeholder-slate-300  bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        {...register("nama_kriteria", { required: true })}
                      />
                      {errors?.nama_kriteria && (
                        <span className="mt-1 text-xs italic text-red-500">
                          {errors.nama_kriteria.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase  text-xs font-bold mb-2">
                        Bobot
                      </label>
                      <input
                        type="number"
                        placeholder="Bobot"
                        className="border-0 px-3 py-3 placeholder-slate-300  bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        {...register("bobot", { required: true })}
                      />
                      {errors?.bobot && (
                        <span className="mt-1 text-xs italic text-red-500">
                          {errors.bobot.message}
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

UbahKriteriaPenilaian.layout = Admin;
