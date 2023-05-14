import React, { useState, useEffect } from "react";
import Admin from "layouts/Admin.js";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import toast from "react-hot-toast";

export default function InputBobotKriteria() {
  const [ariaFocusMessage, setAriaFocusMessage] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onMenuOpen = () => setIsMenuOpen(true);
  const onMenuClose = () => setIsMenuOpen(false);
  const [showMinMax, setShowMinMax] = useState(false);
  const [selectedKriteria, setSelectedKriteria] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

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

  useEffect(() => {
    async function fetchKriteriaOptions() {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/kriteriapenilaian/get",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const kriteriaData = response.data.map((item) => ({
          value: item.id,
          label: item.kode_kriteria,
          data: item,
        }));

        setSelectedOption(kriteriaData);
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
    fetchKriteriaOptions();
  }, []);

  useEffect(() => {
    if (selectedKriteria) {
      const namaKriteria = selectedKriteria.nama_kriteria;
      // update value dari input nama kriteria
      setValue("nama_kriteria", namaKriteria);
    } else {
      setValue("nama_kriteria", "");
    }
  }, [selectedKriteria]);

  const handleCheckboxChange = (event) => {
    setShowMinMax(event.target.checked);
  };

  function handleSelectChange(selectedOption) {
    setSelectedKriteria(selectedOption?.data); // simpan data kriteria yang dipilih ke state
  }

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-slate-700 text-xl font-bold">
                  Tambah Bobot Kriteria
                </h6>
                <div>
                  <button
                    className="bg-slate-700 active:bg-slate-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    <i className="fas fa-save mr-2"></i>Simpan
                  </button>
                  <Link href="/admin/bobotkriteria">
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
                      <Controller
                        name="kode_kriteria"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={selectedOption}
                            placeholder="Pilih Kode Kriteria"
                            isClearable
                            onChange={handleSelectChange}
                          />
                        )}
                      />
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
                        disabled
                        {...register("nama_kriteria")}
                        className="border-0 px-3 py-3 placeholder-slate-300  bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 cursor-not-allowed"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="flex items-center mb-3">
                      <input
                        id="bordered-radio-1"
                        type="checkbox"
                        value=""
                        name="bordered-radio"
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-red-500 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-500"
                      />
                      <label
                        htmlFor="bordered-radio-1"
                        className="w-full py-4 ml-2 text-sm font-medium "
                      >
                        Apakah ada nilai minimum dan maximum / range ?
                      </label>
                    </div>
                  </div>
                  {showMinMax && (
                    <>
                      <div className="w-full px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase  text-xs font-bold mb-2">
                            Minimum Nilai
                          </label>
                          <input
                            type="text"
                            placeholder="Minimum Nilai"
                            className="border-0 px-3 py-3 placeholder-slate-300  bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        </div>
                      </div>
                      <div className="w-full px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase  text-xs font-bold mb-2">
                            Maximum Nilai
                          </label>
                          <input
                            type="text"
                            placeholder="Maximum Nilai"
                            className="border-0 px-3 py-3 placeholder-slate-300  bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        </div>
                      </div>
                    </>
                  )}
                  {!showMinMax && (
                    <>
                      <div className="w-full px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase  text-xs font-bold mb-2">
                            Nilai
                          </label>
                          <input
                            type="text"
                            placeholder="Nilai"
                            className="border-0 px-3 py-3 placeholder-slate-300  bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        </div>
                      </div>
                    </>
                  )}
                  <div className="w-full px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase  text-xs font-bold mb-2">
                        Bobot Kriteria
                      </label>
                      <input
                        type="text"
                        placeholder="Bobot Kriteria"
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
    </>
  );
}

InputBobotKriteria.layout = Admin;
