import React, { useState, useEffect } from "react";
import Admin from "layouts/Admin.js";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import toast from "react-hot-toast";

export default function InputAturanPenilaian() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onMenuOpen = () => setIsMenuOpen(true);
  const onMenuClose = () => setIsMenuOpen(false);
  const [tujuanOptions, setTujuanOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState([
    {
      value: ">=",
      label: ">=",
    },
    {
      value: ">",
      label: ">",
    },
    {
      value: "<",
      label: "<",
    },
    {
      value: "<=",
      label: "<=",
    },
    {
      value: "==",
      label: "==",
    },
    {
      value: "!=",
      label: "!=",
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
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/aturanpenilaian/create",
        {
          keterangan: data?.keterangan,
          nilai: data?.nilai,
          descnilai: data?.descnilai.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response:", response.data);
      toast.success("Aturan penilaian berhasil ditambahkan");
      // Reset form after successful submission
      reset();
    } catch (error) {
      router.push("/");
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
                  Tambah Aturan Penilaian
                </h6>
                <div>
                  <button
                    className="bg-slate-700 active:bg-slate-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleSubmit(onSubmit)()}
                  >
                    <i className="fas fa-save mr-2"></i>Simpan
                  </button>
                  <Link href="/admin/aturanpenilaian">
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
                        Keterangan
                      </label>
                      <input
                        type="text"
                        placeholder="Keterangan"
                        className="border-0 px-3 py-3 placeholder-slate-300  bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        {...register("keterangan", { required: true })}
                      />
                      {errors?.keterangan && (
                        <span className="mt-1 text-xs italic text-red-500">
                          {errors.keterangan.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase  text-xs font-bold mb-2">
                        Aturan
                      </label>
                      <Controller
                        name="descnilai"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            instanceId="select-kode-kriteria"
                            options={selectedOption}
                            placeholder="Pilih Aturan Logika"
                            isClearable
                          />
                        )}
                      />
                      {errors?.descnilai && (
                        <span className="mt-1 text-xs italic text-red-500">
                          {errors.descnilai.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase  text-xs font-bold mb-2">
                        Nilai
                      </label>
                      <input
                        type="number"
                        placeholder="Nilai"
                        className="border-0 px-3 py-3 placeholder-slate-300  bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        {...register("nilai", { required: true })}
                      />
                      {errors?.nilai && (
                        <span className="mt-1 text-xs italic text-red-500">
                          {errors.nilai.message}
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

InputAturanPenilaian.layout = Admin;
