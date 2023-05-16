import React, { useState, useEffect } from "react";
import Admin from "layouts/Admin.js";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import toast from "react-hot-toast";

export default function UbahBobotKriteria() {
  const [showMinMax, setShowMinMax] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const token = Cookies.get("token");
  const router = useRouter();
  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
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
          label: `${item.kode_kriteria} - ${item.nama_kriteria}`,
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
    if (showMinMax) {
      setValue("nilai", "");
    }
  }, [showMinMax]);

  const handleCheckboxChange = (event) => {
    setShowMinMax(event.target.checked);
  };

  const onSubmit = async (data) => {
    console.log(selectedValue);

    try {
      const response = await axios.put(
        `http://localhost:3001/api/bobotkriteria/update/${router.query.slug}`,
        {
          kriteriaPenilaianId: selectedValue.value,
          nilai: !showMinMax ? data.nilai : "",
          isMinMax: showMinMax,
          min_nilai: showMinMax ? data.min_nilai : "",
          max_nilai: showMinMax ? data.max_nilai : "",
          bobotkriteria: data.bobotkriteria,
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
      router.push("/admin/bobotkriteria");
    } catch (error) {
      toast.error(error.message);
      console.error("Error:", error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3001/api/bobotkriteria/getbyid/${router.query.slug}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(showMinMax);
      setShowMinMax(response.data.isMinMax);
      const defaultValue = {
        value: response.data.kriteriaPenilaianId,
        label: `${response.data.kriteria_penilaian.kode_kriteria} - ${response.data.kriteria_penilaian.nama_kriteria}`,
      };
      setSelectedValue(defaultValue);
      setValue("bobotkriteria", response.data.bobotkriteria);
      setValue("min_nilai", response.data.min_nilai);
      setValue("max_nilai", response.data.max_nilai);
      setValue("nilai", response.data.nilai);
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
  }, [showMinMax]);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-slate-700 text-xl font-bold">
                  Ubah Bobot Kriteria
                </h6>
                <div>
                  <button
                    className="bg-slate-700 active:bg-slate-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleSubmit(onSubmit)()}
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
                  <div className="w-full px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase  text-xs font-bold mb-2">
                        Kode Kriteria
                      </label>
                      <Controller
                        name="kode_kriteria"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            instanceId="select-kode-kriteria"
                            options={selectedOption}
                            placeholder="Pilih Kode Kriteria"
                            value={selectedValue}
                          />
                        )}
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
                        checked={showMinMax}
                        disabled
                        className="w-4 h-4 text-red-500 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-500 disabled:opacity-50"
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
                            {...register("min_nilai", { required: true })}
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
                            {...register("max_nilai", { required: true })}
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
                            Keterangan
                          </label>
                          <input
                            type="text"
                            placeholder="Keterangan"
                            {...register("nilai", { required: true })}
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
                        {...register("bobotkriteria", { required: true })}
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

UbahBobotKriteria.layout = Admin;
