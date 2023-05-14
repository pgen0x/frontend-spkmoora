import React, { useState, useEffect } from "react";
import Chart, { Utils } from "chart.js";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import moment from "moment";

export default function CardBarChart() {
  const [data2022, setData2022] = useState(new Array(12).fill(0));
  const [data2023, setData2023] = useState(new Array(12).fill(0));
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const token = Cookies.get("token");

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3001/api/data/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);

      setLoading(false);
      const countByMonth2022 = new Array(12).fill(0);
      const countByMonth2023 = new Array(12).fill(0);

      for (const d of response.data) {
        const date = new Date(d.tanggal_pengiriman);
        const month = date.getMonth(); // getMonth() returns 0-based month
        const year = date.getFullYear();

        if (year === 2022) {
          countByMonth2022[month] += d.total_paket;
        } else if (year === 2023) {
          countByMonth2023[month] += d.total_paket;
        }
      }

      const totalByMonth2022 = countByMonth2022.reduce((a, b) => a + b, 0);
      const totalByMonth2023 = countByMonth2023.reduce((a, b) => a + b, 0);

      console.log("Total paket in 2022:", totalByMonth2022);
      console.log("Total paket in 2023:", totalByMonth2023);

      setData2022(countByMonth2022);
      setData2023(countByMonth2023);
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

  useEffect(() => {
    let config = {
      type: "bar",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: new Date().getFullYear(),
            backgroundColor: "#ed64a6",
            borderColor: "#ed64a6",
            data: data2023,
            fill: false,
          },
          {
            label: new Date().getFullYear() - 1,
            fill: false,
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: data2022,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Orders Chart",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "bottom",
        },
        scales: {
          xAxes: [
            {
              display: false,
              scaleLabel: {
                display: true,
                labelString: "Month",
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(33, 37, 41, 0.3)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
              },
              gridLines: {
                borderDash: [2],
                drawBorder: false,
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.2)",
                zeroLineColor: "rgba(33, 37, 41, 0.15)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    let ctx = document.getElementById("bar-chart").getContext("2d");
    window.myBar = new Chart(ctx, config);
  }, [data2022, data2023]);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-slate-400 mb-1 text-xs font-semibold">
                Performa
              </h6>
              <h2 className="text-slate-700 text-xl font-semibold">
                Total Paket
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="bar-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
