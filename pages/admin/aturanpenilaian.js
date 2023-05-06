import React, { useState } from "react";
import CardTable from "components/Cards/CardTable.js";
import Admin from "layouts/Admin.js";
import TableDropdown from "components/Dropdowns/TableDropdown.js";

export default function AturanPenilaian({ data }) {
  const COLUMNS = [
    {
      Header: () => <div>Keterangan</div>,
      accessor: "keterangan",
      // @ts-ignore
      Cell: ({ cell: { value } }) => <div>{value}</div>,
    },
    {
      Header: () => <div>Nilai</div>,
      accessor: "nilai",
      Cell: ({ cell: { value }, row: { original } }) => (
        <div>
          {original.descnilai} {value}
        </div>
      ),
    },
    {
      Header: () => <div></div>,
      accessor: "id",
      // @ts-ignore
      Cell: ({ row }) => <>{row.values.id && <TableDropdown />}</>,
      disableSortBy: true,
    },
  ];
  console.log(data);
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable
            tableTitle="Aturan Penilaian"
            COLUMNS={COLUMNS}
            dataTable={data}
          />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const response = await fetch(
      "http://localhost:3001/api/aturanpenilaian/get",
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlsaGFtZGhhbmltdWhhbW1hZEBnbWFpbC5jb20iLCJ1c2VySWQiOjEsImlhdCI6MTY4MzM3NzE0OCwiZXhwIjoxNjgzNDYzNTQ4fQ.YkQM8fBq_aGCUF7GFbeJhDW1B2534MJow_VYfy3vjJQ`,
        },
      }
    );
    if (response.status === 401) {
      return {
        props: {
          error: "Unauthorized access. Please login first.",
        },
      };
    }
    const data = await response.json();
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        data: [],
      },
    };
  }
}

AturanPenilaian.layout = Admin;
