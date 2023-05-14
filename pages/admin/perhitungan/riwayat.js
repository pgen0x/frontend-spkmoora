import React, { useState, useEffect } from "react";
import CardTable from "components/Cards/CardTable.js";
import Admin from "layouts/Admin.js";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import moment from "moment";
import Select from "react-select";

export default function RiwayatPerhitungan() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const [dataOptions, setDataOptions] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onMenuOpen = () => setIsMenuOpen(true);
  const onMenuClose = () => setIsMenuOpen(false);
  const [selectedOption, setSelectedOption] = useState(null);

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
      Header: () => <div>Nilai Yi</div>,
      accessor: "yi",
      // @ts-ignore
      Cell: ({ cell: { value } }) => <div>{value} paket</div>,
    },
    {
      Header: "Keterangan",
      accessor: "keterangan",
      Cell: ({ row }) => {
        const { keterangan } = row.original;
        if (keterangan === "Sangat Prioritas") {
          return <span className="font-bold text-red-500">{keterangan}</span>;
        } else {
          return <span>{keterangan}</span>;
        }
      },
    },
    {
      Header: "Jenis Kendaraan",
      accessor: "jenis_kendaraan.jenis_kendaraan",
    },
  ];

  const token = Cookies.get("token");

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3001/api/perhitungan/get",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
      const uniqueDates = new Set(
        response.data.map((item) => item.tanggal_pengiriman.slice(0, 10))
      );
      const sortedDates = Array.from(uniqueDates).sort();
      const formattedDates = sortedDates.map((date) => {
        const dateObj = new Date(date);
        const options = { day: "2-digit", month: "long", year: "numeric" };
        const formattedDate = dateObj.toLocaleDateString("id-ID", options);
        return { value: date, label: formattedDate };
      });

      console.log(formattedDates);
      setDataOptions(formattedDates);
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

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);

    // Filter the data based on the selected option
    const filteredData = data.filter(
      (item) => item.tanggal_pengiriman.slice(0, 10) === selectedOption.value
    );

    // Set the filtered data to the data state
    setFilteredData(filteredData);
  };

  return (
    <>
      {/* <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable
            tableTitle="Riwayat Perhitungan"
            COLUMNS={COLUMNS}
            dataTable={data}
          />
        </div>
      </div> */}
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-slate-700 text-xl font-bold">
                  Riwayat Perhitungan
                </h6>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form>
                <div className="flex flex-wrap mt-6 mb-6">
                  <div className="w-full  px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase  text-xs font-bold mb-2">
                        Pilih Data Berdasarkan Tanggal
                      </label>
                      <Select
                        instanceId="select-data-date"
                        onMenuOpen={onMenuOpen}
                        onMenuClose={onMenuClose}
                        options={dataOptions}
                        onChange={handleSelectChange}
                        className={
                          selectedOption === null ? "no-data-selected" : ""
                        }
                      />
                      {!selectedOption && (
                        <span className="mt-1 text-xs italic text-red-500">
                          Pilih data terlebih dahulu
                        </span>
                      )}
                    </div>

                    <div className="relative w-full mb-3 py-3">
                      {filteredData.length > 0 && (
                        <CardTable
                          tableTitle="Riwayat Perhitungan"
                          COLUMNS={COLUMNS}
                          dataTable={filteredData}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

RiwayatPerhitungan.layout = Admin;
