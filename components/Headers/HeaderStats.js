import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats() {
  const [totalData, setTotalData] = useState(0);
  const [totalJenisKendaraan, setTotalJenisKendaraan] = useState(0);
  const [totalKriteria, setTotalKriteria] = useState(0);
  const [totalPerhitungan, setTotalPerhitungan] = useState(0);
  const router = useRouter();
  const token = Cookies.get("token");

  const fetchTotalData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/data/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTotalData(response.data.length);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // If token is expired, log out the user or refresh the token
        Cookies.remove("token");
        // toast.error("Token kedaluwarsa. Silahkan login kembali");
        router.push("/");
      } else {
        toast.error(error.message);
        console.error(error);
      }
    }
  };

  const fetchTotalKendaraan = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/jeniskendaraan/get",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTotalJenisKendaraan(response.data.length);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // If token is expired, log out the user or refresh the token
        Cookies.remove("token");
        // toast.error("Token kedaluwarsa. Silahkan login kembali");
        router.push("/");
      } else {
        toast.error(error.message);
        console.error(error);
      }
    }
  };

  const fetchTotalKriteria = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/kriteriapenilaian/get",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTotalKriteria(response.data.length);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // If token is expired, log out the user or refresh the token
        Cookies.remove("token");
        // toast.error("Token kedaluwarsa. Silahkan login kembali");
        router.push("/");
      } else {
        toast.error(error.message);
        console.error(error);
      }
    }
  };

  const fetchTotalPerhitungan = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/perhitungan/get",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTotalPerhitungan(response.data.length);
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
  };

  useEffect(() => {
    fetchTotalData();
    fetchTotalKendaraan();
    fetchTotalKriteria();
    fetchTotalPerhitungan();
  }, []);
  return (
    <>
      {/* Header */}
      <div className="relative bg-slate-800 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="TOTAL DATA"
                  statTitle={totalData}
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="TOTAL JENIS KENDARAAN"
                  statTitle={totalJenisKendaraan}
                  statIconName="fas fa-truck"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="TOTAL KRITERIA"
                  statTitle={totalKriteria}
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="TOTAL PERHITUNGAN"
                  statTitle={totalPerhitungan}
                  statIconName="fas fa-percent"
                  statIconColor="bg-sky-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
