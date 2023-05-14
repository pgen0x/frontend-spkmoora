import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const router = useRouter();
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>

          {/* Brand */}
          <Link href="/admin/dashboard">
            <img
              href="#pablo"
              src="/img/id-express.png"
              className="md:block hidden text-left md:pb-2  mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            />
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none justify-center">
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>

          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-slate-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    href="/"
                    className="md:block text-left md:pb-2  mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                  >
                    ID Express Logistik
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-slate-400 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Menu
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none ">
              <li className="items-center">
                <Link
                  href="/admin/dashboard"
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (router.pathname.indexOf("/admin/dashboard") !== -1
                      ? "text-red-500 hover:text-red-600"
                      : "text-slate-700 hover:text-slate-500")
                  }
                >
                  <i
                    className={
                      "fas fa-tv mr-2 text-sm " +
                      (router.pathname.indexOf("/admin/dashboard") !== -1
                        ? "opacity-25"
                        : "text-slate-300")
                    }
                  ></i>{" "}
                  Dashboard
                </Link>
              </li>
              <li className="items-center">
                <Link
                  href="/admin/data"
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (router.pathname.indexOf("/admin/data") !== -1
                      ? "text-red-500 hover:text-red-600"
                      : "text-slate-700 hover:text-slate-500")
                  }
                >
                  <i
                    className={
                      "fas fa-chart-bar mr-2 text-sm " +
                      (router.pathname.indexOf("/admin/data") !== -1
                        ? "opacity-75"
                        : "text-slate-300")
                    }
                  ></i>{" "}
                  Data
                </Link>
              </li>
              <li className="items-center">
                <Link
                  href="/admin/kriteriapenilaian"
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (router.pathname.indexOf("/admin/kriteriapenilaian") !== -1
                      ? "text-red-500 hover:text-red-600"
                      : "text-slate-700 hover:text-slate-500")
                  }
                >
                  <i
                    className={
                      "fas fa-chart-pie mr-2 text-sm " +
                      (router.pathname.indexOf("/admin/kriteriapenilaian") !==
                      -1
                        ? "opacity-75"
                        : "text-slate-300")
                    }
                  ></i>{" "}
                  Kriteria Penilaian
                </Link>
              </li>
              <li className="items-center">
                <Link
                  href="/admin/bobotkriteria"
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (router.pathname.indexOf("/admin/bobotkriteria") !== -1
                      ? "text-red-500 hover:text-red-600"
                      : "text-slate-700 hover:text-slate-500")
                  }
                >
                  <i
                    className={
                      "fas fa-layer-group mr-2 text-sm " +
                      (router.pathname.indexOf("/admin/bobotkriteria") !== -1
                        ? "opacity-75"
                        : "text-slate-300")
                    }
                  ></i>{" "}
                  Bobot Kriteria
                </Link>
              </li>
              <li className="items-center">
                <Link
                  href="/admin/aturanpenilaian"
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (router.pathname.indexOf("/admin/aturanpenilaian") !== -1
                      ? "text-red-500 hover:text-red-600"
                      : "text-slate-700 hover:text-slate-500")
                  }
                >
                  <i
                    className={
                      "fas fa-book mr-2 text-sm " +
                      (router.pathname.indexOf("/admin/aturanpenilaian") !== -1
                        ? "opacity-75"
                        : "text-slate-300")
                    }
                  ></i>{" "}
                  Aturan Penilaian
                </Link>
              </li>
              <li className="items-center">
                <Link
                  href="/admin/jeniskendaraan"
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (router.pathname.indexOf("/admin/jeniskendaraan") !== -1
                      ? "text-red-500 hover:text-red-600"
                      : "text-slate-700 hover:text-slate-500")
                  }
                >
                  <i
                    className={
                      "fas fa-truck mr-2 text-sm " +
                      (router.pathname.indexOf("/admin/jeniskendaraan") !== -1
                        ? "opacity-75"
                        : "text-slate-300")
                    }
                  ></i>
                  Jenis Kendaraan
                </Link>
              </li>
              <li className="items-center">
                <Link
                  href="/admin/perhitungan/proses"
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (router.pathname.indexOf("/admin/perhitungan/proses") !== -1
                      ? "text-red-500 hover:text-red-600"
                      : "text-slate-700 hover:text-slate-500")
                  }
                >
                  <i
                    className={
                      "fas fa-percent mr-2 text-sm " +
                      (router.pathname.indexOf("/admin/perhitungan/proses") !==
                      -1
                        ? "opacity-75"
                        : "text-slate-300")
                    }
                  ></i>{" "}
                  Perhitungan
                </Link>
              </li>
              <li className="items-center">
                <Link
                  href="/admin/perhitungan/riwayat"
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (router.pathname.indexOf("/admin/perhitungan/riwayat") !==
                    -1
                      ? "text-red-500 hover:text-red-600"
                      : "text-slate-700 hover:text-slate-500")
                  }
                >
                  <i
                    className={
                      "fas fa-file mr-2 text-sm " +
                      (router.pathname.indexOf("/admin/perhitungan/riwayat") !==
                      -1
                        ? "opacity-75"
                        : "text-slate-300")
                    }
                  ></i>{" "}
                  Riwayat Perhitungan
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
          </div>
        </div>
      </nav>
    </>
  );
}
