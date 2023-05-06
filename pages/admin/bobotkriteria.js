import React, { useState } from "react";
import CardTable from "components/Cards/CardTable.js";
import Admin from "layouts/Admin.js";
import TableDropdown from "components/Dropdowns/TableDropdown.js";

export default function BobotKriteria() {
  const [data, setData] = useState([]);

  const COLUMNS = [
    {
      Header: () => <div>Kode Kriteria</div>,
      accessor: "kode_kriteria",
      // @ts-ignore
      Cell: ({ cell: { value } }) => <div>{value}</div>,
    },
    {
      Header: () => <div>Nama Kriteria</div>,
      accessor: "nama_kriteria",
      // @ts-ignore
      Cell: ({ cell: { value } }) => <div>{value}</div>,
    },
    {
      Header: () => <div>Nilai Kriteria</div>,
      accessor: "nilai_kriteria",
      // @ts-ignore
      Cell: ({ cell: { value } }) => <div>{value}</div>,
    },
    {
      Header: () => <div>Bobot Kriteria</div>,
      accessor: "bobot",
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
            tableTitle="Bobot Kriteria"
            COLUMNS={COLUMNS}
            dataTable={data}
          />
        </div>
      </div>
    </>
  );
}

BobotKriteria.layout = Admin;
