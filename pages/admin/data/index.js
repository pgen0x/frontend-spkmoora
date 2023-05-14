import React, { useState, useEffect } from "react";
import CardTable from "components/Cards/CardTable.js";
import Admin from "layouts/Admin.js";
import TableDropdown from "components/Dropdowns/TableDropdown.js";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import moment from "moment";

export default function Datalist() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const COLUMNS = [
    {
      Header: () => <div>Nama Rute</div>,
      accessor: "nama_rute",
      // @ts-ignore
      Cell: ({ cell: { value } }) => <div>{value}</div>,
    },
    {
      Header: () => <div>Tanggal Pengiriman</div>,
      accessor: "tanggal_pengiriman",
      // @ts-ignore
      Cell: ({ cell: { value } }) => (
        <div>{moment(value).format("DD MMMM YYYY")}</div>
      ),
    },
    {
      Header: () => <div>Total Berat Paket</div>,
      accessor: "total_berat_paket",
      // @ts-ignore
      Cell: ({ cell: { value } }) => <div>{value} kg</div>,
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
      Cell: ({ cell: { value } }) => <div>{value} paket</div>,
    },
    {
      Header: () => <div></div>,
      accessor: "id",
      // @ts-ignore
      Cell: ({ row }) => <>{row.values.id && <TableDropdown />}</>,
      disableSortBy: true,
    },
  ];

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
      setData(response.data);
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
        setData([]);
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable tableTitle="Data" COLUMNS={COLUMNS} dataTable={data} />
        </div>
      </div>
    </>
  );
}

Datalist.layout = Admin;
