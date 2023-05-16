import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import {
  useTable,
  useResizeColumns,
  useFlexLayout,
  useSortBy,
  usePagination,
} from "react-table";
import { read, utils, writeFileXLSX } from "xlsx";

export default function CardTable({ color, tableTitle, COLUMNS, dataTable }) {
  const [loading, setLoading] = useState(true);

  const columns = React.useMemo(() => COLUMNS, []);
  const data = React.useMemo(() => dataTable, [dataTable]);

  const {
    getTableProps,
    getTableBodyProps,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    headerGroups,
    page,
    nextPage,
    previousPage,
    prepareRow,
  } = useTable(
    {
      data,
      columns,
      initialState: { pageSize: 5 },
      isLoading: loading,
    },
    useSortBy,
    useResizeColumns,
    usePagination
  );

  const { pageIndex } = state;

  const exportFile = useCallback(() => {
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    const sheetName = new Date().toISOString(); // Get current date-time in ISO format
    utils.book_append_sheet(wb, ws, sheetName);
    writeFileXLSX(wb, `${tableTitle} - ${sheetName}.xlsx`);
  }, [data]);

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-slate-700 text-white")
        }
      >
        <div className="rounded-t mb-0 px-2 py-3 border-0">
          {tableTitle !== "Hitung Data" && (
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3
                  className={
                    "font-semibold text-lg " +
                    (color === "light" ? "text-slate-700" : "text-white")
                  }
                >
                  Tabel {tableTitle}
                </h3>
              </div>
              <div className="px-2">
                {tableTitle !== "Penilaian Alternatif" &&
                tableTitle !== "Nilai Perhitungan Yi" &&
                tableTitle !== "Riwayat Perhitungan" &&
                tableTitle !== "Hasil Penilaian dan Keputusan" ? (
                  <Link
                    href={
                      tableTitle === "Aturan Penilaian"
                        ? "/admin/aturanpenilaian/tambah"
                        : tableTitle === "Kriteria Penilaian"
                        ? "/admin/kriteriapenilaian/tambah"
                        : tableTitle === "Data"
                        ? "/admin/data/tambah"
                        : tableTitle === "Jenis Kendaraan"
                        ? "/admin/jeniskendaraan/tambah"
                        : tableTitle === "Bobot Kriteria"
                        ? "/admin/bobotkriteria/tambah"
                        : "/admin/dashboard"
                    }
                  >
                    <button
                      className="bg-slate-700 active:bg-slate-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      <i className="fas fa-plus mr-1"></i> Tambah {tableTitle}
                    </button>
                  </Link>
                ) : (
                  <button
                    className="bg-slate-700 active:bg-slate-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={exportFile}
                  >
                    <i className="fas fa-file-export mr-1"></i> Export{" "}
                    {tableTitle}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table
            {...getTableProps()}
            className="items-center w-full bg-transparent border-collapse"
          >
            <thead>
              {headerGroups.map((headerGroup, idx) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={idx}>
                  {headerGroup.headers.map((column, idx) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={idx}
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left " +
                        (color === "light"
                          ? "bg-slate-50 text-slate-500 border-slate-100"
                          : "bg-slate-600 text-slate-200 border-slate-500")
                      }
                    >
                      <div className="flex items-center">
                        {column.id !== "id" && (
                          <>
                            {column.render("Header")}
                            {column.canResize && (
                              <div
                                {...column.getResizerProps()}
                                className={`resizer ${
                                  column.isResizing ? "isResizing" : ""
                                }`}
                              />
                            )}
                            <span className="ltr:ml-1 rtl:mr-1">
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <i className="fas fa-chevron-down ml-1"></i>
                                ) : (
                                  <i className="fas fa-chevron-down rotate-180 ml-1"></i>
                                )
                              ) : (
                                <i className="fas fa-chevron-down rotate-180 opacity-0 transition group-hover:opacity-50 ml-1"></i>
                              )}
                            </span>
                          </>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {data.length > 0 ? (
              <tbody
                {...getTableBodyProps()}
                className="text-xs font-medium text-slate-500  3xl:text-sm"
              >
                {page.map((row, idx) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      key={idx}
                      className="items-center rounded-lg bg-white uppercase shadow-card last:mb-0 "
                    >
                      {row.cells.map((cell, idx) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            key={idx}
                            className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <tbody
                {...getTableBodyProps()}
                className="text-xs font-medium text-zinc-900 3xl:text-sm"
              >
                <tr
                  className={
                    " items-center justify-center uppercase shadow-card" +
                    (color === "light"
                      ? "bg-slate-50 text-slate-500 border-slate-100"
                      : "bg-slate-600 text-slate-200 border-slate-500")
                  }
                >
                  <td colSpan={columns.length}>
                    <div className="text-center py-4">Data Tidak Ditemukan</div>
                  </td>
                </tr>
              </tbody>
            )}
          </table>
          <div className="mb-4 flex items-center justify-center rounded-lg  px-5 py-2 text-sm shadow-card  lg:py-6">
            <div className="flex items-center gap-5">
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                title="Previous"
                shape="circle"
                variant="transparent"
                size="small"
                className="disabled:text-zinc-400  "
              >
                <i className="fas fa-chevron-left mr-2"></i>
              </button>
              <div>
                Page{" "}
                <strong className="font-semibold">
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{" "}
              </div>
              <button
                onClick={() => nextPage()}
                disabled={!canNextPage}
                title="Next"
                shape="circle"
                variant="transparent"
                size="small"
                className="disabled:text-zinc-400 "
              >
                <i className="fas fa-chevron-right ml-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
