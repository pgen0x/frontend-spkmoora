import React, { useState, useEffect } from "react";
import Admin from "layouts/Admin.js";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import toast from "react-hot-toast";
export default function InputKriteriaPenilaian() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onMenuOpen = () => setIsMenuOpen(true);
  const onMenuClose = () => setIsMenuOpen(false);
  const [tujuanOptions, setTujuanOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const token = Cookies.get("token");
  const router = useRouter();
  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
    reset,
  } = useForm();

  useEffect(() => {
    async function fetchTujuanOptions() {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/bobotkriteria/get",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const tujuanData = response.data
          .filter((item) => item.kriteria_penilaian.nama_kriteria === "Tujuan")
          .map((item) => ({
            value: item.nilai,
            label: item.nilai,
          }));
        setTujuanOptions(tujuanData);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // If token is expired, log out the user or refresh the token
          Cookies.remove("token");
          toast.error("Token kedaluwarsa. Silahkan login kembali");
          router.push("/");
        } else {
          toast.error(error.message);

          console.error(error);
        }
      }
    }
    fetchTujuanOptions();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/data/create",
        {
          nama_rute: data?.nama_rute,
          tanggal_pengiriman: data?.tanggal_pengiriman,
          total_berat_paket: data?.total_berat_paket,
          tujuan: data?.tujuan.value,
          total_paket: data?.total_paket,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response:", response.data);
      toast.success("Data berhasil ditambahkan");
      // Reset form after successful submission
      reset();
    } catch (error) {
      toast.error(error.message);
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-slate-700 text-xl font-bold">
                  Tambah Data
                </h6>
                <div>
                  <button
                    className="bg-slate-700 active:bg-slate-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleSubmit(onSubmit)()}
                  >
                    <i className="fas fa-save mr-2"></i>Simpan
                  </button>
                  <Link href="/admin/data">
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
                        Nama Rute
                      </label>
                      <input
                        type="text"
                        placeholder="Nama Rute"
                        className="border-0 px-3 py-3 placeholder-slate-300  bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        {...register("nama_rute", { required: true })}
                      />
                      {errors?.nama_rute && (
                        <span className="mt-1 text-xs italic text-red-500">
                          {errors.nama_rute.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase  text-xs font-bold mb-2">
                        Tanggal Pengiriman
                      </label>
                      <input
                        type="date"
                        placeholder="Tanggal Pengiriman"
                        className="border-0 px-3 py-3 placeholder-slate-300  bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        {...register("tanggal_pengiriman", { required: true })}
                      />
                      {errors?.tanggal_pengiriman && (
                        <span className="mt-1 text-xs italic text-red-500">
                          {errors.tanggal_pengiriman.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase  text-xs font-bold mb-2">
                        Total Berat Paket
                      </label>
                      <input
                        type="number"
                        placeholder="Total Berat Paket"
                        className="border-0 px-3 py-3 placeholder-slate-300  bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        {...register("total_berat_paket", { required: true })}
                      />
                      {errors?.total_berat_paket && (
                        <span className="mt-1 text-xs italic text-red-500">
                          {errors.total_berat_paket.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase  text-xs font-bold mb-2">
                        Tujuan
                      </label>
                      <Controller
                        name="tujuan"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={tujuanOptions}
                            placeholder="Pilih Tujuan"
                            isClearable
                          />
                        )}
                      />
                      {errors?.tujuan && (
                        <span className="mt-1 text-xs italic text-red-500">
                          {errors.tujuan.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase  text-xs font-bold mb-2">
                        Total Paket
                      </label>
                      <input
                        type="text"
                        placeholder="Total Paket"
                        className="border-0 px-3 py-3 placeholder-slate-300  bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        {...register("total_paket", { required: true })}
                      />
                      {errors?.total_paket && (
                        <span className="mt-1 text-xs italic text-red-500">
                          {errors.total_paket.message}
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

InputKriteriaPenilaian.layout = Admin;
