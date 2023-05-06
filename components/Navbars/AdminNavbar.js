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
    "/admin/inputdata": "Tambah Data",
    "/admin/kriteriapenilaian": "Kriteria Penilaian",
    "/admin/inputkriteriapenilaian": "Tambah Kriteria Penilaian",
    "/admin/bobotkriteria": "bobot kriteria",
    "/admin/inputbobotkriteria": "Tambah bobot kriteria",
    "/admin/aturanpenilaian": "aturan penilaian",
    "/admin/inputaturanpenilaian": "Tambah aturan penilaian",
    "/admin/jeniskendaraan": "jenis kendaraan",
    "/admin/inputjeniskendaraan": "Tambah jenis kendaraan",
    // add more routes and titles as needed
  };

  const pageTitle = pageTitles[router.pathname] || "Untitled";

  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
            href="/admin/dashboard"
            onClick={(e) => e.preventDefault()}
          >
            {pageTitle}
          </a>
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
