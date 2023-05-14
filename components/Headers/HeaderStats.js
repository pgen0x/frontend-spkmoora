import React, { useState } from "react";

// components

import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats() {
  const [totalData, setTotalData] = useState(0);
  const [totalJenisKendaraan, setTotalJenisKendaraan] = useState(0);
  const [totalKriteria, setTotalKriteria] = useState(0);
  const [totalPerhitungan, setTotalPerhitungan] = useState(0);

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
