import React, { useState } from "react";
import CardTable from "components/Cards/CardTable.js";
import Admin from "layouts/Admin.js";
import TableDropdown from "components/Dropdowns/TableDropdown.js";

export default function KriteriaPenilaian() {
  const [data, setData] = useState([
    {
      id: 1,
      nama_kriteria: "Rute 1",
      kode_kriteria: "04 April 2023",
      bobot: "3153 Kg",
    },
    {
      id: 2,
      nama_kriteria: "Rute 2",
      kode_kriteria: "04 April 2023",
      bobot: "1025 Kg",
    },
    {
      id: 3,
      nama_kriteria: "Rute 3",
      kode_kriteria: "04 April 2023",
      bobot: "2249 Kg",
    },
    {
      id: 4,
      nama_kriteria: "Rute 4",
      kode_kriteria: "04 April 2023",
      bobot: "390 Kg",
    },
    {
      id: 5,
      nama_kriteria: "Rute 5",
      kode_kriteria: "04 April 2023",
      bobot: "2760 Kg",
    },
  ]);

  const COLUMNS = [
    {
      Header: () => <div>Jenis Kendaraan</div>,
      accessor: "jenis_kendaraan",
      // @ts-ignore
      Cell: ({ cell: { value } }) => <div>{value}</div>,
    },
    {
      Header: () => <div>Kapasitas Muatan</div>,
      accessor: "kapasitas_muatan",
      // @ts-ignore
      Cell: ({ cell: { value } }) => <div>{value}</div>,
    },
    {
      Header: () => <div></div>,
      accessor: "id",
      // @ts-ignore
      Cell: ({ row }) => <>{row.values.id && <TableDropdown />}</>,
      disableSortBy: true,
    },
  ];

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable
            tableTitle="Jenis Kendaraan"
            COLUMNS={COLUMNS}
            dataTable={data}
          />
        </div>
      </div>
    </>
  );
}

KriteriaPenilaian.layout = Admin;
