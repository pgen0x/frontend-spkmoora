import React, { useState } from "react";
import CardTable from "components/Cards/CardTable.js";
import Admin from "layouts/Admin.js";
import TableDropdown from "components/Dropdowns/TableDropdown.js";

export default function Datalist() {
  const [data, setData] = useState([
    {
      id: 1,
      nama_rute: "Rute 1",
      tgl_pengiriman: "04 April 2023",
      total_berat_paket: "3153 Kg",
      tujuan: "Rute Kota Medan",
      total_paket: "3036 Paket",
    },
    {
      id: 2,
      nama_rute: "Rute 2",
      tgl_pengiriman: "04 April 2023",
      total_berat_paket: "1025 Kg",
      tujuan: "Rute Kabupaten Karo, dan Dairi",
      total_paket: "483 Paket",
    },
    {
      id: 3,
      nama_rute: "Rute 3",
      tgl_pengiriman: "04 April 2023",
      total_berat_paket: "2249 Kg",
      tujuan: "Rute Kisaran, Kualuh hulu, Lima Puluh, dan Lubuk Pakam",
      total_paket: "599 Paket",
    },
    {
      id: 4,
      nama_rute: "Rute 4",
      tgl_pengiriman: "04 April 2023",
      total_berat_paket: "390 Kg",
      tujuan: "Rute Babalan, Binjai, dan Kota Stabat",
      total_paket: "812 Paket",
    },
    {
      id: 5,
      nama_rute: "Rute 5",
      tgl_pengiriman: "04 April 2023",
      total_berat_paket: "2760 Kg",
      tujuan: "Rute Silangit, Simalungun, dan Kota Siantar",
      total_paket: "1091 Paket",
    },
  ]);

  const COLUMNS = [
    {
      Header: () => <div>Nama Rute</div>,
      accessor: "nama_rute",
      // @ts-ignore
      Cell: ({ cell: { value } }) => <div>{value}</div>,
    },
    {
      Header: () => <div>Tanggal Pengiriman</div>,
      accessor: "tgl_pengiriman",
      // @ts-ignore
      Cell: ({ cell: { value } }) => <div>{value}</div>,
    },
    {
      Header: () => <div>Total Berat Paket</div>,
      accessor: "total_berat_paket",
      // @ts-ignore
      Cell: ({ cell: { value } }) => <div>{value}</div>,
    },
    {
      Header: () => <div>tujuan</div>,
      accessor: "tujuan",
      // @ts-ignore
      Cell: ({ cell: { value } }) => <div>{value}</div>,
    },
    {
      Header: () => <div>Total Paket</div>,
      accessor: "total_paket",
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
            tableTitle="Data"
            COLUMNS={COLUMNS}
            dataTable={data}
          />
        </div>
      </div>
    </>
  );
}

Datalist.layout = Admin;
