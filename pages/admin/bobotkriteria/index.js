import React, { useState, useEffect } from "react";
import CardTable from "components/Cards/CardTable.js";
import Admin from "layouts/Admin.js";
import TableDropdown from "components/Dropdowns/TableDropdown.js";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function BobotKriteria() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const COLUMNS = [
    {
      Header: () => <div>Kode Kriteria</div>,
      accessor: "kriteria_penilaian.kode_kriteria",
      // @ts-ignore
      Cell: ({ cell: { value } }) => <div>{value}</div>,
    },
    {
      Header: () => <div>Nama Kriteria</div>,
      accessor: "kriteria_penilaian.nama_kriteria",
      // @ts-ignore
      Cell: ({ cell: { value } }) => <div>{value}</div>,
    },
    {
      Header: () => <div>Keterangan</div>,
      accessor: "nilai_kriteria",
      // @ts-ignore
      Cell: ({ row }) => {
        const { nilai, isMinMax, min_nilai, max_nilai, kriteriaPenilaianId } =
          row.original;
        if (isMinMax) {
          if (kriteriaPenilaianId === 1) {
            return `${min_nilai} - ${max_nilai} kg`;
          } else {
            return `${min_nilai} - ${max_nilai} paket`;
          }
        } else {
          return nilai;
        }
      },
    },
    {
      Header: () => <div>Bobot Kriteria</div>,
      accessor: "bobotkriteria",
      // @ts-ignore
      Cell: ({ cell: { value } }) => <div>{value}</div>,
    },
    {
      Header: () => <div></div>,
      accessor: "id",
      Cell: ({ row }) => (
        <>{row.values.id && <TableDropdown id={row.values.id} />}</>
      ),
      disableSortBy: true,
    },
  ];

  const token = Cookies.get("token");

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3001/api/bobotkriteria/get",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
