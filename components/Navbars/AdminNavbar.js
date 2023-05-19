import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function Navbar() {
  const router = useRouter();

  // Get the current page title
  const pageTitles = {
    "/admin/dashboard": "Dashboard",
    "/admin/data": "Data",
    "/admin/data/tambah": "Tambah Data",
    "/admin/kriteriapenilaian": "Kriteria Penilaian",
    "/admin/kriteriapenilaian/tambah": "Tambah Kriteria Penilaian",
    "/admin/bobotkriteria": "Bobot Kriteria",
    "/admin/bobotkriteria/tambah": "Tambah Bobot Kriteria",
    "/admin/aturanpenilaian": "Aturan Penilaian",
    "/admin/aturanpenilaian/tambah": "Tambah Aturan Penilaian",
    "/admin/jeniskendaraan": "Jenis Kendaraan",
    "/admin/jeniskendaraan/tambah": "Tambah Jenis Kendaraan",
    "/admin/perhitungan/proses": "Proses Perhitungan",
    "/admin/perhitungan/riwayat": "Riwayat Perhitungan",

    "/admin/profile": "Profile",

    // add more routes and titles as needed
  };

  const pageTitle = pageTitles[router.pathname] || "Untitled";

  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <div>
            <a
              className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3 text-white"
              href="/admin/dashboard"
              onClick={(e) => e.preventDefault()}
            >
              {pageTitle}
            </a>
          </div>

          {/* User */}
          <div>
            <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
              <UserDropdown />
            </ul>
          </div>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
