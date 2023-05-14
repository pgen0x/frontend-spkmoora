import React, { useState, useEffect, useRef } from "react";
import Admin from "layouts/Admin.js";
import Select from "react-select";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import CardTable from "components/Cards/CardTable.js";
import moment from "moment";

export default function Perhitungan() {
  const [dataOptions, setDataOptions] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onMenuOpen = () => setIsMenuOpen(true);
  const onMenuClose = () => setIsMenuOpen(false);
  const [isHitung, setHitung] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [selectedOption, setSelectedOption] = useState(null);
  const [dataPenilaianAlternatif, setDataPenilaianAlternatif] = useState([]);
  const [dataPenilaianYi, setDataPenilaianYi] = useState([]);
  const [hasilPenilaian, setDataHasilPenilaian] = useState([]);

  const router = useRouter();
  const token = Cookies.get("token");
  const selectRef = useRef(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3001/api/data/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);

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
        setDataOptions([]);
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectChange = (selectedOption) => {
    console.log("Selected option:", selectedOption);
    setSelectedOption(selectedOption);
  };

  async function Hitung() {
    if (selectedOption == null) {
      toast.error("Silahkan pilih data terlebih dahulu");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/api/perhitungan/hitung",
        {
          tanggal_pengiriman: selectedOption.value,
          // other properties
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDataPenilaianAlternatif(response.data.perhitungan_alternatif);
      setDataPenilaianYi(response.data.nilai_yi);
      setDataHasilPenilaian(response.data.hasil_penilaian);
      console.log(response.data);
      setHitung(true);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setHitung(false);
        // If token is expired, log out the user or refresh the token
        Cookies.remove("token");
        toast.error("Token kedaluwarsa. Silahkan login kembali");
        router.push("/");
      } else {
        toast.error(error.message);
        console.error(error);
      }
    }
  }

  async function Simpan() {
    if (!hasilPenilaian) {
      toast.error("Silahkan melakukan perhitungan dahulu");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/perhitungan/simpan",
        hasilPenilaian,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      toast.success("Data perhitungan berhasil di simpan");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // If token is expired, log out the user or refresh the token
        Cookies.remove("token");
        toast.error("Token kedaluwarsa. Silahkan login kembali");
        router.push("/");
      } else {
        toast.error(error.message);
        console.error(error);
      }
    }
  }

  useEffect(() => {
    if (selectedOption === null && selectRef.current !== null) {
      selectRef.current.focus();
    }
  }, [selectedOption]);

  const COLUMNSPenilaianAlternatif = React.useMemo(() => [
    {
      Header: "Alternatif",
      accessor: "nama_rute",
    },
    {
      Header: "Tanggal Pengiriman",
      accessor: "tanggal_pengiriman",
      Cell: ({ cell: { value } }) => (
        <div>{moment(value).format("DD MMMM YYYY")}</div>
      ),
    },
    {
      Header: "C1",
      accessor: "C1",
    },
    {
      Header: "C2",
      accessor: "C2",
    },
    {
      Header: "C3",
      accessor: "C3",
    },
  ]);
  const COLUMNSPenilaianYi = React.useMemo(() => [
    {
      Header: "Alternatif",
      accessor: "nama_rute",
    },
    {
      Header: "Tanggal Pengiriman",
      accessor: "tanggal_pengiriman",
      Cell: ({ cell: { value } }) => (
        <div>{moment(value).format("DD MMMM YYYY")}</div>
      ),
    },
    {
      Header: "Maximum (C1+C2)",
      accessor: "maximum",
    },
    {
      Header: "Minimum",
      accessor: "minimum",
    },
    {
      Header: "Yi",
      accessor: "yi",
    },
  ]);
  const COLUMNSHasilPenilaian = React.useMemo(() => [
    {
      Header: "Alternatif",
      accessor: "nama_rute",
    },
    {
      Header: "Tanggal Pengiriman",
      accessor: "tanggal_pengiriman",
      Cell: ({ cell: { value } }) => (
        <div>{moment(value).format("DD MMMM YYYY")}</div>
      ),
    },
    {
      Header: "Yi (max-min)",
      accessor: "yi",
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
      accessor: "jenisKendaraanId.jenis_kendaraan",
    },
  ]);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-slate-700 text-xl font-bold">
                  Perhitungan
                </h6>
                <div>
                  <button
                    className="bg-slate-700 active:bg-slate-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={Hitung}
                  >
                    <i className="fas fa-percent mr-1"></i> Hitung
                  </button>

                  <button
                    className={`bg-slate-700 active:bg-slate-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 ${
                      isHitung ? "" : "disabled:opacity-50 cursor-not-allowed"
                    }`}
                    type="button"
                    disabled={isHitung ? false : true}
                    onClick={Simpan}
                  >
                    <i className="fas fa-save mr-1"></i>Simpan Perhitungan
                  </button>
                </div>
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
                    <div className="relative w-full mb-3 mt-3">
                      {dataPenilaianYi.length > 0 && (
                        <CardTable
                          tableTitle="Penilaian Alternatif"
                          COLUMNS={COLUMNSPenilaianAlternatif}
                          dataTable={dataPenilaianAlternatif}
                        />
                      )}
                    </div>
                    <div className="relative w-full mb-3 py-3">
                      {dataPenilaianAlternatif.length > 0 && (
                        <CardTable
                          tableTitle="Nilai Perhitungan Yi"
                          COLUMNS={COLUMNSPenilaianYi}
                          dataTable={dataPenilaianYi}
                        />
                      )}
                    </div>
                    <div className="relative w-full mb-3 py-3">
                      {hasilPenilaian.length > 0 && (
                        <CardTable
                          tableTitle="Hasil Penilaian dan Keputusan"
                          COLUMNS={COLUMNSHasilPenilaian}
                          dataTable={hasilPenilaian}
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

Perhitungan.layout = Admin;
